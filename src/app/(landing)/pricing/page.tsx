'use client'

// Libs
import { Check, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// Components
import Heading from "@/components/heading";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export default function PricingPage() {
    const PLANS = [
        {
            features: [
                "100 real-time events per month",
                "3 event categories per month",
            ],
            price: "$0",
            name: "Free",
            className: "bg-transparent text-brand-700 font-bold border-brand-700 border-2 hover:text-white hover:bg-brand-700 transition-colors duration-200"
        },
        {
            features: [
                "1000 real-time events per month",
                "5 event categories per month",
            ],
            price: "$10",
            name: "Core",
            className: "bg-transparent text-brand-700 font-bold border-brand-700 border-2 hover:text-white hover:bg-brand-700 transition-colors duration-200"
        },
        {
            features: [
                "10000 real-time events per month",
                "7 event categories per month",
            ],
            price: "$20",
            name: "Growth",
        },
        {
            features: [
                "100000 real-time events per month",
                "10 event categories per month",
            ],
            price: "$40",
            name: "Premium",
            className: "bg-transparent text-brand-700 font-bold border-brand-700 border-2 hover:text-white hover:bg-brand-700 transition-colors duration-200"
        }
    ]

    const router = useRouter()
    const { user } = useUser()

    const { mutate: createCheckoutSession } = useMutation({
        mutationFn: async (plan: "core" | "premium" | "growth") => {
            const res = await client.payment.createCheckoutSession.$post({ plan })
            return await res.json()
        },
        onSuccess: ({ url }) => {
            if (url) {
                router.push(url)
            }
        }
    })

    const handleCreateCheckout = (plan: "core" | "premium" | "growth") => {
        if (user) {
            createCheckoutSession(plan)
        } else {
            router.push("/sign-in?intent=upgrade")
        }
    }

    return (
        <div className="flex flex-col flex-1 pt-28 bg-brand-25">
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
                            <div className={cn(`px-10 py-15 bg-white rounded-md ring-1 ring-inset ring-gray-100 shadow-sm hover:shadow-md `, plan.name === "Growth" ? "border-t-16 border-orange-400" : "border-t-16 border-brand-700")}>
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

                                <Button className={cn(`mt-12 w-full cursor-pointer text-md`, plan.className)} onClick={() => handleCreateCheckout(plan.name.toLowerCase() as "core" | "growth" | "premium")}>
                                    Get started
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </MaxWidthWrapper >
        </div >
    )
}