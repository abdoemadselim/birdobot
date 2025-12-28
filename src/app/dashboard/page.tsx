// Libs
import { db } from "@/server/db"
import { userTable } from "@/server/db/schema"
import { eq } from "drizzle-orm"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

// Components
import DashboardLayout from "@/components/dashboard-layout"
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
        <DashboardLayout title="Dashboard">
            <DashboardPageContent />
        </DashboardLayout>
    )
}
