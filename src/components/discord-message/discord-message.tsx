// Libs
import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"
import Image from "next/image"

interface DiscordMessageProps {
    username: string,
    avatarSrc: string,
    avatarAlt: string,
    // to take into consideration any key value pairs type as long as the key is string like (amount: number or email: adasdas@gmail.com or plan: pro)
    content: {
        [key: string]: string
    },
    timestamp: string,
    badgeText: string,
    badgeColor: string,
    title: string,
}

// string & {} for adding string to the type, so it's color1, or color2, or any string
type BadgeColorType = "#43b581" | "#faa61a" | string & {}

const getBadgeStyles = (badgeColor: BadgeColorType) => {
    switch (badgeColor) {
        case "#43b581":
            return "bg-green-500/10 text-green-400 ring-green-500/20"
        case "#faa61a":
            return "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20"
        default:
            return "bg-gray-500/10 text-gray-400 ring-gray-500/20"
    }
}

export default function DiscordMessage({ avatarAlt, avatarSrc, badgeColor, badgeText, content, timestamp, title, username }: DiscordMessageProps) {
    return (
        <div className="max-w-6xl">
            <div className="flex items-start gap-2">
                <Image
                    src={avatarSrc}
                    alt={avatarAlt}
                    width={42}
                    height={42}
                    className="w-[42px] h-[42px] rounded-full object-cover"
                />

                <div className="w-full">
                    <div className="flex gap-2">
                        <h3 className="text-white font-semibold">{username}</h3>
                        <div className="bg-brand-700 text-white rounded px-2 text-sm font-medium flex items-center justify-center">APP</div>
                        <p className="text-gray-400/70 text-sm">{timestamp}</p>
                    </div>

                    <div className="bg-[#2f3136] w-full mt-2 rounded-sm p-4">
                        <div className="flex items-start justify-between">
                            {/* text-base/7   --> this is both font size and line height */}
                            <p className="text-white text-base/7 font-semibold mb-2">{title}</p>
                            <div className={cn("text-sm px-2 rounded", getBadgeStyles(badgeColor))}>{badgeText}</div>
                        </div>
                        {
                            Object.entries(content).map(([key, value]) => (
                                <p key={key + value} className="text-discord-text text-sm/6"><span className="text-[#b9bbbe]">{key}: </span>{value}</p>
                            ))
                        }

                        <p className="flex items-center text-discord-timestamp text-xs gap-2 mt-4">
                            <Clock className="size-3" />
                            {timestamp}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
