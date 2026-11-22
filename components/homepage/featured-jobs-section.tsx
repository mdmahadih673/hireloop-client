import Link from "next/link"
import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react"
import type { StoredJob } from "@/lib/types/jobs"

function salaryLabel(job: StoredJob) {
  const range = [job.minSalary, job.maxSalary].filter(Boolean).join(" – ")
  if (!range) return "Salary not listed"
  const unit = job.frequency?.replace(/^per\s+/i, "/ ")
  return unit ? `${range} ${unit}` : range
}

function postedDate(value?: string) {
  if (!value) return "Recently posted"
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? "Recently posted"
    : `Posted ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date)}`
}

export function FeaturedJobsSection({ jobs, error = "" }: { jobs: StoredJob[]; error?: string }) {
  return (
    <section className="bg-[#f7f7fb] px-5 py-16 text-zinc-950 dark:bg-[#0d0d10] dark:text-white sm:px-8 sm:py-20" aria-labelledby="featured-jobs-heading">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Open opportunities</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl" id="featured-jobs-heading">Recently posted jobs</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 dark:text-white/55">Explore current roles shared by recruiters on Hireloop.</p>
          </div>
          <Link className="inline-flex w-fit items-center gap-1 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-white/15 dark:text-white/80 dark:hover:bg-white/[0.06] dark:focus-visible:outline-violet-300" href="/browse-jobs">
            View all jobs <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </header>

        {error ? (
          <p className="mt-7 rounded-2xl border border-amber-400/25 bg-amber-50 px-5 py-6 text-sm text-amber-900 dark:border-amber-300/20 dark:bg-amber-300/[0.06] dark:text-amber-100" role="status">
            Job listings are temporarily unavailable. Please try browsing all jobs again shortly.
          </p>
        ) : jobs.length ? (
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <article className="flex min-h-56 flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-[0_12px_34px_rgba(75,55,150,0.08)] dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-violet-300/35 dark:hover:bg-white/[0.04]" key={job._id}>
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-base font-semibold text-violet-700 dark:bg-violet-400/15 dark:text-violet-200">
                    {job.companyName?.trim().charAt(0).toUpperCase() || "H"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-zinc-500 dark:text-white/45">{job.companyName || "Company not listed"}</p>
                    <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-6">
                      <Link className="rounded-sm transition hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:hover:text-violet-200 dark:focus-visible:outline-violet-300" href={`/browse-jobs/${encodeURIComponent(job._id)}`}>
                        {job.title || "Open role"}
                      </Link>
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 dark:border-emerald-300/15 dark:bg-emerald-300/10 dark:text-emerald-200">Active</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-white/60">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 dark:bg-white/[0.06]">
                    <MapPin aria-hidden="true" className="size-3.5" />
                    {job.isRemote ? "Remote" : job.location || "Location not specified"}
                  </span>
                  {job.jobType && <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 dark:bg-white/[0.06]"><BriefcaseBusiness aria-hidden="true" className="size-3.5" />{job.jobType}</span>}
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-white/[0.08]">
                  <p className="min-w-0 truncate text-sm font-medium">{salaryLabel(job)}</p>
                  <p className="shrink-0 text-[11px] text-zinc-500 dark:text-white/40">{postedDate(job.createdAt)}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-2xl border border-zinc-200 bg-white px-6 py-10 text-center dark:border-white/10 dark:bg-white/[0.025]">
            <BriefcaseBusiness aria-hidden="true" className="mx-auto size-6 text-zinc-400 dark:text-white/35" />
            <h3 className="mt-3 text-base font-semibold">No active jobs yet</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/50">New listings will appear here when recruiters publish them.</p>
            <Link className="mt-4 inline-flex rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500" href="/browse-jobs">Browse all jobs</Link>
          </div>
        )}
      </div>
    </section>
  )
}
