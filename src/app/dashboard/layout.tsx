// Libs
import { PropsWithChildren } from "react";

// Components
import Sidebar, { AppSidebarTrigger } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import TelegramBot from "node-telegram-bot-api";
import { telegramBot } from "@/lib/telegram-client";

export default function DashboardLayout({ children }: PropsWithChildren) {
    telegramBot.bot.setWebHook("https://ring-rang.vercel.app/api/telegram")

    // bot.on("message", (msg) => {
    //     console.log(msg.chat.id)
    // })

    return (
        <SidebarProvider>
            <Sidebar />
            <main className="flex flex-col flex-1">
                <AppSidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
