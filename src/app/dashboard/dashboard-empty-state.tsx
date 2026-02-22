// Libs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";
import Link from "next/link.js";
import { Plus } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import Toaster from "@/components/ui/toaser";
import { toast } from "sonner";
import CreateCategoryModal from "@/components/create-category-modal";

export default function DashboardEmptyState() {
    const queryClient = useQueryClient()

    const { mutate: insertQuickStartCategories, isPending } = useMutation({
        mutationFn: async () => {
            await client.eventCategory.insertQuickStartCategories.$post()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["event-categories"] })
        },
        onError: (error) => {
            console.log(error)
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Create Event Category" children={
                    <div className="text-red-500 text-sm" aria-live="polite">
                        <p>Something went wrong while creating the category.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <a href="mailto:support@birdobot.site" target="_blank" className="text-brand-700">contact us</a></p>
                    </div>
                } />
            )
        }
    })

    return (
        <div className="bg-white relative ring-1 ring-gray-200 rounded-lg flex justify-center items-center flex-col min-h-[80%] px-4 text-center">
            <img
                title="Panda is waving"
                className="w-[300px] h-[300px] -mt-24"
                src="/brand-asset-wave.png"
            />
            <h2 className="font-medium text-lg">No Event Categories Yet</h2>
            <p className="text-zinc-600 pt-3 text-base">Start tracking events by creating your first category</p>

            <div className="flex gap-4 pt-8 sm:flex-row flex-col">
                <Button variant="outline" onClick={() => insertQuickStartCategories()} disabled={isPending}>
                    <span className="size-6">🚀</span>
                    <span>
                        {
                            isPending ? "Adding Categories..." : "Quick start"
                        }
                    </span>
                </Button>
                <CreateCategoryModal trigger={
                    <Button
                        className="flex items-center gap-2 cursor-pointer rounded-sm"
                    >
                        <Plus className="size-4" />
                        Add Category
                    </Button>
                } />
            </div>
        </div>
    )
}
