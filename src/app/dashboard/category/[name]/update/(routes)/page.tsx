// Libs
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";

// Components
import UpdateCategoryContent from "../update-category-content";
import DashboardLayout from "@/components/dashboard-layout";

// Schema
import { eventCategoryTable, userTable } from "@/server/db/schema";
import { FIELD_RULES_TYPE } from "@/lib/schemas/category-event.js";

interface UpdateCategoryPageProps {
    name: string | undefined
}

export default async function UpdateCategoryPage({ params }: { params: Promise<UpdateCategoryPageProps> }) {
    const categoryName = (await params).name;

    if (!categoryName) {
        return notFound()
    }

    const clerkUser = await currentUser()

    if (!clerkUser) {
        return notFound()
    }

    const user = (await db.select().from(userTable).where(eq(userTable.externalId, clerkUser.id)))[0]
    if (!user) {
        return notFound()
    }

    const category = (await db
        .select({
            id: eventCategoryTable.id,
            emoji: eventCategoryTable.emoji,
            name: eventCategoryTable.name,
            channels: eventCategoryTable.channels,
            enabled: eventCategoryTable.enabled,
            color: eventCategoryTable.color,
            fieldRules: eventCategoryTable.fieldRules,
            slackId: eventCategoryTable.slackId,
            telegramId: eventCategoryTable.telegramId,
            discordId: eventCategoryTable.discordId
        })
        .from(eventCategoryTable)
        .where(and(eq(eventCategoryTable.name, categoryName), eq(eventCategoryTable.userId, user.id))))[0]

    if (!category) {
        return notFound()
    }

    return (
        <DashboardLayout title={`Update ${category.name} Category ${category.emoji} `}>
            <UpdateCategoryContent
                telegramToken={user.telegramToken || ""}
                defaultChannels={{
                    telegramId: user.telegramId ?? "",
                    discordId: user.discordId ?? "",
                    slackId: user.slackId ?? ""
                }}
                category={category as {
                    id: number,
                    name: string,
                    color: number,
                    emoji: string,
                    channels: ("discord" | "telegram" | "slack")[],
                    fieldRules: FIELD_RULES_TYPE[],
                    slackId: string,
                    telegramId: string,
                    discordId: string,
                }} />
        </DashboardLayout>
    )
}
