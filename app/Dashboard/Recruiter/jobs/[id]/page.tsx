import Link from "next/link"
import { ArrowLeft, BriefcaseBusiness } from "lucide-react"
import type { StoredJob } from "@/lib/actions/jobs"
import { getJobById } from "@/lib/api/jobs"

function Detail({ label, value }: { label: string; value?: string | boolean }) {
  const displayValue = typeof value === "boolean" ? (value ? "Yes" : "No") : value || "Not provided"
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
      <dt className="text-[10px] font-medium uppercase tracking-wider text-white/40">{label}</dt>
      <dd className="mt-1.5 break-words text-sm text-white/85">{displayValue}</dd>
    </div>
  )
}

function formatDeadline(value?: string) {
  if (!value) return "Not specified"
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date)
}

function JobDetails({ job }: { job: StoredJob }) {
  const compensation = [job.minSalary, job.maxSalary].filter(Boolean).join(" – ")
  const frequency = job.frequency ? ` / ${job.frequency.toLowerCase().replace("per ", "")}` : ""

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#6653ff]/15 text-[#b8adff]">
            <BriefcaseBusiness className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#a99dff]">{job.category || "Job listing"}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{job.title}</h1>
            <p className="mt-2 text-sm text-white/55">{job.companyName}</p>
          </div>
        </div>
        <span className="rounded-full bg-white/[0.07] px-3 py-1.5 text-xs text-white/75">{job.jobType || "Job"}</span>
      </div>

      <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Detail label="Location" value={job.location} />
        <Detail label="Remote work" value={job.isRemote} />
        <Detail label="Application deadline" value={formatDeadline(job.deadline)} />
        <Detail label="Compensation" value={compensation ? `${compensation}${frequency}` : "Not specified"} />
        <Detail label="Job type" value={job.jobType} />
        <Detail label="Category" value={job.category} />
      </dl>

      <section className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
        <h2 className="text-sm font-semibold">Job description</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/70">{job.description || "No description provided."}</p>
      </section>

      <section className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
        <h2 className="text-sm font-semibold">Requirements</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/70">{job.requirements || "No requirements provided."}</p>
      </section>
    </>
  )
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let job: StoredJob | null = null
  let error = ""

  try {
    job = await getJobById(id)
  } catch (loadError) {
    error = loadError instanceof Error ? loadError.message : "Could not load job details."
  }

  return (
    <main className="min-h-svh bg-[#111111] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white" href="/Dashboard/Recruiter/jobs">
          <ArrowLeft className="size-4" /> Back to Manage Jobs
        </Link>
        {job ? (
          <div className="mt-7 rounded-2xl border border-white/[0.08] bg-[#151515] p-5 sm:p-8">
            <JobDetails job={job} />
          </div>
        ) : (
          <section className="mt-7 rounded-2xl border border-white/[0.08] bg-[#151515] p-8">
            <p className="text-sm text-red-200">{error}</p>
          </section>
        )}
      </div>
    </main>
  )
}
