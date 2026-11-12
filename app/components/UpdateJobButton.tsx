"use client"

import { useState, type FormEvent } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { Building2, CalendarDays, ChevronDown, CircleDollarSign, Globe2, MapPin, Pencil, X } from "lucide-react"
import type { JobFormData, StoredJob } from "@/lib/types/jobs"
import { updateJob } from "@/lib/api/jobs"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"


const fieldClass = "mt-1.5 h-9 w-full rounded-lg border border-white/[0.05] bg-[#202023] px-3 text-[11px] text-white/85 outline-none placeholder:text-white/35 focus:border-[#6557ff]"
const labelClass = "block text-[10px] font-medium text-white/80"
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className={labelClass}>{label}{children}</label>
}

export function UpdateJobButton({ job }: { job: StoredJob }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as unknown as JobFormData
    values.isRemote = formData.has("isRemote")

    try {
      await updateJob(job._id, values)
      setIsOpen(false)
      toast.add({
        title: "Job updated",
        description: `“${values.title}” has been updated.`,
      })
      router.refresh()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not update job post.")
    } finally {
      setIsSaving(false)
    }
  }


  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        aria-label={`Update ${job.title}`}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#39317b]/50 px-2.5 text-[10px] font-medium text-[#c3bcff] transition hover:bg-[#4c419c]"
      >
        <Pencil className="size-3.5" />Update
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-5">
          <Dialog.Popup className="relative my-auto max-h-[94svh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111111] p-4 text-white shadow-2xl outline-none sm:p-6 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Dialog.Close aria-label="Close update form" className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/[0.07] hover:text-white">
              <X className="size-4" />
            </Dialog.Close>
            <p className="text-[9px] text-white/50">Manage Jobs › Job Listings &amp; Postings › <span className="text-white/85">Update Job Post</span></p>
            <Dialog.Title className="mt-3 text-xl font-semibold">Update Job Post</Dialog.Title>
            <Dialog.Description className="mt-1 pr-8 text-[10px] text-white/45">Modify position specifications, compensation range, and candidate requirements for this listing.</Dialog.Description>

            <form className="mt-5 space-y-0" onSubmit={handleUpdate}>
              <section className="border-t border-white/[0.07] py-5">
                <h2 className="mb-4 flex items-center gap-2 text-[11px] font-medium"><span className="size-1.5 rounded-full bg-[#6653ff]" />1. Basic Information</h2>
                <div className="space-y-3">
                  <Field label="Job Title *"><input className={fieldClass} defaultValue={job.title} name="title" required /></Field>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Company Name *"><span className="relative block"><Building2 className="absolute left-2 top-4 size-3 text-white/40" /><input className={`${fieldClass} pl-7`} defaultValue={job.companyName} name="companyName" required /></span></Field>
                    <Field label="Job Category *"><select className={fieldClass} defaultValue={job.category} name="category" required><option value="">Select a category</option><option>Engineering &amp; Tech</option><option>Design</option><option>Marketing</option><option>Product</option><option>Other</option></select></Field>
                  </div>
                  <fieldset>
                    <legend className={labelClass}>Job Type *</legend>
                    <div className="mt-1.5 grid grid-cols-2 gap-1 sm:grid-cols-4">
                      {jobTypes.map((type) => (
                        <label key={type} className="flex h-9 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-[#202023] text-[10px] text-white/50 transition has-[:checked]:border-[#6557ff] has-[:checked]:bg-[#222126] has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#6557ff]/50">
                          <input className="sr-only" defaultChecked={job.jobType === type} name="jobType" required type="radio" value={type} />{type}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </section>

              <section className="border-t border-white/[0.07] py-5">
                <h2 className="mb-4 flex items-center gap-2 text-[11px] font-medium"><span className="size-1.5 rounded-full bg-[#6653ff]" />2. Location, Compensation &amp; Timeline</h2>
                <div className="mb-3">
                  <Field label="Status">
                    <span className="relative block">
                      <select className={`${fieldClass} appearance-none pr-9`} defaultValue={job.status || "Active"} name="status">
                        <option>Active</option><option>Paused</option><option>Closed</option><option>Expired</option>
                      </select>
                      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-4 size-3 text-white/50" />
                    </span>
                  </Field>
                </div>
                <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-white/[0.07] bg-[#202023] px-3 py-2.5 transition-colors hover:border-white/15">
                  <Globe2 className="size-4 shrink-0 text-[#b8afff]" />
                  <span className="flex-1"><span className="block text-[10px] font-medium">Remote Work Allowed (isRemote)</span><span className="mt-0.5 block text-[9px] text-white/45">Enable worldwide or distributed candidate applications</span></span>
                  <input aria-label="Remote work allowed" className="size-3.5 accent-[#6557ff]" defaultChecked={job.isRemote} name="isRemote" type="checkbox" />
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Field label="Job Location (location)"><span className="relative block"><MapPin className="absolute left-2 top-4 size-3 text-white/40" /><input className={`${fieldClass} pl-7`} defaultValue={job.location} name="location" /></span></Field>
                  <Field label="Application Deadline (deadline)"><span className="relative block"><CalendarDays className="absolute left-2 top-4 size-3 text-white/40" /><input className={`${fieldClass} pl-7`} defaultValue={job.deadline} name="deadline" type="date" /></span></Field>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <Field label="Min Salary / Rate"><span className="relative block"><CircleDollarSign className="absolute left-2 top-4 size-3 text-white/40" /><input className={`${fieldClass} pl-7`} defaultValue={job.minSalary} name="minSalary" /></span></Field>
                  <Field label="Max Salary / Rate"><span className="relative block"><CircleDollarSign className="absolute left-2 top-4 size-3 text-white/40" /><input className={`${fieldClass} pl-7`} defaultValue={job.maxSalary} name="maxSalary" /></span></Field>
                  <Field label="Frequency"><select className={fieldClass} defaultValue={job.frequency ?? ""} name="frequency"><option value="">Select frequency</option><option>Per hour</option><option>Per month</option><option>Per year</option></select></Field>
                </div>
              </section>

              <section className="border-t border-white/[0.07] py-5">
                <h2 className="mb-4 flex items-center gap-2 text-[11px] font-medium"><span className="size-1.5 rounded-full bg-[#6653ff]" />3. Responsibilities &amp; Requirements</h2>
                <div className="space-y-3">
                  <Field label="Key Responsibilities *"><textarea className="mt-1.5 min-h-20 w-full resize-y rounded-lg border border-white/[0.05] bg-[#202023] px-3 py-2.5 text-[10px] leading-5 text-white/75 outline-none focus:border-[#6557ff]" defaultValue={job.description} name="description" required /></Field>
                  <Field label="Qualifications & Requirements *"><textarea className="mt-1.5 min-h-20 w-full resize-y rounded-lg border border-white/[0.05] bg-[#202023] px-3 py-2.5 text-[10px] leading-5 text-white/75 outline-none focus:border-[#6557ff]" defaultValue={job.requirements} name="requirements" /></Field>
                </div>
              </section>

              <div className="flex justify-end border-t border-white/[0.07] pt-4">
                {error && <p className="mr-auto self-center text-xs text-red-300" role="alert">{error}</p>}
                <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#5c53fe] px-4 text-[10px] font-medium text-white shadow-[0_5px_18px_rgba(92,83,254,0.25)] transition hover:bg-[#7169ff] disabled:cursor-not-allowed disabled:opacity-60" disabled={isSaving} type="submit">
                  {isSaving ? "Updating…" : <>Update Job <span aria-hidden="true">→</span></>}
                </button>
              </div>
            </form>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
