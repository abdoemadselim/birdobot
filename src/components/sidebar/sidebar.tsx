'use client'

// Libs
import { Banknote, Gem, Home, Key, ListOrdered, LucideIcon, Menu, Settings, StickyNote } from "lucide-react"
import Link from "next/link"
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
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

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
        items: [
            {
                href: "/dashboard/upgrade", icon: Gem, text: "Upgrade"
            },
            {
                href: "/dashboard/payment", icon: Banknote, text: "Payments"
            }
        ],
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
            // { href: "/dashboard/doc", icon: StickyNote, text: "Documentation" },
        ]
    }
]

export default function AppSidebar() {
    const pathName = usePathname()

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
                                        <SidebarMenuItem key={item.text} className={cn("group/item transition", pathName === item.href && "bg-gray-100 text-brand-700")}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.href}>
                                                    <item.icon className={cn("text-zinc-500 size-4", pathName === item.href ? "text-brand-700" : "group-hover/item:text-zinc-700")} />
                                                    <span className={cn("text-sm font-medium text-zinc-700", pathName === item.href && "text-brand-700")}>{item.text}</span>
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
    const { toggleSidebar, openMobile } = useSidebar()

    return (
        <div className="flex justify-between items-center w-full px-8 mx-auto md:hidden">
            <p className="font-semibold">
                Birdo
                <span className="text-brand-700">Bot</span>
            </p>
            <Button variant="ghost" onClick={toggleSidebar} aria-label={`${openMobile ? "Close sidebar" : "Open sidebar"}`}>
                <Menu className="size-6" />
            </Button>
        </div>
    )
}