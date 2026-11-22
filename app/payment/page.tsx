import Link from "next/link"
import { PremiumPlans } from "@/app/components/PremiumPlans"

export default async function PaymentPage({ searchParams }: { searchParams: Promise<{ canceled?: string; roleMismatch?: string; checkoutError?: string }> }) {
  const { canceled, roleMismatch, checkoutError } = await searchParams

  return (
    <main className="min-h-svh bg-[#09090b] px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link className="text-sm text-white/55 hover:text-white" href="/browse-jobs">← Back to jobs</Link>
        <header className="mx-auto mb-10 mt-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Hireloop Premium</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Choose your seeker plan</h1>
          <p className="mt-3 text-sm leading-6 text-white/55">Apply without the free plan limit and keep your job search moving.</p>
          {canceled && <p className="mt-4 text-sm text-amber-300">Checkout was canceled. You have not been charged.</p>}
          {roleMismatch && <p className="mt-4 text-sm text-amber-300">These plans are for job seekers. Your account has a different role, so no payment was started.</p>}
          {checkoutError && <p className="mt-4 text-sm text-red-300">Checkout could not be started. Please choose a plan and try again.</p>}
        </header>
        <PremiumPlans role="seeker" />
        <p className="mt-6 text-center text-xs text-white/40">One payment for the selected access period. No automatic renewal.</p>
      </div>
    </main>
  )
}
