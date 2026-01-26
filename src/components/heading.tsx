// Libs
import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode,
    headingType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    className?: string
}

export default function Heading({ children, headingType = "h1", className, ...props }: HeadingProps) {
    let element = (
        <h1 className={cn("text-4xl sm:text-5xl tracking-tight text-zinc-800 font-semibold text-pretty font-heading", className)} {...props}>
            {children}
        </h1>
    )

    switch (headingType) {
        case "h1":
            break;
        case "h2":
            element = (
                <h2 className={cn("text-4xl sm:text-5xl tracking-tight text-zinc-800 font-semibold text-pretty font-heading", className)} {...props}>
                    {children}
                </h2>
            );
            break;

        case "h3":
            element = (
                <h3 className={cn("text-4xl sm:text-5xl tracking-tight text-zinc-800 font-semibold text-pretty font-heading", className)} {...props}>
                    {children}
                </h3>
            );
            break;

        case "h4":
            element = (
                <h4 className={cn("text-4xl sm:text-5xl tracking-tight text-zinc-800 font-semibold text-pretty font-heading", className)} {...props}>
                    {children}
                </h4>
            );
            break;

        case "h5":
            element = (
                <h5 className={cn("text-4xl sm:text-5xl tracking-tight text-zinc-800 font-semibold text-pretty font-heading", className)} {...props}>
                    {children}
                </h5>
            );
            break;

        case "h6":
            element = (
                <h6 className={cn("text-4xl sm:text-5xl tracking-tight text-zinc-800 font-semibold text-pretty font-heading", className)} {...props}>
                    {children}
                </h6>
            );
            break;
    }

    return element
}
