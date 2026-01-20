'use client'

// Libs
import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

// Components
import Heading from "@/components/heading"
import LoadingSpinner from "@/components/loading-spinner"
import BackgroundPattern from "@/components/background-pattern"

export default function WelcomePage() {
    const searchParams = useSearchParams()
    console.log("page page page")
    const intent = searchParams.get("intent")
    const plan = searchParams.get("plan")

    const router = useRouter()
    const { data } = useQuery({
        queryFn: async () => {
            const res = await client.auth.getDatabaseSyncStatus.$get()
            return res.json()
        },
        queryKey: ["get-database-sync-status"],
        refetchInterval: (query) => query.state.data?.isSync ? false : 2000
    })

    useEffect(() => {
        if (data?.isSync) {
            router.replace(intent && plan ? `/pricing?intent=${intent}&plan=${plan}` : "/dashboard")
        }
    }, [data])


    return (
        <div className="flex flex-1 flex-col items-center justify-center overflow-hidden bg-brand-25 w-full relative">
            <BackgroundPattern className="max-w-full opacity-75 absolute top-1/2 left-1/2 -translate-1/2 z-0" />
            <div className="relative text-center flex flex-col gap-6 z-10">
                <LoadingSpinner size="lg" />
                <Heading className="to-brand-950">Creating your account</Heading>
                <p className="text-base/7 text-gray-600 max-w-prose">Just a moment while we set things up for you</p>
            </div>
        </div>
    )
}