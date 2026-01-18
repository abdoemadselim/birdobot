// Libs
import { and, eq, gt, sql } from "drizzle-orm";
import { eventCategoryTable, eventTable, userTable } from "@/server/db/schema";
import { j, privateProcedure } from "../jstack";
import z from "zod";

// Utils
import { _success } from "zod/v4/core";
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";

export const eventRouter = j.router({
    pullEvents: privateProcedure.input(z.object({ id: z.number() })).query(async ({ c, ctx, input }) => {
        const { user, db } = ctx;
        const { id: categoryId } = input;

        const hasEvents = await db
            .$count(eventTable, and(eq(eventTable.eventCategoryId, categoryId), eq(eventTable.userId, user?.id!))) > 0

        return c.json(hasEvents)
    }),

    getCategoryEvents: privateProcedure.input(
        z.object({
            categoryId: z.number(),
            period: z.enum(["today", "this week", "this month"]),
            pageSize: z.number().max(50),
            pageIndex: z.number()
        })).query(async ({ c, ctx, input }) => {
            const { user, db } = ctx;
            const { categoryId, period, pageSize, pageIndex } = input;

            const date = new Date()
            let startDate = startOfDay(date)

            switch (period) {
                case "this month":
                    startDate = startOfMonth(date)
                    break
                case "this week":
                    startDate = startOfWeek(date)
                    break
            }

            const eventsCount = await db.$count(eventTable, and(eq(eventTable.eventCategoryId, categoryId), eq(eventTable.userId, user.id), gt(eventTable.createdAt, startDate)))

            const events = await db.select({
                name: eventTable.name,
                deliveryStatus: eventTable.deliveryStatus,
                createdAt: eventTable.createdAt
            }).from(eventTable).where(and(eq(eventTable.eventCategoryId, categoryId), eq(eventTable.userId, user.id), gt(eventTable.createdAt, startDate))).limit(pageSize).offset(pageSize * (pageIndex - 1))

            return c.superjson({ events: events, eventsCount })
        })
})
