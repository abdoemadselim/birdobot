'use client'

// Libs
import { Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// Components
import Heading from "@/components/heading";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";


export default function PricingPage() {
    const INCLUDED_FEATURES = [
        "10,000 real-time events per month",
        "10 event categories per month",
        "Advanced analytics and insights",
        "Priority support"
    ]

    const router = useRouter()
    const { user } = useUser()

    const { mutate: createCheckoutSession } = useMutation({
        mutationFn: async () => {
            const res = await client.payment.createCheckoutSession.$post()
            return await res.json()
        },
        onSuccess: ({ url }) => {
            if (url) {
                router.push(url)
            }
        }
    })

    const handleCreateCheckout = async () => {
        if (user) {
            createCheckoutSession()
        } else {
            router.push("/sign-in?intent=upgrade")
        }
    }

    return (
        <div className="flex flex-col flex-1 pt-28 bg-brand-25">
            <MaxWidthWrapper className="flex justify-center items-center flex-col">
                <div className="text-center">
                    <p className="text-4xl font-medium">Simple no-tricks pricing</p>
                    <p className="max-w-prose text-pretty text-base/7 pt-4 text-gray-600">
                        We hate subscriptions, and chances are, you do too. That's why we offer lifetime access to BirdoBot for a one-time payment.
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 grid-cols-1 ring-1 ring-inset ring-gray-200 rounded-xl mt-8 max-w-8xl bg-white my-2">
                    <div className="px-10 py-15 lg:col-span-2">
                        <Heading className="pb-4 sm:text-2xl">
                            Lifetime access
                        </Heading>

                        <p className="text-pretty text-gray-600 text-base/7">
                            Invest once in PingPanda and transform how you monitor your SaaS forever.
                            Get instant alerts, track critical metrics and never miss a beat in your business growth.
                        </p>

                        <div className="flex items-center pt-8 gap-2">
                            <p className="text-brand-700 font-medium text-sm min-w-fit">What's included</p>
                            <div className="h-px w-full bg-gray-200" />
                        </div>

                        <ul className="flex flex-wrap gap-x-6 gap-y-4 mt-6">
                            {
                                INCLUDED_FEATURES.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Check className="text-[10px] text-brand-600" />
                                        {feature}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="m-2 bg-gray-100 rounded-xl lg:col-span-1 px-12 flex flex-col items-center justify-center py-6 ring-2 ring-inset ring-gray-100">
                        <p className="font-bold text-gray-700">Pay once, own forever</p>
                        <p className="text-5xl flex items-baseline pt-4">
                            <span className="font-bold">$49</span>
                            <span className="text-sm tracking-wider font-medium">USD</span>
                        </p>
                        <Button className="mt-4 w-full cursor-pointer" onClick={handleCreateCheckout}>
                            Get BirdoBot
                        </Button>
                        <p className="text-[12px] text-muted-foreground text-center pt-6">Secure payment. Start monitoring in minutes.</p>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}
