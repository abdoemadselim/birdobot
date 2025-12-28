// Libs
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MaxWidthWrapperProps {
    children: ReactNode,
    className?: string
}

export default function MaxWidthWrapper({ children, className }: MaxWidthWrapperProps) {
    return (
        <div className={cn("max-w-7xl mx-auto w-full h-full px-2.5 md:px-20", className)}>
            {children}
        </div>
    )
}
