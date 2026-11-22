import Link from "next/link"
import { PremiumPlans } from "@/app/components/PremiumPlans"

export const metadata = {
  title: "Pricing | Hireloop",
  description: "Compare one time Hireloop Premium passes for job seekers and recruiters.",
}

export default function PricingPage() {
  return (
    <main className="min-h-svh bg-[#09090b] px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link className="inline-flex rounded-sm text-sm text-white/55 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300" href="/">
          ← Back to Hireloop
        </Link>

        <header className="mx-auto mb-14 mt-12 max-w-2xl text-center sm:mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Simple, one time pricing</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Choose the plan for your next move</h1>
          <p className="mt-4 text-pretty text-sm leading-6 text-white/55 sm:text-base">
            Pick a pass for your role. Each plan is paid once, lasts for its stated period, and does not renew automatically.
          </p>
        </header>

        <section aria-labelledby="seeker-plans" className="scroll-mt-8">
          <div className="mb-6">
            <h2 id="seeker-plans" className="text-2xl font-semibold">For job seekers</h2>
            <p className="mt-2 text-sm text-white/50">Apply to more opportunities during your Premium access period.</p>
          </div>
          <PremiumPlans role="seeker" />
        </section>

        <section aria-labelledby="recruiter-plans" className="mt-16 scroll-mt-8">
          <div className="mb-6">
            <h2 id="recruiter-plans" className="text-2xl font-semibold">For recruiters</h2>
            <p className="mt-2 text-sm text-white/50">Go beyond the 2 job posts included with a free recruiter account.</p>
          </div>
          <PremiumPlans role="recruiter" />
        </section>

        <p className="mt-10 text-center text-xs leading-5 text-white/40">
          Premium access ends automatically after the selected period. No recurring charge.
        </p>
      </div>
    </main>
  )
}
