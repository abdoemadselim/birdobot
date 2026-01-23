'use client'

// Libs
import { SignUp } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

export default function SignUpPage() {
    const searchParams = useSearchParams()
    const intent = searchParams.get("intent")
    const plan = searchParams.get("plan")

    return (
        <div className="flex flex-col flex-1 justify-center items-center py-32">
            <SignUp
                forceRedirectUrl={intent ? `/welcome/?intent=${intent}&plan=${plan}` : "/welcome"}
                signInForceRedirectUrl={intent ? `/pricing/?intent=${intent}&plan=${plan}` : "/dashboard"}
            />
        </div>
    )
}
