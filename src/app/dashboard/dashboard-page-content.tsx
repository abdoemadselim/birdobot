'use client'

// Libs
import { client } from "@/lib/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link";
import { useState } from "react";
import { InferSelectModel } from "drizzle-orm";

// Components
import LoadingSpinner from "@/components/loading-spinner";
import Toaster from "@/components/ui/toaser";
import DashboardEmptyState from "./dashboard-empty-state";
import { toast } from "sonner";
import CategoryCard from "@/components/category-card";

export default function DashboardPageContent() {
    const { data: eventCategories, isPending } = useQuery({
        queryKey: ["event-categories"],
        queryFn: async () => {
            const res = await client.eventCategory.getEventCategories.$get()
            const { eventsCategories } = await res.json()
            return eventsCategories
        },
        refetchOnWindowFocus: false
    })

    if (isPending) {
        return (
            <div className="flex flex-1 flex-col justify-center items-center">
                <LoadingSpinner className="size-10" />
            </div>
        )
    }

    if (!eventCategories || eventCategories.length == 0) {
        return (
            <DashboardEmptyState />
        )
    }

    return (
        <section>
            <div className="grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 items-center gap-10">
                {
                    eventCategories?.map((category) => (
                        <CategoryCard category={category} key={category.info.name} />
                    ))
                }
            </div>
        </section>
    )
}
