// LIbs
import { db } from "@/server/db/index";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

// Component
import DashboardLayout from "@/components/dashboard-layout"
import CategoryPageContent from "../category-page-content";

// Schema
import { eventCategoryTable, eventTable, userTable } from "@/server/db/schema";

interface CategoryEventPageProps {
    name: string | undefined
}

export default async function CategoryEventPage({ params }: { params: Promise<CategoryEventPageProps> }) {
    const categoryName = (await params).name;

    if (!categoryName) {
        return notFound()
    }

    const clerkUser = await currentUser()

    if (!clerkUser) {
        return notFound()
    }

    const user = (await db.select({ id: userTable.id }).from(userTable).where(eq(userTable.externalId, clerkUser.id)))[0]
    if (!user) {
        return notFound()
    }

    const category = (await db
        .select({
            id: eventCategoryTable.id,
            emoji: eventCategoryTable.emoji,
            name: eventCategoryTable.name
        })
        .from(eventCategoryTable)
        .where(and(eq(eventCategoryTable.name, categoryName), eq(eventCategoryTable.userId, user.id))))[0]

    if (!category) {
        return notFound()
    }

    const eventsCount = await db.$count(eventTable, eq(eventTable.eventCategoryId, category.id)) > 0

    return (
        <DashboardLayout title={`${category.emoji} ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} events`} >
            <CategoryPageContent category={category} hasEvents={eventsCount} />
        </DashboardLayout>
    )
}
