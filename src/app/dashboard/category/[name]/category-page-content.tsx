'use client'

import { InferSelectModel } from "drizzle-orm";
import CategoryEmptyState from "./category-empty-state";

// Schema
import { eventCategoryTable, eventTable, userTable } from "@/server/db/schema";
import { useQuery } from "@tanstack/react-query";

interface CategoryPageContentProps {
    category: Pick<InferSelectModel<typeof eventCategoryTable>, "name" | "id">,
    hasEvents: boolean
}

export default function CategoryPageContent({ category, hasEvents: initialHasEvents }: CategoryPageContentProps) {
    const { data: events } = useQuery({
        queryKey: [category.name, "hasEvents"],
        initialData: { hasEvents: initialHasEvents }
    })

    if (!initialHasEvents) {
        return (
            <CategoryEmptyState categoryName={category.name} categoryId={category.id} />
        )
    }

    return <h1>Hello world</h1>

}
