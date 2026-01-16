import { SignUp } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function SignUpPage() {
    const user = await currentUser()

    if (user) {
        redirect("/dashboard")
    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <SignUp />
        </div>
    )
}
