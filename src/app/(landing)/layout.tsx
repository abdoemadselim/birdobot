// Libs
import { ReactNode } from "react";

// Components
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LandingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col flex-1 h-screen">
            <Navbar />
            <main className="flex flex-col flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}
