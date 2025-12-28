'use client'

import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"

export default function DashboardPageContent() {
    const { data, isPending } = useQuery({
        queryKey: ["event-categories"],
        queryFn: async () => {
            const res = await client.eventCategory.getEventCategories.$get()
            const data = await res.json()

            return data
        }
    })

    console.log(data)
    return (
        <div>dashboard-page-content</div>
    )
}
