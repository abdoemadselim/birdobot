'use client'

// Libs
import Link from "next/link";
import { SignInButton, SignOutButton, SignUpButton, useAuth } from "@clerk/nextjs"
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Components
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Navbar() {
    const { isSignedIn } = useAuth()
    const pathname = usePathname()

    return (
        /**
        * backdrop-blur-bg with bg-white/0: adds blur background
         */
        <header className="sticky h-17 inset-x-0 w-full border-b-2 border-gray-100  bg-white/80 z-100 top-0 backdrop-blur-lg">
            <MaxWidthWrapper>
                <nav>
                    <div className="h-17 flex items-center justify-between w-full">
                        <Link href="/" className="font-semibold" aria-label="Go to home page">
                            <Image
                                src="/logo/logo.webp"
                                width={100}
                                height={57}
                                alt=""
                                className="w-[100px] h-[57px]"
                                priority
                            />
                        </Link>

                        <div className="flex gap-4 items-center">
                            {
                                isSignedIn ? (
                                    <>
                                        <SignOutButton>
                                            <Button className="cursor-pointer" variant="ghost">Sign out</Button>
                                        </SignOutButton>

                                        <Link className={cn(buttonVariants({ size: "sm" }), "flex items-center gap-2")} href="/dashboard">
                                            <ArrowRight className="size-4" />
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link className={buttonVariants({ size: "sm", variant: "ghost", className: pathname === "pricing" ? "underline" : "" })} href="/pricing">
                                            Pricing
                                        </Link>

                                        <SignInButton>
                                            <Button variant="ghost" className={
                                                cn("cursor-pointer", {
                                                    "underline": pathname === "sign-in"
                                                })
                                            }>Sign in</Button>
                                        </SignInButton>

                                        <SignUpButton>
                                            <Button className="cursor-pointer flex items-center gap-2 group">
                                                Sign Up
                                                <ArrowRight className="size-4 transition group-hover:translate-x-1 duration-300" />
                                            </Button>
                                        </SignUpButton>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </nav>
            </MaxWidthWrapper>
        </header>
    )
}
