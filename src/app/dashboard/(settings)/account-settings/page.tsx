// Libs
import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

// Components
import DashboardLayout from "@/components/dashboard-layout";
import AccountSettingsContent from "./account-settings-content";

// Schema
import { userTable } from "@/server/db/schema";

export default async function AccountSettings() {
    const user = await currentUser()

    if (!user) {
        return redirect("/sign-in")
    }

    const dbUser = (await db
        .select()
        .from(userTable)
        .where(eq(userTable.externalId, user.id)))[0]

    if (!dbUser) {
        return redirect("/sign-in")
    }

    return (
        <DashboardLayout title="Account Settings" >
            <AccountSettingsContent discordId={dbUser.discordId} telegramId={dbUser.telegramId} telegramToken={dbUser.telegramToken ?? ""} />
        </DashboardLayout>
    )
}
