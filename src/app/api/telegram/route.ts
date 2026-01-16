import { db } from "@/server/db";
import { userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json() as { message: TelegramBot.Message, chat: TelegramBot.Chat }

        //1- Check Token From The Body
        const messageText = body.message.text
        if (!messageText || !messageText.startsWith("/start")) return NextResponse.json({ message: "invalid token" }, { status: 401 })

        const token = messageText.split(" ")[1];

        if (!token) {
            return NextResponse.json({ message: "invalid token" }, { status: 401 })
        }

        const user = (await db.select({ id: userTable.id }).from(userTable).where(eq(userTable.telegramToken, token)))[0]

        if (!user || !body.message.chat?.id) {
            return NextResponse.json({ message: "invalid token" }, { status: 401 })
        }

        //3- Store the user telegram channel id in db
        await db
            .update(userTable)
            .set({
                telegramId: body.chat.id
            }).where(eq(userTable.id, user.id))

        return NextResponse.json({ message: "User telegram channel has been set" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: "Internal server error" }, { status: 500 })
    }
}