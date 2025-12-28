'use client'

// Libs
import { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

// Components
import { Button } from "@/components/ui/button"
import Heading from "@/components/heading"

interface DashboardLayoutProps {
    children: ReactNode,
    title: string,
    cta?: ReactNode,
    hideBackButton?: boolean
}

export default function DashboardLayout({ children, title, cta, hideBackButton = false }: DashboardLayoutProps) {
    const router = useRouter()

    return (
        <div className="bg-brand-25 flex flex-col flex-1">
            <div className="border border-b-gray-200 p-6 sm:p-8 flex flex-col items-start gap-2">
                {
                    hideBackButton ? null : (
                        <Button variant="outline" size="lg" className="px-6 cursor-pointer" onClick={() => router.push("/dashboard")}>
                            <ArrowLeft className="size-4" />
                        </Button>
                    )
                }
                <Heading className="sm:text-4xl text-3xl">
                    {title}
                </Heading>

                {
                    cta ? (
                        <div>{cta}</div>
                    ) : null
                }
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1">
                {children}
            </div>
        </div>
    )
}
