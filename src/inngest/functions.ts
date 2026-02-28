import { inngest } from "./client";
import { db } from "@/server/db";
import { eventTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

// Channels Clients
import { DiscordClient } from "@/lib/discord-client";
import { telegramBot } from "@/lib/telegram-client";
import { SlackClient } from "@/lib/slack-client";

const discordClient = new DiscordClient(process.env.DISCORD_TOKEN as string)

export const sendEventDiscord = inngest.createFunction(
    {
        id: "send-event-discord",
        throttle: {
            limit: 20,
            period: "1s",
            burst: 5,
            key: "event.data.discordId",
        },
        retries: 3,
        timeouts: {
            finish: "30s",
        },
    },
    { event: "event/send.discord" },
    async ({ event, step }) => {
        return step.run("send-event-message", async () => {
            try {
                const { discordId, eventData } = event.data as { discordId: string, eventData: any }
                return await discordClient.sendEmbed(discordId, eventData)
            } catch (error) {
                await db.update(eventTable).set({
                    deliveryStatus: "FAILED"
                }).where(eq(eventTable.id, event.data.eventId as number))

                throw error
            }
        })
    },
);

export const sendEventSlack = inngest.createFunction(
    {
        id: "send-event-slack",
        throttle: {
            limit: 10,
            period: "1s",
            burst: 3,
            key: "event.data.slackId",
        },
        retries: 3,
        timeouts: {
            finish: "30s",
        },
    },
    { event: "event/send.slack" },
    async ({ event, step }) => {
        return step.run("send-event-message", async () => {
            try {
                const slackClient = new SlackClient(event.data.slackBotToken as string);
                return await slackClient.sendEmbed(event.data.slackId as string, event.data.eventData);
            } catch (error) {
                await db.update(eventTable).set({
                    deliveryStatus: "FAILED"
                }).where(eq(eventTable.id, event.data.eventId as number))

                throw error
            }
        })
    },
);

export const sendEventTelegram = inngest.createFunction(
    {
        id: "send-event-telegram",
        throttle: {
            limit: 20,
            period: "1s",
            burst: 5,
            key: "event.data.telegramId",
        },
        retries: 3,
        timeouts: {
            finish: "30s",
        },
    },
    { event: "event/send.telegram" },
    async ({ event, step }) => {
        return step.run("send-event-message", async () => {
            try {
                return await telegramBot.sendMessage(event.data.telegramId as string, event.data.message)
            } catch (error) {
                await db.update(eventTable).set({
                    deliveryStatus: "FAILED"
                }).where(eq(eventTable.id, event.data.eventId as number))

                throw error
            }
        })

    },
);

