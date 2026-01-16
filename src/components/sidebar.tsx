'use client'

// Libs
import { Gem, Home, Key, LucideIcon, Menu, Settings } from "lucide-react"
import Link from "next/link.js"
import { UserButton } from "@clerk/nextjs"

// Components
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

interface SIDEBAR_ITEM {
    text: string,
    href: string,
    icon: LucideIcon
}

interface SIDEBAR_CROUP {
    group: string,
    items: SIDEBAR_ITEM[]
}

const SIDEBAR_GROUPS: SIDEBAR_CROUP[] = [
    {
        group: "Overview",
        items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
    },
    {
        group: "Account",
        items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
    },
    {
        group: "Settings",
        items: [
            { href: "/dashboard/api-key", icon: Key, text: "API Key" },
            {
                href: "/dashboard/account-settings",
                icon: Settings,
                text: "Account Settings",
            },
        ]
    }
]

export default function AppSidebar() {
    return (
        <Sidebar >
            <SidebarHeader className="p-6">
                <p className="font-semibold">
                    Birdo
                    <span className="text-brand-700">Bot</span>
                </p>
            </SidebarHeader>
            <SidebarContent className="p-2">
                {
                    SIDEBAR_GROUPS.map(({ group, items }) => (
                        <SidebarGroup className="pb-3" key={group}>
                            <SidebarGroupLabel className="text-zinc-500">{group}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.text} className="hover:bg-gray-50 group/item transition">
                                            <SidebarMenuButton asChild>
                                                <Link href={item.href}>
                                                    <item.icon className="text-zinc-500 group-hover/item:text-zinc-700 size-4" />
                                                    <span className="text-sm font-medium text-zinc-700">{item.text}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))
                }

            </SidebarContent>
            <SidebarFooter className="pb-8 px-0">
                <hr className="my-2 bg-gray-100 w-full" />
                <UserButton
                    appearance={{
                        elements: {
                            rootBox: "min-h-full! w-full! ",
                            userButtonTrigger: "flex-row-reverse w-full! focus:border-0! focus:outline-0 focus:shadow-none!",
                            userButtonBox: "flex-row-reverse! px-8 h-full w-full mr-auto justify-end!",
                            avatarBox: "w-[1.85rem] h-[1.85rem]"
                        }
                    }}
                    showName
                />
            </SidebarFooter>
        </Sidebar>

    )
}

export function AppSidebarTrigger() {
    const { toggleSidebar } = useSidebar()

    return (
        <div className="flex justify-between items-center w-full px-8 mx-auto md:hidden">
            <p className="font-semibold">
                Ring
                <span className="text-brand-700">Rang</span>
            </p>
            <Button variant="ghost" onClick={toggleSidebar} >
                <Menu className="size-6" />
            </Button>
        </div>
    )
}