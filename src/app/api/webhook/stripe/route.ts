import { CORE_QUOTA, GROWTH_QUOTA, PREMIUM_QUOTA } from "@/config.js";
import { stripe } from "@/lib/stripe";
import { db } from "@/server/db/";
import { userCreditsTable, userTable } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
    const body = await request.text()

    const signature = request.headers.get("stripe-signature")

    const event = stripe.webhooks.constructEvent(body, signature ?? "", process.env.STRIPE_WEBHOOK_SECRET_KEY as string)

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        const { userId, plan } = session.metadata || { userId: null, plan: "free" }

        if (!userId) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 })
        }

        if (plan === "free") {
            return NextResponse.json({ message: "Upgraded user plan successfully" })
        }

        // Update credits
        const eventCredits = plan === "core" ? CORE_QUOTA.maxEventsPerMonth : plan === "growth" ? GROWTH_QUOTA.maxEventsPerMonth : PREMIUM_QUOTA.maxEventsPerMonth
        const categoriesCredits = plan === "core" ? CORE_QUOTA.maxEventsCategories : plan === "growth" ? GROWTH_QUOTA.maxEventsCategories : PREMIUM_QUOTA.maxEventsCategories

        await db.insert(userCreditsTable).values({
            balance: eventCredits,
            featureKey: 'EVENTS',
            userId: Number(userId)
        }).onConflictDoUpdate({
            target: [userCreditsTable.userId, userCreditsTable.featureKey],
            set: {
                balance: sql`userCreditsTable.balance + ${eventCredits}`,
            }
        })

        await db.insert(userCreditsTable).values({
            balance: categoriesCredits,
            featureKey: 'EVENTS_CATEGORIES',
            userId: Number(userId)
        }).onConflictDoUpdate({
            target: [userCreditsTable.userId, userCreditsTable.featureKey],
            set: {
                balance: sql`userCreditsTable.balance + ${categoriesCredits}`,
            }
        })
    }

    return NextResponse.json({ message: "Upgraded user plan successfully" })
}