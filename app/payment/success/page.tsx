import { ArrowRight, Check, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessfulPage() {
    return (
        <main className="relative flex min-h-svh items-center justify-center bg-[#050506] px-4 py-10 text-white">
            {/* subtle top glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-[#4f46e5]/10 blur-[120px]"
            />

            <div className="relative w-full max-w-[440px] rounded-2xl border border-white/[0.08] bg-[#0b0b0d] px-8 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                {/* Success icon */}
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#12b76a]">
                    <Check aria-hidden="true" className="size-7 text-white" strokeWidth={3} />
                </div>

                {/* Badge */}
                <p className="mx-auto mt-7 w-fit rounded-full border border-[#4f7cf6]/40 bg-[#4f7cf6]/10 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-[#7d9bff]">
                    UPGRADE SUCCESSFUL
                </p>

                {/* Heading */}
                <h1 className="mt-4 text-2xl font-semibold tracking-tight">
                    Welcome to Hireloop Pro
                </h1>

                <p className="mt-5 text-sm text-white/70">
                    Your payment of <span className="font-semibold">$20.00</span> was
                    received perfectly.
                </p>

                <p className="mt-4 text-sm leading-6 text-[#3fbf7f]">
                    AI advanced premium recruiting modules are unlocked on your
                    account.{" "}
                    <span className="font-semibold text-[#4ade80]">
                        You may need to re-authenticate to see the effect.
                    </span>
                </p>

                {/* Session info */}
                <div className="mt-7 flex items-stretch gap-2 text-left">
                    <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-white/[0.09] px-3.5 py-3">
                        <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-white/60" />
                        <p className="text-xs text-white/75">Session ID Verified</p>
                    </div>
                    <div className="flex min-w-0 items-center rounded-lg border border-white/[0.09] px-3.5 py-3">
                        <p className="truncate font-mono text-xs text-white/50">
                            cs_test_a1mKfsj7B3r3Q3M1uFp...
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <Link
                    href={'/browse-jobs'}
                    className="group mt-7 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-[#09090b] transition hover:bg-white/90"
                    type="button"
                >
                    Go to Workspace Dashboard
                    <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                </Link>
            </div>
        </main>
    )
}
