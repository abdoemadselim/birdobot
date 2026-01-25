'use client'

// Libs
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

// Components
import Modal from "./ui/modal";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Toaster from "./ui/toaser";
import { toast } from "sonner";
import { Icons } from "./icons";

// Schemas
import { EVENT_CATEGORY_VALIDATOR } from "@/lib/schemas/category-event";

// Client
import { client } from "@/lib/client";


type EVENT_CATEGORY_TYPE = z.infer<typeof EVENT_CATEGORY_VALIDATOR>

// The purpose of comments here is to make tailwind parse them and create css rules for them
const COLOR_OPTIONS = [
    "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
    "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
    "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
    "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
    "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
    "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
    "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
    "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
    "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
    "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

const EMOJI_OPTIONS = [
    { emoji: "💰", label: "Money (Sale)" },
    { emoji: "👤", label: "User (Sign-up)" },
    { emoji: "🎉", label: "Celebration" },
    { emoji: "📅", label: "Calendar" },
    { emoji: "🚀", label: "Launch" },
    { emoji: "📢", label: "Announcement" },
    { emoji: "🎓", label: "Graduation" },
    { emoji: "🏆", label: "Achievement" },
    { emoji: "💡", label: "Idea" },
    { emoji: "🔔", label: "Notification" },
]

const CHANNELS = [
    {
        name: "discord", icon: <Icons.discord className="w-5 h-5" />
    },
    {
        name: "slack", icon: <Icons.slack className="w-4 h-4" />
    },
    {
        name: "telegram", icon: <Icons.telegram className="w-4 h-4" />
    }
] as const

export default function CreateCategoryModal({ trigger }: { trigger: ReactNode }) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const { mutate: createEventCategory, isPending: isPendingCreatingCategory } = useMutation({
        mutationFn: async (data: EVENT_CATEGORY_TYPE) => {
            await client.eventCategory.createCategory.$post(data)
        },

        onError: () => {
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Create Event Category" children={
                    <div className="text-red-500 text-sm">
                        <p>Something went wrong while adding the category.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <a href="mailto:support@birdobot.site" target="_blank" className="text-brand-700">contact us</a></p>
                    </div>
                } />
            )
        },

        onSettled: () => {
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['event-categories'] })
            reset()
        }
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
        reset
    } = useForm<EVENT_CATEGORY_TYPE>({
        resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
        mode: "onChange",
        defaultValues: {
            color: "",
            emoji: "",
            name: "",
            channels: ["discord"]
        }
    })

    const onSubmit = (data: EVENT_CATEGORY_TYPE) => {
        createEventCategory(data)
    }

    const selectedColor = watch("color")
    const selectedEmoji = watch("emoji")
    const selectedChannel = watch("channels")

    return (
        <Modal
            open={open}
            handleModalOpen={(open) => setOpen(open)}
            trigger={trigger}>
            <div>
                <h3 className="font-medium ">New Event Category</h3>
                <p className="text-sm text-gray-700">Create a new category to organize your events</p>

                <form onSubmit={handleSubmit(onSubmit)} className="pt-6 space-y-[5px]">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input {...register("name")} id="name" className="focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none" />

                        <p className="text-red-400 min-h-[20px]" aria-live="assertive">
                            {errors.name?.message}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Color</Label>
                        <div className="flex flex-wrap gap-4">
                            {
                                COLOR_OPTIONS.map((premadeColor) => (
                                    <div key={premadeColor} title={`Color is ${premadeColor}`} onClick={() => setValue("color", premadeColor)} role="button" className={
                                        cn(
                                            `bg-[${premadeColor}]`,
                                            "rounded-full w-10 h-10 hover:ring-brand-700 hover:ring-2 ring-offset-2 cursor-pointer",
                                            premadeColor == selectedColor && "ring-brand-700 ring-2"
                                        )
                                    } />
                                ))
                            }
                        </div>

                        <p className="text-red-400 min-h-[20px]" aria-live="assertive" >
                            {errors.color?.message}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Emoji</Label>
                        <div className="flex flex-wrap gap-4">
                            {
                                EMOJI_OPTIONS.map(({ emoji, label }) => (
                                    <button key={label} type="button" aria-label={label} onClick={() => setValue("emoji", emoji)} className={
                                        cn(
                                            "rounded-md w-10 h-10 bg-brand-100 hover:ring-brand-700 hover:bg-brand-200 hover:ring-2 ring-offset-2 cursor-pointer",
                                            emoji == selectedEmoji && "ring-brand-700 ring-2"
                                        )
                                    }>
                                        {emoji}
                                    </button>
                                ))
                            }
                        </div>

                        <p className="text-red-400 min-h-[10px]" aria-live="assertive">
                            {errors.emoji?.message}
                        </p>
                    </div>

                    <div>
                        <Label>Channel</Label>
                        <span className="text-[14px] text-zinc-400 block pb-3 pt-1">Where to receive the notification</span>
                        <div className="flex flex-wrap gap-4">
                            {
                                CHANNELS.map(({ name, icon }) => (
                                    <button key={name} type="button" aria-label={name} onClick={() => setValue("channels", (() =>
                                        selectedChannel.includes(name) ? selectedChannel.filter((channel) => channel !== name) : [...selectedChannel, name])())} className={
                                            cn(
                                                "rounded-md w-7 h-7 bg-brand-100 hover:ring-brand-700 hover:bg-brand-200 hover:ring-2 ring-offset-2 cursor-pointer flex justify-center items-center",
                                                selectedChannel.includes(name) && "ring-brand-700 ring-2"
                                            )
                                        }>
                                        {icon}
                                    </button>
                                ))
                            }
                        </div>

                        <p className="text-red-400 min-h-[10px]" aria-live="assertive">
                            {errors.channels?.message}
                        </p>
                    </div>

                    <div className="justify-end flex gap-4 border-t py-2">
                        <Button type="submit" className="cursor-pointer" disabled={isPendingCreatingCategory}>
                            {
                                isPendingCreatingCategory ? "Creating..." : "Create"
                            }
                        </Button>
                        <Button
                            type="button"
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => {
                                setOpen(false)
                                reset()
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </form>
            </div >
        </Modal >
    )
}
