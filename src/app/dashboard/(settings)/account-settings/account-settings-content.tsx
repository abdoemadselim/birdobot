'use client'

// Libs
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { useState } from "react";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import Toaster from "@/components/ui/toaser";


interface AccountSettingsContentProps {
    discordId: string | null,
    telegramId: string | null,
    telegramToken: string,
    slackId: string | null
}

export default function AccountSettingsContent({ discordId: initialDiscordId, telegramId: initialTelegramId, slackId: initialSlackId, telegramToken }: AccountSettingsContentProps) {
    const [discordId, setDiscordId] = useState(initialDiscordId)
    const [telegramId, setTelegramId] = useState(initialTelegramId)
    const [slackId, setSlackId] = useState(initialSlackId)
    const router = useRouter()

    const { mutate: updateDiscordId, isPending: isPendingDiscord } = useMutation({
        mutationFn: async (discordId: string) => {
            await client.user.updateDiscordId.$post({ discordId })
        },
        onError: () => {
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Account settings" children={
                    <div className="text-red-500 text-sm">
                        <p>Something went wrong while updating the discord ID.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <a href="mailto:support@birdobot.site" className="text-brand-700">contact us</a></p>
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

    const { mutate: updateTelegramId, isPending: isPendingTelegram } = useMutation({
        mutationFn: async (telegramId: string) => {
            await client.user.updateTelegramId.$post({ telegramId })
        },
        onError: () => {
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Account settings" children={
                    <div className="text-red-500 text-sm">
                        <p>Something went wrong while updating the telegram ID.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <a href="mailto:support@birdobot.site" className="text-brand-700">contact us</a></p>
                    </div>
                } />
            )
        },
        onSuccess: () => {
            toast.custom((t) =>
                <Toaster type="success" t={t} title="Account settings" children={
                    <div className="text-green-700 text-sm">
                        <p>Telegram ID updated successfully.</p>
                    </div>
                } />
            )
        }
    })

    const { mutate: updateSlackId, isPending: isPendingSlack } = useMutation({
        mutationFn: async (slackId: string) => {
            await client.user.updateSlackId.$post({ slackId })
        },
        onError: () => {
            toast.custom((t) =>
                <Toaster type="error" t={t} title="Account settings" children={
                    <div className="text-red-500 text-sm">
                        <p>Something went wrong while updating the slack Channel ID.</p>
                        <br />
                        <p className="text-gray-700"> Please try again or <a href="mailto:support@birdobot.site" className="text-brand-700">contact us</a></p>
                    </div>
                } />
            )
        },
        onSuccess: () => {
            toast.custom((t) =>
                <Toaster type="success" t={t} title="Account settings" children={
                    <div className="text-green-700 text-sm">
                        <p>Slack ID updated successfully.</p>
                    </div>
                } />
            )
        }
    })

    const searchParams = useSearchParams()
    const slack_error = searchParams.get("slack_error")
    const slack_linked = searchParams.get("slack_linked")

    return (
        <>
            {
                slack_error && (
                    <div className="absolute top-0 inset-0 w-full max-h-[60px] bg-red-500 text-white  text-center font-medium py-3 flex flex-col justify-center items-center text-md shadow-lg">
                        Failed to add BirdoBot to your slack workspace
                        <p className="text-sm pt-1 text-white/80">Try again or contact us at <a href="mailto:support@birdobot.site" className="text-brand-700">contact us</a></p>

                        <div className="p-2 rounded-full bg-red-600/80 hover:bg-red-800 transition-colors absolute right-4" onClick={() => router.replace("?")}>
                            <X className="size-5  text-white" />
                        </div>
                    </div>
                )
            }

            {
                slack_linked && (
                    <div className="absolute top-0 inset-0 w-full max-h-[60px] bg-green-600 font-medium text-white text-center py-3 flex flex-col justify-center items-center text-md shadow-lg">
                        BirdoBot is added to your workspace successfully! 🎉
                        <div className="p-2 rounded-full bg-white/20 hover:bg-green-800 transition-colors absolute right-4" onClick={() => router.replace("?")}>
                            <X className="size-5  text-white" />
                        </div>

                        <p className="text-sm text-white/80 pt-1">
                            Add the BirdoBot to a channel in the workspace now
                        </p>
                    </div>
                )
            }

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

                    <Button className="mt-2" onClick={() => updateDiscordId(discordId ?? "")} disabled={isPendingDiscord}>
                        {
                            isPendingDiscord ? "Saving..." : "Save changes"
                        }
                    </Button>

                    <p className="text-sm/5 text-gray-700 mb-2 mt-6 ">
                        Haven't invited BirdoBot to your discord server yet? {" "}
                        <a href="https://discord.com/oauth2/authorize?client_id=1459874272544817342&permissions=2048&integration_type=0&scope=bot" title="Invite BirdoBot to your Discord server" className="text-brand-700">Click here to invite it</a>
                    </p>

                    <p className="text-sm/5 text-gray-700 mb-2">
                        Don't know how to find your Discord channel ID? {" "}
                        <a href="https://discover.hubpages.com/technology/Discord-Channel-ID" title="How to obtain discord channel Id?" className="text-brand-700">Learn how to obtain it</a>
                    </p>
                </div>
            </section>

            <section className="pt-10">
                <Heading className="sm:text-2xl text-xl mb-2 flex items-center gap-2">
                    <Icons.telegram className="size-5" />
                    <span className="text-gray-600">Telegram</span>
                </Heading>

                <div className="rounded-lg ring-1 shadow-sm hover:shadow-md transition-shadow ring-inset ring-gray-200 bg-white max-w-[700px] p-8">
                    <div className="space-y-2 mb-2">
                        <Label htmlFor="telegramId">Telegram ID</Label>
                        <Input
                            id="telegramId"
                            onChange={(e) => setTelegramId(e.target.value)} value={telegramId ?? ""}
                            className="focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none"
                        />

                        <Button className="mt-2" onClick={() => updateTelegramId(telegramId ?? "")} disabled={isPendingTelegram}>
                            {
                                isPendingTelegram ? "Saving..." : "Save changes"
                            }
                        </Button>
                    </div>
                    <p className="text-sm/6 text-gray-700 mb-2 pt-4">
                        Haven't started a chat with BirdoBot yet? {" "}

                        <a className="text-brand-700 cursor-pointer" href={`https://t.me/BirdoChatBot?start=${telegramToken}`}>
                            Click here to allow BirdoBot to send you insights
                        </a>
                    </p>

                    <p className="text-sm/6 text-gray-700 mb-1">
                        Don't know how to find the telegram chat ID? {" "}
                    </p>
                    <ol className="text-sm/6 text-gray-700 mb-2">
                        <li>1. search for <strong>userinfobot</strong> to get your own telegram id</li>
                        <li>2. type <strong>@mychannel</strong>.</li>
                        <li>3. copy the <strong>id</strong></li>
                    </ol>
                </div>
            </section>

            {/* SLACK */}
            <section className="pt-10">
                <Heading className="sm:text-2xl text-xl mb-2 flex items-center gap-2">
                    <Icons.slack className="size-5" />
                    <span className="text-gray-600">Slack</span>
                </Heading>
                <div className="rounded-lg ring-1 shadow-sm hover:shadow-md transition-shadow ring-inset ring-gray-200 bg-white max-w-[700px] p-8 relative">
                    <div className="space-y-2 mb-2">
                        <Label htmlFor="slackId">Slack Channel Name</Label>
                        <Input
                            id="slackId"
                            placeholder="#name"
                            onChange={(e) => setSlackId(e.target.value)} value={slackId ?? ""}
                            className="focus:ring-brand-200! focus-visible:border-0 focus-visible:border-brand-700 focus-visible:outline-none"
                        />

                        <Button className="mt-2" onClick={() => updateSlackId(slackId ?? "")} disabled={isPendingSlack}>
                            {
                                isPendingSlack ? "Saving..." : "Save changes"
                            }
                        </Button>
                    </div>


                    <p className="text-sm/5 text-gray-700 mb-2 mt-6">
                        Haven't added BirdoBot to your workspace yet? {" "}
                        <a
                            className="mt-2 block"
                            href="https://slack.com/oauth/v2/authorize?client_id=10243884054085.10322356370134&scope=chat:write&state=account">
                            <img
                                alt="Add to Slack"
                                height="40"
                                width="139"
                                src="https://platform.slack-edge.com/img/add_to_slack.png"
                                srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                            />
                        </a>
                    </p>
                </div>
            </section>
        </>
    )
}
