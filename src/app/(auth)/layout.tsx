// Libs
import { ReactNode } from "react";

// Components
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col flex-1 h-screen">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
