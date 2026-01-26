// Components
import Heading from "@/components/heading"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"

export default function ServicePreview() {
  return (
    <section className="sm:py-32 pt-44 pb-22" >
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <div className="pb-10 flex flex-col justify-center items-center">
          <Heading headingType="h2" className="text-center text-brand-700 font-medium bg-brand-100/50 rounded-lg px-4">See how it works?</Heading>
          <p className="text-zinc-500 pt-2">Make your decision right now!</p>
        </div>

        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/_iAZ2zp4Fq8"
          thumbnailSrc="/video-thumbnail.png"
          thumbnailAlt="BirdoBot Overview"
        />

      </MaxWidthWrapper>
    </section>
  )
}
