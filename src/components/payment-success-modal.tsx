'use client'

// Libs
import { useState } from "react";
import Modal from "./ui/modal";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

// Components
import LoadingSpinner from "./loading-spinner";
import { Button } from "./ui/button";
import { CheckIcon } from "lucide-react";

export default function PaymentSuccessModal() {
    const [isOpen, setIsOpen] = useState(true)
    const router = useRouter()

    const { data, isPending } = useQuery({
        queryKey: ["plan"],
        queryFn: async () => {
            const res = await client.user.getPlan.$get()
            return await res.json()
        },
        refetchInterval: (query) => query.state.data?.plan === "FREE" ? 2000 : false
    })

    const handleClose = () => {
        router.replace("/dashboard")
    }

    return (
        <Modal open={isOpen} handleModalOpen={(isOpen) => setIsOpen(isOpen)} >
            <div>
                {
                    isPending || data?.plan === "FREE" ? (
                        <div className="flex flex-col justify-center items-center">
                            <LoadingSpinner className="size-6" />
                            <p className="font-medium pt-6 pb-2">
                                Upgrading your account...
                            </p>
                            <p className="text-pretty max-w-prose text-muted-foreground text-sm">
                                Please wait while we process your upgrade. This may take a moment.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <Image
                                src="/logo/birdo-slack.png"
                                width={200}
                                height={200}
                                alt="Payment Successful"
                                className="object-fit"
                            />
                            <div className="flex flex-col justify-center items-center text-center mt-6">
                                <p className="text-lg/7 tracking-tight font-medium text-pretty">
                                    Upgrade successful! 🎉
                                </p>
                                <p className="text-gray-600 text-sm/6 text-pretty pt-2">
                                    Thank you for upgrading to Pro and supporting PingPanda. Your
                                    account has been upgraded.
                                </p>
                            </div>

                            <div className="mt-8 w-[60%]">
                                <Button onClick={handleClose} className="h-12 w-full cursor-pointer">
                                    <CheckIcon className="mr-2 size-5" />
                                    Go to Dashboard
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </Modal>
    )
}
