'use client'

import dynamic from "next/dynamic";

const PlanetCanvas = dynamic(
    () => import("@/components/planetCanvas/planet-canvas"),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full w-full">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
            </div>
        ),
    },
);


export default function PlanetComponentContainer() {
    return (
        <PlanetCanvas />
    )
}

