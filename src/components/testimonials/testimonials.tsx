// Libs
import { Star } from "lucide-react"
import Image from "next/image"

// Components
import MaxWidthWrapper from "@/components/max-width-wrapper"
import Heading from "@/components/heading"
import ShinyButton from "@/components/shiny-button"
import { Icons } from "@/components/icons";

export default function Testimonials() {
    return (

        <section className="sm:py-32 py-24">
            <MaxWidthWrapper>
                <div className="pb-20">
                    <h2 className="text-brand-600 font-medium text-xl pb-2 text-center">Real-World Experiences</h2>
                    <Heading className="text-center" headingType="h3">What our customers say</Heading>
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
                                <span className="sr-only">Verified</span>
                                <Icons.verificationBadge className="size-4" aria-hidden />
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
                                <span className="sr-only">Verified</span>
                                <Icons.verificationBadge className="size-4" aria-hidden />
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
    )
}
