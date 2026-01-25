// Libs
import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode,
    className?: string
}

export default function Heading({ children, className, ...props }: HeadingProps) {
    return (
        <h1 className={cn("text-4xl sm:text-5xl tracking-tight text-zinc-800 font-semibold text-pretty font-heading", className)} {...props}>
            {children}
        </h1>
    )
}
