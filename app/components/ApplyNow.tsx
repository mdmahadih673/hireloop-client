"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"
import { applyToAJob, getApplicationsByUser, getApplicationsCount, getPremimunUserById } from "@/lib/actions/jobs"
import { useSession } from "@/lib/auth-client"
import type { StoredJob } from "@/lib/types/jobs"

export default function ApplyNow({ job }: { job: StoredJob }) {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alreadyApplied, setAlreadyApplied] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function checkApplied() {
      const user = session?.user
      if (isPending || !user || user.role?.toLowerCase() !== "seeker") return
      try {
        const applications = await getApplicationsByUser(user.id)
        if (!cancelled) setAlreadyApplied(applications.some((a) => a.jobId === job._id))
      } catch {
        if (!cancelled) setAlreadyApplied(false)
      }
    }
    checkApplied()
    return () => { cancelled = true }
  }, [isPending, session, job._id])

  async function handleApply() {
    const user = session?.user
    if (isPending || isSubmitting || alreadyApplied) return

    if (!user) {
      router.push(`/sign-in?redirect=${encodeURIComponent(`/browse-jobs/${job._id}`)}`)
      return
    }

    if (user.role?.toLowerCase() !== "seeker") {
      toast.add({
        title: "Not allowed",
        description: "Only job seekers can apply to this role.",
        type: "warning",
      })
      return
    }

    const premimunResult = await getPremimunUserById(user.id)
    console.log(premimunResult)

    const countResult = await getApplicationsCount(`userId=${user.id}`)

    if (!premimunResult.premium && countResult.count >= 5) {
      router.push("/payment?amount=20")
      return  
    }

    setIsSubmitting(true)
    const result = await applyToAJob({
      data: {
        jobId: job._id,
        userId: user.id,
        applicantName: user.name || "Hireloop member",
        applicantEmail: user.email,
        jobTitle: job.title,
        companyName: job.companyName,
        jobType: job.jobType,
        location: job.location,
        isRemote: job.isRemote,
      },
    })

    if (result?.error) {
      toast.add({ title: "Already applied", description: result.error, type: "warning" })
      setAlreadyApplied(true)
    } else {
      toast.add({
        title: "Application submitted",
        description: `You applied to ${job.title} at ${job.companyName}.`,
        type: "success",
      })
      setAlreadyApplied(true)
      router.push("/browse-jobs")
    }

    setIsSubmitting(false)
  }

  return (
    <button
      className="rounded-lg cursor-pointer bg-white px-4 py-2.5 text-xs font-semibold text-[#09090b] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={isPending || isSubmitting || alreadyApplied}
      onClick={handleApply}
      type="button"
    >
      {alreadyApplied ? "Applied" : isPending ? "Loading…" : isSubmitting ? "Applying…" : "Apply Now"}
    </button>
  )
}
