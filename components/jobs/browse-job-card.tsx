import { Banknote, Bookmark, BriefcaseBusiness, MapPin } from "lucide-react"
import Link from "next/link"
import type { StoredJob } from "@/lib/types/jobs"

function salaryLabel(job: StoredJob) {
  const range = [job.minSalary, job.maxSalary].filter(Boolean).join(" - ")
  return range
    ? `${range}${job.frequency ? ` / ${job.frequency.toLowerCase().replace("per ", "")}` : ""}`
    : "Salary not listed"
}

export function BrowseJobCard({ job }: { job: StoredJob }) {
  const companyInitial = job.companyName.trim().charAt(0).toUpperCase() || "H"

  return (
    <article className="rounded-xl border border-white/[0.07] bg-[#141416] p-4 transition hover:border-white/[0.14] sm:p-5">
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-[#222226] text-sm font-semibold text-[#a99dff]"
        >
          {companyInitial}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-white sm:text-base">
            <Link
              className="transition hover:text-[#b9afff]"
              href={`/browse-jobs/${encodeURIComponent(job._id)}`}
            >
              {job.title}
            </Link>
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-white/45">
            <span>{job.companyName}</span>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden="true" className="size-3.5" />
              {job.location || "Location not specified"}
              {job.isRemote ? " (Remote)" : ""}
            </span>
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-[#1b1b1e] px-2 py-1 text-[10px] text-white/80">
              <Banknote aria-hidden="true" className="size-3.5" />
              {salaryLabel(job)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-[#1b1b1e] px-2 py-1 text-[10px] text-white/80">
              <BriefcaseBusiness aria-hidden="true" className="size-3" />
              {job.jobType}
            </span>
            {job.isRemote && (
              <span className="rounded-md border border-[#6653ff]/20 bg-[#6653ff]/10 px-2 py-1 text-[10px] text-[#b9afff]">
                Remote
              </span>
            )}
          </div>
        </div>

        <button
          aria-label={`Save ${job.title}`}
          className="shrink-0 rounded-md p-1.5 text-white/50 transition hover:bg-white/[0.06] hover:text-white"
          type="button"
        >
          <Bookmark aria-hidden="true" className="size-4" />
        </button>
      </div>
    </article>
  )
}
