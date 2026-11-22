"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "@/lib/auth-client"
import { getApplicationsByUser, getPremimunUserById } from "@/lib/actions/jobs"
import type { JobApplication } from "@/lib/types/applications"

type PremiumStatus = {
  premium: boolean
  premiumExpiresAt?: string
}

const statusLabel: Record<JobApplication["status"], string> = {
  applied: "Applied",
  review: "In review",
  shortlisted: "Shortlisted",
  interview: "Interview call",
  waiting_list: "Waiting list",
  approved: "Approved",
  rejected: "Not selected",
  offered: "Offer received",
}

const statusStyle: Record<JobApplication["status"], string> = {
  applied: "border-white/10 bg-white/[0.06] text-white/65",
  review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  shortlisted: "border-blue-400/20 bg-blue-400/10 text-blue-200",
  interview: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  waiting_list: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  rejected: "border-red-400/20 bg-red-400/10 text-red-200",
  offered: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
}

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date)
}

export function SeekerDashboard() {
  const { data: session, isPending } = useSession()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [premium, setPremium] = useState<PremiumStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const user = session?.user

  useEffect(() => {
    if (isPending) return
    if (!user) {
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)
    setLoadError("")

    Promise.allSettled([
      getApplicationsByUser(),
      getPremimunUserById(user.id) as Promise<PremiumStatus>,
    ]).then(([applicationsResult, premiumResult]) => {
      if (!active) return
      if (applicationsResult.status === "fulfilled") setApplications(applicationsResult.value)
      else setLoadError("Your applications could not be loaded.")
      if (premiumResult.status === "fulfilled") setPremium(premiumResult.value)
    }).finally(() => {
      if (active) setLoading(false)
    })

    return () => { active = false }
  }, [isPending, user])

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    .slice(0, 5)
  const shortlistedCount = applications.filter((application) => application.status === "shortlisted").length
  const interviewCount = applications.filter((application) => application.status === "interview").length

  if (isPending || loading) {
    return (
      <main aria-label="Loading seeker dashboard" className="min-h-svh space-y-5 bg-[#0d0d0f] p-6 sm:p-8">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-white/[0.06]" />
        <div className="grid gap-4 sm:grid-cols-3">{[0, 1, 2].map((item) => <div className="h-28 animate-pulse rounded-2xl bg-white/[0.06]" key={item} />)}</div>
        <div className="h-64 animate-pulse rounded-2xl bg-white/[0.06]" />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-[#0d0d0f] px-5 text-white">
        <section className="max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center">
          <h1 className="text-xl font-semibold">Sign in to view your dashboard</h1>
          <p className="mt-2 text-sm leading-6 text-white/55">Your application updates and Premium access appear here.</p>
          <Link className="mt-5 inline-flex rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-200" href="/sign-in?redirect=%2FDashboard%2FSeeker">Sign in</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-svh bg-[#0d0d0f] px-5 py-7 text-white sm:px-8 sm:py-9">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-violet-200">Seeker dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back, {user.name?.split(" ")[0] || "there"}</h1>
            <p className="mt-2 text-sm text-white/50">Keep track of your applications and next steps.</p>
          </div>
          <Link className="inline-flex min-h-10 items-center justify-center rounded-lg bg-violet-500 px-4 text-sm font-semibold transition hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-200" href="/browse-jobs">Browse jobs</Link>
        </header>

        <section aria-label="Application overview" className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-sm text-white/50">Applications sent</p>
            <p className="mt-3 text-3xl font-semibold">{applications.length}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-sm text-white/50">Shortlisted</p>
            <p className="mt-3 text-3xl font-semibold">{shortlistedCount}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-sm text-white/50">Interview calls</p>
            <p className="mt-3 text-3xl font-semibold">{interviewCount}</p>
          </article>
        </section>

        {loadError && <p className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200" role="alert">{loadError}</p>}

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025]">
          <div className="flex flex-col justify-between gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold">Recent applications</h2>
              <p className="mt-1 text-xs text-white/45">See the latest status shared by each recruiter.</p>
            </div>
            <Link className="text-sm text-violet-200 transition hover:text-white" href="/Dashboard/Seeker/applications">View all applications →</Link>
          </div>

          {recentApplications.length ? (
            <div className="divide-y divide-white/[0.07]">
              {recentApplications.map((application, index) => (
                <article className="flex flex-col justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center" key={application._id ?? `${application.jobId}-${application.appliedAt}-${index}`}>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium">{application.jobTitle || "Job application"}</h3>
                    <p className="mt-1 truncate text-xs text-white/45">{application.companyName || "Company not listed"} · Applied {formatDate(application.appliedAt)}</p>
                  </div>
                  <span className={`w-fit rounded-full border px-3 py-1 text-xs ${statusStyle[application.status] ?? statusStyle.applied}`}>
                    {statusLabel[application.status] ?? "Applied"}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium">No applications yet</p>
              <p className="mt-1 text-sm text-white/45">Find a role that fits and send your first application.</p>
              <Link className="mt-4 inline-flex rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white" href="/browse-jobs">Explore open jobs</Link>
            </div>
          )}
        </section>

        <aside className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-violet-300/15 bg-violet-300/[0.04] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold">{premium?.premium ? "Premium is active" : "Premium access"}</p>
            <p className="mt-1 text-sm text-white/50">
              {premium?.premium
                ? `Your pass is active${premium.premiumExpiresAt ? ` until ${formatDate(premium.premiumExpiresAt)}` : ""}.`
                : "The free plan includes 2 applications. Choose a one time pass to apply without that limit."}
            </p>
          </div>
          {!premium?.premium && <Link className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-violet-200/20 px-4 text-sm font-medium text-violet-100 transition hover:bg-violet-200/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-200" href="/payment">View Premium plans</Link>}
        </aside>
      </div>
    </main>
  )
}
