import { createCheckoutSession } from "@/lib/stripe";
import { j, privateProcedure } from "../jstack"
import z from "zod";

export const paymentRouter = j.router({
    createCheckoutSession: privateProcedure.input(z.object({ plan: z.enum(["core", "growth", "premium"]) })).mutation(async ({ ctx, c, input }) => {
        const { user, db } = ctx;
        const { plan } = input

        const session = await createCheckoutSession({
            userEmail: user.email,
            userId: user.id,
            plan
        })

        return c.json({ url: session.url })
    })
})