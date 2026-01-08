// Libs
import { ArrowLeft, ArrowRight, Bell, Bold, ChevronDown, Code2, CodeSquare, Cog, Ellipsis, EllipsisVertical, Files, Hash, Headphones, HistoryIcon, Home, Inbox, Instagram, Italic, Link, List, ListOrdered, LucideFilePenLine, LucideStar, Menu, MessagesSquareIcon, Mic, NotebookPen, NotebookTabs, Paperclip, Phone, Plus, Search, SendHorizonal, Settings, Smile, Strikethrough, TextQuoteIcon, Underline, UserCircle, Video } from "lucide-react";
import Image from "next/image.js";
import { PropsWithChildren } from "react";

export default function MockSlackUI({ children }: PropsWithChildren) {
    return (
        <div className="bg-gray-700 min-h-[800px]  max-w-[800px] shadow-2xl relative  w-full overflow-hidden">
            <div className="bg-slack-brand-color h-[40px] w-full flex justify-center items-center p-4">
                <div className=" hover:bg-slack-brand-color-light p-1 transition-colors flex items-center justify-center rounded-md">
                    <ArrowLeft className="size-4 text-white" />
                </div>
                <ArrowRight className="size-4 text-white/50 mx-2" />
                <div className=" hover:bg-slack-brand-color-light p-1 transition-colors flex items-center justify-center rounded-md">
                    <HistoryIcon className="size-4 text-white" />
                </div>

                <div className="bg-slack-brand-color-light w-8/12 ml-2 text-white px-2 h-7 py-2 text-[12px] rounded-sm cursor-not-allowed flex items-center">
                    Search Workspace
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col items-center w-[75] h-[800px] bg-slack-brand-color py-2 gap-8">
                    <div className="rounded-md size-8 text-lg flex justify-center items-center bg-[#ABABAD] cursor-not-allowed font-medium">B</div>
                    <div className="size-8 text-lg flex flex-col justify-center items-center  cursor-not-allowed group">
                        <div className="bg-slack-brand-color-light p-2 rounded-lg ">
                            <Home className="size-4 group-hover:scale-120 transition-transform duration-300 text-white" />
                        </div>
                        <span className="text-white text-[11px] font-medium">Home</span>
                    </div>
                    <div className="size-8 text-lg flex flex-col justify-center items-center  cursor-not-allowed group">
                        <div className="hover:bg-slack-brand-color-light transition-colors p-2 rounded-lg ">
                            <MessagesSquareIcon className="size-4 group-hover:scale-120 transition-transform duration-300 text-white" />
                        </div>
                        <span className="text-white text-[11px] font-medium">DMs</span>
                    </div>
                    <div className="size-8 text-lg flex flex-col justify-center items-center  cursor-not-allowed group">
                        <div className="hover:bg-slack-brand-color-light transition-colors p-2 rounded-lg ">
                            <Bell className="size-4 group-hover:scale-120 transition-transform duration-300 text-white" />
                        </div>
                        <span className="text-white text-[11px] font-medium">Activity</span>
                    </div>
                    <div className="size-8 text-lg flex flex-col justify-center items-center  cursor-not-allowed group">
                        <div className="hover:bg-slack-brand-color-light transition-colors p-2 rounded-lg ">
                            <Files className="size-4 group-hover:scale-120 transition-transform duration-300 text-white" />
                        </div>
                        <span className="text-white text-[11px] font-medium">Files</span>
                    </div>
                    <div className="size-8 text-lg flex flex-col justify-center items-center  cursor-not-allowed group">
                        <div className="hover:bg-slack-brand-color-light transition-colors p-2 rounded-lg ">
                            <Ellipsis className="size-4 group-hover:scale-120 transition-transform duration-300 text-white" />
                        </div>
                        <span className="text-white text-[11px] font-medium">More</span>
                    </div>

                    <div className="size-8 text-lg flex flex-col justify-center items-center  cursor-not-allowed group border-t border-slack-brand-color-light pt-8">
                        <div className="hover:bg-slack-brand-color-light transition-colors p-2 rounded-lg ">
                            <Settings className="size-4 group-hover:scale-120 transition-transform duration-300 text-white" />
                        </div>
                        <span className="text-white text-[11px] font-medium">Admin</span>
                    </div>
                </div>

                <div className="bg-slack-brand-color pb-1">
                    <div className="bg-slack-brand-color-light w-60 hidden lg:flex flex-col rounded-md rounded-tr-none rounded-br-none h-full px-2 pt-2">

                        <div className="flex justify-between items-center">
                            <div className="flex gap-1 items-center hover:bg-white/10 rounded-sm px-2 py-1 ">
                                <p className="font-bold text-sm text-white">Workspace</p>
                                <ChevronDown className="text-white size-3" />
                            </div>

                            <div className="flex items-center gap-1">
                                <div className=" hover:bg-white/10 p-1 transition-colors flex items-center justify-center rounded-md">
                                    <Settings className="size-4 text-white" />
                                </div>
                                <div className=" hover:bg-white/10 p-1 transition-colors flex items-center justify-center rounded-md">
                                    <LucideFilePenLine className="size-4 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="border-y border-white/10 my-2 px-2 py-2 space-y-2">
                            <div className="text-white flex items-center gap-2">
                                <Headphones className="size-4 text-white/60" />
                                <span className="text-sm text-white/70">Huddles</span>
                            </div>
                            <div className="text-white flex items-center gap-2">
                                <SendHorizonal className="size-4 text-white/60" />
                                <span className="text-sm text-white/70">Drafts & sent</span>
                            </div>
                            <div className="text-white flex items-center gap-2">
                                <NotebookTabs className="size-4 text-white/60" />
                                <span className="text-sm text-white/70">Directories</span>
                            </div>
                        </div>

                        <div className="px-2">
                            <div className="flex justify-between items-center hover:bg-white/10 rounded-sm py-1 px-2 -mx-2 group">
                                <div className="text-white flex items-center gap-2">
                                    <ChevronDown className="size-4 text-white/60" />
                                    <span className="text-sm text-white/70">Channels</span>
                                </div>

                                <div className=" hover:bg-white/10 p-1 transition-colors flex items-center justify-center rounded-md">
                                    <EllipsisVertical className="size-4 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-not-allowed" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 py-1 cursor-not-allowed rounded-sm px-2 -mx-2 bg-white">
                                <Hash className="size-3 text-slack-brand-color" />
                                <span className="text-[11px]  text-slack-brand-color">Birdo-Bot</span>
                            </div>
                            <div className="flex items-center gap-2 py-1 hover:bg-white/10 rounded-sm px-2 -mx-2 cursor-not-allowed">
                                <Hash className="size-3 text-white/60" />
                                <span className="text-[11px] text-white/70">Channel-2</span>
                            </div>
                            <div className="flex items-center gap-2 py-1 hover:bg-white/10 rounded-sm px-2 -mx-2 cursor-not-allowed">
                                <Hash className="size-3 text-white/60" />
                                <span className="text-[11px] text-white/70">Channel-3</span>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="xl:w-100 w-fll flex flex-col flex-1">
                    <div className="flex pl-4 bg-telegram-background w-full h-11  items-center border-b px-2">
                        <div className="text-gray-800 font-medium text-sm flex items-center gap-1">
                            <div className="border border-gray-200 rounded-md p-1 hover:bg-gray-100 transition-colors cursor-not-allowed pl-1 mr-2">
                                <LucideStar className="size-4" />
                            </div>
                            <Hash className="size-4" />
                            <span>BirdoBot</span>
                        </div>

                        <div className="ml-auto sm:flex hidden gap-1 text-gray-400">
                            <div className="border border-gray-200 rounded-md p-1 hover:bg-gray-100 transition-colors cursor-not-allowed">
                                <Search className="size-4 cursor-not-allowed" />
                            </div>
                            <div className="border border-gray-200 rounded-md p-1 hover:bg-gray-100 transition-colors cursor-not-allowed">
                                <Bell className="size-4 cursor-not-allowed" />
                            </div>
                        </div>
                    </div>

                    {/*Message History*/}
                    <div
                        className="pt-auto px-6 h-full flex items-end pb-6 relative bg-white"
                    >
                        {children}
                    </div>

                    {/* Message Input */}
                    <div className="px-2 py-2 bg-slack-background">
                        <div className="w-full border border-gray-200 rounded-md">
                            <div className="h-7 bg-gray-100 rounded-t-md px-2 py-1 flex items-center gap-2">
                                <Bold className="size-4 text-gray-400 hover:text-gray-500 cursor-not-allowed" />
                                <Italic className="size-4 text-gray-400 hover:text-gray-500 cursor-not-allowed" />
                                <Underline className="size-4 text-gray-400 hover:text-gray-500 cursor-not-allowed" />
                                <Strikethrough className="size-5 text-gray-400 hover:text-gray-500 cursor-not-allowed border-r pr-1 border-gray-300" />
                                <Link className="size-4 text-gray-400 hover:text-gray-500 cursor-not-allowed  " />
                                <ListOrdered className="size-4 text-gray-400 hover:text-gray-500 cursor-not-allowed" />
                                <List className="size-5 text-gray-400 hover:text-gray-500 cursor-not-allowed border-r pr-1 border-gray-300" />
                                <TextQuoteIcon className="size-4 text-gray-400 hover:text-gray-500 cursor-not-allowed " />
                                <Code2 className="size-4 text-gray-400 hover:text-gray-500 cursor-not-allowed " />
                                <CodeSquare className="size-4 text-gray-400 hover:text-gray-500 cursor-not-allowed " />
                            </div>
                            <div className="bg-telegram-background  flex items-center rounded-b-md h-14 relative">
                                <input readOnly placeholder="Message # BirdoBot"
                                    className="w-full placeholder:text-gray-500 text-gray-600 focus:outline-none outline-none pt-1.5 pb-8 px-2 text-[12px]" />

                                <div className="absolute bottom-1 left-0 px-1 flex items-center justify-between w-full">
                                    <div className="flex gap-1 items-center w-full">
                                        <div className="p-1 bg-gray-200 rounded-full cursor-not-allowed hover:bg-gray-300 transition-colors">
                                            <Plus className="size-3" />
                                        </div>
                                        <div className="p-1 group cursor-not-allowed border-r border-gray-200 pr-2">
                                            <Smile className="size-3 group-hover:rotate-45 group-hover:text-orange-700 transition-colors " />
                                        </div>
                                        <div className="p-1 hover:bg-gray-300 rounded-full cursor-not-allowed  transition-colors ml-1">
                                            <Video className="size-3" />
                                        </div>
                                        <div className="p-1  rounded-full cursor-not-allowed hover:bg-gray-300 transition-colors">
                                            <Mic className="size-3" />
                                        </div>
                                    </div>
                                    <SendHorizonal className="size-3 text-gray-700 cursor-not-allowed mr-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
