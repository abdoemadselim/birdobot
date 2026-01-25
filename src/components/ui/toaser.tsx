// Libs
import { ReactNode } from "react";
import { Check, X, XCircle } from "lucide-react";

type ToasterType = "error" | "success" | "info"

interface ErrorToasterProps {
    title: string,
    children: ReactNode,
    t: any,
    type: ToasterType
}

export default function Toaster({ type, title, children, t }: ErrorToasterProps) {
    const icon: Record<ToasterType, ReactNode> = {
        error: <XCircle className="text-red-400" />,
        success: <Check className="text-green-400" />,
        info: <XCircle className="text-yellow-400" />,
    }

    return (
        <div className="bg-brand-100 p-4 rounded-lg w-fit">
            <p className="font-medium text-sm/7 flex items-center gap-2">
                {icon[type]}
                {title}
            </p>
            <div className="text-sm text-pretty max-w-prose pt-1">
                {children}
            </div>
        </div>
    )
}
