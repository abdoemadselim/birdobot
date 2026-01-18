// Libs
import { PropsWithChildren } from "react";
import { telegramBot } from "@/lib/telegram-client";

// Components
import Sidebar, { AppSidebarTrigger } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
    // telegramBot.bot.setWebHook("https://ring-rang.vercel.app/api/telegram", {
    //     allowed_updates: ["message", "callback_query", "update"]
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
