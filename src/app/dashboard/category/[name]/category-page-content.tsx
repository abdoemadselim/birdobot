'use client'

// Libs
import { InferSelectModel } from "drizzle-orm";
import { BarChart } from "lucide-react";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

// Components
import CategoryEmptyState from "./category-empty-state";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

// Schema
import { eventCategoryTable } from "@/server/db/schema";
import EventsDataTable from "./events-data-table";

interface CategoryPageContentProps {
    category: Pick<InferSelectModel<typeof eventCategoryTable>, "name" | "id">,
    hasEvents: boolean
}

export default function CategoryPageContent({ category, hasEvents: initialHasEvents }: CategoryPageContentProps) {
    const [activePeriod, setActivePeriod] = useState<"today" | "this month" | "this week">("today")
    const router = useRouter()

    const params = useSearchParams()
    const pageSize = Number(params.get("pageSize") || 30)
    const pageIndex = Number(params.get("pageIndex") || 1)

    const [pagination, setPagination] = useState<{ pageIndex: number, pageSize: number }>({
        pageIndex: pageIndex - 1,
        pageSize
    })

    const { data: hasEvents } = useQuery({
        queryKey: ["category", category.id, "hasEvents"],
        initialData: initialHasEvents
    })

    const { data: categoryData, isFetching: isFetchingCategoryData } = useQuery({
        queryKey: ["category", category.id, "detail", activePeriod],
        queryFn: async () => {
            const res = await client.eventCategory.getCategoryDetails.$get({ categoryId: category.id, period: activePeriod })
            return await res.json()
        },
        enabled: hasEvents,
        refetchOnWindowFocus: false
    })


    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)

        searchParams.set("pageSize", pagination.pageSize.toString())
        searchParams.set("pageIndex", (pagination.pageIndex + 1).toString())

        router.push(`?${searchParams.toString()}`)
    }, [pagination, router])

    if (!hasEvents) {
        return (
            <CategoryEmptyState categoryName={category.name} categoryId={category.id} />
        )
    }

    return (
        <div>
            <Tabs value={activePeriod} onValueChange={(value) => {
                setActivePeriod(value as "today" | "this week" | "this month")
                setPagination((prev) => ({
                    ...prev,
                    pageIndex: 0
                }))
            }}>
                <TabsList className="space-x-1">
                    <TabsTrigger value="today" className={cn("text-zinc-500 hover:bg-white hover:text-gray-700", activePeriod === "today" && "text-gray-700")}>Today</TabsTrigger>
                    <TabsTrigger value="this week" className={cn("text-zinc-500 hover:bg-white hover:text-gray-700", activePeriod === "this week" && "text-gray-700")}>This Week</TabsTrigger>
                    <TabsTrigger value="this month" className={cn("text-zinc-500 hover:bg-white hover:text-gray-700", activePeriod === "this month" && "text-gray-700")}>This Month</TabsTrigger>
                </TabsList>
                <TabsContent value={activePeriod}>
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="rounded-lg border-brand-400 border-2 p-8 mt-6 flex gap-2 flex-col">
                            <div className="flex justify-between items-center pb-1">
                                <p className="font-medium">Total Events</p>
                                <BarChart className="size-4 text-gray-500" />
                            </div>

                            <div>
                                {
                                    isFetchingCategoryData ? <span className="block animate-pulse rounded-sm h-6 w-18 bg-gray-200" /> : (
                                        <p className="font-bold text-3xl">{categoryData?.totalEvents}</p>
                                    )
                                }
                                <p className="text-muted-foreground text-sm">Events today</p>
                            </div>
                        </div>
                        {
                            Object.entries(categoryData?.uniqueFields || {}).map((field) => (
                                <div className="rounded-lg shadow-sm  p-8 mt-6 flex gap-2 flex-col" key={field[0]}>
                                    <div className="flex justify-between items-center pb-1">
                                        <p className="font-medium">{field[0]}</p>
                                        <BarChart className="size-4 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-3xl">{field[1]}</p>
                                        <p className="text-muted-foreground text-sm">today</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </TabsContent>
            </Tabs>
            <div className="pt-12">
                <p className="text-2xl font-medium text-gray-600 mb-2">
                    Events overview
                </p>
                <EventsDataTable activePeriod={activePeriod} categoryId={category.id} hasEvents={hasEvents} pagination={pagination} setPagination={setPagination} />
            </div>
        </div>
    )
}
