import type { Metadata } from "next"
import { Providers } from "../components/providers"
import { FlyingFocus } from "@/components/flying-focus"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "BirdoBot - Fast & Pretty",
  description: "Never miss what matters on your platform or store",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className="antialiased min-h-[calc(100vh-1px)] flex flex-col">
        <ClerkProvider>
          <Providers>
            <FlyingFocus />
            {children}
            <Toaster richColors />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
