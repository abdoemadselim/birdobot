'use client'

import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
    const searchParams = useSearchParams()
    const intent = searchParams.get("intent")

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <SignIn forceRedirectUrl={intent ? `/dashboard/?intent=${intent}` : "/dashboard"} />
        </div>
    )
}
