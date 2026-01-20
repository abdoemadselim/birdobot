import { initializePaddle } from '@paddle/paddle-js';

export const paddle = await initializePaddle({
    token: process.env.PADDLE_CLIENT_TOKEN!
});

export const createCheckoutSession = async ({
    userEmail,
    userId,
    plan
}: { userEmail: string, userId: number, plan: "core" | "growth" | "premium" }) => {
    const PRICE_PLAN =
        plan === "core" ?
            process.env.CORE_PRODUCT_PRICE_ID :
            plan === "growth" ? process.env.GROWTH_PRODUCT_PRICE_ID : process.env.PREMIUM_PRODUCT_PRICE_ID

    const openCheckout = () => {
        paddle?.Checkout.open({
            items: [{ priceId: PRICE_PLAN!, quantity: 1 }],
        });
    };
}