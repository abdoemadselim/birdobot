'use client'

// Libs
import { CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { createCheckoutOverlay } from "@/lib/paddle";
import { useEffect, useState } from "react";

// Components
import Heading from "@/components/heading";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading-spinner";

// Config
import { PLANS } from "@/config";

export default function PricingPage() {
    const router = useRouter()
    const { user } = useUser()
    const [showOverlay, setShowOverlay] = useState(false)

    const { data: userInfo, isPending: isPendingUserInfo, isSuccess } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res = await client.user.getUserInfo.$get()
            return res.json()
        },
        refetchOnWindowFocus: false,
    })

    const handleCreateCheckout = async (plan: "free" | "core" | "premium" | "growth") => {
        if (plan === "free" && user) {
            router.push(`/dashboard`)
            return
        }

        if (plan === "free" && !user) {
            router.push(`/sign-in`)
            return
        }

        if (user) {
            const openCheckout = createCheckoutOverlay({
                userId: userInfo?.id!,
                userEmail: userInfo?.email!,
                plan: plan as "core" | "growth" | "premium"
            })

            openCheckout()
        } else {
            router.push(`/sign-in?intent=upgrade&plan=${plan}`)
        }
    }

    const params = useSearchParams()
    const plan = params.get("plan")

    useEffect(() => {
        if (plan && ["core", "growth", "premium"].includes(plan)) {
            setShowOverlay(true)
        }
    }, [])

    useEffect(() => {
        if (!isSuccess) return;
        if (!plan || !["core", "growth", "premium"].includes(plan)) return

        if (!user) router.push(`/sign-in?intent=upgrade&plan=${plan}`)

        const openCheckout = createCheckoutOverlay({
            userId: userInfo?.id!,
            userEmail: userInfo?.email!,
            plan: plan as "core" | "growth" | "premium"
        })

        openCheckout()

    }, [isSuccess])

    return (
        <div className="flex flex-col flex-1 pt-28 bg-brand-25 pb-20">
            {showOverlay &&
                <div className="absolute inset-0 w-full h-full bg-gray-500/50 z-100 flex justify-center items-center" >
                    <LoadingSpinner className="size-8" />
                </div>
            }
            <MaxWidthWrapper className="flex justify-center items-center flex-col max-w-3/4">
                <div className="text-center">
                    <p className="text-4xl font-medium">Simple no-tricks pricing</p>
                    <p className="max-w-prose text-pretty text-base/7 pt-4 text-gray-600">
                        We hate subscriptions, and chances are, you do too. That's why we offer lifetime access to BirdoBot for a one-time payment.
                    </p>
                </div>

                <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-4 mt-6">
                    {
                        PLANS.map((plan) => (
                            <div key={plan.name} className={cn(`px-10 py-15 bg-white rounded-md ring-1 ring-inset ring-gray-100 shadow-sm hover:shadow-md `, plan.name === "Growth" ? "border-t-16 border-orange-400" : "border-t-16 border-brand-700")}>
                                <Heading className="pb-2 sm:text-2xl">
                                    {plan.name}
                                </Heading>
                                <p className="flex items-baseline">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-sm">/month</span>
                                </p>

                                <div className="flex items-center pt-8 gap-2">
                                    <p className="text-brand-700 font-medium text-sm min-w-fit">What's included</p>
                                    <div className="h-px w-full bg-gray-200" />
                                </div>

                                <ul className="flex flex-wrap gap-x-6 gap-y-4 mt-6">
                                    {
                                        plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                                                <CheckCircle className="size-5 text-brand-600" />
                                                {feature}
                                            </li>
                                        ))
                                    }
                                </ul>

                                <Button
                                    className={cn(`mt-12 w-full cursor-pointer text-md`, plan.className)}
                                    onClick={() => handleCreateCheckout(plan.name.toLowerCase() as "core" | "growth" | "premium" | "free")}
                                    disabled={isPendingUserInfo}
                                >
                                    Get started
                                </Button>

                                <p className="text-muted-foreground pt-4 text-center text-sm">One-time purchase</p>
                            </div>
                        ))
                    }
                </div>
            </MaxWidthWrapper >
        </div >
    )
}