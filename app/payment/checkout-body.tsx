"use client"

import { useState } from "react"
import { PayButton } from "./pay-button"

export function CheckoutBody({ usdLabel, bdtLabel }: { usdLabel: string; bdtLabel: string }) {
    const [currency, setCurrency] = useState<"BDT" | "USD">("BDT")
    const amountLabel = currency === "BDT" ? `BDT ${bdtLabel}` : `$${usdLabel}`

    return (
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center gap-8 px-5 py-10">
            {/* Currency */}
            <div>
                <p className="text-[11px] font-medium tracking-[0.08em] text-white/50">
                    CHOOSE A CURRENCY:
                </p>

                <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-3 transition ${
                            currency === "BDT"
                                ? "border-white bg-white/[0.06]"
                                : "border-white/15 hover:border-white/35"
                        }`}
                        onClick={() => setCurrency("BDT")}
                        type="button"
                    >
                        <span className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-[#006a4e] text-[11px]">
                            🇧🇩
                        </span>
                        <span className={`text-sm font-semibold ${currency === "BDT" ? "" : "text-white/80"}`}>
                            BDT {bdtLabel}
                        </span>
                    </button>
                    <button
                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-3 transition ${
                            currency === "USD"
                                ? "border-white bg-white/[0.06]"
                                : "border-white/15 hover:border-white/35"
                        }`}
                        onClick={() => setCurrency("USD")}
                        type="button"
                    >
                        <span className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-[#3c3b6e] text-[11px]">
                            🇺🇸
                        </span>
                        <span className={`text-sm font-semibold ${currency === "USD" ? "" : "text-white/80"}`}>
                            {`$${usdLabel}`}
                        </span>
                    </button>
                </div>

                <p className="mt-2.5 text-[11px] text-white/45">1 USD = 127.6665 BDT</p>
            </div>

            {/* Summary */}
            <div className="border-t border-white/10 pt-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold">Hireloop Pro Plan</p>
                        <p className="mt-1 text-xs text-white/45">Access to all features</p>
                    </div>
                    <p className="text-sm font-semibold">{amountLabel}</p>
                </div>
            </div>

            {/* Pay */}
            <PayButton amountLabel={amountLabel} />
        </div>
    )
}
