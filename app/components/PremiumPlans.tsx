import { Check } from "lucide-react"

type PremiumRole = "seeker" | "recruiter"

const plans = {
  seeker: [
    { id: "monthly", name: "30-day pass", term: "for 30 days", price: "৳499", detail: "One-time payment · no auto-renew", features: ["Unlimited job applications", "30 days of Premium access", "Access ends automatically"] },
    { id: "quarterly", name: "90-day pass", term: "for 90 days", price: "৳1,299", detail: "One-time payment · no auto-renew", features: ["Unlimited job applications", "90 days of Premium access", "Access ends automatically"], popular: true },
    { id: "annual", name: "365-day pass", term: "for 365 days", price: "৳4,999", detail: "One-time payment · no auto-renew", features: ["Unlimited job applications", "365 days of Premium access", "Access ends automatically"] },
  ],
  recruiter: [
    { id: "monthly", name: "30-day pass", term: "for 30 days", price: "৳1,499", detail: "One-time payment · no auto-renew", features: ["Post more than 2 jobs", "30 days of Premium access", "Access ends automatically"] },
    { id: "quarterly", name: "90-day pass", term: "for 90 days", price: "৳3,999", detail: "One-time payment · no auto-renew", features: ["Post more than 2 jobs", "90 days of Premium access", "Access ends automatically"], popular: true },
    { id: "annual", name: "365-day pass", term: "for 365 days", price: "৳14,999", detail: "One-time payment · no auto-renew", features: ["Post more than 2 jobs", "365 days of Premium access", "Access ends automatically"] },
  ],
} satisfies Record<PremiumRole, Array<{ id: string; name: string; term: string; price: string; detail: string; features: string[]; popular?: boolean }>>

export function PremiumPlans({ role }: { role: PremiumRole }) {
  const rolePlans = plans[role]

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {rolePlans.map((plan) => (
        <article key={plan.id} className={`relative flex flex-col rounded-2xl border bg-[#121217] p-6 ${plan.popular ? "border-violet-400 shadow-[0_0_40px_rgba(124,92,255,0.12)]" : "border-white/10"}`}>
          {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide">Most popular</span>}
          <h2 className="text-lg font-semibold">{plan.name}</h2>
          <p className="mt-1 text-xs text-white/50">{plan.detail}</p>
          <p className="mt-6 text-3xl font-semibold">{plan.price}<span className="ml-1 text-sm font-normal text-white/45">{plan.term}</span></p>
          <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-5 text-sm text-white/70">
            {plan.features.map((feature) => <li className="flex items-center gap-2" key={feature}><Check className="size-4 text-emerald-400" />{feature}</li>)}
          </ul>
          <form action="/api/checkout_sessions" className="mt-7" method="POST">
            <input name="role" type="hidden" value={role} />
            <input name="planId" type="hidden" value={plan.id} />
            <button className="h-11 w-full rounded-lg bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/85" type="submit">
              Choose {plan.name}
            </button>
          </form>
        </article>
      ))}
    </div>
  )
}
