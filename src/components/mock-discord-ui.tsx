// Libs
import { Cog, Gift, Headphones, HelpCircle, Inbox, Menu, Mic, Phone, Pin, PlusCircle, Search, Smile, Sticker, UserCircle, Video } from "lucide-react";
import { Icons } from "./icons";
import Image from "next/image.js";
import { PropsWithChildren } from "react";

export default function MockDiscordUI({ children }: PropsWithChildren) {
    return (
        <div className="bg-gray-600 min-h-[800px] rounded-xl max-w-[800px] shadow-xl relative flex w-full overflow-hidden">
            <div className="p-4 hidden sm:flex flex-col w-[78px] h-[800px] bg-[#202225] gap-4">
                <div className="bg-discord-brand-color rounded-xl hover:rounded-lg hidden sm:flex flex-col justify-center items-center size-12">
                    <Icons.discord className="text-white size-3/5" />
                </div>
                <div className="w-8 mx-auto h-px bg-gray-500/40" />
                {
                    [...Array(5)].map((_, i) => (
                        <div className="relative w-full group">
                            <div className="bg-white rounded-full absolute -left-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 w-[7px] h-[7px] group-hover:scale-y-[2.5] transition-transform duration-200" />
                            <div key={i}
                                className="hover:bg-brand-700 duration-300 transition hover:rounded-2xl cursor-not-allowed rounded-full size-10 
                            bg-discord-background text-white/80 text-center flex flex-col items-center justify-center"
                            >
                                {String.fromCharCode(65 + i)}
                            </div>
                        </div>
                    ))
                }

                <div
                    className="hover:bg-green-700 duration-300 transition hover:rounded-2xl cursor-not-allowed mt-auto group
                 rounded-full size-12 bg-discord-background text-green-600 text-center flex flex-col items-center justify-center"
                >
                    <PlusCircle className="group-hover:text-white" />
                </div>
            </div>

            <div className="bg-[#2f3136] w-50 hidden lg:flex flex-col">
                <div className="h-16 flex items-center px-4 mb-4 border-b border-[#202225] border-sm">
                    <div className="bg-[#202225] w-full text-gray-500 px-2 h-8 py-2 text-[12px] rounded-sm cursor-not-allowed flex items-center">
                        Find or start a conversation
                    </div>
                </div>

                <div className="px-4 flex mb-2 items-center gap-4 text-discord-text cursor-not-allowed hover:bg-[#393c43] py-1.5 text-sm">
                    <UserCircle className="size-8 text-[#b9bbbe]" />
                    <span>Friends</span>
                </div>

                <div className="px-4 mb-4 flex items-center gap-4 text-discord-text cursor-not-allowed hover:bg-[#393c43] py-1.5 text-sm">
                    <Inbox className="size-8 text-[#b9bbbe]" />
                    <span>Nitro</span>
                </div>

                <div className="px-2 ">
                    <p className="px-2 uppercase text-sm  text-gray-500">Direct Messages</p>
                    <div className="hover:bg-[#393c43] cursor-not-allowed mt-4 py-2 px-2 flex items-center gap-4">
                        <Image
                            src="/brand-asset-profile-picture.png"
                            alt="PingPong Avatar"
                            width={32}
                            height={32}
                            className="w-[32px] h-[32px] rounded-full object-cover"
                        />
                        <p className="text-white font-medium">RingRang</p>
                    </div>

                    <div className="space-y-px">
                        {
                            [...Array(5)].map((_, i) => (
                                <div key={i} className="hover:bg-[#393c43] cursor-not-allowed py-2 px-2 flex items-center gap-4">
                                    <div className="bg-discord-background rounded-full w-[32px] h-[32px]" />
                                    <p className="text-gray-600 font-medium">User {i}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="mt-auto bg-discord-background w-full p-2 flex items-center">
                    <div className="bg-brand-700 rounded-full size-4" />
                    <div className="flex flex-col ml-2">
                        <p className="text-white text-[10px] font-medium">You</p>
                        <p className="text-[#b9bbbe] text-[10px]">@your_account</p>
                    </div>

                    <div className="flex gap-2 text-[#b9bbbe] ml-auto">
                        <Mic className="size-3 hover:text-white" />
                        <Headphones className="size-3 hover:text-white" />
                        <Cog className="size-3 hover:text-white" />
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col flex-1">
                <div className="flex pl-4 bg-[#36393f] w-full h-16 border-[#202225] border-sm items-center border-b">
                    <div className="md:hidden block mr-4">
                        <Menu className="size-5 hover:text-white cursor-pointer text-[#b9bbbe]" />
                    </div>
                    <div className="relative size-10">
                        <Image
                            src="/brand-asset-profile-picture.png"
                            alt="RingRang Avatar"
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <div className="absolute bg-green-400 rounded-full size-3 right-1 border-2 border-[#36393f] -bottom-1" />
                    </div>
                    <p className="text-white pl-3 font-medium">RingRang</p>

                    <div className="mr-[18px] ml-auto sm:flex hidden gap-3 text-[#b9bbbe]">
                        <Phone className="size-5 hover:text-white cursor-not-allowed" />
                        <Video className="size-5 hover:text-white cursor-not-allowed" />
                        <Pin className="size-5 hover:text-white cursor-not-allowed" />
                        <UserCircle className="size-5 hover:text-white cursor-not-allowed" />
                        <Search className="size-5 hover:text-white cursor-not-allowed" />
                        <Inbox className="size-5 hover:text-white cursor-not-allowed" />
                        <HelpCircle className="size-5 hover:text-white cursor-not-allowed" />
                    </div>
                </div>

                {/*Message History*/}
                <div className="bg-discord-background pt-auto px-6 h-full flex items-end pb-6 w-full">
                    {children}
                </div>

                {/* Message Input */}
                <div className="w-full p-4 bg-discord-background">
                    <div className="bg-[#40444b] rounded-lg p-1 flex items-center">
                        <PlusCircle className="size-7 text-white/70 hover:text-white cursor-not-allowed mx-3" />
                        <input readOnly placeholder="Message @RingRang"
                            className="w-full placeholder-discord-timestamp text-white/90 focus:outline-none outline-none py-2.5 px-1" />

                        <div className="flex mx-3 gap-3 items-center text-[#b9bbbe]">
                            <Gift className="hover:text-white size-5 cursor-not-allowed" />
                            <Sticker className="hover:text-white size-5 cursor-not-allowed" />
                            <Smile className="hover:text-white size-5 cursor-not-allowed" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
