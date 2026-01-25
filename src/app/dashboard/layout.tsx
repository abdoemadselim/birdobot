// Libs
import { PropsWithChildren } from "react";
import { telegramBot } from "@/lib/telegram-client";

// Components
import Sidebar, { AppSidebarTrigger } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({ children }: PropsWithChildren) {
    await telegramBot.bot.setWebHook("https://www.birdobot.site/api/webhook/telegram")

    return (
        <SidebarProvider>
            <Sidebar />
            <main className="flex flex-col flex-1 min-h-screen overflow-hidden">
                <AppSidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
