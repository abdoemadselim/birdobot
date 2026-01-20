'use client'

// Libs
import { SignUp, useUser } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

// Components
import LoadingSpinner from "@/components/loading-spinner"

export default function SignUpPage() {
    const { isLoaded } = useUser()

    const searchParams = useSearchParams()

    const intent = searchParams.get("intent")
    const plan = searchParams.get("plan")

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            {
                !isLoaded ? (
                    <LoadingSpinner />
                ) : (
                    <SignUp
                        forceRedirectUrl={intent ? `/welcome/?intent=${intent}&plan=${plan}` : "/welcome"}
                        fallbackRedirectUrl={intent ? `/welcome/?intent=${intent}&plan=${plan}` : "/welcome"}
                    />
                )
            }
        </div>
    )
}
