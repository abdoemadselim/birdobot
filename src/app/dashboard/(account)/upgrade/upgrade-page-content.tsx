'use client'

// Libs
import { client } from "@/lib/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns";
import { BarChart } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

export default function UpgradePageContent({ plan }: { plan: string }) {
    const router = useRouter()

    const { data: usage, isFetching } = useQuery({
        queryKey: ["usage"],
        queryFn: async () => {
            const res = await client.user.getUserUsage.$get();
            return await res.json()
        }
    })

    const { mutate: createCheckoutSession } = useMutation({
        mutationFn: async () => {
            const res = await client.payment.createCheckoutSession.$post()
            return await res.json()
        },
        onSuccess: ({ url }) => {
            if (url) router.push(url)
        }
    })

    return (
        <div className="py-4">
            <p className="text-xl capitalize">
                Plan: {plan?.toLowerCase()}
            </p>
            <p className="text-muted-foreground pt-2">
                {
                    plan == "FREE" ? "Get access to more events, categories and premium support." :
                        "Thank you for supporting PingPanda. Find your increased usage limits below."
                }
            </p>

            <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-4">
                <div className="rounded-lg border-brand-400 border-2 p-8 mt-6 flex gap-2 flex-col">
                    <div className="flex items-center justify-between w-full">
                        <p>Total Events</p>
                        <BarChart className="size-4 text-gray-500" />
                    </div>

                    <p className="flex flex-col">
                        {
                            isFetching ? <span className="block animate-pulse rounded-sm h-6 w-18 bg-gray-200" /> : (
                                <span className="font-bold text-xl/8">
                                    {usage?.events.usage} of {usage?.events.limit}
                                </span>
                            )
                        }
                        <span className="text-muted-foreground text-sm">Events this period</span>
                    </p>
                </div>
                <div className="rounded-lg ring ring-inset ring-gray-200 bg-white p-8 mt-6 flex gap-2 flex-col">
                    <div className="flex items-center justify-between w-full">
                        <p>Events Categories</p>
                        <BarChart className="size-4 text-gray-500" />
                    </div>

                    <p className="flex flex-col">
                        {
                            isFetching ? <span className="block animate-pulse rounded-sm h-6 w-18 bg-gray-200" /> : (
                                <span className="font-bold text-xl/8">
                                    {usage?.categories.usage} of {usage?.categories.limit}
                                </span>
                            )
                        }
                        <span className="text-muted-foreground text-sm">Active Categories</span>
                    </p>
                </div>
            </div>


            <p className="pt-8 text-muted-foreground">
                <span>Usage will reset</span> {" "}
                {
                    isFetching ? <span className="px-2 inline-block animate-pulse rounded-sm h-6 w-18 bg-gray-200" /> : (
                        formatDate(usage?.resetDate as Date, "MMM d, yyyy")
                    )
                }
                {
                    plan === "FREE" && (
                        <span className="cursor-pointer underline text-brand-500 text-sm" onClick={() => createCheckoutSession()}>{" "} Or upgrade now to increase your limit</span>
                    )
                }
            </p>
        </div>
    )
}
