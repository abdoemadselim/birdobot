import { j, privateProcedure } from "../jstack";
import { eventCategoryTable, eventTable, userCreditsTable, userTable } from "../db/schema";
import { and, eq } from "drizzle-orm";

import * as z from "zod"

export const userRouter = j.router({
    getUserUsage: privateProcedure.query(async ({ ctx, c }) => {
        const { db, user } = ctx

        const totalEventsQuery = db.$count(eventTable, eq(eventTable.userId, user.id))

        const totalCategoriesQuery = db.$count(eventCategoryTable, eq(eventCategoryTable.userId, user.id))

        const eventsCreditsLeftQuery = db.select({ balance: userCreditsTable.balance }).from(userCreditsTable).where(
            and(
                eq(userCreditsTable.userId, user.id),
                eq(userCreditsTable.featureKey, "EVENTS")
            ));

        const categoriesCreditsLeftQuery = db.select({
            balance: userCreditsTable.balance
        }).from(userCreditsTable).where(
            and(
                eq(userCreditsTable.userId, user.id),
                eq(userCreditsTable.featureKey, "EVENTS_CATEGORIES"),
            ));

        const [eventsCreditsLeft, categoriesCreditsLeft, totalEvents, totalCategories] = await Promise.all([eventsCreditsLeftQuery, categoriesCreditsLeftQuery, totalEventsQuery, totalCategoriesQuery])

        return c.json({
            events: { left: eventsCreditsLeft[0]?.balance || 0, used: totalEvents },
            categories: { left: categoriesCreditsLeft[0]?.balance || 0, used: totalCategories },
        })
    }),

    updateDiscordId: privateProcedure.input(z.object({ discordId: z.string().min(1).max(40) })).mutation(async ({ ctx, c, input }) => {
        const { db, user } = ctx;
        const { discordId } = input

        await db.update(userTable).set({
            discordId: discordId
        }).where(eq(userTable.id, user.id))

        return c.json({ success: true })
    }),

    updateTelegramId: privateProcedure.input(z.object({ telegramId: z.string().min(1).max(40) })).mutation(async ({ ctx, c, input }) => {
        const { db, user } = ctx;
        const { telegramId } = input

        await db.update(userTable).set({
            telegramId: telegramId
        }).where(eq(userTable.id, user.id))

        return c.json({ success: true })
    }),

    updateSlackId: privateProcedure.input(z.object({ slackId: z.string().min(1).max(40) })).mutation(async ({ ctx, c, input }) => {
        const { db, user } = ctx;
        const { slackId } = input

        await db.update(userTable).set({
            slackId: slackId
        }).where(eq(userTable.id, user.id))

        return c.json({ success: true })
    })
})
