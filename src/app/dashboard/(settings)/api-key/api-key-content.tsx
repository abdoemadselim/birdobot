'use client'

// Libs
import { useState } from "react";
import { Check, Clipboard } from "lucide-react";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Toaster from "@/components/ui/toaser";

export default function ApiKeyContent({ apiKey }: { apiKey: string }) {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyKey = () => {
        navigator.clipboard.writeText(apiKey)
        setIsCopied(true)

        toast.custom((t) =>
            <Toaster type="success" t={t} title="API Key" children={
                <div className="text-green-700 text-sm w-[200px]">
                    <p className="font-medium">Copied to clipboard.</p>
                </div>
            } />
        )

        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <div>
            <section>
                <div className="rounded-lg ring-1 shadow-sm hover:shadow-md transition-shadow ring-inset ring-gray-200 bg-white max-w-[600px] p-8">
                    <div className="space-y-2 mb-2">
                        <Label htmlFor="apiKey">Your API Key</Label>
                        <div className="focus-visible:border-brand-700 border border-gray-200 rounded-md flex items-center justify-between pr-2 px-2">
                            <Input
                                id="apiKey"
                                type="password"
                                readOnly
                                value={apiKey}
                                className="focus:ring-brand-200! focus-visible:border-0 focus-visible:outline-none w-full border-0 outline-0 p-0 shadow-none focus-visible:ring-0"
                            />
                            {
                                isCopied ? (
                                    <Check className="text-gray-400 size-6" aria-label="The api key is being copied" />
                                ) : (
                                    <Button variant="ghost" onClick={handleCopyKey} className="cursor-pointer hover:bg-transparent p-0! focus-visible:ring-0" size="sm" aria-label="Copy the api key" title="Copy">
                                        <Clipboard className="text-gray-400 size-6" />
                                    </Button>
                                )
                            }
                        </div>
                    </div>


                    <p className="text-sm/5 text-gray-600 mb-2">
                        Keep your key secret and do not share it with others
                    </p>
                </div>
            </section>
        </div>
    )
}
