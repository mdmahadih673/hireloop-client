"use client"

import { useEffect, useState } from "react"
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
  Trash2,
  UsersRound,
} from "lucide-react"
import { listJobs, type StoredJob } from "@/lib/actions/jobs"

function getSalary(job: StoredJob) {
  if (!job.minSalary && !job.maxSalary) return "Not specified"

  const range = [job.minSalary, job.maxSalary].filter(Boolean).join(" – ")
  const frequency = {
    "Per year": "/ yr",
    "Per month": "/ mo",
    "Per hour": "/ hr",
  }[job.frequency] ?? ""

  return `${range}${frequency ? ` ${frequency}` : ""}`
}

function getStatus(deadline: string) {
  if (!deadline) return "Active"
  const endOfDeadline = new Date(`${deadline}T23:59:59`)
  return endOfDeadline < new Date() ? "Expired" : "Active"
}

function getLocation(job: StoredJob) {
  const location = job.location.trim() || "Location not specified"
  return job.isRemote && !location.toLowerCase().includes("remote")
    ? `Remote · ${location}`
    : location
}

function formatDate(value: string) {
  if (!value) return "No deadline"
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date)
}

function categoryStyle(category: string) {
  const value = category.toLowerCase()
  if (value.includes("design")) return { icon: Pencil, color: "text-orange-400", background: "bg-orange-400/10" }
  if (value.includes("marketing")) return { icon: Megaphone, color: "text-violet-300", background: "bg-violet-400/10" }
  if (value.includes("quality") || value.includes("qa")) return { icon: Settings, color: "text-indigo-300", background: "bg-indigo-400/10" }
  if (value.includes("devops") || value.includes("infrastructure")) return { icon: Network, color: "text-sky-400", background: "bg-sky-400/10" }
  return { icon: Code2, color: "text-violet-400", background: "bg-violet-400/10" }
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<StoredJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    listJobs()
      .then((data) => {
        if (isMounted) setJobs(data)
      })
      .catch(() => {
        if (isMounted) setError("Could not load job posts. Check that the jobs API is running.")
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="min-h-svh bg-[#111111] px-4 py-6 text-white sm:px-6 lg:px-1 lg:py-3">
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

        {/* Mobile cards keep every field readable without forcing a wide table onto a phone. */}
        <div className="mt-5 space-y-3 md:hidden">
          {isLoading ? (
            <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-6 text-sm text-white/50">Loading job posts…</div>
          ) : jobs.length === 0 && !error ? (
            <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-8 text-center">
              <BriefcaseBusiness className="mx-auto size-6 text-white/40" />
              <p className="mt-3 font-medium">No job posts yet</p>
              <p className="mt-1 text-sm text-white/50">Your published jobs will appear here.</p>
            </div>
          ) : jobs.map((job) => {
            const status = getStatus(job.deadline)
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
                  <Info label="Job type" value={job.jobType || "Not specified"} />
                  <Info label="Compensation" value={getSalary(job)} />
                  <Info label="Applicants" value={<span className="inline-flex items-center gap-1"><UsersRound className="size-3.5" />0 candidates</span>} />
                  <Info label="Deadline" value={formatDate(job.deadline)} />
                </div>
              </article>
            )
          })}
        </div>

        {/* The desktop table scrolls horizontally at tablet widths rather than squeezing columns. */}
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
              {isLoading ? (
                <tr><td className="px-4 py-10 text-center text-sm text-white/50" colSpan={8}>Loading job posts…</td></tr>
              ) : jobs.length === 0 && !error ? (
                <tr><td className="px-4 py-12 text-center text-sm text-white/50" colSpan={8}>No job posts yet. Create your first job post to see it here.</td></tr>
              ) : jobs.map((job) => {
                const status = getStatus(job.deadline)
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
                    <td className="px-3 py-3.5 sm:px-4"><span className="block whitespace-nowrap text-white/90">{formatDate(job.deadline)}</span><span className="mt-1 block text-[10px] text-white/35">{job.createdAt ? `Posted ${new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-Math.max(0, Math.floor((Date.now() - new Date(job.createdAt).getTime()) / 86400000)), "day")}` : ""}</span></td>
                    <td className="px-3 py-3.5 sm:px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button aria-label={`Update ${job.title}`} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#39317b]/50 px-2.5 text-[10px] font-medium text-[#c3bcff] transition hover:bg-[#4c419c]" type="button"><Pencil className="size-3.5" />Update</button>
                        <button aria-label={`Delete ${job.title}`} className="inline-flex size-8 items-center justify-center rounded-lg bg-white/[0.05] text-white/55 transition hover:bg-red-500/15 hover:text-red-300" type="button"><Trash2 className="size-3.5" /></button>
                        <button aria-label={`More actions for ${job.title}`} className="inline-flex size-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/[0.07] hover:text-white" type="button"><MoreVertical className="size-4" /></button>
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

function StatusBadge({ status }: { status: string }) {
  const active = status === "Active"
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] ${active ? "bg-[#06351f] text-[#31d381]" : "bg-white/[0.08] text-[#a0a0a8]"}`}>
      <span className={`size-1.5 rounded-full ${active ? "bg-[#22c879]" : "bg-[#777780]"}`} />
      {status}
    </span>
  )
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
      <div className="mt-1 break-words text-white/85">{value}</div>
    </div>
  )
}
