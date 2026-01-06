// Libs
import { db } from "@/server/db"
import { userTable } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { Plus } from "lucide-react"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

// Components
import DashboardLayout from "@/components/dashboard-layout"
import CreateCategoryModal from "@/components/create-category-modal"
import { Button } from "@/components/ui/button"

import DashboardPageContent from "./dashboard-page-content"

export default async function DashboardPage() {
    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

    const dbUser = await db.select({
        id: userTable.id
    }).from(userTable).where(eq(userTable.externalId, user.id))

    if (!dbUser) {
        redirect("/sign-in")
    }

    return (
        <DashboardLayout
            hideBackButton={true}
            cta={<CreateCategoryModal trigger={
                <Button
                    className="flex items-center gap-2 cursor-pointer rounded-sm w-full"
                >
                    <Plus className="size-4" />
                    Add Category
                </Button>}
            />} title="Dashboard">
            <DashboardPageContent />
        </DashboardLayout>
    )
}
