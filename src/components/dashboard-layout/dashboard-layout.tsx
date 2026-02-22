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
        <div className="bg-brand-25 flex flex-col flex-1 min-h-full">
            <div className="border border-b-gray-200 p-6 sm:p-8 flex flex-col items-start gap-4">

                <div className="flex m:items-center sm:flex-row flex-col gap-4 w-full sm:w-fit">
                    <div className="flex items-center gap-4">
                        {
                            hideBackButton ? null : (
                                <Button variant="outline" size="lg" className="px-6 cursor-pointer" onClick={() => router.push("/dashboard")} aria-label="Go back to the dashboard main page">
                                    <ArrowLeft className="size-4" />
                                </Button>
                            )
                        }
                        <Heading className="sm:text-3xl text-2xl" headingType="h1" id="page-heading" tabIndex={0}>
                            {title}
                        </Heading>
                    </div>
                    {
                        cta ? (
                            <div className="w-full">{cta}</div>
                        ) : null
                    }
                </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1 min-h-full">
                {children}
            </div>
        </div>
    )
}
