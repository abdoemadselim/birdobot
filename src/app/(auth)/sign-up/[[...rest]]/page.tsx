import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <SignUp />
        </div>
    )
}
