"use client"

import Link from "next/link"
import { Eye } from "lucide-react"
import type { StoredJob } from "@/lib/actions/jobs"

export function ViewJobButton({ job }: { job: StoredJob }) {
  return (
      <Link
        aria-label={`View details for ${job.title}`}
        className="inline-flex size-8 items-center justify-center rounded-lg bg-white/[0.05] text-white/55 transition hover:bg-[#6653ff]/15 hover:text-[#c3bcff]"
        href={`/Dashboard/Recruiter/jobs/${encodeURIComponent(job._id)}`}
      >
        <Eye className="size-3.5" />
      </Link>
  )
}
