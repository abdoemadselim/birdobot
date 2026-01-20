import { initializePaddle } from '@paddle/paddle-js';

const paddle = await initializePaddle({
    token: process.env.NEXT_PUBLIC_PADDLE_SANDBOX_CLIENT_TOKEN!,
    environment: 'sandbox'
});

export const createCheckoutOverlay = ({
    userId,
    userEmail,
    plan
}: { userId: number, userEmail: string, plan: "core" | "growth" | "premium" }) => {
    const PRICE_PLAN =
        plan === "core" ?
            process.env.NEXT_PUBLIC_CORE_PRODUCT_PRICE_ID_SANDBOX :
            plan === "growth" ? process.env.NEXT_PUBLIC_GROWTH_PRODUCT_PRICE_ID_SANDBOX : process.env.NEXT_PUBLIC_PREMIUM_PRODUCT_PRICE_ID_SANDBOX

    const openCheckout = () => {
        paddle?.Checkout.open({
            settings: {
                variant: "one-page",
                successUrl: "https://pleasedly-kempt-mikki.ngrok-free.dev/dashboard?success=true",
            },
            items: [
                {
                    priceId: PRICE_PLAN!,
                    quantity: 1
                }
            ],
            customer: {
                email: userEmail
            },
            customData: {
                userId: userId
            }
        });
    }

    return openCheckout
};