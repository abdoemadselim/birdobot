import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-12-15.clover",
    typescript: true
})

export const createCheckoutSession = async ({
    userEmail,
    userId,
    plan
}: { userEmail: string, userId: number, plan: "core" | "growth" | "premium" }) => {
    const PRICE_PLAN =
        plan === "core" ?
            process.env.CORE_PRODUCT_PRICE_ID :
            plan === "growth" ? process.env.GROWTH_PRODUCT_PRICE_ID : process.env.PREMIUM_PRODUCT_PRICE_ID


    console.log(PRICE_PLAN)
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: PRICE_PLAN,
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        customer_email: userEmail,
        metadata: {
            userId,
            plan: plan
        }
    })

    return session
}