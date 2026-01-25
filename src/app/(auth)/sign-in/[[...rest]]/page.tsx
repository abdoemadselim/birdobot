'use client'

// Libs
import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
    const searchParams = useSearchParams()

    const intent = searchParams.get("intent")
    const plan = searchParams.get("plan")

    return (
        <div className="flex flex-col flex-1 justify-center items-center py-32">
            <SignIn
                forceRedirectUrl={intent ? `/pricing/?intent=${intent}&plan=${plan}` : "/dashboard"}
                signUpForceRedirectUrl={intent ? `/welcome/?intent=${intent}&plan=${plan}` : "/welcome"}
            />
        </div>
    )
}
