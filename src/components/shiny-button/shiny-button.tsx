// Libs
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface ShinyButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode,
    className?: string,
    href: string
}

export default function ShinyButton({ children, className, href }: ShinyButtonProps) {
    return (
        <Link href={href} className={
            cn(
                `bg-brand-600 text-white rounded-xl font-medium relative overflow-hidden
                 text-xl px-8 group hover:ring-3 hover:ring-brand-700 ring-offset-2 flex gap-2 items-center
                 duration-300 transition-all justify-center
                 focus:ring-brand-700 focus:ring-3 focus:outline-none
                 `,
                className
            )}>
            <span>{children}</span>
            <ArrowRight className="size-5 shrink-0 group-hover:translate-x-1 ease-in-out transition-transform duration-300" />

            <div className="bg-white ease-[cubic-bezier(0.19, 1, 0.22, 1)] h-[155px] w-8 -left-[75px] -top-[50px] absolute opacity-20 rotate-[25deg] transition-all duration-600 group-hover:left-[120%]" />
        </Link>
    )
}
