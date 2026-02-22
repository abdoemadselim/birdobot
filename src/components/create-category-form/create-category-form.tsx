'use client'

// Libs
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import Toaster from "@/components/ui/toaser";
import { FieldSet } from "@/components/ui/field";
import { FieldLegend } from "@/components/ui/field";
import { toast } from "sonner";

import { EVENT_CATEGORY_VALIDATOR } from "@/lib/schemas/category-event";

// Client
import { client } from "@/lib/client";

// The purpose of comments here is to make tailwind parse them and create css rules for them
const COLOR_OPTIONS = [
    { color: "#FF6B6B", label: "Bright Red" }, // bg-[#FF6B6B] ring-[#FF6B6B]
    { color: "#4ECDC4", label: "Teal" }, // bg-[#4ECDC4] ring-[#4ECDC4]
    { color: "#45B7D1", label: "Sky Blue" }, // bg-[#45B7D1] ring-[#45B7D1]
    { color: "#FFA07A", label: "Light Salmon" }, // bg-[#FFA07A] ring-[#FFA07A]
    { color: "#98D8C8", label: "Seafoam Green" }, // bg-[#98D8C8] ring-[#98D8C8]
    { color: "#FDCB6E", label: "Mustard Yellow" }, // bg-[#FDCB6E] ring-[#FDCB6E]
    { color: "#6C5CE7", label: "Soft Purple" }, // bg-[#6C5CE7] ring-[#6C5CE7]
    { color: "#FF85A2", label: "Pink" }, // bg-[#FF85A2] ring-[#FF85A2]
    { color: "#2ECC71", label: "Emerald Green" }, // bg-[#2ECC71] ring-[#2ECC71]
    { color: "#E17055", label: "Terracotta" }, // bg-[#E17055] ring-[#E17055]
] as const

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


type EVENT_CATEGORY_TYPE = z.infer<typeof EVENT_CATEGORY_VALIDATOR>


export default function CreateCategoryForm({ onSettled }: { onSettled?: () => void }) {
    const queryClient = useQueryClient()

    const { mutate: createEventCategory, isPending: isPendingCreatingCategory } = useMutation({
        mutationFn: async (data: EVENT_CATEGORY_TYPE) => {
            await client.eventCategory.createCategory.$post(data)
        },

        onError: () => {
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Create Event Category" children={
                    <div className="text-red-500 text-sm" aria-live="polite">
                        <p>Something went wrong while adding the category.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <a href="mailto:support@birdobot.site" target="_blank" className="text-brand-700">contact us</a></p>
                    </div>
                } />
            )
        },

        onSettled: () => {
            onSettled?.()
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
        <form onSubmit={handleSubmit(onSubmit)} className="pt-6 space-y-[5px]">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input {...register("name")} id="name" className="focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none" />

                <p className="text-red-400 min-h-[20px]" aria-live="assertive" data-testid="name-error-message">
                    {errors.name?.message}
                </p>
            </div>

            <FieldSet className="gap-y-0 mb-2" aria-describedby="color-error">
                <FieldLegend variant="label">Color</FieldLegend>
                <div className="flex flex-wrap gap-4">
                    {
                        COLOR_OPTIONS.map(({ color, label }, i) => (
                            <Button
                                data-testid="color"
                                aria-checked={color == selectedColor ? "true" : "false"}
                                id="color"
                                type="button"
                                role="radio"
                                aria-label={`Choose ${label} color`}
                                key={color}
                                title={`${label}`}
                                onClick={() => setValue("color", color)}
                                className={
                                    cn(
                                        `bg-[${color}]`,
                                        `focus:ring-brand-700 focus:ring-2 rounded-full w-10 h-10 hover:ring-brand-700 hover:bg-[$(color)] hover:ring-2 ring-offset-2 cursor-pointer`,
                                        color == selectedColor && "ring-brand-700 ring-2"
                                    )
                                } />
                        ))
                    }
                </div>

                <p className="text-red-400 min-h-[20px]" aria-live="polite" id="color-error" data-testid="color-error-message">
                    {errors.color?.message}
                </p>
            </FieldSet>

            <FieldSet className="space-y-2 gap-y-0 mb-2" aria-describedby="emoji-error">
                <FieldLegend variant="label">Emoji</FieldLegend>
                <div className="flex flex-wrap gap-4">
                    {
                        EMOJI_OPTIONS.map(({ emoji, label }) => (
                            <Button
                                role="radio"
                                data-testid="emoji"
                                key={label}
                                type="button"
                                aria-checked={emoji === selectedEmoji ? "true" : "false"}
                                aria-label={label}
                                title={label}
                                onClick={() => setValue("emoji", emoji)}
                                className={
                                    cn(
                                        "rounded-md w-10 h-10 bg-brand-100 hover:ring-brand-700 hover:bg-brand-200 hover:ring-2 ring-offset-2 cursor-pointer",
                                        emoji == selectedEmoji && "ring-brand-700 ring-2"
                                    )
                                }>
                                {emoji}
                            </Button>
                        ))
                    }
                </div>

                <p className="text-red-400 min-h-[10px]" aria-live="polite" id="emoji-error">
                    {errors.emoji?.message}
                </p>
            </FieldSet>

            <FieldSet className="pt-3 gap-y-0" aria-describedby={errors.channels ? "channels-error" : undefined}>
                <FieldLegend className="mb-0 leading-1.5" variant="label">Channel</FieldLegend>
                <p className="text-[12px] text-zinc-500 pb-3">Where to receive the notification</p>
                <div className="flex flex-wrap gap-4 pt-0">
                    {
                        CHANNELS.map(({ name, icon }) => (
                            <Button
                                data-testid="channel"
                                role="radio"
                                key={name}
                                type="button"
                                aria-checked={selectedChannel.includes(name) ? "true" : "false"}
                                aria-label={name}
                                onClick={() => setValue("channels", (() =>
                                    selectedChannel.includes(name) ? selectedChannel.filter((channel) => channel !== name) : [...selectedChannel, name])())} className={
                                        cn(
                                            "rounded-md w-7 h-7 bg-brand-100 hover:ring-brand-700 hover:bg-brand-200 hover:ring-2 ring-offset-2 cursor-pointer flex justify-center items-center",
                                            selectedChannel.includes(name) && "ring-brand-700 ring-2"
                                        )
                                    }>
                                {icon}
                            </Button>
                        ))
                    }
                </div>

                <p className="text-red-400 min-h-[10px] pt-2" aria-live="polite" id="channels-error" data-testid="channels-error-message">
                    {errors.channels?.message}
                </p>
            </FieldSet>

            <div className="justify-end flex gap-4 border-t py-2">
                <Button type="submit" className="cursor-pointer" disabled={isPendingCreatingCategory} data-testid="create-category-button">
                    {
                        isPendingCreatingCategory ? "Creating..." : "Create"
                    }
                </Button>
                <Button
                    type="button"
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => {
                        onSettled?.()
                        reset()
                    }}
                >
                    Close
                </Button>
            </div>
        </form>
    )
}
