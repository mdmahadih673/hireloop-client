"use client"

import { useState } from "react"
import type { ApplicationStatus } from "@/lib/types/applications"
import { updateApplicationStatus } from "@/lib/actions/jobs"
import { useSession } from "@/lib/auth-client"

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: "applied", label: "Applied" },
  { value: "review", label: "In review" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview call" },
  { value: "waiting_list", label: "Waiting list" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "offered", label: "Offer sent" },
]

export function ApplicantStatusSelect({ applicationId, initialStatus }: { applicationId: string; initialStatus: ApplicationStatus }) {
  const { data: session, isPending } = useSession()
  const [status, setStatus] = useState<ApplicationStatus>(initialStatus)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function handleChange(nextStatus: ApplicationStatus) {
    const recruiter = session?.user
    if (!recruiter || recruiter.role?.toLowerCase() !== "recruiter" || saving || nextStatus === status) return

    const previousStatus = status
    setStatus(nextStatus)
    setSaving(true)
    setError("")
    try {
      await updateApplicationStatus(applicationId, nextStatus)
    } catch (updateError) {
      setStatus(previousStatus)
      setError(updateError instanceof Error ? updateError.message : "Could not update status.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <select
        aria-label="Update applicant status"
        className="max-w-40 rounded-full border border-white/10 bg-[#1b1b1f] px-3 py-1.5 text-[10px] text-white outline-none transition focus:border-violet-400/60 disabled:cursor-wait disabled:opacity-60"
        disabled={isPending || saving}
        onChange={(event) => handleChange(event.target.value as ApplicationStatus)}
        value={status}
      >
        {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <p aria-live="polite" className="mt-1 min-h-3 text-[9px] text-red-300">{error || (saving ? "Saving…" : "")}</p>
    </div>
  )
}
