"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, ChevronLeft, ChevronRight, Code2, Download, FileText, Mail, Search, UserRound } from "lucide-react"
import type { ApplicationStatus, JobApplication } from "@/lib/types/applications"
import { getApplicationsByUser } from "@/lib/actions/jobs"
import { useSession } from "@/lib/auth-client"

const statusStyles: Record<ApplicationStatus, string> = {
  applied: "border-white/10 bg-white/[0.07] text-white/65",
  review: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  shortlisted: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  interview: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  waiting_list: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  rejected: "border-red-500/30 bg-red-500/10 text-red-400",
  offered: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
}

const statusLabels: Record<ApplicationStatus, string> = {
  applied: "Applied",
  review: "Review",
  shortlisted: "Shortlisted",
  interview: "Interview call",
  waiting_list: "Waiting list",
  approved: "Approved",
  rejected: "Rejected",
  offered: "Offered",
}

function relativeDate(value: string) {
  const elapsedHours = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 3_600_000))
  return elapsedHours < 24
    ? `${Math.max(1, elapsedHours)} ${elapsedHours === 1 ? "hour" : "hours"} ago`
    : `${Math.floor(elapsedHours / 24)} ${Math.floor(elapsedHours / 24) === 1 ? "day" : "days"} ago`
}

export default function ApplicationsPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const userId = session?.user.id
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [allApplications, setAllApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isPending) return
    if (!userId) {
      router.replace("/sign-in?redirect=%2FDashboard%2FSeeker%2Fapplications")
      return
    }

    getApplicationsByUser(userId)
      .then(setAllApplications)
      .catch(() => setAllApplications([]))
      .finally(() => setLoading(false))
  }, [userId, isPending, router])

  const isLoading = isPending || !userId || loading

  const applications = useMemo(() => allApplications
    .filter((application) => Boolean(application.archived) === (activeTab === "archived"))
    .filter((application) => `${application.jobTitle} ${application.companyName}`.toLowerCase().includes(search.trim().toLowerCase())), [activeTab, search, allApplications])

  const pageSize = 5
  const pageCount = Math.max(1, Math.ceil(applications.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageApplications = applications.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function changePage(nextPage: number) {
    setPage(Math.max(1, Math.min(nextPage, pageCount)))
  }

  const stats = [
    { label: "Total Applied", value: String(allApplications.length), color: "text-white" },
    { label: "Shortlisted", value: String(allApplications.filter((item) => item.status === "shortlisted").length), color: "text-white" },
    { label: "Interviews", value: String(allApplications.filter((item) => item.status === "interview").length), color: "text-amber-400" },
    { label: "Success Rate", value: `${allApplications.length ? Math.round(allApplications.filter((item) => item.status === "offered").length / allApplications.length * 100) : 0}%`, color: "text-emerald-400" },
  ]

  return (
    <div className="min-h-svh bg-[#0d0d0f] text-white">
      <header className="flex h-[58px] items-center justify-between gap-4 border-b border-white/[0.08] px-5 sm:px-7">
        <label className="flex h-9 w-full max-w-[360px] items-center gap-2 rounded-lg border border-white/[0.08] bg-[#111113] px-3 text-white/40 focus-within:border-white/20">
          <Search aria-hidden="true" className="size-3.5 shrink-0" />
          <input className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/40" onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search applications..." value={search} />
        </label>
        <div className="flex shrink-0 items-center gap-4 text-white/60">
          <button aria-label="Notifications" className="hover:text-white" type="button"><Bell className="size-4" /></button>
          <button aria-label="Messages" className="hover:text-white" type="button"><Mail className="size-4" /></button>
          <span className="flex size-7 items-center justify-center rounded-full border border-white/10 bg-[#222226] text-[#c3bcff]"><UserRound className="size-4" /></span>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-6 sm:px-7 sm:py-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">My Applications</h1>
            <p className="mt-1 text-xs text-white/55">Track your job applications and interview progress in real time.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-white/[0.08] bg-[#171719] p-1">
              {(["active", "archived"] as const).map((tab) => (
                <button aria-pressed={activeTab === tab} className={`rounded-md px-3.5 py-2 text-[11px] capitalize transition ${activeTab === tab ? "bg-[#222225] text-white" : "text-white/50 hover:text-white"}`} key={tab} onClick={() => { setActiveTab(tab); setPage(1) }} type="button">{tab}</button>
              ))}
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-white px-3.5 text-[11px] font-semibold text-[#141416] transition hover:bg-white/90" onClick={() => window.print()} type="button"><Download className="size-3.5" />Export PDF</button>
          </div>
        </div>

        <section aria-label="Application summary" className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {stats.map((stat) => (
            <article className="rounded-xl border border-white/[0.08] bg-[#141416] px-4 py-3.5" key={stat.label}>
              <p className="text-[11px] text-white/50">{stat.label}</p>
              <p className={`mt-1 text-xl font-semibold ${stat.color}`}>{stat.value}</p>
            </article>
          ))}
        </section>

        <section aria-label="Applications list" className="mt-4 overflow-hidden rounded-xl border border-white/[0.08] bg-[#141416]">
          <div className="hidden grid-cols-[minmax(230px,1.5fr)_minmax(150px,1fr)_minmax(110px,.7fr)_minmax(120px,.7fr)_70px] gap-4 border-b border-white/[0.08] bg-[#19191c] px-5 py-3 text-[10px] text-white/45 md:grid">
            <span>Job Title</span><span>Company</span><span>Applied</span><span>Status</span><span className="text-right">Action</span>
          </div>

          {pageApplications.length ? pageApplications.map((application) => (
            <article className="grid gap-3 border-b border-white/[0.07] px-4 py-4 last:border-b-0 sm:px-5 md:grid-cols-[minmax(230px,1.5fr)_minmax(150px,1fr)_minmax(110px,.7fr)_minmax(120px,.7fr)_70px] md:items-center md:gap-4" key={application._id}>
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-[#202023] text-white/75"><Code2 className="size-4" /></span>
                <span className="min-w-0"><span className="block truncate text-xs font-medium">{application.jobTitle}</span><span className="mt-1 block truncate text-[10px] text-white/45">{application.jobType} · {application.location}</span></span>
              </div>
              <span className="pl-12 text-xs text-white/75 md:pl-0">{application.companyName}</span>
              <span className="pl-12 text-[11px] text-white/50 md:pl-0">{relativeDate(application.appliedAt)}</span>
              <span className="pl-12 md:pl-0"><span className={`inline-flex rounded-full border px-2 py-1 text-[10px] ${statusStyles[application.status]}`}>{statusLabels[application.status]}</span></span>
              <button className="justify-self-end text-[11px] text-white/75 transition hover:text-white md:justify-self-end" onClick={() => setSelectedApplication(application)} type="button">Details</button>
            </article>
          )) : (
            <div className="px-5 py-16 text-center">
              {isLoading ? (
                <>
                  <FileText className="mx-auto size-6 animate-pulse text-white/35" />
                  <p className="mt-3 text-sm font-medium">Loading applications…</p>
                </>
              ) : (
                <>
                  <FileText className="mx-auto size-6 text-white/35" />
                  <p className="mt-3 text-sm font-medium">No applications found</p>
                  <p className="mt-1 text-xs text-white/45">Jobs you apply to will show up here.</p>
                </>
              )}
            </div>
          )}

          <footer className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 text-[10px] text-white/45 sm:flex-row sm:px-5">
            <span>
              {applications.length
                ? `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, applications.length)} of ${applications.length} applications`
                : "No applications to show"}
            </span>
            {pageCount > 1 && (
              <nav aria-label="Application pages" className="flex items-center gap-1.5">
                <button aria-label="Previous page" className="flex size-7 items-center justify-center rounded-md border border-white/[0.08] text-white/50 disabled:opacity-40" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} type="button"><ChevronLeft className="size-3.5" /></button>
                {Array.from({ length: Math.min(3, pageCount) }, (_, index) => index + 1).map((number) => (
                  <button aria-current={currentPage === number ? "page" : undefined} className={`flex size-7 items-center justify-center rounded-md text-xs font-semibold transition ${currentPage === number ? "bg-white text-[#141416]" : "border border-white/[0.08] text-white/50 hover:text-white"}`} key={number} onClick={() => changePage(number)} type="button">{number}</button>
                ))}
                {pageCount > 3 && (
                  <>
                    <span className="px-0.5 text-white/35">…</span>
                    <button aria-current={currentPage === pageCount ? "page" : undefined} className={`flex size-7 items-center justify-center rounded-md text-xs font-semibold transition ${currentPage === pageCount ? "bg-white text-[#141416]" : "border border-white/[0.08] text-white/50 hover:text-white"}`} onClick={() => changePage(pageCount)} type="button">{pageCount}</button>
                  </>
                )}
                <button aria-label="Next page" className="flex size-7 items-center justify-center rounded-md border border-white/[0.08] text-white/50 disabled:opacity-40" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)} type="button"><ChevronRight className="size-3.5" /></button>
              </nav>
            )}
          </footer>
        </section>
      </main>

      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelectedApplication(null)}>
          <section aria-labelledby="application-details-title" aria-modal="true" className="w-full max-w-md rounded-xl border border-white/10 bg-[#171719] p-5 shadow-2xl" onClick={(event) => event.stopPropagation()} role="dialog">
            <p className="text-[10px] uppercase tracking-wider text-white/45">Application details</p>
            <h2 className="mt-2 text-lg font-semibold" id="application-details-title">{selectedApplication.jobTitle}</h2>
            <p className="mt-1 text-sm text-white/55">{selectedApplication.companyName}</p>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-xs">
              <div><dt className="text-white/40">Status</dt><dd className="mt-1">{statusLabels[selectedApplication.status]}</dd></div>
              <div><dt className="text-white/40">Applied</dt><dd className="mt-1">{relativeDate(selectedApplication.appliedAt)}</dd></div>
              <div><dt className="text-white/40">Job type</dt><dd className="mt-1">{selectedApplication.jobType}</dd></div>
              <div><dt className="text-white/40">Location</dt><dd className="mt-1">{selectedApplication.location}</dd></div>
            </dl>
            <button className="mt-6 w-full rounded-lg bg-white py-2.5 text-xs font-semibold text-[#141416]" onClick={() => setSelectedApplication(null)} type="button">Close</button>
          </section>
        </div>
      )}
    </div>
  )
}
