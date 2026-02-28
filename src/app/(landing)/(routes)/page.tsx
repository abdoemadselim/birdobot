// Libs
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MessageCircle, Zap, Shield } from "lucide-react";

// Components
import MaxWidthWrapper from "@/components/max-width-wrapper"
import Heading from "@/components/heading"
import ShinyButton from "@/components/shiny-button"
import BirdsPattern from "@/components/birds-pattern";
import PlanetCanvasContainer from "@/components/planetCanvas/planet-canvas-container";
import MockApps from "../mock-apps";
import ServicePreview from "../service-preview";

const CHANNELS = [
  { name: "Discord", color: "bg-[#5865f2]/10 text-[#5865f2] border-[#5865f2]/20" },
  { name: "Slack", color: "bg-[#471348]/10 text-[#471348] border-[#471348]/20" },
  { name: "Telegram", color: "bg-[#24A1DE]/10 text-[#24A1DE] border-[#24A1DE]/20" },
];

const PILLS = [
  { icon: Zap, label: "Real-time" },
  { icon: MessageCircle, label: "One API, all channels" },
  { icon: Shield, label: "Buy once, use forever" },
];

export default async function HomePage() {
  const user = await currentUser()
  if (user) redirect("/dashboard")

  return (
    <>
      {/* Hero section */}
      <section className="relative py-28 sm:py-36 sm:pb-50 overflow-hidden">
        {/* Background: gradient mesh + subtle birds */}
        <div
          className="absolute inset-0 z-0"
          aria-hidden
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-200/30 rounded-full blur-[120px] -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-brand-100/40 rounded-full blur-[100px] translate-y-1/3 translate-x-1/4" />
          <div className="opacity-[0.07] z-0 absolute top-[420px] left-1/2 -translate-x-1/2 max-h-[360px] overflow-hidden max-w-full pointer-events-none">
            <BirdsPattern />
          </div>
        </div>

        <MaxWidthWrapper className="relative z-10">
          <div className="mx-auto max-w-3xl flex flex-col items-center text-center gap-8 sm:gap-10">
            {/* Headline */}
            <div className="space-y-4">
              <Heading headingType="h1">
                <span className="block bg-linear-to-r from-brand-700 via-brand-600 to-brand-800 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-6xl md:leading-[1.1]">
                  Never miss what matters
                </span>
              </Heading>
              <p className="text-base/relaxed text-gray-600 text-pretty max-w-xl mx-auto sm:text-lg">
                Get instant alerts for{" "}
                <span className="font-semibold text-gray-800">sales, new users, or any event</span>{" "}
                — delivered to Discord, Slack, or Telegram from one simple API.
              </p>
            </div>

            {/* Channel pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {CHANNELS.map(({ name, color }) => (
                <span
                  key={name}
                  className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium ${color}`}
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Benefit pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {PILLS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm text-gray-700 shadow-sm ring-1 ring-gray-200/60"
                >
                  <Icon className="size-4 text-brand-500" aria-hidden />
                  {label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <ShinyButton
              href="/sign-up"
              className="w-full sm:w-auto py-4 px-8 text-base font-semibold shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-300"
            >
              Start for free today
            </ShinyButton>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Planet section */}
      <section className="py-12 sm:py-18 sm:pb-42 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="mx-auto w-full flex flex-col text-center gap-2 items-center">
            <div>
              <Heading headingType="h2" className="bg-linear-to-r text-transparent bg-clip-text from-brand-700 to-brand-800 sm:text-6xl">
                Anywhere, anytime
              </Heading>
              <p className="text-gray-600 pt-4 text-lg">Birdo bots can find you anywhere. Earth, Mars… even Pluto.</p>
            </div>

            <PlanetCanvasContainer />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Platforms MOCK UI section*/}
      <MockApps />

      {/* Overview Video */}
      <ServicePreview />

      {/* Features / Benefits section*/}
      {/* <FeaturesSection /> */}
    </>
  )
}
