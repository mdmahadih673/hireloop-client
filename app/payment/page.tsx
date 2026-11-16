import { ArrowLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { CheckoutBody } from "./checkout-body"

export default async function PaymentPage({searchParams}:{searchParams: Promise<{canceled?: string; amount?: string}>}) {
    const {canceled, amount: amountParam} = await searchParams

    if(canceled){

    }

    const USD_TO_BDT = 127.6665
    const usd = Number(amountParam) > 0 ? Number(amountParam) : 20
    const usdLabel = usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    const bdtLabel = (usd * USD_TO_BDT).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return (
        <main className="flex min-h-svh mt-10 flex-col bg-[#0b0b0c] text-white">
            {/* Header */}
            <header className="relative flex items-center justify-between border-b-2 border-[#0055f9] px-4 py-3">
                <div className="flex items-center gap-4">
                    <Link href={'/browse-jobs'}
                        aria-label="Go back"
                        className="text-white/80 transition hover:text-white"
                        type="button">
                        <ArrowLeft className="size-5" />
                    </Link>
                    <span className="flex size-7 items-center justify-center rounded-md border border-white/25 bg-white/5">
                        <ShoppingBag className="size-3.5" />
                    </span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.18em] text-white/60">
                    SANDBOX
                </span>
            </header>

            {/* Body */}
            <CheckoutBody usdLabel={usdLabel} bdtLabel={bdtLabel} />

            {/* Footer */}
            <footer className="mt-auto border-t border-white/10 px-5 py-6 text-center">
                <p className="text-xs text-white/55">
                    Powered by <span className="font-bold text-white/80">Stripe</span>
                </p>
                <div className="mt-4 flex items-center justify-center gap-8 text-xs text-white/45">
                    <a className="transition hover:text-white/75" href="#">Terms</a>
                    <a className="transition hover:text-white/75" href="#">Privacy</a>
                </div>
            </footer>
        </main>
    )
}
