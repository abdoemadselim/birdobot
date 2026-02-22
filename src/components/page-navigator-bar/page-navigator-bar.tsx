'use client'

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PageNavigatorBar() {
    const [hide, setHide] = useState(true)

    return (
        <div
            onFocus={() => setHide(false)}
            onBlur={() => setHide(true)}
            className={
                cn(
                    "bg-brand-100 w-full min-h-7 max-h-fit z-500 py-2 fixed inset-0 ",
                    {
                        "left-full": hide,
                    }
                )
            }
        >
            <MaxWidthWrapper className="flex justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-brand-700 text-lg bg-transparent ring-1 hover:bg-transparent hover:ring-2 ring-brand-700  focus-visible:ring-brand-700 focus-visible:ring-2"
                    onClick={() => {
                        setHide(true);
                        const pageHeading = document.querySelector<HTMLElement>("#page-heading");
                        if (pageHeading) {
                            pageHeading.focus();
                        }
                    }}
                >
                    Skip to main content
                </Button>

                <Button
                    variant="outline"
                    type="button"
                    aria-label="Close jump menu"
                    className="rounded-full bg-transparent ring-1 hover:bg-transparent hover:ring-2 ring-brand-700 focus-visible:ring-brand-700 focus-visible:ring-2"
                    onClick={() => setHide(!hide)}
                >
                    <X className="size-5" aria-hidden="true" />
                </Button>
            </MaxWidthWrapper>
        </div>
    )
}
