import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-brand-100 text-brand-800 text-center pt-6 pb-18  flex justify-center items-center flex-col">
            <Image
                src="/logo/logo.webp"
                width={100}
                height={57}
                alt="Birdo Logo"
                className="w-[100px] h-[57px]"
            />
            <p className="font-bold text-2xl pt-4">BirdoBot</p>
            <p className="pb-4  pt-0 text-sm">Fast & pretty</p>

            <p className="text-muted-foreground text-sm pt-8"> @2026 BirdoBot</p>

            <div className="flex gap-2 items-center">
                <Link href="/terms" className="text-sm underline pt-4">Terms of service</Link>

                <Link href="/privacy" className="text-sm underline pt-4">Privacy Notice</Link>
            </div>
        </footer>
    )
}
