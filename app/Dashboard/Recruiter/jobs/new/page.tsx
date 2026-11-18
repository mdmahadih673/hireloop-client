"use client"

import Link from "next/link"
import { ArrowLeft, BriefcaseBusiness, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createJob, getRecruiterJobCount, getPremimunUserById } from "@/lib/actions/jobs"
import { JobFormSection } from "@/components/jobs/JobFormSection"
import type { JobFormData } from "@/lib/types/jobs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSession } from "@/lib/auth-client"

const fieldClassName =
  "mt-2 h-11 border-white/10 bg-[#0b0b0e] text-white placeholder:text-white/35 focus-visible:border-[#6653ff] focus-visible:ring-[#6653ff]/30"

function Field({
  label,
  htmlFor,
  required = false,
  children, }: {
    label: string
    htmlFor: string
    required?: boolean
    children: React.ReactNode
  }) {
  return (
    <div className="min-w-0">
      <label className="text-sm font-medium text-white/85" htmlFor={htmlFor}>
        {label}{required && <span className="ml-1 text-[#a99dff]">*</span>}
      </label>
      {children}
    </div>
  )
}

function SelectField({
  id,
  children,
  value,
  onChange,
}: {
  id: string
  children: React.ReactNode
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <select
      className={`${fieldClassName} w-full rounded-lg border px-3 text-sm outline-none focus:ring-2`}
      id={id}
      name={id}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  )
}

function TextAreaField({ id, placeholder, required = false, value, onChange }: { id: string; placeholder: string; required?: boolean; value: string; onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <textarea
      className="mt-2 min-h-32 w-full resize-y rounded-lg border border-white/10 bg-[#0b0b0e] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus-visible:border-[#6653ff] focus-visible:ring-2 focus-visible:ring-[#6653ff]/30"
      id={id}
      name={id}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      value={value}
    />
  )
}

export default function NewJobPage() {

  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishError, setPublishError] = useState("")

  const [form, setForm] = useState<JobFormData>({
    title: "",
    companyName: "",
    category: "",
    jobType: "",
    location: "",
    deadline: "",
    recruiterId: session?.user.id?? '',
    isRemote: false,
    minSalary: "",
    maxSalary: "",
    frequency: "",
    description: "",
    requirements: "",
  })

  function updateForm(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? (event.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    return isPublishing ? undefined : publishJob(event)
  }

  async function publishJob(event: React.FormEvent<HTMLFormElement>) {
    const user = session?.user
    if (isPending) return
    if (!user) {
      router.push(`/sign-in?redirect=${encodeURIComponent("/Dashboard/Recruiter/jobs/new")}`)
      return
    }
    if (user.role?.toLowerCase() !== "recruiter") {
      setPublishError("শুধু recruiter-রা job post করতে পারবেন।")
      return
    }

    setIsPublishing(true)
    setPublishError("")
    try {
      const [{ count }, premiumResult] = await Promise.all([
        getRecruiterJobCount(user.id),
        getPremimunUserById(user.id),
      ])
      if (!premiumResult?.premium && count >= 2) {
        router.push("/Dashboard/Recruiter/Premium?returnTo=%2FDashboard%2FRecruiter%2Fjobs%2Fnew")
        return
      }
      await createJob({ ...form, recruiterId: user.id })
      router.push("/Dashboard/Recruiter/jobs")
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : "Could not publish job. Please try again.")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="min-h-svh bg-[#08080a] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
          href="/Dashboard/Recruiter/jobs"
        >
          <ArrowLeft className="size-4" />
          Back to Manage Jobs
        </Link>

        <div className="mt-6 flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#6653ff]/15 text-[#b8adff]">
            <BriefcaseBusiness className="size-5" />
          </div>
          <div>
            <p className="text-sm text-white/45">Recruiter / Manage Jobs / Add New Job</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Add New Job</h1>
            <p className="mt-2 text-sm text-white/55">Add the role details candidates need to apply.</p>
          </div>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <JobFormSection description="Start with the role and company information." title="Job details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field htmlFor="title" label="Job Title" required>
                <Input className={fieldClassName} id="title" name="title" onChange={updateForm} value={form.title} placeholder="e.g. Senior Frontend Developer" required />
              </Field>
              <Field htmlFor="companyName" label="Company Name" required>
                <Input className={fieldClassName} id="companyName" name="companyName" onChange={updateForm} value={form.companyName} placeholder="Enter company name" required />
              </Field>
              <Field htmlFor="category" label="Job Category" required>
                <SelectField id="category" onChange={updateForm} value={form.category}>
                  <option value="" disabled>Select a category</option>
                  <option>Engineering &amp; Tech</option>
                  <option>Design</option>
                  <option>Product</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Other</option>
                </SelectField>
              </Field>
              <Field htmlFor="jobType" label="Job Type" required>
                <SelectField id="jobType" onChange={updateForm} value={form.jobType}>
                  <option value="" disabled>Select a job type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </SelectField>
              </Field>
              <Field htmlFor="location" label="Location">
                <Input className={fieldClassName} id="location" name="location" onChange={updateForm} value={form.location} placeholder="e.g. New York, USA" />
              </Field>
              <Field htmlFor="deadline" label="Application Deadline">
                <Input className={fieldClassName} id="deadline" name="deadline" onChange={updateForm} value={form.deadline} type="date" />
              </Field>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0b0b0e] p-4">
              <input checked={form.isRemote} className="size-4 accent-[#6653ff]" name="isRemote" onChange={updateForm} type="checkbox" />
              <span>
                <span className="block text-sm font-medium">Remote work allowed</span>
                <span className="mt-1 block text-xs text-white/45">Candidates can apply from any location.</span>
              </span>
            </label>
          </JobFormSection>

          <JobFormSection description="Share a salary range with candidates." title="Compensation">
            <div className="grid gap-5 sm:grid-cols-3">
              <Field htmlFor="minSalary" label="Minimum Salary">
                <Input className={fieldClassName} id="minSalary" min="0" name="minSalary" onChange={updateForm} value={form.minSalary} placeholder="e.g. 80000" type="number" />
              </Field>
              <Field htmlFor="maxSalary" label="Maximum Salary">
                <Input className={fieldClassName} id="maxSalary" min="0" name="maxSalary" onChange={updateForm} value={form.maxSalary} placeholder="e.g. 120000" type="number" />
              </Field>
              <Field htmlFor="frequency" label="Pay Frequency">
                <SelectField id="frequency" onChange={updateForm} value={form.frequency}>
                  <option value="" disabled>Select frequency</option>
                  <option>Per year</option>
                  <option>Per month</option>
                  <option>Per hour</option>
                </SelectField>
              </Field>
            </div>
          </JobFormSection>

          <JobFormSection description="Describe the work and the experience candidates need." title="Description & requirements">
            <div className="space-y-5">
              <Field htmlFor="description" label="Job Description" required>
                <TextAreaField id="description" onChange={updateForm} value={form.description} placeholder="Describe the role and what the successful candidate will do..." required />
              </Field>
              <Field htmlFor="requirements" label="Qualifications & Requirements">
                <TextAreaField id="requirements" onChange={updateForm} value={form.requirements} placeholder="List the skills, experience, and qualifications required..." />
              </Field>
            </div>
          </JobFormSection>

          <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">
            <Button nativeButton={false} render={<Link href="/Dashboard/Recruiter/jobs" />} variant="outline" className="h-10 border-white/15 bg-transparent text-white hover:bg-white/[0.06]">
              <X className="size-4" />Cancel
            </Button>
            {publishError && <p className="mr-auto self-center text-sm text-red-300" role="alert">{publishError}</p>}
            <Button disabled={isPending || isPublishing} type="submit" className="h-10 bg-[#6653ff] px-5 text-white hover:bg-[#7969ff] disabled:cursor-not-allowed disabled:opacity-60">
              <Plus className="size-4" />{isPending ? "Checking account…" : isPublishing ? "Publishing…" : "Publish Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
