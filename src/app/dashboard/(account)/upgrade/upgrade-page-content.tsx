'use client'

// Libs
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { BarChart } from "lucide-react";
import Link from "next/link";

export default function UpgradePageContent() {
    const { data: usage = { events: { left: 0, used: 0 }, categories: { left: 0, used: 0 } }, isFetching } = useQuery({
        queryKey: ["usage"],
        queryFn: async () => {
            const res = await client.user.getUserUsage.$get();
            return await res.json()
        }
    })

    return (
        <div className="py-1">
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-4">
                <div className="rounded-lg border-brand-400 border-2 p-8 mt-6 flex gap-2 flex-col">
                    <div className="flex items-center justify-between w-full">
                        <p>Total Events: {usage.events.used}</p>
                        <BarChart className="size-4 text-gray-500" />
                    </div>

                    <p className="flex flex-col">
                        {
                            isFetching ? <span className="block animate-pulse rounded-sm h-6 w-18 bg-gray-200" /> : (
                                <span className="font-bold text-xl/8">
                                    {usage?.events.left} left
                                </span>
                            )
                        }
                    </p>
                </div>
                <div className="rounded-lg ring ring-inset ring-gray-200 bg-white p-8 mt-6 flex gap-2 flex-col">
                    <div className="flex items-center justify-between w-full">
                        <p>Total Categories: {usage.categories.used}</p>
                        <BarChart className="size-4 text-gray-500" />
                    </div>

                    <p className="flex flex-col">
                        {
                            isFetching ? <span className="block animate-pulse rounded-sm h-6 w-18 bg-gray-200" /> : (
                                <span className="font-bold text-xl/8">
                                    {usage?.categories.left} left
                                </span>
                            )
                        }
                    </p>
                </div>
            </div>

            {
                usage?.events.left < 50 ? (
                    <p className="pt-8 text-muted-foreground">
                        <span>You're running out of credits! {" "}</span>
                        <Link href="/pricing" className="text-brand-700 underline">Buy more credits now</Link>
                    </p>
                ) : (
                    <p className="pt-8 text-muted-foreground">
                        <span>Want to buy more credits? {" "}</span>
                        <Link href="/pricing" className="text-brand-700 underline">Check available packages here</Link>
                    </p>
                )
            }

        </div >
    )
}
