"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { JobFormData } from "@/lib/types/jobs"
import { deleteJob } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

export function DeleteJobButton({ job }: { job: JobFormData }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    await deleteJob(job._id)
    setIsOpen(false)
    toast.add({
      title: "Job deleted",
      description: `“${job.title}” has been removed.`,
    })
    router.refresh()
  }


  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        aria-label={`Delete ${job.title}`}
        className="inline-flex size-8 items-center justify-center rounded-lg bg-white/[0.05] text-white/55 transition hover:bg-red-500/15 hover:text-red-300"
      >
        <Trash2 className="size-3.5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete this job post?</AlertDialogTitle>
        <AlertDialogDescription>
          “{job.title}” will be permanently removed. This action cannot be undone.
        </AlertDialogDescription>
        <div className="mt-6 flex justify-end gap-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <button
            className="inline-flex h-10 items-center justify-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition hover:bg-red-400"
            onClick={handleDelete}
            type="button"
          >
            Delete job
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
