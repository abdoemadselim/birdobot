import { addMonths, startOfMonth } from "date-fns";
import { j, privateProcedure } from "../jstack";
import { eventCategoryTable, quotaTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { FREE_QUOTA, PRO_QUOTA } from "@/config";

export const userRouter = j.router({
    getUserUsage: privateProcedure.query(async ({ ctx, c }) => {
        const { db, user } = ctx

        const date = new Date()
        const currentDate = startOfMonth(date)

        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1

        const eventsUsed = (await
            db.select().from(quotaTable).where(
                and(
                    eq(quotaTable.year, year),
                    eq(quotaTable.month, month),
                    eq(quotaTable.userId, user.id)
                )))[0]
        const eventsLimit = user.plan === "FREE" ? FREE_QUOTA.maxEventsPerMonth : PRO_QUOTA.maxEventsPerMonth

        const categoriesCreated = await db.$count(eventCategoryTable, and(eq(eventCategoryTable.userId, user.id)))
        const categoriesLimit = user.plan === "FREE" ? FREE_QUOTA.maxEventCategories : PRO_QUOTA.maxEventsCategories

        const resetDate = addMonths(date, month)

        return c.superjson({
            events: { usage: eventsUsed?.count || 0, limit: eventsLimit },
            categories: { usage: categoriesCreated, limit: categoriesLimit },
            resetDate: resetDate
        })
    })
})
