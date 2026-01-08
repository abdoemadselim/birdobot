// Libs
import { and, eq, sql } from "drizzle-orm";
import { eventCategoryTable, eventTable, userTable } from "@/server/db/schema";
import { j, privateProcedure } from "../jstack";
import z from "zod";

// Utils
import { _success } from "zod/v4/core";

export const eventRouter = j.router({
    pullEvents: privateProcedure.input(z.object({ id: z.number() })).query(async ({ c, ctx, input }) => {
        const { user, db } = ctx;
        const { id: categoryId } = input;

        const hasEvents = await db
            .$count(eventTable, and(eq(eventTable.eventCategoryId, categoryId), eq(eventTable.userId, user?.id!))) > 0

        return c.superjson({ success: true, hasEvents })
    })
})