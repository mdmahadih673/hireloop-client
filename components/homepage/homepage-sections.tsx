import Link from "next/link"

const seekerSteps = [
  "Search roles by title, location, work type, and salary.",
  "Open a listing and submit your application.",
  "Check your dashboard for recruiter status updates.",
]

const recruiterSteps = [
  "Create a recruiter account and publish your first roles.",
  "Review candidates from each job post.",
  "Update candidate status as your hiring process moves forward.",
]

const commonQuestions = [
  {
    question: "How many applications can I send for free?",
    answer: "A free seeker account can apply to two jobs. Seeker Premium passes increase that limit for the selected access period.",
  },
  {
    question: "How many jobs can a recruiter post for free?",
    answer: "A free recruiter account can publish two job posts. Recruiter Premium passes let you post beyond that limit while access is active.",
  },
  {
    question: "Does Premium renew automatically?",
    answer: "No. Premium is a one time payment. Access ends after the selected period, and there is no automatic renewal.",
  },
  {
    question: "Where can I see application updates?",
    answer: "Sign in and open Applications in your seeker dashboard. Recruiter status changes appear there for each application.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-white px-5 py-16 text-zinc-950 dark:bg-[#111114] dark:text-white sm:px-8 sm:py-20" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">A clear path forward</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl" id="how-it-works-heading">A simple process for both sides</h2>
          <p className="mt-3 text-pretty text-sm leading-6 text-zinc-600 dark:text-white/55">Find work or manage hiring with the steps already built into Hireloop.</p>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-[#fafaff] p-6 dark:border-white/10 dark:bg-white/[0.025] sm:p-7">
            <h3 className="text-xl font-semibold">For job seekers</h3>
            <ol className="mt-6 space-y-5">
              {seekerSteps.map((step, index) => (
                <li className="flex gap-4" key={step}>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-400/15 dark:text-violet-200">{index + 1}</span>
                  <p className="pt-1 text-sm leading-6 text-zinc-700 dark:text-white/65">{step}</p>
                </li>
              ))}
            </ol>
            <Link className="mt-7 inline-flex rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500" href="/browse-jobs">Browse jobs</Link>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-[#fafaff] p-6 dark:border-white/10 dark:bg-white/[0.025] sm:p-7">
            <h3 className="text-xl font-semibold">For recruiters</h3>
            <ol className="mt-6 space-y-5">
              {recruiterSteps.map((step, index) => (
                <li className="flex gap-4" key={step}>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-400/15 dark:text-violet-200">{index + 1}</span>
                  <p className="pt-1 text-sm leading-6 text-zinc-700 dark:text-white/65">{step}</p>
                </li>
              ))}
            </ol>
            <Link className="mt-7 inline-flex rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-white/15 dark:text-white/85 dark:hover:bg-white/[0.06] dark:focus-visible:outline-violet-300" href="/get-started?role=recruiter">Create recruiter account</Link>
          </article>
        </div>
      </div>
    </section>
  )
}

export function PremiumCalloutSection() {
  return (
    <section className="bg-[#f2f0ff] px-5 py-16 text-zinc-950 dark:bg-[#0a0a0c] dark:text-white sm:px-8 sm:py-20" aria-labelledby="premium-callout-heading">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 rounded-3xl border border-violet-200 bg-white p-7 dark:border-violet-300/15 dark:bg-[#15141c] sm:p-10 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Premium passes</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl" id="premium-callout-heading">More room to apply or hire</h2>
          <p className="mt-3 text-pretty text-sm leading-6 text-zinc-600 dark:text-white/55">Choose 30, 90, or 365 days of access with one payment. No recurring charge.</p>
        </div>
        <Link className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500" href="/pricing">Compare plans</Link>
      </div>
    </section>
  )
}

export function CommonQuestionsSection() {
  return (
    <section className="bg-white px-5 py-16 text-zinc-950 dark:bg-[#111114] dark:text-white sm:px-8 sm:py-20" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Frequently asked questions</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl" id="faq-heading">Good to know before you start</h2>
        </header>
        <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">
          {commonQuestions.map(({ question, answer }) => (
            <details className="group py-5" key={question}>
              <summary className="cursor-pointer list-none pr-8 text-base font-medium marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 [&::-webkit-details-marker]:hidden">
                {question}
                <span aria-hidden="true" className="float-right text-violet-600 transition-transform group-open:rotate-45 dark:text-violet-300">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-white/55">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
