// Libs
import { EllipsisVertical, Instagram, Menu, Paperclip, Phone, Search, Smile } from "lucide-react";
import Image from "next/image.js";
import { PropsWithChildren } from "react";

export default function MockTelegramUI({ children }: PropsWithChildren) {
    return (
        <div className="bg-gray-700 min-h-[800px]  max-w-[800px] shadow-2xl relative flex w-full overflow-hidden">
            <div className=" lg:hidden flex-col items-center w-[75] h-[800px] bg-telegram-background gap-4 border-r border-gray-200">
                <div className="flex items-center justify-center pt-4 pb-3">
                    <Menu className="text-gray-500 size-4 text-center" />
                </div>
                <div className="hover:bg-telegram-gray cursor-not-allowed pb-2 flex items-center gap-4 relative px-2 py-2">
                    <Image
                        src="/brand-asset-profile-picture.png"
                        alt="PingPong Avatar"
                        width={32}
                        height={32}
                        className="w-[32px] h-[32px] rounded-full object-cover"
                    />

                    <div className="bg-telegram-brand-color size-4 rounded-xl absolute bottom-1 right-1 mx-[2px] text-[12px] flex justify-center items-center text-white">1</div>
                </div>

                <div className="space-y-3 px-2">
                    {
                        ["Ahmed", "John", "Frank", "Mohamed", "Marina"].map((name, i) => (
                            <div key={i} className="hover:bg-telegram-gray cursor-not-allowed flex justify-center items-center relative">
                                <div className="bg-discord-background rounded-full w-[32px] h-[32px]" />

                                <div className="bg-gray-400 size-4 rounded-xl absolute -bottom-1 -right-1 mx-[2px] text-[12px] flex justify-center items-center text-white">
                                    {Math.floor(Math.random() * 9 + 1)}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="bg-telegram-background w-55 hidden lg:flex flex-col pt-2 border-r border-gray-200">
                <div className="flex items-center pb-4 gap-2 px-2 ">
                    <Menu className="text-gray-400 size-5 text-center cursor-not-allowed" />
                    <div className="bg-telegram-gray w-full text-gray-400 px-4 h-6 text-[10px] rounded-xl cursor-not-allowed flex items-center ">
                        Search
                    </div>
                </div>
                <div>
                    <div className="hover:bg-telegram-gray cursor-not-allowed pb-2 flex items-center gap-4 relative px-2 py-2">
                        <Image
                            src="/brand-asset-profile-picture.png"
                            alt="PingPong Avatar"
                            width={32}
                            height={32}
                            className="w-[32px] h-[32px] rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <p className="text-gray-600 text-[14px] font-medium">BirdoBot Bot</p>
                            <p className="text-gray-400 text-[11px]">A new sale!</p>
                        </div>

                        <div className="bg-telegram-brand-color size-4 rounded-xl absolute bottom-3 right-1 mx-[2px] text-[12px] flex justify-center items-center text-white">1</div>
                    </div>

                    <div className="space-y-px">
                        {
                            ["Ahmed", "John", "Frank", "Mohamed", "Marina"].map((name, i) => (
                                <div key={i} className="hover:bg-telegram-gray cursor-not-allowed py-2 flex items-center gap-4 relative px-2 py-2">
                                    <div className="bg-discord-background rounded-full w-[32px] h-[32px]" />
                                    <div className="flex flex-col">
                                        <p className="text-gray-600 text-[14px] font-medium">{name}</p>
                                        <p className="text-gray-400 text-[11px] line-clamp-1 pr-1">
                                            {
                                                [
                                                    "Have you heard the last news!",
                                                    "We don't miss you",
                                                    "We'll get divorced next wednesday",
                                                    "I don't like you",
                                                    "You've changed a lot since we last met"
                                                ][i]
                                            }
                                        </p>
                                    </div>

                                    <div className="bg-gray-400 size-4 rounded-xl absolute bottom-3 right-1 mx-[2px] text-[12px] flex justify-center items-center text-white">
                                        {Math.floor(Math.random() * 9 + 1)}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="xl:w-100 w-fll flex flex-col flex-1">
                <div className="flex pl-4 bg-telegram-background w-full h-11  items-center border-b">
                    <p className="text-gray-800 pl-3 font-medium text-sm">BirdoBot</p>

                    <div className="mr-[18px] ml-auto sm:flex hidden gap-3 text-gray-400">
                        <Search className="size-4 hover:text-gray-500 cursor-not-allowed" />
                        <Phone className="size-4 hover:text-gray-500 cursor-not-allowed" />
                        <EllipsisVertical className="size-4 hover:text-gray-500 cursor-not-allowed" />
                    </div>
                </div>

                {/*Message History*/}
                <div
                    className="pt-auto px-6 h-full flex items-end pb-6 relative"
                >
                    <Image
                        src="/telegram-background.jpg"
                        fill
                        alt="Telegram Background"
                        className="absolute inset-0 w-full h-full object-cover" />

                    {children}
                </div>

                {/* Message Input */}
                <div className="w-full">
                    <div className="bg-telegram-background  flex items-center">
                        <Paperclip className="size-7 text-gray-400 hover:text-gray-500 cursor-not-allowed mx-3" />
                        <input readOnly placeholder="write a message..."
                            className="w-full placeholder:text-gray-400 text-gray-500 focus:outline-none outline-none py-2.5 px-1 text-sm" />

                        <div className="flex mx-3 gap-3 items-center text-[#b9bbbe]">
                            <Smile className="text-gray-400 hover:text-gray-500 size-5 cursor-not-allowed" />
                            <Instagram className="text-gray-400 hover:text-gray-500 size-5 cursor-not-allowed" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
