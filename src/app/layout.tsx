import type { Metadata } from "next"
import { Providers } from "../components/providers"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "JStack App",
  description: "Created using JStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased min-h-[calc(100vh-1px)] flex flex-col" >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
