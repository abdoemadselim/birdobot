// Libs
import { Check } from "lucide-react"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Components
import MaxWidthWrapper from "@/components/max-width-wrapper"
import Heading from "@/components/heading"
import ShinyButton from "@/components/shiny-button"
import BackgroundPattern from "@/components/background-pattern";
import BirdsPattern from "@/components/birds-pattern";
import PlanetCanvasContainer from "@/components/planetCanvas/planet-canvas-container";
import MockApps from "../mock-apps";
import ServicePreview from "../service-preview";

export default async function HomePage() {
  const user = await currentUser()
  if (user) redirect("/dashboard")

  return (
    <>
      {/* Hero section */}
      <section className="py-24 sm:py-32 sm:pb-90 bg-brand-25">
        <div className="overflow-hidden max-w-full h-[500px] absolute w-full">
          <BackgroundPattern className="max-w-full opacity-75 absolute top-1/2 left-1/2 -translate-1/2 z-0" />
          <BackgroundPattern className="max-w-full opacity-75 absolute top-1/3 left-1/3 -translate-1/2 z-0" />
          <BackgroundPattern className="max-w-full opacity-75 absolute top-1/3 left-2/3 -translate-1/2 z-0" />
        </div>
        <div className="opacity-5 z-0 absolute top-[400px] left-1/2 -translate-1/2 max-h-[400px] overflow-hidden max-w-full">
          <BirdsPattern />
        </div>

        <MaxWidthWrapper className="text-center">
          <div className="mx-auto w-full flex flex-col text-center gap-10 items-center">
            <div>
              <Heading headingType="h1">
                {
                  /*
                    bg-clip-text: make the background given to the task as a mask
                    text-transparent: required to remove the original text color to take the mask
                  */
                }
                <p className="bg-linear-to-r block leading-14 text-transparent bg-clip-text from-brand-700 to-brand-800 sm:text-6xl">
                  Never miss what matters
                </p>
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
              delivered instantly to Discord, Slack, or Telegram.
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
      </section >

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
