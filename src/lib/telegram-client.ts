import TelegramBot from 'node-telegram-bot-api';

class TelegramClient {
    bot: TelegramBot;

    constructor() {
        this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN as string)
    }

    pollForStart() {
        let chatId = null;
        this.bot.onText(/\/start(.*)/, async (msg, match) => {
            chatId = msg.chat.id;
        });

        return chatId
    }

    async sendMessage(chatId: number, message: string) {
        await this.bot.sendMessage(chatId, message, {
            parse_mode: 'Markdown'
        })
    }
}

export const telegramBot = new TelegramClient()