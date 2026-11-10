import Link from "next/link"
import { ArrowLeft, BriefcaseBusiness, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const fieldClassName =
  "mt-2 h-11 border-white/10 bg-[#0b0b0e] text-white placeholder:text-white/35 focus-visible:border-[#6653ff] focus-visible:ring-[#6653ff]/30"

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
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
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <select
      className={`${fieldClassName} w-full rounded-lg border px-3 text-sm outline-none focus:ring-2`}
      defaultValue=""
      id={id}
      name={id}
    >
      {children}
    </select>
  )
}

function TextAreaField({ id, placeholder }: { id: string; placeholder: string }) {
  return (
    <textarea
      className="mt-2 min-h-32 w-full resize-y rounded-lg border border-white/10 bg-[#0b0b0e] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus-visible:border-[#6653ff] focus-visible:ring-2 focus-visible:ring-[#6653ff]/30"
      id={id}
      name={id}
      placeholder={placeholder}
    />
  )
}

export default function NewJobPage() {
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

        <form className="mt-8 space-y-5">
          <section className="rounded-2xl border border-white/10 bg-[#111114] p-5 sm:p-7">
            <div className="mb-6">
              <h2 className="text-base font-semibold">Job details</h2>
              <p className="mt-1 text-sm text-white/45">Start with the role and company information.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field htmlFor="title" label="Job Title" required>
                <Input className={fieldClassName} id="title" name="title" placeholder="e.g. Senior Frontend Developer" required />
              </Field>
              <Field htmlFor="companyName" label="Company Name" required>
                <Input className={fieldClassName} id="companyName" name="companyName" placeholder="Enter company name" required />
              </Field>
              <Field htmlFor="category" label="Job Category" required>
                <SelectField id="category">
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
                <SelectField id="jobType">
                  <option value="" disabled>Select a job type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </SelectField>
              </Field>
              <Field htmlFor="location" label="Location">
                <Input className={fieldClassName} id="location" name="location" placeholder="e.g. New York, USA" />
              </Field>
              <Field htmlFor="deadline" label="Application Deadline">
                <Input className={fieldClassName} id="deadline" name="deadline" type="date" />
              </Field>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0b0b0e] p-4">
              <input className="size-4 accent-[#6653ff]" name="isRemote" type="checkbox" />
              <span>
                <span className="block text-sm font-medium">Remote work allowed</span>
                <span className="mt-1 block text-xs text-white/45">Candidates can apply from any location.</span>
              </span>
            </label>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#111114] p-5 sm:p-7">
            <div className="mb-6">
              <h2 className="text-base font-semibold">Compensation</h2>
              <p className="mt-1 text-sm text-white/45">Share a salary range with candidates.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field htmlFor="minSalary" label="Minimum Salary">
                <Input className={fieldClassName} id="minSalary" min="0" name="minSalary" placeholder="e.g. 80000" type="number" />
              </Field>
              <Field htmlFor="maxSalary" label="Maximum Salary">
                <Input className={fieldClassName} id="maxSalary" min="0" name="maxSalary" placeholder="e.g. 120000" type="number" />
              </Field>
              <Field htmlFor="frequency" label="Pay Frequency">
                <SelectField id="frequency">
                  <option value="" disabled>Select frequency</option>
                  <option>Per year</option>
                  <option>Per month</option>
                  <option>Per hour</option>
                </SelectField>
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#111114] p-5 sm:p-7">
            <div className="mb-6">
              <h2 className="text-base font-semibold">Description &amp; requirements</h2>
              <p className="mt-1 text-sm text-white/45">Describe the work and the experience candidates need.</p>
            </div>
            <div className="space-y-5">
              <Field htmlFor="description" label="Job Description" required>
                <TextAreaField id="description" placeholder="Describe the role and what the successful candidate will do..." />
              </Field>
              <Field htmlFor="requirements" label="Qualifications & Requirements">
                <TextAreaField id="requirements" placeholder="List the skills, experience, and qualifications required..." />
              </Field>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">
            <Button nativeButton={false} render={<Link href="/Dashboard/Recruiter/jobs" />} variant="outline" className="h-10 border-white/15 bg-transparent text-white hover:bg-white/[0.06]">
              <X className="size-4" />Cancel
            </Button>
            <Button type="button" className="h-10 bg-[#6653ff] px-5 text-white hover:bg-[#7969ff]">
              <Plus className="size-4" />Publish Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
