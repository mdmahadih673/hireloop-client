import Link from "next/link"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { ArrowUpRight, BriefcaseBusiness, CirclePlus, UsersRound } from "lucide-react"
import { listJobs } from "@/lib/api/jobs"
import { getApplicationCountsByJobIds } from "@/lib/actions/jobs"
import type { StoredJob } from "@/lib/types/jobs"
import { getSesson } from "@/lib/core/server"

function isActive(job: StoredJob, now: number) {
  if (job.status?.trim()) return job.status.toLowerCase() === "active"
  if (!job.deadline) return true
  const deadline = new Date(`${job.deadline}T23:59:59`).getTime()
  return Number.isNaN(deadline) || deadline >= now
}

export default async function RecruiterDashboardPage() {
  const session = await getSesson()
  if (!session?.user) redirect("/sign-in?redirect=%2FDashboard%2FRecruiter")
  if (session.user.role?.toLowerCase() !== "recruiter") redirect("/")

  const requestHeaders = await headers()
  const result = await listJobs(`recruiterId=${encodeURIComponent(session.user.id)}`)
    .then(async (jobs) => ({
      jobs,
      applicantCounts: await getApplicationCountsByJobIds(jobs.map((job) => job._id), requestHeaders.get("cookie") ?? undefined),
      error: "",
    }))
    .catch((error: unknown) => ({
      jobs: [] as StoredJob[],
      applicantCounts: {} as Record<string, number>,
      error: error instanceof Error ? error.message : "Could not load your hiring overview.",
    }))

  const now = Date.now()
  const activeJobs = result.jobs.filter((job) => isActive(job, now)).length
  const totalApplicants = Object.values(result.applicantCounts).reduce((total, count) => total + count, 0)
  const recentJobs = [...result.jobs].sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()).slice(0, 5)

  return (
    <main className="min-h-svh bg-[#111111] px-5 py-7 text-white sm:px-8 sm:py-9">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-violet-200">Recruiter portal</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Hiring overview</h1>
            <p className="mt-2 text-sm text-white/50">See how your open roles and applicants are progressing.</p>
          </div>
          <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-violet-500 px-4 text-sm font-semibold transition hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-200" href="/Dashboard/Recruiter/jobs/new">
            <CirclePlus aria-hidden="true" className="size-4" /> Create job post
          </Link>
        </header>

        {result.error && <p className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200" role="alert">{result.error}</p>}

        <section aria-label="Hiring overview statistics" className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center gap-3 text-white/55"><BriefcaseBusiness aria-hidden="true" className="size-4" /><p className="text-sm">All job posts</p></div>
            <p className="mt-4 text-3xl font-semibold">{result.jobs.length}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center gap-3 text-white/55"><span aria-hidden="true" className="size-2 rounded-full bg-emerald-400" /><p className="text-sm">Active roles</p></div>
            <p className="mt-4 text-3xl font-semibold">{activeJobs}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center gap-3 text-white/55"><UsersRound aria-hidden="true" className="size-4" /><p className="text-sm">Applicants</p></div>
            <p className="mt-4 text-3xl font-semibold">{totalApplicants}</p>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025]">
          <div className="flex flex-col justify-between gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold">Recent job posts</h2>
              <p className="mt-1 text-xs text-white/45">Review applicants and manage the roles you have published.</p>
            </div>
            <Link className="text-sm text-violet-200 transition hover:text-white" href="/Dashboard/Recruiter/jobs">Manage all jobs →</Link>
          </div>

          {recentJobs.length ? (
            <div className="divide-y divide-white/[0.07]">
              {recentJobs.map((job) => (
                <article className="flex flex-col justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center" key={job._id}>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium">{job.title}</h3>
                    <p className="mt-1 truncate text-xs text-white/45">{job.companyName} · {job.location || "Location not specified"}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <Link className="inline-flex items-center gap-1 text-sm text-violet-200 transition hover:text-white" href={`/Dashboard/Recruiter/jobs/${encodeURIComponent(job._id)}/applicants`}>
                      {result.applicantCounts[job._id] ?? 0} applicants <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </Link>
                    <Link aria-label={`Manage ${job.title}`} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/25 hover:text-white" href={`/Dashboard/Recruiter/jobs/${encodeURIComponent(job._id)}`}>Manage</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : !result.error ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium">No job posts yet</p>
              <p className="mt-1 text-sm text-white/45">Publish your first role to start receiving applicants.</p>
              <Link className="mt-4 inline-flex rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white" href="/Dashboard/Recruiter/jobs/new">Create a job post</Link>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}
