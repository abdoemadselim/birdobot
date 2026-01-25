import { db } from "@/server/db";
import { userCreditsTable, userTable } from "@/server/db/schema";
import { verifyWebhook } from "@clerk/backend/webhooks";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const evt = await verifyWebhook(request, {
            signingSecret: process.env.CLERK_USER_SYNC_WEBHOOK_SIGNATURE
        });

        const eventType = evt.type;

        switch (eventType) {
            case "user.created":
                console.log(evt.data)
                const newUser = (await db.insert(userTable).values({
                    externalId: evt.data.id,
                    email: evt.data.email_addresses[0]?.email_address!
                }).returning({
                    id: userTable.id
                }))[0]

                await db.insert(userCreditsTable).values({
                    featureKey: "EVENTS",
                    balance: 100,
                    userId: newUser?.id
                })

                await db.insert(userCreditsTable).values({
                    featureKey: "EVENTS_CATEGORIES",
                    balance: 3,
                    userId: newUser?.id
                })
                break;
            case "user.deleted":
                await db.delete(userTable).where(eq(userTable.externalId, evt.data.id!))
                break;
            case "user.updated":
                await db.update(userTable).set({
                    email: evt.data.email_addresses[0]?.email_address
                }).where(eq(userTable.externalId, evt.data.id))
                break;
        }

        return new Response("Success", { status: 200 });
    } catch (err) {
        console.error("Webhook verification failed:", err);
        return NextResponse.json("Webhook verification failed", { status: 400 });
    }
}