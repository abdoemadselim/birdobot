// Libs
import { ReactNode } from "react";

// Components
import Navbar from "@/components/navbar";

export default function LandingLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
