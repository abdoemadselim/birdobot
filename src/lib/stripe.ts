import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-12-15.clover",
    typescript: true
})

export const createCheckoutSession = async ({
    userEmail,
    userId
}: { userEmail: string, userId: number }) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: process.env.PRO_PRODUCT_PRICE_ID,
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        customer_email: userEmail,
        metadata: {
            userId
        }
    })

    return session
}