'use client'

// Libs
import { toast } from "sonner";
import Link from "next/link";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import Toaster from "@/components/ui/toaser";

interface AccountSettingsContentProps {
    discordId: string | null,
    telegramId: number | null
}

export default function AccountSettingsContent({ discordId: initialDiscordId, telegramId }: AccountSettingsContentProps) {
    const [discordId, setDiscordId] = useState(initialDiscordId)

    const { mutate: updateDiscordId, isPending } = useMutation({
        mutationFn: async (discordId: string) => {
            await client.user.updateDiscordId.$post({ discordId })
        },
        onError: () => {
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Account settings" children={
                    <div className="text-red-500 text-sm">
                        <p>Something went wrong while updating the discord ID.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <Link href="/contact-us" className="text-brand-700">contact us</Link></p>
                    </div>
                } />
            )
        },
        onSuccess: () => {
            toast.custom((t) =>
                <Toaster type="success" t={t} title="Account settings" children={
                    <div className="text-green-700 text-sm">
                        <p>Discord ID updated successfully.</p>
                    </div>
                } />
            )
        }
    })

    return (
        <div>
            <section>
                <Heading className="sm:text-2xl text-xl mb-2 flex items-center gap-2">
                    <div className="rounded-full text-white bg-brand-700 p-1">
                        <Icons.discord className="size-4" />
                    </div>
                    <span className="text-gray-600">
                        Discord
                    </span>
                </Heading>
                <div className="rounded-lg ring-1 shadow-sm hover:shadow-md transition-shadow ring-inset ring-gray-200 bg-white max-w-[600px] p-8">
                    <div className="space-y-2 mb-2">
                        <Label htmlFor="discordId">Discord ID</Label>
                        <Input
                            id="discordId"
                            onChange={(e) => setDiscordId(e.target.value)} value={discordId ?? ""}
                            className="focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none"
                        />
                    </div>

                    <Button className="mt-2" onClick={() => updateDiscordId(discordId ?? "")} disabled={isPending}>
                        {
                            isPending ? "Saving..." : "Save changes"
                        }
                    </Button>

                    <p className="text-sm/5 text-gray-700 mt-6 mb-2">
                        Don't know how to find your Discord channel ID? {" "}
                        <a href="#" title="How to obtain discord channel Id?" className="text-brand-700">Learn how to obtain it</a>
                    </p>

                    <p className="text-sm/5 text-gray-700 mb-2">
                        Haven't invited BirdoBot to your discord server yet? {" "}
                        <a href="#" title="Invite BirdoBot to your Discord server" className="text-brand-700">Click here to invite it</a>
                    </p>
                </div>
            </section>

            <section className="pt-10">
                <Heading className="sm:text-2xl text-xl mb-2 flex items-center gap-2">
                    <Icons.telegram className="size-5" />
                    <span className="text-gray-600">Telegram</span>
                </Heading>

                <div className="rounded-lg ring-1 shadow-sm hover:shadow-md transition-shadow ring-inset ring-gray-200 bg-white max-w-[700px] p-8">
                    {
                        telegramId ? (
                            <p className="text-sm/6 text-gray-700 mb-2">
                                Want to receive BirdBot insights on another telegram account? {" "}

                                <a className="text-brand-700 cursor-pointer">
                                    Click here to allow BirdoBot to send you insights on it
                                </a>
                            </p>
                        ) : (
                            <p className="text-sm/6 text-gray-700 mb-2">
                                You have no telegram account linked to BirdoBot yet. {" "}

                                <a className="text-brand-700 cursor-pointer">

                                    Click here to start receiving insights from BirdoBot on your telegram
                                </a>
                            </p>
                        )
                    }
                </div>
            </section>
        </div>
    )
}
