// Libs
import { PropsWithChildren } from "react";

// Components
import Sidebar, { AppSidebarTrigger } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
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
