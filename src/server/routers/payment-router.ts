// Libs
import { eq } from "drizzle-orm";
import { paymentTable } from "@/server/db/schema";
import { j, privateProcedure } from "../jstack";
import z from "zod";

// Utils
import { _success } from "zod/v4/core";

export const paymentRouter = j.router({
    getPayments: privateProcedure.query(async ({ c, ctx }) => {
        const { user, db } = ctx;

        const payments = await db.select().from(paymentTable).where(eq(paymentTable.userId, user.id))

        return c.superjson(payments)
    }),
})
