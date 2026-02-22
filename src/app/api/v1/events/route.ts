// Libs
import { db } from "@/server/db";
import { and, eq, gte, InferSelectModel, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { escapeMarkdownV2 } from "@/lib/utils";
// DB
import { eventCategoryTable, eventTable, userCreditsTable, userTable } from "@/server/db/schema";

// Schemas
import { EVENT_CATEGORY_NAME_VALIDATOR, FIELD_RULES_TYPE } from "@/lib/schemas/category-event";
import { evaluateFieldRule } from "@/lib/field-rules-validator";

import { inngest } from "@/inngest/client";

const REQUEST_VALIDATOR = z.object({
    category: EVENT_CATEGORY_NAME_VALIDATOR,
    fields: z.record(z.number().or(z.string()).or(z.boolean())).optional(),
    description: z.string().optional()
}).strict()


type RequestDataType = z.infer<typeof REQUEST_VALIDATOR>

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

        // 2- Check the api of a real user (in database)
        const user = (await db
            .select()
            .from(userTable)
            .where(eq(userTable.apiKey, apiKey)))[0]

        if (!user) {
            return NextResponse.json({ message: "Invalid API Key" }, { status: 401 })
        }

        // 3- VALIDATE USER CREDITS
        const eventsCreditsLeft = (await db.select({ balance: userCreditsTable.balance }).from(userCreditsTable).where(
            and(
                eq(userCreditsTable.userId, user.id),
                eq(userCreditsTable.featureKey, "EVENTS")
            )))[0]


        if (!eventsCreditsLeft?.balance || eventsCreditsLeft.balance <= 0) {
            return NextResponse.json({ message: "You're out of credits. Please buy some credits for more events" }, { status: 429 })
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
            color: eventCategoryTable.color,
            channels: eventCategoryTable.channels,
            fieldRules: eventCategoryTable.fieldRules,
            telegramId: eventCategoryTable.telegramId,
            slackId: eventCategoryTable.slackId,
            slackBotToken: eventCategoryTable.slackBotToken,
            discordId: eventCategoryTable.discordId,
        }).from(eventCategoryTable).where(and(eq(eventCategoryTable.name, validatedData.category), eq(eventCategoryTable.userId, user.id))))[0]

        // 6- Evaluate the fields against category rules
        if (validatedData.fields && !evaluateFieldRule(category?.fieldRules as FIELD_RULES_TYPE[] | undefined, validatedData.fields)) {
            return NextResponse.json({ message: "" }, { status: 400 })
        }

        if (!category) {
            return NextResponse.json({ message: `You don't have a category named ${validatedData.category}` }, { status: 400 })
        }

        // 7-CREATED EVENT DB RECORD
        const event = await db.insert(eventTable).values({
            userId: user.id,
            eventCategoryId: category.id,
            fields: validatedData.fields,
            name: category.name,
            formattedMessage: `${category.emoji || "🔔"} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
        }).returning({ id: eventTable.id });

        // 8- Send the event to each defined channel on its category
        category.channels.forEach(async (channel: "discord" | "telegram" | "slack" | "email" | "whatsapp") => {
            return await sendChannel({
                channel,
                category,
                user,
                data: {
                    eventId: event[0]?.id as number,
                    ...validatedData
                }
            })
        })

        // 9- Update user credits
        await db
            .update(userCreditsTable)
            .set({
                featureKey: "EVENTS",
                balance: sql`${userCreditsTable.balance} - 1`,
            }).where(and(eq(userCreditsTable.userId, user.id), eq(userCreditsTable.featureKey, "EVENTS"), gte(userCreditsTable.balance, 0)))

        await db.update(eventTable).set({
            deliveryStatus: "DELIVERED"
        }).where(eq(eventTable.id, event[0]?.id as number))

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

interface SendChannelParams {
    user: InferSelectModel<typeof userTable>,
    category: Pick<InferSelectModel<typeof eventCategoryTable>, "id" | "emoji" | "name" | "color" | "channels" | "discordId" | "slackId" | "telegramId" | "slackBotToken">,
    data: RequestDataType & { eventId: number }
}

async function sendChannel({
    channel,
    user,
    category,
    data
}: SendChannelParams & { channel: "discord" | "slack" | "telegram" | "email" | "whatsapp" }) {
    switch (channel) {
        case "discord":
            sendDiscord({ user, category, data })
            break;
        case "telegram":
            sendTelegram({ user, category, data })
            break
        case "slack":
            sendSlack({ user, category, data })
            break
    }
}

async function sendDiscord({
    user,
    category,
    data
}: SendChannelParams) {
    if (!user.discordId && !category.discordId) {
        await db.update(eventTable).set({
            deliveryStatus: "FAILED"
        })

        return
    }

    const eventData = {
        title: `${category.emoji || "🔔"} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
        color: category.color,
        fields: Object.entries(data.fields || {}).map((field) => ({
            name: field[0],
            value: String(field[1]),
            inline: true
        })),
        description: data.description || `A new ${category.name} event has occurred`,
        timestamp: new Date().toISOString(),
    }

    try {
        const discordId = category.discordId || user.discordId

        await inngest.send({
            name: "event/send.discord",
            data: {
                discordId,
                eventData
            },
        });

    } catch (error) {
        await db.update(eventTable).set({
            deliveryStatus: "FAILED"
        }).where(eq(eventTable.id, data.eventId as number))

        console.error(error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

async function sendTelegram({ user, category, data }: SendChannelParams) {
    if (!user.telegramId && !category.telegramId) {
        await db.update(eventTable).set({
            deliveryStatus: "FAILED"
        }).where(eq(eventTable.id, data.eventId as number))

        return;
    }

    const titleText = `${category.emoji || "🔔"} ${category.name.toUpperCase()}`;

    const description =
        data.description ||
        `A new ${category.name} event has occurred`;

    const fieldsText = Object.entries(data.fields || {})
        .map(([key, value]) =>
            `▸ *${escapeMarkdownV2(key)}*: ${escapeMarkdownV2(String(value))}`
        )
        .join("\n");

    const divider = escapeMarkdownV2("━━━━━━━━━━━━━━━━━━");

    const message = `
${divider}
*${escapeMarkdownV2(titleText)}*
${divider}

_${escapeMarkdownV2(description)}_

${fieldsText}

🕒 ${escapeMarkdownV2(new Date().toLocaleString())}
`.trim();

    const telegramId = category.telegramId || user.telegramId

    try {
        const response = await inngest.send({
            name: "event/send.telegram",
            data: {
                telegramId,
                message
            },
        })
        console.log(response)
    } catch (error) {
        await db.update(eventTable).set({
            deliveryStatus: "FAILED"
        }).where(eq(eventTable.id, data.eventId as number))

        console.error(error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

async function sendSlack({ user, category, data }: SendChannelParams) {
    if ((!category.slackBotToken || !category.slackId) && (!user.slackBotToken || !user.slackId)) {
        await db.update(eventTable).set({
            deliveryStatus: "FAILED"
        }).where(eq(eventTable.id, data?.eventId as number))

        return;
    }

    const eventData = {
        title: `${category.emoji || "🔔"} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
        color: `#${category.color.toString(16)}`,
        fields: Object.entries(data.fields || {}).map((field) => ({
            name: field[0],
            value: String(field[1]),
            inline: true
        })),
        description: data.description || `A new ${category.name} event has occurred`,
        timestamp: new Date().toLocaleString(),
    }

    try {
        const slackBotToken = category.slackBotToken || user.slackBotToken;
        const slackId = category.slackId || user.slackId

        await inngest.send({
            name: "event/send.slack",
            data: {
                slackId,
                slackBotToken,
                eventData
            },
        })
    } catch (error) {
        await db.update(eventTable).set({
            deliveryStatus: "FAILED"
        }).where(eq(eventTable.id, data.eventId as number))

        console.error(error);
    }
}