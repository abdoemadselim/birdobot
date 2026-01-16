// Components
import Heading from "@/components/heading"
import MaxWidthWrapper from "@/components/max-width-wrapper"

export default function ServicePreview() {
  return (
    <section className="sm:py-32 py-24" >
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <div className="pb-20 flex flex-col justify-center items-center">
          <Heading className="text-center text-brand-700 font-medium bg-brand-100/50 rounded-lg px-4">See how it works?</Heading>
          <p className="text-zinc-500 pt-2">Take your decision right now!</p>
        </div>

        <div >
          <video
            controls
            className="w-[900px] h-[400px]"
            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

      </MaxWidthWrapper>
    </section>
  )
}
