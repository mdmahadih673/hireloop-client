import Link from "next/link"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { BriefcaseBusiness, CreditCard, UsersRound } from "lucide-react"
import { getSesson } from "@/lib/core/server"
import type { StoredJob } from "@/lib/types/jobs"

type AdminUser = { _id: string; role?: string }

async function loadAdminData(cookie: string) {
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
  const authHeaders = { cookie }

  const [usersResult, jobsResult, applicationsResult] = await Promise.allSettled([
    fetch(`${backendUrl}/users`, { headers: authHeaders, cache: "no-store" }).then(async (response) => {
      if (!response.ok) throw new Error("Could not load users.")
      return response.json() as Promise<AdminUser[]>
    }),
    fetch(`${backendUrl}/jobs`, { cache: "no-store" }).then(async (response) => {
      if (!response.ok) throw new Error("Could not load jobs.")
      return response.json() as Promise<StoredJob[]>
    }),
    fetch(`${backendUrl}/applications`, { headers: authHeaders, cache: "no-store" }).then(async (response) => {
      if (!response.ok) throw new Error("Could not load applications.")
      return response.json() as Promise<unknown[]>
    }),
  ])

  const counts = {
    users: usersResult.status === "fulfilled" ? usersResult.value.length : null,
    jobs: jobsResult.status === "fulfilled" ? jobsResult.value.length : null,
    applications: applicationsResult.status === "fulfilled" ? applicationsResult.value.length : null,
  }
  const errors = [usersResult, jobsResult, applicationsResult]
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason instanceof Error ? result.reason.message : "Some dashboard data could not be loaded.")

  return { counts, errors }
}

export default async function AdminDashboardPage() {
  const session = await getSesson()
  if (!session?.user) redirect("/sign-in?redirect=%2FDashboard%2FAdmin")
  if (session.user.role?.toLowerCase() !== "admin") redirect("/")

  const cookie = (await headers()).get("cookie") ?? ""
  const { counts, errors } = await loadAdminData(cookie)
  const cards = [
    { label: "Registered users", value: counts.users, hint: "Across seeker and recruiter accounts", icon: UsersRound },
    { label: "Job posts", value: counts.jobs, hint: "Listings currently in Hireloop", icon: BriefcaseBusiness },
    { label: "Applications", value: counts.applications, hint: "Submitted across all job posts", icon: CreditCard },
  ]

  return (
    <main className="min-h-svh bg-[#111111] px-5 py-7 text-white sm:px-8 sm:py-9">
      <div className="mx-auto max-w-6xl">
        <header>
          <p className="text-sm text-violet-200">Hireloop administration</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Platform overview</h1>
          <p className="mt-2 text-sm text-white/50">A snapshot of users, job posts, and applications across the platform.</p>
        </header>

        {errors.length > 0 && (
          <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm text-amber-100" role="status">
            Some totals are unavailable: {errors.join(" ")}
          </div>
        )}

        <section aria-label="Platform statistics" className="mt-8 grid gap-4 sm:grid-cols-3">
          {cards.map(({ label, value, hint, icon: Icon }) => (
            <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5" key={label}>
              <div className="flex items-center gap-3 text-white/55"><Icon aria-hidden="true" className="size-4" /><p className="text-sm">{label}</p></div>
              <p className="mt-4 text-3xl font-semibold">{value ?? "—"}</p>
              <p className="mt-2 text-xs text-white/40">{hint}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <h2 className="font-semibold">Quick links</h2>
          <p className="mt-1 text-sm text-white/50">Open the public directories to review current platform content.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white" href="/companies">Company directory</Link>
            <Link className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white" href="/browse-jobs">Job listings</Link>
          </div>
        </section>
      </div>
    </main>
  )
}
