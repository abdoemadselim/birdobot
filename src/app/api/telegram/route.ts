import { telegramBot } from "@/lib/telegram-client";
import { NextRequest } from "next/server.js";
import TelegramBot from "node-telegram-bot-api";

export const POST = async (request: NextRequest) => {
    const body = await request.json()

    console.log(body)
    telegramBot.bot.processUpdate(body as TelegramBot.Update)
}