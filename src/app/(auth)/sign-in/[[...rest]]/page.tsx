'use client'

import { SignIn, useUser } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

// Components
import LoadingSpinner from "@/components/loading-spinner"

export default function SignInPage() {
    const searchParams = useSearchParams()

    const intent = searchParams.get("intent")
    const plan = searchParams.get("plan")

    const { isLoaded } = useUser()

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            {
                !isLoaded ? (
                    <LoadingSpinner />
                ) : (
                    <SignIn
                        signUpFallbackRedirectUrl={intent ? `/welcome/?intent=${intent}&plan=${plan}` : "/welcome"}
                        forceRedirectUrl={intent ? `/pricing/?intent=${intent}&plan=${plan}` : "/dashboard"}
                    />
                )
            }
        </div>
    )
}
