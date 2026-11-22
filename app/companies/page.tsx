import Link from "next/link"
import { listJobs } from "@/lib/api/jobs"
import type { StoredJob } from "@/lib/types/jobs"

export const metadata = {
  title: "Companies | Hireloop",
  description: "Explore companies hiring on Hireloop and view their open roles.",
}

type Company = {
  name: string
  jobs: StoredJob[]
}

function groupCompanies(jobs: StoredJob[]): Company[] {
  const companies = new Map<string, Company>()

  for (const job of jobs) {
    const name = job.companyName?.trim()
    if (!name || job.status?.toLowerCase() === "inactive") continue

    const key = name.toLocaleLowerCase()
    const company = companies.get(key) ?? { name, jobs: [] }
    company.jobs.push(job)
    companies.set(key, company)
  }

  return [...companies.values()].sort((a, b) => a.name.localeCompare(b.name))
}

export default async function CompaniesPage() {
  const result = await listJobs()
    .then((jobs) => ({ companies: groupCompanies(jobs), error: "" }))
    .catch(() => ({ companies: [] as Company[], error: "Company listings could not be loaded. Please try again later." }))

  return (
    <main className="min-h-svh bg-[#09090b] px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link className="inline-flex rounded-sm text-sm text-white/55 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300" href="/browse-jobs">
          ← Browse jobs
        </Link>

        <header className="mb-10 mt-12 max-w-2xl sm:mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Hiring on Hireloop</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Explore companies with open roles</h1>
          <p className="mt-4 text-pretty text-sm leading-6 text-white/55 sm:text-base">
            Browse employers by the jobs they have posted and see which roles are currently available.
          </p>
        </header>

        {result.error ? (
          <p className="rounded-2xl border border-red-400/20 bg-red-400/5 px-5 py-6 text-sm text-red-200" role="alert">{result.error}</p>
        ) : result.companies.length ? (
          <>
            <p className="mb-4 text-sm text-white/45">{result.companies.length} {result.companies.length === 1 ? "company" : "companies"} hiring</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.companies.map((company) => {
                const locations = [...new Set(company.jobs.map((job) => job.isRemote ? "Remote" : job.location?.trim()).filter((location): location is string => Boolean(location)))]
                const search = new URLSearchParams({ q: company.name }).toString()

                return (
                  <article className="flex min-h-56 flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-colors hover:border-violet-300/30" key={company.name.toLocaleLowerCase()}>
                    <div className="flex items-start gap-4">
                      <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-lg font-semibold text-violet-200">
                        {company.name.slice(0, 1).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-semibold">{company.name}</h2>
                        <p className="mt-1 text-sm text-white/50">{company.jobs.length} open {company.jobs.length === 1 ? "role" : "roles"}</p>
                      </div>
                    </div>
                    <p className="mt-5 line-clamp-2 text-sm leading-6 text-white/65">
                      {company.jobs.slice(0, 3).map((job) => job.title).filter(Boolean).join(" · ")}
                    </p>
                    {locations.length > 0 && <p className="mt-2 truncate text-xs text-white/40">{locations.slice(0, 2).join(" · ")}</p>}
                    <Link className="mt-auto inline-flex w-fit rounded-sm pt-5 text-sm font-medium text-violet-200 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300" href={`/browse-jobs?${search}`}>
                      View open roles <span aria-hidden="true" className="ml-1">→</span>
                    </Link>
                  </article>
                )
              })}
            </div>
          </>
        ) : (
          <section className="rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-12 text-center">
            <h2 className="text-lg font-semibold">No companies are hiring yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/50">New company listings will appear here when employers publish their open roles.</p>
            <Link className="mt-5 inline-flex rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-200" href="/browse-jobs">Browse jobs</Link>
          </section>
        )}
      </div>
    </main>
  )
}
