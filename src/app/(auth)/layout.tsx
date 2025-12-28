// Libs
import { ReactNode } from "react";

// Components
import Navbar from "@/components/navbar";

export default function LandingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center">
                {children}
            </main>
        </div>
    )
}
