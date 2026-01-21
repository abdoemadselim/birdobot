import { initializePaddle } from '@paddle/paddle-js';

const paddle = await initializePaddle({
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    environment: 'production'
});

export const createCheckoutOverlay = ({
    userEmail,
    plan
}: { userEmail: string, plan: "core" | "growth" | "premium" }) => {
    const PRICE_PLAN =
        plan === "core" ?
            process.env.NEXT_PUBLIC_CORE_PRODUCT_PRICE_ID :
            plan === "growth" ? process.env.NEXT_PUBLIC_GROWTH_PRODUCT_PRICE_ID : process.env.NEXT_PUBLIC_PREMIUM_PRODUCT_PRICE_ID

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
                userEmail
            }
        });
    }

    return openCheckout
};