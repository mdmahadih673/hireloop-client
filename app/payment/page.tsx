import {
  ArrowLeft,
  ChevronDown,
  CreditCard,
  HelpCircle,
  ShoppingBag,
} from "lucide-react"

const CARD_BRANDS = [
  { bg: "#1a1f71", label: "VISA" },
  { bg: "#eb001b", label: "MC" },
  { bg: "#016fd0", label: "AMEX" },
  { bg: "#f7b600", label: "DISC" },
]

export default function PaymentPage() {
  return (
    <main className="flex min-h-svh flex-col bg-[#0b0b0c] text-white">
      {/* Header */}
      <header className="relative flex items-center justify-between border-b-2 border-[#0055f9] px-4 py-3">
        <div className="flex items-center gap-4">
          <button aria-label="Go back" className="text-white/80 transition hover:text-white" type="button">
            <ArrowLeft className="size-5" />
          </button>
          <span className="flex size-7 items-center justify-center rounded-md border border-white/25 bg-white/5">
            <ShoppingBag className="size-3.5" />
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-[0.18em] text-white/60">
          SANDBOX
        </span>
      </header>

      {/* Body */}
      <div className="mx-auto grid w-full max-w-[880px] flex-1 gap-12 px-5 py-10 md:grid-cols-[minmax(0,320px)_minmax(0,380px)] md:justify-center md:gap-16">
        {/* Left column — currency + summary */}
        <section>
          <p className="text-[11px] font-medium tracking-[0.08em] text-white/50">
            CHOOSE A CURRENCY:
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white bg-white/[0.06] px-3.5 py-3">
              <span className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-[#006a4e] text-[11px]">
                🇧🇩
              </span>
              <span className="text-sm font-semibold">BDT 2,553.33</span>
            </div>
            <div className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/15 px-3.5 py-3 transition hover:border-white/35">
              <span className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-[#3c3b6e] text-[11px]">
                🇺🇸
              </span>
              <span className="text-sm font-semibold text-white/80">$20.00</span>
            </div>
          </div>

          <p className="mt-2.5 text-[11px] text-white/45">1 USD = 127.6665 BDT</p>

          <div className="my-6 border-t border-white/10" />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">Hireloop Pro Plan</p>
              <p className="mt-1 text-xs text-white/45">Access to all features</p>
            </div>
            <p className="text-sm font-semibold">BDT 2,553.33</p>
          </div>
        </section>

        {/* Right column — checkout */}
        <section>
          {/* Link express pay */}
          <button
            className="flex h-12 w-full cursor-pointer items-center justify-between rounded-lg bg-[#00d66f] px-4 transition hover:brightness-105"
            type="button"
          >
            <span className="flex items-center gap-1.5 text-lg font-bold text-[#0b0b0c]">
              <HelpCircle className="size-4 fill-[#0b0b0c] text-[#00d66f]" />
              link
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-bold">
              <span className="italic text-[#1a1f71]">VISA</span>
              <span className="h-3.5 w-px bg-black/15" />
              <span className="text-black/80">4242</span>
            </span>
          </button>

          {/* OR divider */}
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-semibold tracking-widest text-white/40">
              OR
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Contact information */}
          <h2 className="text-sm font-semibold">Contact information</h2>
          <label className="mt-3 mb-1.5 block text-xs text-white/55" htmlFor="email">
            Email
          </label>
          <input
            className="h-10 w-full rounded-md border border-white/12 bg-[#1b1b1d] px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#0073e6]"
            id="email"
            placeholder="email@example.com"
            type="email"
          />

          {/* Payment method */}
          <h2 className="mt-7 text-sm font-semibold">Payment method</h2>

          <div className="mt-3 overflow-hidden rounded-lg border border-white/12">
            <div className="flex items-center gap-2.5 bg-[#161618] px-4 py-3.5">
              <CreditCard className="size-4 text-white/70" />
              <span className="text-sm font-medium">Card</span>
            </div>

            <div className="space-y-4 border-t border-white/10 bg-[#1e1e20] px-4 py-4">
              <div>
                <p className="mb-1.5 text-[10px] font-medium tracking-[0.08em] text-white/50">
                  CARD INFORMATION
                </p>
                <div className="flex items-center rounded-md border border-white/12 bg-[#131315] pr-3 transition focus-within:border-[#0073e6]">
                  <input
                    className="h-10 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35"
                    placeholder="1234 1234 1234 1234"
                    type="text"
                  />
                  <div className="flex items-center gap-1">
                    {CARD_BRANDS.map((brand) => (
                      <span
                        className="flex h-4.5 w-6 items-center justify-center rounded-[3px] text-[5px] font-bold text-white"
                        key={brand.label}
                        style={{ backgroundColor: brand.bg }}
                      >
                        {brand.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 overflow-hidden rounded-md border border-white/12 bg-[#131315] transition focus-within:border-[#0073e6]">
                  <input
                    className="h-10 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35"
                    placeholder="MM / YY"
                    type="text"
                  />
                  <div className="flex items-center border-l border-white/12 pr-3 transition focus-within:border-[#0073e6]">
                    <input
                      className="h-10 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35"
                      placeholder="CVC"
                      type="text"
                    />
                    <HelpCircle className="size-4 shrink-0 text-white/40" />
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-[10px] font-medium tracking-[0.08em] text-white/50">
                  CARDHOLDER NAME
                </p>
                <input
                  className="h-10 w-full rounded-md border border-white/12 bg-[#131315] px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#0073e6]"
                  placeholder="Full name on card"
                  type="text"
                />
              </div>

              <div>
                <p className="mb-1.5 text-[10px] font-medium tracking-[0.08em] text-white/50">
                  COUNTRY OR REGION
                </p>
                <button
                  className="flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-white/12 bg-[#131315] px-3 text-sm transition hover:border-white/25"
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    <span className="flex size-4 items-center justify-center overflow-hidden rounded-full bg-[#006a4e] text-[9px]">
                      🇧🇩
                    </span>
                    Bangladesh
                  </span>
                  <ChevronDown className="size-4 text-white/50" />
                </button>
              </div>
            </div>
          </div>

          {/* Save info */}
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-white/12 p-4">
            <span className="mt-0.5 size-4 shrink-0 rounded border border-white/30" />
            <div>
              <p className="text-xs font-semibold">Save my information for faster checkout</p>
              <p className="mt-1 text-[11px] leading-4 text-white/45">
                Pay securely on this site and everywhere Link is accepted.
              </p>
            </div>
          </div>

          {/* Pay */}
          <button
            className="mt-5 h-12 w-full cursor-pointer rounded-lg bg-[#0073e6] text-sm font-semibold text-white transition hover:bg-[#0a84f0]"
            type="button"
          >
            Pay
          </button>
        </section>
      </div>

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
