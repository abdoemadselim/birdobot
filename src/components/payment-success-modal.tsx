'use client'

// Libs
import { useState } from "react";
import Modal from "./ui/modal";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Components
import { Button } from "./ui/button";
import { CheckIcon } from "lucide-react";

export default function PaymentSuccessModal() {
    const [isOpen, setIsOpen] = useState(true)
    const router = useRouter()

    const handleClose = () => {
        router.replace("/dashboard")
    }

    return (
        <Modal open={isOpen} handleModalOpen={(isOpen) => setIsOpen(isOpen)} >
            <div>
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
                            Enjoy the additional credits you've just purchased. <br /> Have a good day
                        </p>
                    </div>

                    <div className="mt-8 w-[60%]">
                        <Button onClick={handleClose} className="h-12 w-full cursor-pointer">
                            <CheckIcon className="mr-2 size-5" />
                            Go to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </Modal >
    )
}
