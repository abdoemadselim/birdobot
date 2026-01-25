// Libs
import { format, formatDistanceToNow } from "date-fns"
import { ArrowRight, BarChart2, Clock, Database, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { client } from "@/lib/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferSelectModel } from "drizzle-orm";
import { useState } from "react"
import { cn } from "@/lib/utils"

// Components
import Modal from "@/components/ui/modal"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Toaster from "@/components/ui/toaser";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner";

// Schema
import { eventCategoryTable } from "@/server/db/schema"

interface CategoryCardProps {
    category: {
        info: InferSelectModel<typeof eventCategoryTable> & { event_date: string },
        events_count: number,
        unique_field_count: number
    }
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const queryClient = useQueryClient()
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

    const { mutateAsync: deleteEventCategory, isPending: isPendingDeleteCategory } = useMutation({
        mutationFn: async (categoryName: string) => {
            await client.eventCategory.deleteEventCategory.$post({ categoryName })
        },
        onError: (_, categoryName) => {
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Delete Event Category" children={
                    <div className="text-red-500 text-sm">
                        <p>Something went wrong while deleting the category named {categoryName}.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <a href="mailto:support@birdobot.site" target="_blank" className="text-brand-700">contact us</a></p>
                    </div>
                } />
            )
        },
        onSettled: () => {
            setDeleteTarget(null)
            queryClient.invalidateQueries({ queryKey: ["event-categories"] })
        }
    })

    const { mutate: updateCategoryStatus } = useMutation({
        mutationFn: async (status: boolean) => {
            await client.eventCategory.updateCategoryStatus.$post({
                categoryId: category.info.id,
                status: status
            })
        },

        onMutate: async (status, context) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['event-categories'] })

            // Snapshot the previous value
            const previousEventCategories = queryClient.getQueryData(['event-categories'])

            // Optimistically update to the new value
            queryClient.setQueryData(['event-categories'], (old: {
                info: InferSelectModel<typeof eventCategoryTable> & { event_date: string },
                events_count: number,
                unique_field_count: number
            }[]) => old.map((oldCategory) => {
                if (oldCategory.info.id == category.info.id) {
                    return {
                        ...oldCategory,
                        info: {
                            ...oldCategory.info,
                            enabled: status
                        }
                    }
                }

                return oldCategory
            }))

            // Return a result with the snapshotted value
            return { previousEventCategories }
        },
        onError: (err, _, onMutateResult, context) => {
            queryClient.setQueryData(['event-categories'], onMutateResult?.previousEventCategories)
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Update Event Category" children={
                    <div className="text-red-500 text-sm">
                        <p>Something went wrong while updating the category named {category.info.name}.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <a href="mailto:support@birdobot.site" target="_blank" className="text-brand-700">contact us</a></p>
                    </div>
                } />
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["event-categories"] })
        }
    })

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 px-6 py-4" key={category.info.name}>
            <div className="flex items-center gap-3">
                <div
                    className="rounded-full min-w-10 min-h-10"
                    style={{
                        backgroundColor:
                            category.info.color !== null ?
                                `#${category.info.color.toString(16).padStart(6, "0")}`
                                : "#f3f4f6"
                    }}
                />

                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col">
                        <h3 className="mr-1 text-gray-950 text-lg/7">{category.info.emoji || "📂"} {category.info.name}</h3>

                        <p className="text-gray-500 text-sm/7">{format(category.info.createdAt, "MMM dd, yyyy")}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        {
                            category.info.channels.map((channel) => {
                                return (
                                    <div className="rounded-md w-6 h-6" key={channel}>
                                        {
                                            {
                                                slack: <Icons.slack className="w-[15px] h-[15px]" />,
                                                telegram: <Icons.telegram className="w-[15px] h-[15px]" />,
                                                discord: <Icons.discord className="text-brand-600 w-[18px] h-[18px] -mt-[1px]" />
                                            }[channel as "discord" | "telegram" | "slack"]
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>


            <div className="flex flex-col items-start pt-4 gap-1">
                <div className="flex gap-2 items-center">
                    <Clock className="text-brand-500 size-4" />
                    <span className="text-sm/7 text-gray-700">
                        Last ping: {" "}
                        {
                            category.info.event_date ? `${formatDistanceToNow(category.info.event_date)} ago` : "Never"
                        }
                    </span>

                </div>
                <div className="flex gap-2 items-center">
                    <Database className="text-brand-500 size-4" />
                    <span className="text-sm/7 text-gray-700">
                        Unique fields: {category.unique_field_count || 0}
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <BarChart2 className="text-brand-500 size-4" />
                    <span className="text-sm/7 text-gray-700">
                        Events this month: {category.events_count || 0}
                    </span>
                </div>
            </div>

            <div className="flex mt-5 sm:items-center md:lg:items-stretch sm:justify-between md:lg:justify-stretch sm:flex-row  md:lg:flex-col flex-col md:lg:gap-4 sm:gap-0 gap-4 ">
                <Link href={`/dashboard/category/${category.info.name}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "group")}>
                    View details
                    <ArrowRight className="group-hover:translate-x-[5px] transition-transform duration-200 ml-1" />
                </Link>
                <div className="flex items-center gap-2">
                    {/* Enable / Disable */}
                    <div className="flex items-center space-x-2">
                        <Switch id="enabled" checked={category.info.enabled || false} onCheckedChange={() => updateCategoryStatus(!category.info.enabled)} />
                        <Label htmlFor="enabled" className="text-sm text-muted-foreground font-normal">{category.info.enabled ? "Enabled" : "Disabled"}</Label>
                    </div>

                    {/* Edit */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="py-0 text-gray-600 cursor-pointer transition-colors duration-200 flex items-center justify-center"
                    >
                        <Link href={`/dashboard/category/${category.info.name}/update`}>
                            <Edit className="size-5" />
                        </Link>
                    </Button>

                    {/* Delete */}
                    <Modal
                        open={deleteTarget === category.info.name}
                        handleModalOpen={(open) => {
                            if (!open) setDeleteTarget(null)
                        }}
                        trigger={
                            <Button
                                variant="ghost"
                                size="sm"
                                className="py-0 text-gray-600 hover:text-red-600 cursor-pointer transition-colors duration-200 flex items-center justify-center"
                                onClick={() => setDeleteTarget(category.info.name)}
                            >
                                <Trash2 className="size-5" />
                            </Button>
                        }>
                        <div className="flex flex-col">
                            <h2 className="sm:text-xl text-lg tracking-tight font-medium text-gray-950">
                                Delete Category
                            </h2>

                            <p className="text-pretty text-gray-600 sm:text-[17px]/7 text-[15px]/7 pt-2 pb-2 w-full">
                                Are you sure you want to delete the category "{category.info.name}"
                                <br />
                                This action can't be undone.
                            </p>

                            <div className="flex items-center justify-end gap-4 border-t pt-4 w-full">
                                <Button
                                    className="bg-red-600 hover:bg-red-500 transition-colors duration-200 cursor-pointer px-6"
                                    aria-label="Delete event category"
                                    disabled={isPendingDeleteCategory}
                                    onClick={() => {
                                        deleteEventCategory(category.info.name as string)
                                    }}
                                >
                                    {
                                        isPendingDeleteCategory ? "Deleting..." : "Delete"
                                    }
                                </Button>

                                <Button
                                    className="cursor-pointer"
                                    variant="outline"
                                    onClick={() => setDeleteTarget(null)}
                                >
                                    Cancel
                                </Button>

                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
