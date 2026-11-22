import Link from "next/link"
import { ArrowLeft, UsersRound } from "lucide-react"
import { redirect } from "next/navigation"
import { getApplicationsByJobId } from "@/lib/actions/jobs"
import { getJobById } from "@/lib/api/jobs"
import { getSesson } from "@/lib/core/server"
import { ApplicantStatusSelect } from "./ApplicantStatusSelect"
import { headers } from "next/headers"

function formatAppliedAt(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(date)
}

export default async function JobApplicantsPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, session, requestHeaders] = await Promise.all([params, getSesson(), headers()])
  if (!session?.user) redirect("/sign-in")
  if (session.user.role?.toLowerCase() !== "recruiter") redirect("/")

  const job = await getJobById(id).catch(() => null)
  if (!job || job.recruiterId !== session.user.id) redirect("/Dashboard/Recruiter/jobs")

  const applications = await getApplicationsByJobId(id, requestHeaders.get("cookie") ?? undefined).catch(() => [])

  return (
    <main className="min-h-svh bg-[#111111] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white" href="/Dashboard/Recruiter/jobs">
          <ArrowLeft className="size-4" /> Back to Manage Jobs
        </Link>

        <header className="mt-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs text-[#a99dff]">{job.companyName}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Applicants</h1>
            <p className="mt-2 text-sm text-white/50">{job.title} · {applications.length} {applications.length === 1 ? "applicant" : "applicants"}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/65">
            <UsersRound className="size-4 text-[#bfb7ff]" /> {applications.length} total
          </span>
        </header>

        <section aria-label="Applicants table" className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#141416]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-[#101012] text-[10px] uppercase tracking-[0.06em] text-[#a1a1ad]">
                <tr>
                  <th className="px-4 py-3.5 font-medium">Applicant</th>
                  <th className="px-4 py-3.5 font-medium">Email</th>
                  <th className="px-4 py-3.5 font-medium">Applied</th>
                  <th className="px-4 py-3.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.length ? applications
                  .slice()
                  .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
                  .map((application) => (
                    <tr className="border-t border-white/[0.06] text-xs" key={application._id ?? `${application.userId}-${application.jobId}`}>
                      <td className="px-4 py-4 font-medium text-white/90">{application.applicantName || "Hireloop member"}</td>
                      <td className="px-4 py-4 text-white/65">{application.applicantEmail || "Not provided"}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-white/55">{formatAppliedAt(application.appliedAt)}</td>
                      <td className="px-4 py-4">
                        {application._id
                          ? <ApplicantStatusSelect applicationId={application._id} initialStatus={application.status} />
                          : <span className="text-white/60">{application.status}</span>}
                      </td>
                    </tr>
                  )) : (
                  <tr>
                    <td className="px-4 py-14 text-center text-sm text-white/50" colSpan={4}>
                      No one has applied to this job yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
