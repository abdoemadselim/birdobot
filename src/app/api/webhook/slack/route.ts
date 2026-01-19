import { db } from "@/server/db/";
import { userTable } from "@/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    const user = await currentUser()

    if (!user) {
        return redirect("/sign-in")
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code")

    if (!code) {
        return redirect("/dashboard/account-settings/?slack_error=missing_code")
    }

    const response = await fetch('https://slack.com/api/oauth.v2.access', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID!,
            code: code!,
            client_secret: process.env.SLACK_TOKEN!
        }),
    });

    const data = await response.json() as { ok: boolean, access_token: string }

    if (!data.ok) {
        console.error(data)
        return redirect("/dashboard/account-settings/?slack_error=slack_error")
    }

    await db.update(userTable).set({
        slackBotToken: data.access_token
    }).where(eq(userTable.externalId, user.id))

    return redirect("/dashboard/account-settings/?slack_linked=true")
}