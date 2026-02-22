'use client'

// Libs
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"

// Components
import LoadingSpinner from "@/components/loading-spinner";
import DashboardEmptyState from "./dashboard-empty-state";
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
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 items-center gap-10" data-testid="event-categories-list">
                {
                    eventCategories?.map((category) => (
                        <CategoryCard category={category} key={category.info.name} />
                    ))
                }
            </div>
        </section>
    )
}
