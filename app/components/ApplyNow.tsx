"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"
import { applyToAJob, getApplicationsCount } from "@/lib/actions/jobs"
import { useSession } from "@/lib/auth-client"
import type { StoredJob } from "@/lib/types/jobs"

export default function ApplyNow({ job }: { job: StoredJob }) {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleApply() {
    const user = session?.user
    if (isPending || isSubmitting) return

    if (!user) {
      router.push(`/sign-in?redirect=${encodeURIComponent(`/browse-jobs/${job._id}`)}`)
      return


    } else if (user.role === "seeker") {
      toast.add({
        title: "Not allowed",
        description: "Only job seekers can apply to this role.",
        type: "warning",
      })
      const countResult = await getApplicationsCount(`applicantId = ${user.id}`)

      if (countResult.count >= 5) {
        router.push(`/payment`)
        return
      } else {

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
        } else {
          toast.add({
            title: "Application submitted",
            description: `You applied to ${job.title} at ${job.companyName}.`,
            type: "success",
          })
          router.push("/browse-jobs")
        }
      }
      return
    }






    setIsSubmitting(false)
  }

  return (
    <button
      className="rounded-lg cursor-pointer bg-white px-4 py-2.5 text-xs font-semibold text-[#09090b] transition hover:bg-white/90 disabled:cursor-wait disabled:opacity-60"
      disabled={isPending || isSubmitting}
      onClick={handleApply}
      type="button"
    >
      {isPending ? "Loading…" : isSubmitting ? "Applying…" : "Apply Now"}
    </button>
  )
}
