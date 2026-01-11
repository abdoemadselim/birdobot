// Libs
import { DiscordClient } from "@/lib/discord-client";
import { db } from "@/server/db";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// Config
import { FREE_QUOTA, PRO_QUOTA } from "@/config";

// Schemas
import { eventCategoryTable, eventTable, quotaTable, userTable } from "@/server/db/schema";
import { EVENT_CATEGORY_NAME_VALIDATOR } from "@/lib/schemas/category-event";

const REQUEST_VALIDATOR = z.object({
    category: EVENT_CATEGORY_NAME_VALIDATOR,
    fields: z.record(z.number().or(z.string()).or(z.boolean())).optional(),
    description: z.string().optional()
}).strict()

export const POST = async (request: NextRequest) => {
    try {
        // 1- VALIDATE API KEY
        // Check the existence api key (Bearer ...)
        const apiKeyHeader = request.headers.get("birdo-api-key")

        if (!apiKeyHeader) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const apiKey = apiKeyHeader?.split(" ")[1]

        if (!apiKey || apiKey?.trim() === "") {
            return NextResponse.json({ message: "Invalid API Key" }, { status: 401 })
        }

        // Check the api of a real user (in database)
        const user = await db
            .select()
            .from(userTable)
            .where(eq(userTable.apiKey, apiKey))

        if (!user || !user.length) {
            return NextResponse.json({ message: "Invalid API Key" }, { status: 401 })
        }

        // 2- VALIDATE DISCORD CHANNEL ID
        if (!user[0]?.discordId) {
            return NextResponse.json({ message: "Please enter your discord ID in your account settings" }, { status: 403 })
        }

        // 3- VALIDATE USER QUOTA LIMIT
        const currentDate = new Date()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()

        let userQuota = (await db
            .select({
                count: quotaTable.count,
            })
            .from(quotaTable)
            .where(
                and(
                    eq(quotaTable.userId, user[0].id),
                    eq(quotaTable.month, month),
                    eq(quotaTable.year, year)
                )
            ))[0]

        if (!userQuota) {
            userQuota = (await db
                .insert(quotaTable)
                .values({
                    count: 1,
                    userId: user[0].id,
                    month: month,
                    year: year
                }).returning({ count: quotaTable.count }))[0]
        }

        const quotaLimit =
            user[0].plan === "FREE" ?
                FREE_QUOTA.maxEventsPerMonth :
                PRO_QUOTA.maxEventsPerMonth

        if (userQuota && userQuota?.count > quotaLimit) {
            return NextResponse.json({ message: "Monthly quota reacted. Please upgrade your plan for more events" }, { status: 429 })
        }


        // 4- VALIDATE BODY DATA
        let requestData = null
        try {
            requestData = await request.json()
        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: "Invalid JSON request data" }, { status: 400 })
        }

        const validatedData = REQUEST_VALIDATOR.parse(requestData)

        // 5- VALIDATE THE PASSED CATEGORY NAME
        const category = (await db.select({
            id: eventCategoryTable.id,
            emoji: eventCategoryTable.emoji,
            name: eventCategoryTable.name,
            color: eventCategoryTable.color
        }).from(eventCategoryTable).where(and(eq(eventCategoryTable.name, validatedData.category), eq(eventCategoryTable.userId, user[0].id))))[0]

        if (!category) {
            return NextResponse.json({ message: `You don't have a category named ${validatedData.category}` }, { status: 400 })
        }

        // 6- CREATED EVENT DB RECORD
        const event = await db.insert(eventTable).values({
            userId: user[0].id,
            eventCategoryId: category.id,
            fields: validatedData.fields,
            name: category.name,
            formattedMessage: `${category.emoji || "🔔"} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
        }).returning({ id: eventTable.id })

        const eventData = {
            title: `${category.emoji || "🔔"} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
            color: category.color,
            fields: Object.entries(validatedData.fields || {}).map((field) => ({
                name: field[0],
                value: String(field[1]),
                inline: true
            })),
            description: validatedData.description || `A new ${category.name} event has occurred`,
            timestamp: new Date().toISOString(),

        }

        // 7- SEND THE EVENT TO THE USER'S DISCORD CHANNEL
        const discordClient = new DiscordClient(process.env.DISCORD_TOKEN as string)

        try {
            await discordClient.sendEmbed(user[0].discordId, eventData)
            await db.update(eventTable).set({
                deliveryStatus: "DELIVERED"
            })

            await db
                .update(quotaTable)
                .set({
                    count: sql`${quotaTable.count} + 1`,
                    userId: user[0].id,
                    month: month,
                    year: year,
                })
        } catch (error) {
            await db.update(eventTable).set({
                deliveryStatus: "FAILED"
            })
            console.error(error)
        }

        return NextResponse.json({
            message: "Event processed successfully",
            eventId: event[0]?.id,
        })
    } catch (error) {
        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.message }, { status: 422 })
        }

        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}