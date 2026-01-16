// Libs
import { db } from "@/server/db"
import { userTable } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { Plus } from "lucide-react"
import { createCheckoutSession } from "@/lib/stripe"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

// Components
import DashboardLayout from "@/components/dashboard-layout"
import CreateCategoryModal from "@/components/create-category-modal"
import { Button } from "@/components/ui/button"
import DashboardPageContent from "./dashboard-page-content"
import PaymentSuccessModal from "@/components/payment-success-modal"

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

    const dbUser = (await db.select({
        id: userTable.id,
        email: userTable.email
    }).from(userTable).where(eq(userTable.externalId, user.id)))[0]

    if (!dbUser) {
        redirect("/sign-in")
    }

    const intent = (await searchParams).intent

    if (intent && intent === "upgrade") {
        const session = await createCheckoutSession({
            userEmail: dbUser.email,
            userId: dbUser.id
        })

        if (session.url) {
            redirect(session.url)
        }
    }

    const success = (await searchParams).success

    return (
        <>
            {
                success && <PaymentSuccessModal />
            }
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
        </>
    )
}
