// Libs
import Link from "next/link";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

// Components
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image.js";

export default async function Navbar() {
    const user = await currentUser()

    return (
        /**
        * backdrop-blur-bg with bg-white/0: adds blur background
         */
        <nav className="sticky h-15 inset-x-0 w-full border-b-2 border-gray-200 bg-white/80 z-100 top-0 backdrop-blur-lg" >
            <MaxWidthWrapper>
                <div className="h-15 flex items-center justify-between w-full">
                    <Link href="/" className="font-semibold">
                        <Image
                            src="/logo/logo.webp"
                            width={100}
                            height={57}
                            alt="Birdo Logo"
                            className="w-[100px] h-[57px]"
                            priority
                        />
                    </Link>

                    <div className="flex gap-4 items-center">
                        {
                            user ? (
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
                                    <Link className={buttonVariants({ size: "sm", variant: "ghost" })} href="/dashboard">
                                        Pricing
                                    </Link>

                                    <SignInButton>
                                        <Button variant="ghost" className="cursor-pointer">Sign in</Button>
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
            </MaxWidthWrapper>
        </nav>
    )
}
