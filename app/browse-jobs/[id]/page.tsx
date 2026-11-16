

import {
    BadgeCheck,
    Banknote,
    Bookmark,
    Building2,
    CircleDollarSign,
    Clock,
    Laptop,
    Layers,
    MapPin,
    Plane,
    ShieldCheck,
} from "lucide-react"
import { getJobById } from "@/lib/api/jobs"
import type { StoredJob } from "@/lib/types/jobs"

import ApplyNowPage from "@/app/components/ApplyNow"

function formatMoney(value: string) {
    const amount = Number(value)
    if (!value || Number.isNaN(amount)) return value
    return amount >= 1000 ? `$${Math.round(amount / 1000)}k` : `$${amount}`
}

function salaryLabel(job: StoredJob) {
    const range = [formatMoney(job.minSalary), formatMoney(job.maxSalary)]
        .filter(Boolean)
        .join(" - ")
    if (!range) return "Salary not listed"

    return `${range}${job.frequency ? ` / ${job.frequency.toLowerCase().replace("per ", "")}` : ""}`
}

function descriptionParagraphs(job: StoredJob) {
    return job.description
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
}

function requirementLines(job: StoredJob) {
    return job.requirements
        .split(/\r?\n/)
        .map((line) => line.trim().replace(/^[-•*]\s*/, ""))
        .filter(Boolean)
}

const BENEFITS = [
    { icon: ShieldCheck, label: "Full Health & Dental" },
    { icon: CircleDollarSign, label: "Competitive 401k" },
    { icon: Laptop, label: "Latest Hardware Stipend" },
    { icon: Plane, label: "Unlimited PTO" },
]

export default async function JobDetailsPage({ params, }: { params: Promise<{ id: string }> }) {
    const { id } = await params


    let job: StoredJob | null = null
    let error = ""

    try {
        job = await getJobById(id)
    } catch (caught) {
        error =
            caught instanceof Error ? caught.message : "Could not load job details."
    }

    if (error || !job) {
        return (
            <main className="min-h-svh bg-[#09090b] px-4 pt-5 pb-12 text-white sm:px-6">
                <div className="mx-auto max-w-[1240px]">
                    <p
                        className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-6 text-sm text-red-200"
                        role="alert"
                    >
                        {error || "Job post not found."}
                    </p>
                </div>
            </main>
        )
    }

    const companyInitial = job.companyName.trim().charAt(0).toUpperCase() || "H"
    const paragraphs = descriptionParagraphs(job)
    const requirements = requirementLines(job)
    const requirementChips = requirements.filter((line) => line.length <= 32)
    const requirementBullets = requirements.filter((line) => line.length > 32)

    const metaCards = [
        {
            icon: Banknote,
            label: "Salary Range",
            value: salaryLabel(job),
        },
        {
            icon: MapPin,
            label: "Location",
            value: job.location
                ? `${job.location}${job.isRemote ? " (Remote)" : ""}`
                : "Location not specified",
        },
        {
            icon: Clock,
            label: "Job Type",
            value: job.jobType || "Not specified",
        },
        {
            icon: Layers,
            label: "Category",
            value: job.category || "Not specified",
        },
    ]



    return (
        <main className="min-h-svh bg-[#09090b] px-4 pt-5 pb-12 text-white sm:px-6">
            <div className="mx-auto max-w-[1240px]">
                {/* Header */}
                <section className="rounded-xl border border-white/[0.07] bg-[#141416] p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                            <div
                                aria-hidden="true"
                                className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-[#222226] text-base font-semibold text-[#a99dff]"
                            >
                                {companyInitial}
                            </div>
                            <div className="min-w-0">
                                <h1 className="truncate text-xl font-semibold sm:text-2xl">
                                    {job.title}
                                </h1>
                                <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45">
                                    <span>{job.companyName}</span>
                                    <span aria-hidden="true">•</span>
                                    <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                                        <BadgeCheck aria-hidden="true" className="size-3.5" />
                                        Verified Employer
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <button
                                aria-label={`Save ${job.title}`}
                                className="rounded-lg border cursor-pointer border-white/[0.1] p-2.5 text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                                type="button"
                            >
                                <Bookmark aria-hidden="true" className="size-4" />
                            </button>

                            <ApplyNowPage job={job} />

                        </div>
                    </div>
                </section>

                <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                    {/* Left column */}
                    <div className="min-w-0 space-y-5">
                        {/* Meta cards */}
                        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {metaCards.map(({ icon: Icon, label, value }) => (
                                <div
                                    className="rounded-xl border border-white/[0.07] bg-[#141416] p-4"
                                    key={label}
                                >
                                    <p className="flex items-center gap-1.5 text-[9px] font-medium tracking-wider text-white/40 uppercase">
                                        <Icon aria-hidden="true" className="size-3.5" />
                                        {label}
                                    </p>
                                    <p
                                        className="mt-2 truncate text-sm font-semibold"
                                        title={value}
                                    >
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </section>

                        {/* Job description */}
                        <section className="rounded-xl border border-white/[0.07] bg-[#141416] p-5 sm:p-6">
                            <h2 className="text-base font-semibold">Job Description</h2>
                            <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/50 sm:text-[13px]">
                                {paragraphs.length ? (
                                    paragraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))
                                ) : (
                                    <p>No description provided for this role yet.</p>
                                )}
                            </div>
                        </section>

                        {/* Requirements + Benefits */}
                        <section className="rounded-xl border border-white/[0.07] bg-[#141416] p-5 sm:p-6">
                            {requirements.length > 0 && (
                                <>
                                    <h2 className="text-base font-semibold">Requirements</h2>

                                    {requirementChips.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {requirementChips.map((chip) => (
                                                <span
                                                    className="rounded-md border border-white/[0.07] bg-[#1b1b1e] px-2.5 py-1 text-[10px] text-white/75"
                                                    key={chip}
                                                >
                                                    {chip}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {requirementBullets.length > 0 && (
                                        <ul className="mt-4 list-disc space-y-2 pl-4 text-xs leading-relaxed text-white/55 marker:text-white/30">
                                            {requirementBullets.map((bullet) => (
                                                <li key={bullet}>{bullet}</li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="mt-6 border-t border-white/[0.06]" />
                                </>
                            )}

                            <h2
                                className={`${requirements.length > 0 ? "mt-6" : ""} text-base font-semibold`}
                            >
                                Benefits
                            </h2>
                            <div className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                                {BENEFITS.map(({ icon: Icon, label }) => (
                                    <div className="flex items-center gap-3" key={label}>
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-[#1b1b1e] text-white/60">
                                            <Icon aria-hidden="true" className="size-3.5" />
                                        </span>
                                        <p className="text-xs font-medium text-white/85">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="rounded-xl border border-white/[0.07] bg-[#141416] p-5 lg:sticky lg:top-5">
                        <h2 className="text-base font-semibold">Company Overview</h2>

                        <div className="mt-4 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-white/[0.06] bg-gradient-to-br from-[#222226] via-[#141416] to-[#0d0d0f]">
                            <Building2 aria-hidden="true" className="size-10 text-white/15" />
                        </div>

                        <dl className="mt-5 space-y-0">
                            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] py-3">
                                <dt className="text-[9px] font-medium tracking-wider text-white/40 uppercase">
                                    Size
                                </dt>
                                <dd className="text-xs text-white/80">250 - 500 Employees</dd>
                            </div>
                            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] py-3">
                                <dt className="text-[9px] font-medium tracking-wider text-white/40 uppercase">
                                    Industry
                                </dt>
                                <dd className="truncate text-xs text-white/80">
                                    {job.category || "Not specified"}
                                </dd>
                            </div>
                        </dl>

                        <button
                            className="mt-5 w-full rounded-lg border border-white/[0.08] bg-[#1b1b1e] py-2.5 text-xs font-medium text-white/85 transition hover:bg-white/[0.08]"
                            type="button"
                        >
                            Visit Website
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    )
}
