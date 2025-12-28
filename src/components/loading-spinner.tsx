import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

// animate-spin: css animation (rotate(360deg)), so the circle rotates which makes the border rotates
const loadingSpinnerVariants = cva(
    "rounded-full border-t-brand-400 animate-spin",
    {
        variants: {
            size: {
                sm: "size-4 border-2",
                md: "size-6 border-4",
                lg: "size-8 border-6"
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
)

interface LoadingSpinnerProps extends VariantProps<typeof loadingSpinnerVariants> {
    className?: string,
}

export default function LoadingSpinner({ size, className }: LoadingSpinnerProps) {
    return (
        <div className="flex justify-center items-center">
            <div className={cn(loadingSpinnerVariants({ size, className }))} />
        </div>
    )
}
