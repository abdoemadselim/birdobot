import { stripe } from "@/lib/stripe";
import { db } from "@/server/db/";
import { userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
    const body = await request.text()

    const signature = request.headers.get("stripe-signature")

    const event = stripe.webhooks.constructEvent(body, signature ?? "", process.env.STRIPE_WEBHOOK_SECRET_KEY as string)

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        const { userId } = session.metadata || { userId: null }

        if (!userId) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 })
        }

        await db.update(userTable).set({
            plan: "PRO"
        }).where(eq(userTable.id, Number(userId)))
    }

    return NextResponse.json({ message: "Upgraded user plan successfully" })
}