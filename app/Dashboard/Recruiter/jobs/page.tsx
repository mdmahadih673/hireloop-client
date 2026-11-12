import { cache } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  CirclePlus,
  Code2,
  MoreVertical,
  Pencil,
  MapPin,
  Megaphone,
  Network,
  Settings,
  UsersRound,
} from "lucide-react"
import type { StoredJob } from "@/lib/actions/jobs"
import { listJobs } from "@/lib/api/jobs"
import { UpdateJobButton } from "@/app/components/UpdateJobButton"
import { DeleteJobButton } from "@/app/components/DeleteJobButton"
import { ViewJobButton } from "@/app/components/ViewJobButton"
import { JobInfo, StatusBadge } from "@/components/jobs/JobListingMeta"

function getSalary(job: StoredJob) {
  if (!job.minSalary && !job.maxSalary) return "Not specified"

  const range = [job.minSalary, job.maxSalary].filter(Boolean).join(" – ")
  const frequency = {
    "Per year": "/ yr",
    "Per month": "/ mo",
    "Per hour": "/ hr",
  }[job.frequency ?? ""] ?? ""

  return `${range}${frequency ? ` ${frequency}` : ""}`
}

const getNow = cache(() => Date.now())

function getStatus(deadline: string | undefined, now: number) {
  if (!deadline) return "Active"
  const endOfDeadline = new Date(`${deadline}T23:59:59`)
  if (Number.isNaN(endOfDeadline.getTime())) return "Active"
  return endOfDeadline.getTime() < now ? "Expired" : "Active"
}

function getLocation(job: StoredJob) {
  const location = (job.location ?? "").trim() || "Location not specified"
  return job.isRemote && !location.toLowerCase().includes("remote")
    ? `Remote · ${location}`
    : location
}

function formatDate(value?: string) {
  if (!value) return "No deadline"
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date)
}

function categoryStyle(category: string = "") {
  const value = category.toLowerCase()
  if (value.includes("design")) return { icon: Pencil, color: "text-orange-400", background: "bg-orange-400/10" }
  if (value.includes("marketing")) return { icon: Megaphone, color: "text-violet-300", background: "bg-violet-400/10" }
  if (value.includes("quality") || value.includes("qa")) return { icon: Settings, color: "text-indigo-300", background: "bg-indigo-400/10" }
  if (value.includes("devops") || value.includes("infrastructure")) return { icon: Network, color: "text-sky-400", background: "bg-sky-400/10" }
  return { icon: Code2, color: "text-violet-400", background: "bg-violet-400/10" }
}

export default async function JobsPage() {
  const now = getNow()
  let jobs: StoredJob[] = []
  let error: string | null = null

  try {
    jobs = await listJobs()
  } catch (loadError) {
    error = loadError instanceof Error ? loadError.message : "Could not load job posts"
  }

  return (
    <div className="min-h-svh bg-[#111111] px-4 py-6 text-white sm:px-6 lg:py-3 lg:pl-8 lg:pr-4">
      <div className="mx-auto max-w-[1395px]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-white/50">
          <span>Manage Jobs</span>
          <ChevronRight className="size-3 text-white/35" />
          <span className="text-[#c3c0ff]">Job Listings &amp; Postings</span>
        </nav>

        <header className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-medium tracking-tight sm:text-[26px]">Manage Job Posts</h1>
            <p className="mt-1 text-xs text-[#a0a0ab] sm:text-[13px]">
              Review live listings, monitor applicants, and update job details across your organization.
            </p>
          </div>
          <Link
            className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#5c53fe] px-3.5 text-xs font-medium text-white transition hover:bg-[#7169ff]"
            href="/Dashboard/Recruiter/jobs/new"
          >
            <CirclePlus className="size-4" />
            New Job Post
          </Link>
        </header>

        {error && (
          <p className="mt-5 rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200" role="alert">
            {error}
          </p>
        )}

        Displaying the recruiters created and active jobs

        <div className="mt-5 space-y-3 md:hidden">
          {jobs.length === 0 && !error ? (
            <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-8 text-center">
              <BriefcaseBusiness className="mx-auto size-6 text-white/40" />
              <p className="mt-3 font-medium">No job posts yet</p>
              <p className="mt-1 text-sm text-white/50">Your published jobs will appear here.</p>
            </div>
          ) : jobs.map((job) => {
            const status = getStatus(job.deadline, now)
            return (
              <article key={job._id} className="rounded-xl border border-white/[0.08] bg-[#111113] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="break-words font-medium">{job.title}</h2>
                    <p className="mt-1 text-xs text-[#a78bfa]">{job.category}</p>
                  </div>
                  <StatusBadge status={status} />
                </div>
                <p className="mt-4 text-sm text-white/85">{job.companyName}</p>
                <p className="mt-1 flex items-start gap-1.5 break-words text-xs text-[#9898a3]">
                  {job.isRemote ? <ArrowUpRight className="mt-0.5 size-3 shrink-0" /> : <MapPin className="mt-0.5 size-3 shrink-0" />}
                  {getLocation(job)}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-white/[0.07] pt-4 text-xs">
                  <JobInfo label="Job type" value={job.jobType || "Not specified"} />
                  <JobInfo label="Compensation" value={getSalary(job)} />
                  <JobInfo label="Applicants" value={<span className="inline-flex items-center gap-1"><UsersRound className="size-3.5" />0 candidates</span>} />
                  <JobInfo label="Deadline" value={formatDate(job.deadline)} />
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-5 hidden overflow-x-auto rounded-xl border border-white/[0.08] bg-[#151515] md:block">
          <table className="w-full min-w-[900px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[19%]" />
              <col className="w-[15%]" />
              <col className="w-[7%]" />
              <col className="w-[10%]" />
              <col className="w-[11%]" />
              <col className="w-[7%]" />
              <col className="w-[12%]" />
              <col className="w-[19%]" />
            </colgroup>
            <thead className="bg-[#0d0d0e] text-[10px] font-medium tracking-[0.06em] text-[#a1a1ad]">
              <tr>
                <th className="px-3 py-3.5 font-medium sm:px-4">JOB TITLE &amp; DEPT</th>
                <th className="px-3 py-3.5 font-medium sm:px-4">COMPANY &amp; LOCATION</th>
                <th className="px-3 py-3.5 font-medium sm:px-4">TYPE</th>
                <th className="px-3 py-3.5 font-medium sm:px-4">COMPENSATION</th>
                <th className="px-3 py-3.5 font-medium sm:px-4">APPLICANTS</th>
                <th className="px-3 py-3.5 font-medium sm:px-4">STATUS</th>
                <th className="px-3 py-3.5 font-medium sm:px-4">DEADLINE</th>
                <th className="px-3 py-3.5 text-right font-medium sm:px-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 && !error ? (
                <tr><td className="px-4 py-12 text-center text-sm text-white/50" colSpan={8}>No job posts yet. Create your first job post to see it here.</td></tr>
              ) : jobs.map((job) => {
                const status = getStatus(job.deadline, now)
                const category = categoryStyle(job.category)
                const CategoryIcon = category.icon
                return (
                  <tr key={job._id} className="border-t border-white/[0.055] text-xs">
                    <td className="px-3 py-3.5 sm:px-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`flex size-8 shrink-0 items-center justify-center rounded-md ${category.background} ${category.color}`}><CategoryIcon className="size-4" /></span>
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-white">{job.title}</span>
                          <span className="mt-0.5 block truncate text-[10px] text-[#a78bfa]">{job.category}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 sm:px-4">
                      <span className="block truncate font-medium text-white/90">{job.companyName}</span>
                      <span className="mt-0.5 flex items-center gap-1 truncate text-[10px] text-[#9898a3]">
                        {job.isRemote ? <ArrowUpRight className="size-3 shrink-0" /> : <MapPin className="size-3 shrink-0" />}
                        {getLocation(job)}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 sm:px-4"><span className="inline-flex rounded-full bg-white/[0.07] px-2.5 py-1 text-[10px] text-white/80">{job.jobType || "—"}</span></td>
                    <td className="px-3 py-3.5 text-white/90 sm:px-4">{getSalary(job)}</td>
                    <td className="px-3 py-3.5 sm:px-4">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[#c3c0ff]"><UsersRound className="size-3.5 text-[#bfb7ff]" />0 Candidates</span>
                    </td>
                    <td className="px-3 py-3 sm:px-4"><StatusBadge status={status} /></td>
                    <td className="px-3 py-3.5 sm:px-4"><span className="block whitespace-nowrap text-white/90">{formatDate(job.deadline)}</span><span className="mt-1 block text-[10px] text-white/35">{job.createdAt ? `Posted ${new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-Math.max(0, Math.floor((now - new Date(job.createdAt).getTime()) / 86400000)), "day")}` : ""}</span></td>
                    <td className="px-3 py-3.5 sm:px-4">
                      <div className="flex items-center justify-end gap-1">
                        <UpdateJobButton job={job} />
                        <ViewJobButton job={job} />
                        <DeleteJobButton job={job} />
                        <button aria-label={`More actions for ${job.title}`} className="inline-flex size-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/[0.07] hover:text-white" type="button">
                          <MoreVertical className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}