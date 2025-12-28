import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <SignIn />
        </div>
    )
}
