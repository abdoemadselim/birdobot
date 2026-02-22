'use client'

// Libs
import { ReactNode, useState } from "react";

// Components
import Modal from "@/components/ui/modal";
import CreateCategoryForm from "@/components/create-category-form";

export default function CreateCategoryModal({ trigger }: { trigger: ReactNode }) {
    const [open, setOpen] = useState(false)

    return (
        <Modal
            open={open}
            handleModalOpen={(open) => setOpen(open)}
            trigger={trigger}>
            <div>
                <h3 className="font-medium ">New Event Category</h3>
                <p className="text-sm text-gray-700">Create a new category to organize your events</p>

                <CreateCategoryForm onSettled={() => setOpen(false)} />
            </div>
        </Modal>
    )
}
