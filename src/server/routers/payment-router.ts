import { createCheckoutSession } from "@/lib/stripe";
import { j, privateProcedure } from "../jstack"

export const paymentRouter = j.router({
    createCheckoutSession: privateProcedure.mutation(async ({ ctx, c }) => {
        const { user, db } = ctx;

        if (user.plan !== "FREE") {
            return c.json({ url: "" })
        }

        const session = await createCheckoutSession({
            userEmail: user.email,
            userId: user.id
        })

        return c.json({ url: session.url })
    })
})