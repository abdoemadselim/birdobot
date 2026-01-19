'use client'

import LoadingSpinner from "@/components/loading-spinner"
import { SignIn, useUser } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignInPage() {
    const searchParams = useSearchParams()

    const intent = searchParams.get("intent")
    const plan = searchParams.get("plan")

    const router = useRouter()
    const { user, isLoaded } = useUser()

    if (user) {
        router.push("/dashboard")
    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            {
                !isLoaded ? (
                    <LoadingSpinner />
                ) : (
                    <SignIn
                        signUpFallbackRedirectUrl={intent ? `/welcome/?intent=${intent}&plan=${plan}` : "/welcome"}
                        forceRedirectUrl={intent ? `/dashboard/?intent=${intent}&plan=${plan}` : "/dashboard"}
                    />
                )
            }
        </div>
    )
}
