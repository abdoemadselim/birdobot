// Libs
import { PropsWithChildren } from "react";
import { telegramBot } from "@/lib/telegram-client";

// Components
import Sidebar, { AppSidebarTrigger } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({ children }: PropsWithChildren) {
    // await telegramBot.bot.setWebHook("https://pleasedly-kempt-mikki.ngrok-free.dev/api/webhook/telegram")

    return (
        <SidebarProvider>
            <Sidebar />
            <main className="flex flex-col flex-1 h-screen">
                <AppSidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
