// Components
import Heading from "@/components/heading"
import MockDiscordUI from "@/components/mock-discord-ui"
import MockTelegramUI from "@/components/mock-telegram-ui";
import MockSlackUI from "@/components/mock-slack-ui"
import { AnimatedList } from "@/components/ui/animated-list"
import DiscordMessage from "@/components/discord-message"
import { Icons } from "@/components/icons";

export default function MockApps() {
    return (
        <section className="pb-4 relative bg-brand-25 w-full">
            <div className="pb-5">
                <h2 className="text-brand-600 font-medium text-xl pb-2 text-center">Smart Routing</h2>
                <Heading className="text-center">You choose the channel for each event category</Heading>
            </div>
            <div className="flex justify-center gap-2 items-center pb-10 xl:pb-30">
                <div className="bg-discord-brand-color/90 text-white w-fit rounded-lg p-1 text-sm cursor-pointer">
                    <Icons.discord className="size-4" />
                </div>
                <div className="bg-telegram-brand-color/90 text-white w-fit rounded-lg p-1 text-sm cursor-pointer">
                    <Icons.telegram className="size-4" />
                </div>
                <div className="bg-slack-brand-color/90 text-white w-fit rounded-lg p-1 text-sm cursor-pointer">
                    <Icons.slack className="size-4" />
                </div>
                <div className="bg-email-brand-color/90 text-white w-fit rounded-lg p-1 text-sm cursor-pointer">
                    <Icons.email className="size-4 text-white" />
                </div>
            </div>
            <div className="mx-auto relative w-full">


                {
                    /**
                     * bottom-24 with top-24 makes the item takes the height from top-24 to bottom-24
                     * 
                     *  giving the item inside maxWidthWrapper relative prop makes it above the absolute sibling above it
                     * 
                     * p-4: makes a space between the content and the border (ring) but also pushes the element to the inside
                     * -m-4: make up for the padding which pushes the element and bring it as a whole to the outside
                     */
                }
                <div className="bg-brand-700 absolute bottom-24 top-24 inset-x-0"></div>
                <div className="relative min-h-[900px]">
                    <div
                        className="rounded-xl bg-gray-900/5 ring-1 ring-inset hover:ring-gray-900/40 max-xl:min-w-[90%] mx-auto
                     ring-gray-900/10 peer/a lg:rounded-2xl lg:p-4 lg:-m-4 p-2 -m-2 absolute 2xl:left-[20%] xl:left-[10%] max-xl:left-1/2 max-xl:-translate-x-1/2 
                      xl:opacity-60 hover:xl:opacity-100  hover:xl:-translate-y-[calc(50%+60px)] transition-all
                      duration-400 hover:z-[50] z-10 top-1/2 -translate-y-1/2 w-fit
                      "
                    >
                        <MockDiscordUI>
                            <AnimatedList>
                                <DiscordMessage
                                    avatarAlt="Birdo Avatar"
                                    avatarSrc="/brand-asset-profile-picture.png"
                                    badgeColor="#43b581"
                                    badgeText="SignUp"
                                    content={{
                                        name: "Abdo Emad",
                                        email: "abdo.emad@gmail.com"
                                    }}
                                    timestamp="Today at 12.35PM"
                                    title="👤 New user signed up"
                                    username="Birdo"
                                />
                                <DiscordMessage
                                    avatarSrc="/brand-asset-profile-picture.png"
                                    avatarAlt="Birdo Avatar"
                                    username="Birdo"
                                    timestamp="Today at 12:35PM"
                                    badgeText="Revenue"
                                    badgeColor="#faa61a"
                                    title="💰 Payment received"
                                    content={{
                                        amount: "$49.00",
                                        email: "zoe.martinez2001@email.com",
                                        plan: "PRO",
                                    }}
                                />
                                <DiscordMessage
                                    avatarSrc="/brand-asset-profile-picture.png"
                                    avatarAlt="Birdo Avatar"
                                    username="Birdo"
                                    timestamp="Today at 5:11AM"
                                    badgeText="Milestone"
                                    badgeColor="#5865f2"
                                    title="🚀 Revenue Milestone Achieved"
                                    content={{
                                        recurringRevenue: "$5.000 USD",
                                        growth: "+8.2%",
                                    }}
                                />
                            </AnimatedList>
                        </MockDiscordUI>
                    </div>

                    <div className="rounded-xl bg-gray-900/5 ring-1 ring-inset hover:ring-gray-900/40 max-xl:min-w-[92%] mx-auto
                    max-xl:top-[calc(50%+80px)] max-xl:shadow-2xl 
                    ring-gray-900/10 peer/b lg:rounded-2xl lg:p-4 lg:-m-4 p-2 -m-2 absolute 2xl:left-[50%] xl:left-[40%] max-xl:left-1/2 max-xl:-translate-x-1/2
                     xl:opacity-60 hover:opacity-100 transition-all duration-400 hover:z-50 z-20
                     xl:top-1/2 hover:xl:-translate-y-[calc(50%+60px)] -translate-y-[calc(50%)] max-xl:-translate-y-1/2 w-fit
                     "
                    >
                        <MockSlackUI>
                        </MockSlackUI>
                    </div>

                    <div className="rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/40 peer-hover/a:ring-gray-900/10 max-xl:min-w-[94%] mx-auto
                     max-xl:top-170 peer-hover/b:ring-gray-900/10 peer-hover/b:-translate-y-[50%] peer-hover/a:-translate-y-[50%]  max-xl:left-1/2 max-xl:-translate-x-1/2 
                      lg:rounded-2xl lg:p-4 peer-hover/a:opacity-60 peer-hover/b:opacity-60 lg:-m-4 p-2 -m-2 absolute
                      2xl:left-[35%] xl:left-[25%] opacity-100 hover:opacity-100  -translate-y-[calc(50%+60px)] transition-all
                      duration-400 hover:z-50 z-30 top-1/2 -translate-y-1/2 w-fit
                      "
                    >
                        <MockTelegramUI>
                        </MockTelegramUI>
                    </div>

                </div>
            </div>
        </section>
    )
}
