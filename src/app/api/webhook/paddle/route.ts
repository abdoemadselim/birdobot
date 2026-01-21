import { CORE_QUOTA, GROWTH_QUOTA, PREMIUM_QUOTA } from "@/config";
import { db } from "@/server/db/";
import { paymentTable, userCreditsTable, userTable } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Paddle, TransactionCompletedEvent } from '@paddle/paddle-node-sdk'

const paddle = new Paddle(process.env.PADDLE_API_KEY || "")

export const POST = async (request: NextRequest) => {
    const body = await request.text()

    const paddleSignature = request.headers.get("paddle-signature") || ""

    if (!paddleSignature) {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 })
    }

    // Verify signature
    const webhookPublicKey = process.env.PADDLE_TRANSACTION_COMPLETE_WEBHOOK_SECRET || ""
    const eventData = (await paddle.webhooks.unmarshal(body, webhookPublicKey, paddleSignature)) as TransactionCompletedEvent

    const { data } = eventData

    if (!data.customData || !data.customData.userEmail) {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 })
    }

    // Check the transaction plan/package
    const plan = data.items[0]?.price?.customData?.plan || "free"
    if (plan === "free") {
        return NextResponse.json({ message: "Upgraded user plan successfully" })
    }

    const dbUser = (await db.select().from(userTable).where(eq(userTable.email, data.customData.userEmail)))[0]

    if (!dbUser) {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 })
    }

    // Update user credits
    const eventCredits = plan === "core" ? CORE_QUOTA.maxEventsPerMonth : plan === "growth" ? GROWTH_QUOTA.maxEventsPerMonth : PREMIUM_QUOTA.maxEventsPerMonth
    const categoriesCredits = plan === "core" ? CORE_QUOTA.maxEventsCategories : plan === "growth" ? GROWTH_QUOTA.maxEventsCategories : PREMIUM_QUOTA.maxEventsCategories

    await db.insert(userCreditsTable).values({
        balance: eventCredits,
        featureKey: 'EVENTS',
        userId: dbUser.id
    }).onConflictDoUpdate({
        target: [userCreditsTable.userId, userCreditsTable.featureKey],
        set: {
            balance: sql`${userCreditsTable.balance} + ${eventCredits}`,
        }
    })

    await db.insert(userCreditsTable).values({
        balance: categoriesCredits,
        featureKey: 'EVENTS_CATEGORIES',
        userId: dbUser.id
    }).onConflictDoUpdate({
        target: [userCreditsTable.userId, userCreditsTable.featureKey],
        set: {
            balance: sql`${userCreditsTable.balance} + ${categoriesCredits}`,
        }
    })

    // Create the payment record (for Refund, and payments page)
    await db.insert(paymentTable).values({
        transactionId: data.id,
        userId: dbUser.id,
        total: Number(data.details?.totals?.total),
        status: "COMPLETED",
        package: plan
    })

    return NextResponse.json({ message: "Upgraded user plan successfully" })
}