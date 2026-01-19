import { SignUp } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { redirect, useSearchParams } from "next/navigation"

export default async function SignUpPage() {
    const user = await currentUser()

    if (user) {
        redirect("/dashboard")
    }

    const searchParams = useSearchParams()

    const intent = searchParams.get("intent")
    const plan = searchParams.get("plan")

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <SignUp fallbackRedirectUrl={intent ? `/welcome/?intent=${intent}&plan=${plan}` : "/dashboard"} />
        </div>
    )
}
