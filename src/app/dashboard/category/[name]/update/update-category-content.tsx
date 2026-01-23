'use client'

// Libs
import { Control, Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Toaster from "@/components/ui/toaser";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

// Schemas
import { UPDATE_EVENT_CATEGORY_VALIDATOR, type FIELD_RULES_TYPE } from "@/lib/schemas/category-event";

// Client
import { client } from "@/lib/client";

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

type UPDATE_EVENT_CATEGORY_TYPE = z.infer<typeof UPDATE_EVENT_CATEGORY_VALIDATOR>

interface UpdateCategoryContentProps {
    category: {
        id: number,
        name: string,
        color: number,
        emoji: string,
        channels: ("discord" | "telegram" | "slack")[],
        fieldRules: FIELD_RULES_TYPE[]
    }
}

export default function UpdateCategoryContent({ category }: UpdateCategoryContentProps) {
    const router = useRouter()
    const queryClient = useQueryClient()

    const { mutate: createEventCategory, isPending } = useMutation({
        mutationFn: async (data: UPDATE_EVENT_CATEGORY_TYPE) => {
            await client.eventCategory.updateCategory.$post(data)
        },

        onError: () => {
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Update Event Category" children={
                    <div className="text-red-500 text-sm">
                        <p>Something went wrong while updating the category.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <Link href="/contact-us" className="text-brand-700">contact us</Link></p>
                    </div>
                } />
            )
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["event-categories"] })
            router.push("/dashboard")
        }
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
        control
    } = useForm<UPDATE_EVENT_CATEGORY_TYPE>({
        resolver: zodResolver(UPDATE_EVENT_CATEGORY_VALIDATOR),
        mode: "onChange",
        defaultValues: {
            color: "#" + category.color.toString(16).padStart(6, "0"),
            emoji: category.emoji,
            name: category.name,
            channels: category.channels,
            fieldRules: category.fieldRules
        },
        values: {
            id: category.id,
            color: "#" + category.color.toString(16).padStart(6, "0").toUpperCase(),
            emoji: category.emoji,
            name: category.name,
            channels: category.channels,
            fieldRules: category.fieldRules
        }
    })

    const { fields: fieldRules, append, remove } = useFieldArray({
        control,
        name: "fieldRules",
    });

    const onSubmit = (data: UPDATE_EVENT_CATEGORY_TYPE) => {
        createEventCategory(data)
    }

    const selectedColor = watch("color")
    const selectedEmoji = watch("emoji")
    const selectedChannel = watch("channels")

    const watchFieldArray = watch("fieldRules");
    const controlledFields = fieldRules.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index]
        };
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="border-b py-2 mb-4 text-gray-600">General</h2>
                <section className="px-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input readOnly disabled {...register("name")} id="name" className="focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none max-w-[400px]" />

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
                                            {
                                                "ring-brand-700 ring-2": premadeColor == selectedColor
                                            }
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

                    <div className="pt-2">
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
                </section>

                <h2 className="border-b py-2 mb-4 text-gray-600 mt-8">Advanced</h2>
                <section className="px-4 flex flex-col">
                    <div className="flex gap-2 flex-col items-start mb-4">
                        <p className="text-muted-foreground text-base">Fields rules: </p>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => append({ name: "", type: "text", rule: "contains", value: "", "relevance": "and" })}
                        >
                            Add field rule
                        </Button>
                    </div>

                    {/* Fields */}
                    <div className="flex flex-col gap-8">
                        {
                            controlledFields.map((fieldRule, index) => (
                                <div className="flex gap-6 border-b-2 pb-2 items-end flex-wrap relative max-w-[1050px]" key={fieldRule.id}>
                                    {
                                        index > 0 && (
                                            <Controller
                                                name={`fieldRules.${index}.relevance`}
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Field className="max-w-fit gap-2">
                                                        <Label>Field Relevance</Label>
                                                        <Select
                                                            name={field.name}
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger
                                                                className="w-full max-w-48 focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none"
                                                            >
                                                                <SelectValue placeholder="Select a type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="and">AND</SelectItem>
                                                                    <SelectItem value="or">OR</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </Field>
                                                )}
                                            />
                                        )}
                                    <div className="space-y-2">
                                        <Label>Field name</Label>
                                        <Input
                                            {...register(`fieldRules.${index}.name`)}
                                            placeholder="amount"
                                            className="focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none max-w-[200px]"
                                        />
                                    </div>

                                    <Controller
                                        name={`fieldRules.${index}.type`}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field className="max-w-[200px] gap-2">
                                                <Label>Field type</Label>
                                                <Select
                                                    name={field.name}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger
                                                        className="w-full max-w-48 focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none"
                                                    >
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="text">Text</SelectItem>
                                                            <SelectItem value="number">Number</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        )}
                                    />

                                    {/* Field rules */}
                                    {
                                        controlledFields[index]?.type === "number" ? (
                                            <NumberFieldRuleSelect key={fieldRule.id} control={control} index={index} />
                                        ) : controlledFields[index]?.type === "text" ? (
                                            <TextFieldRuleSelect key={fieldRule.id} control={control} index={index} />
                                        ) : null
                                    }

                                    <div className="space-y-2">
                                        <Label>Expected value</Label>
                                        <Input
                                            type={controlledFields[index]?.type === "number" ? "number" : "text"}
                                            {...register(`fieldRules.${index}.value`)}
                                            placeholder="200"
                                            className="focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none max-w-[200px]"
                                        />
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                        className="absolute left-full top-0 translate-y-1/2 py-0 text-gray-600 hover:text-red-600 cursor-pointer transition-colors duration-200 flex items-center justify-center"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="size-5" />
                                    </Button>
                                </div>
                            ))
                        }
                    </div>
                </section>

                <div className="justify-end flex gap-4 py-2 mt-20">
                    <Button type="submit" className="cursor-pointer" disabled={isPending}>
                        {
                            isPending ? "Updating..." : "Update"
                        }
                    </Button>
                </div>
            </form>
        </div >
    )
}

interface FieldRuleSelectProps {
    control: Control<UPDATE_EVENT_CATEGORY_TYPE>,
    index: number,
}

function TextFieldRuleSelect({ control, index }: FieldRuleSelectProps) {
    useWatch({
        name: "fieldRules",
        control
    })

    return (
        <Controller
            name={`fieldRules.${index}.rule`}
            control={control}
            render={({ field, fieldState }) => (

                <Field className="max-w-[200px] gap-2">
                    <FieldLabel>Field rule</FieldLabel>
                    <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue="contains"
                    >
                        <SelectTrigger
                            className="w-full max-w-48 focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none"
                        >
                            <SelectValue placeholder="Select a rule" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="contains">contains</SelectItem>
                                <SelectItem value="notContain">doesn't contain</SelectItem>
                                <SelectItem value="eq">exactly equal to</SelectItem>
                                <SelectItem value="startsWith">starts with</SelectItem>
                                <SelectItem value="endsWith">ends with</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )} />
    )
}

function NumberFieldRuleSelect({ control, index }: FieldRuleSelectProps) {
    useWatch({
        name: "fieldRules",
        control
    })

    return (
        <Controller
            name={`fieldRules.${index}.rule`}
            control={control}
            render={({ field, fieldState }) => (

                <Field className="max-w-[200px] gap-2">
                    <FieldLabel>Field rule</FieldLabel>
                    <Select
                        name={field.name}
                        value={field.value}
                        defaultValue="lt"
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger
                            className="w-full max-w-48 focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none"
                        >
                            <SelectValue placeholder="Select a rule" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="lt">less than</SelectItem>
                                <SelectItem value="gt">greater than</SelectItem>
                                <SelectItem value="eq">equal to</SelectItem>
                                <SelectItem value="neq">not equal to</SelectItem>
                                <SelectItem value="lte">less than or equal to </SelectItem>
                                <SelectItem value="gte">greater than or equal to </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )} />
    )
}