// Libs
import { ReactNode } from "react";

// Components
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LandingLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
