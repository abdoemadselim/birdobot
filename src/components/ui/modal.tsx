// Libs
import { ReactNode } from "react"

// Components
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Drawer } from 'vaul';

// Hooks
import { useMediaQuery } from "@/hooks/use-media-query";

interface ModalProps {
    children: ReactNode,
    trigger: ReactNode,
    open: boolean,
    handleModalOpen: (open: boolean) => void,
    title?: string
}

export default function Modal({ open, title, handleModalOpen, trigger, children }: ModalProps) {
    const { isMobile } = useMediaQuery()

    return (
        isMobile ? (
            <Drawer.Root open={open} onOpenChange={handleModalOpen}>
                <Drawer.Trigger asChild
                >
                    {trigger}
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-gray-700/10 backdrop-blur-md" />
                    <Drawer.Content className="bg-gray-100 flex flex-col mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none sm:hidden">
                        <div className="sm:p-10 p-6">
                            <Drawer.Title className="opacity-0">{title}</Drawer.Title>
                            {children}
                        </div>
                        <Drawer.Description>{title}</Drawer.Description>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        ) : (
            <Dialog open={open} onOpenChange={handleModalOpen}>
                <DialogTrigger asChild >
                    {trigger}
                </DialogTrigger>
                <DialogContent >
                    <DialogTitle className="opacity-0">
                        {title}
                    </DialogTitle>
                    {children}
                </DialogContent>
            </Dialog>
        )
    )
}