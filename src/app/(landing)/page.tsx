// Libs
import { Check, Star } from "lucide-react"
import Image from "next/image"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Components
import MaxWidthWrapper from "@/components/max-width-wrapper"
import Heading from "@/components/heading"
import ShinyButton from "@/components/shiny-button"
import MockDiscordUI from "@/components/mock-discord-ui"
import MockTelegramUI from "@/components/mock-telegram-ui";
import MockSlackUI from "@/components/mock-slack-ui"
import { AnimatedList } from "@/components/ui/animated-list"
import DiscordMessage from "@/components/discord-message"
import { Icons } from "@/components/icons";

export default async function HomePage() {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "zoe.martinez2001@email.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`

  return (
    <>
      <section className="py-24 sm:py-32 sm:pb-90 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="mx-auto w-full flex flex-col text-center gap-10 items-center">
            <div>
              <Heading>
                <span className="leading-12">Real-Time Insights</span>
                <br />

                {
                  /*
                    bg-clip-text: make the background given to the task as a mask
                    text-transparent: required to remove the original text color to take the mask
                  */
                }
                <span className="bg-linear-to-r block leading-14 text-transparent bg-clip-text from-brand-700 to-brand-800">Delivered to You wherever you are </span>
              </Heading>
            </div>

            {
              /*
              max-w-prose: max-width: 65ch;
              Around 60–70 characters per line is considered the optimal reading width for long text. 
              This makes paragraphs easier to read and prevents very long lines.


              text-pretty: makes the text wrap, so a single word isn't left alone on a line for instance
              */
            }
            <p className="text-base/7 max-w-prose text-gray-600 text-pretty text-center">
              Get instant notifications for {" "}
              <span className="font-semibold text-gray-700">sales, new users, or any other event</span> {" "}
              send directly to your discord, slack or telegram
            </p>

            <ul className="flex flex-col space-y-2 text-base/7 text-gray-600 text-left items-start">
              {["Real-Time alerts for critical events",
                "Buy once, use forever",
                "Track sales, new users, or any other event"
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center">
                  <Check className="size-5 text-brand-600" />
                  <span>{item}</span>
                </li>
              ))
              }
            </ul>

            <ShinyButton href="/sign-up" className="py-6 px-12 text-base shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-80 w-full">
              Start For Free Today
            </ShinyButton>
          </div>
        </MaxWidthWrapper>
      </section>

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
              className="rounded-xl bg-gray-900/5 ring-1 ring-inset hover:ring-gray-900/40 min-w-[90%] mx-auto
             ring-gray-900/10 peer/a lg:rounded-2xl lg:p-4 lg:-m-4 p-2 -m-2 absolute xl:left-[20%] max-xl:left-1/2 max-xl:-translate-x-1/2 xl:w-[95%]
              xl:opacity-60 hover:opacity-100  hover:xl:-translate-y-[calc(50%+60px)] transition-all
              duration-400 hover:z-100 z-10 top-1/2 -translate-y-1/2 w-fit
              max-xl:active:-translate-y-[calc(50%+100px)]
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

            <div className="rounded-xl bg-gray-900/5 ring-1 ring-inset hover:ring-gray-900/40 min-w-[90%] mx-auto
            max-xl:top-[calc(50%+80px)] max-xl:shadow-2xl
            ring-gray-900/10 peer/b lg:rounded-2xl lg:p-4 lg:-m-4 p-2 -m-2 absolute xl:left-[50%] max-xl:left-1/2 max-xl:-translate-x-1/2 
             xl:opacity-60 hover:opacity-100 transition-all duration-400 hover:z-100 z-20
             xl:top-1/2 hover:xl:-translate-y-[calc(50%+60px)] max-xl:-translate-y-1/2 w-fit
             max-xl:active:-translate-y-[calc(50%+200px)]
             "
            >
              <MockSlackUI>
              </MockSlackUI>
            </div>

            <div className="rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/40 peer-hover/a:ring-gray-900/10 min-w-[90%] mx-auto
             max-xl:top-170 peer-hover/b:ring-gray-900/10 peer-hover/b:-translate-y-[50%] peer-hover/a:-translate-y-[50%]  max-xl:left-1/2 max-xl:-translate-x-1/2 
              lg:rounded-2xl lg:p-4 peer-hover/a:opacity-60 peer-hover/b:opacity-60 lg:-m-4 p-2 -m-2 absolute
              xl:left-[35%] opacity-100 hover:opacity-100  -translate-y-[calc(50%+60px)] transition-all
              duration-400 hover:z-100 z-30 top-1/2 -translate-y-1/2 w-fit
              max-xl:active:-translate-y-[calc(50%+300px)]
              "
            >
              <MockTelegramUI>
              </MockTelegramUI>
            </div>

          </div>
        </div>
      </section>

      <section className="sm:py-32 py-24 max-xl:py-48 bg-brand-25">
        <MaxWidthWrapper>
          <div className="pb-20">
            <h2 className="text-brand-600 font-medium text-xl pb-2 text-center">Intuitive Monitoring</h2>
            <Heading className="text-center">Stay ahead with real-time insights</Heading>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 lg:grid-rows-2">
            <div className="bg-white xl:px-10 px-8 sm:pt-10 pt-8 rounded-tl-4xl rounded-bl-4xl rounded-t-md ring-2 ring-black/3 shadow-sm shadow-gray-200 lg:row-span-2 relative h-full flex flex-col overflow-hidden">
              {/* max-lg: text-center --> text-center from 0 all the way to large screens exclusively */}
              {/* tracking-tight: reduce the letter spacing */}
              <h3 className="font-medium tracking-tight text-brand-950 text-center pb-2 text-lg/7">Real-time notifications</h3>
              <p className="text-gray-600 text-sm/6 max-w-lg mx-auto text-center"> Get notified about critical events the moment they happen,
                no matter if you're at home or on the go.</p>

              {/* theme(borderRadius.xl): to get the tailwind xl radius value */}
              {/* if we have a box, and another box inside with the same rounding, there will be spacing between them on the rounds, that's way there's an additional 2px added here */}
              {/* @container: so we can use media queries to the parent instead of the viewport: @md --> when the parent div is larger than md screens, or cqw: 1% percentage of the container (div) width */}
              {/* fill --> sets image position: absolute, thus the parent should be positioned element (relative, absolute, fixed) */}
              {/* If we don't set relative to the parent of the image, it will go (0 top, 0 left) of the first relative parent, thus covering the border around it given to its direct parent */}
              {/* overflow-hidden: the image itself isn't rounded, so it will overflow the element, so we can either add overflow-hidden or add the same rounding to the image */}
              <div className="min-h-[30rem] @container relative max-lg:mx-auto max-lg:max-w-sm grow w-full flex">
                <div className="bg-gray-800 h-full border-t-[3cqw] border-x-[3cqw] rounded-t-[12cqw] border-gray-600 relative inset-x-0 bottom-0 top-10 overflow-hidden w-full shadow-2xl">
                  <Image
                    src="/phone-screen.png"
                    alt="Phone screen displaying app interface"
                    className="object-cover object-top"
                    fill
                  />
                </div>
              </div>
            </div>

            <div className="bg-white sm:px-10 px-8 sm:pt-10 pt-8 rounded-xl ring-2 ring-black/3 shadow-sm shadow-gray-200 relative h-full flex flex-col">
              <h3 className="font-medium tracking-tight text-brand-950 text-center pb-2 text-lg/7">Track Any Event</h3>
              <p className="text-gray-600 text-sm/6 max-w-lg mx-auto text-center">
                From new user signups to successful payments, BirdoBot
                notifies you for all critical events in your SaaS.
              </p>
              <div className="mt-6 flex flex-col justify-center items-center">
                <Image
                  className="w-full max-lg:max-w-xs"
                  src="/bento-any-event.png"
                  alt="Bento box illustrating event tracking"
                  width={500}
                  height={300}
                />
              </div>
            </div>

            <div className="bg-white sm:px-10 px-8 sm:pt-10 pt-8 rounded-xl ring-2 ring-black/3 shadow-sm shadow-gray-200 relative h-full flex flex-col lg:col-start-2 lg:row-start-2">
              <h3 className="font-medium tracking-tight text-brand-950 text-center mx-auto pb-2 text-lg/7">Track Any Properties</h3>
              <p className="text-gray-600 text-sm/6 max-w-lg mx-auto text-center">
                Add any custom data you like to an event, such as a user
                email, a purchase amount or an exceeded quota.
              </p>

              <div className="flex flex-col justify-center items-center max-lg:pb-12 max-lg:pt-10 lg:pb-2 flex-1">
                <Image
                  className="w-full max-lg:max-w-xs"
                  src="/bento-custom-data.png"
                  alt="Bento box illustrating custom data tracking"
                  width={500}
                  height={300}
                />
              </div>
            </div>

            <div className="bg-white sm:px-10 px-8 sm:pt-10 pt-8 rounded-tr-4xl rounded-br-4xl rounded-t-md ring-2 ring-black/3 shadow-sm shadow-gray-200 lg:row-span-2 relative h-full flex flex-col overflow-hidden">
              {/* max-lg: text-center --> text-center from 0 all the way to large screens exclusively */}
              {/* tracking-tight: reduce the letter spacing */}
              <h3 className="font-medium tracking-tight text-brand-950 text-center pb-2 text-lg/7">
                Easy Integration
              </h3>
              <p className="text-gray-600 text-sm/6 max-w-lg mx-auto text-center">
                Connect BirdoBot with your existing workflows in minutes
                and call our intuitive logging API from any language.
              </p>

              <div className="relative min-h-[30rem]">
                <div className="bg-gray-900 h-full mt-6 absolute top-10 left-10 w-full rounded-tl-2xl shadow-2xl">
                  <div className="h-10 bg-gray-700/40 w-full rounded-tl-2xl">
                    <div className="bg-white/10 w-fit text-white px-4 h-full border-b border-r border-white/20 font-medium text-sm/6 flex items-center justify-center">RingRang.js</div>
                  </div>

                  <SyntaxHighlighter
                    language="typescript"
                    style={{
                      ...oneDark,
                      'pre[class*="language-"]': {
                        ...oneDark['pre[class*="language-"]'],
                        background: "transparent",
                        overflow: "hidden",
                      },
                      'code[class*="language-"]': {
                        ...oneDark['code[class*="language-"]'],
                        background: "transparent",
                      },
                    }}
                  >
                    {codeSnippet}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="sm:py-32 py-24">
        <MaxWidthWrapper>
          <div className="pb-20">
            <h2 className="text-brand-600 font-medium text-xl pb-2 text-center">Real-World Experiences</h2>
            <Heading className="text-center">What our customers say</Heading>
          </div>

          <div className="grid max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2 grid-cols-1 lg:divide-x max-lg:divide-y divide-gray-200">
            <div className="bg-brand-25 sm:px-8 lg:p-10 px-6 p-6 rounded-tl-xl lg:rounded-bl-xl">
              <div className="flex gap-2 items-center justify-center">
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
              </div>

              <p className="text-pretty sm:pt-8 pt-6 lg:max-w-2xl max-w-xl mx-auto font-medium text-center sm:text-lg/8 text-base text-brand-950 tracking-tight">
                BirdoBot has been a game-changer for me. I've been using it for
                two months now and seeing sales pop up in real-time is super
                satisfying.
              </p>

              <div className="flex flex-col justify-center items-center mt-6">
                <Image src="/user-1.png" alt="User 1" width={48} height={48} className="rounded-full object-cover" />
                <div className="flex flex-row gap-2 items-center pt-4">
                  <p className="font-medium">Pieter Mark</p>
                  <Icons.verificationBadge className="size-4" />
                </div>
                <p className="text-gray-500 text-sm">@pietermk</p>
              </div>

            </div>
            <div className="bg-brand-25 sm:px-8 lg:p-10 px-6 p-6 rounded-br-xl lg:rounded-tr-xl">
              <div className="flex gap-2 items-center justify-center">
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
              </div>

              <p className="text-pretty sm:pt-8 pt-6 lg:max-w-2xl max-w-xl mx-auto font-medium text-center sm:text-lg/8 text-base text-brand-950 tracking-tight">
                BirdoBot been paying off for our SaaS. Nice to have simple
                way to see how we're doing day-to-day. Definitely makes our
                lives easier.
              </p>

              <div className="flex flex-col justify-center items-center mt-6">
                <Image src="/user-1.png" alt="User 1" width={48} height={48} className="rounded-full object-cover" />
                <div className="flex flex-row gap-2 items-center pt-4">
                  <p className="font-medium">Pieter Mark</p>
                  <Icons.verificationBadge className="size-4" />
                </div>
                <p className="text-gray-500 text-sm">@pietermk</p>
              </div>

            </div>
          </div>

          <ShinyButton href="/sign-up" className="py-6 px-12 text-base shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-80 mt-10 mx-auto w-full">
            Start For Free Today
          </ShinyButton>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
