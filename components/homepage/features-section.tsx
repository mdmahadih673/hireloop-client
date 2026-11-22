import {
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  Search,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

const features: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: "Search job listings",
    description: "Filter open roles by title, work type, location, and salary.",
    icon: Search,
  },
  {
    title: "Apply in one place",
    description: "Send applications from job listings and keep them in your dashboard.",
    icon: FileText,
  },
  {
    title: "Track application status",
    description: "See updates when a recruiter reviews, shortlists, or contacts you.",
    icon: BadgeCheck,
  },
  {
    title: "Publish job posts",
    description: "Recruiters can create and manage their own job listings.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Review applicants",
    description: "Open a job post to see candidates and update their status.",
    icon: UsersRound,
  },
  {
    title: "One time Premium passes",
    description: "Extend seeker applications or recruiter job posts for a fixed period.",
    icon: ClipboardList,
  },
]

export function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className="mx-auto w-full max-w-[1200px] border-y border-zinc-200 bg-[#f7f7fb] px-6 py-14 text-zinc-900 sm:px-10 sm:py-16 lg:px-[44px] lg:py-[70px] dark:border-white/[0.025] dark:bg-[#141414] dark:text-white"
    >
      <header className="text-center">
        <p className="flex items-center justify-center gap-3 font-mono text-xs text-zinc-500 dark:text-white/70">
          <span aria-hidden="true" className="size-1.5 bg-[#6653ff]" />
          HIRELOOP FEATURES
          <span aria-hidden="true" className="size-1.5 bg-[#6653ff]" />
        </p>
        <h2
          className="mx-auto mt-3 max-w-[410px] text-[30px] font-medium leading-[1.12] tracking-[-0.04em] sm:text-[34px]"
          id="features-heading"
        >
          Tools for your job search
          <br />
          and hiring workflow
        </h2>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-9">
        {features.map(({ title, description, icon: Icon }) => (
          <article className="flex min-w-0 items-start gap-[18px]" key={title}>
            <div className="flex size-14 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-[linear-gradient(145deg,#050505,#171719)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
              <Icon
                aria-hidden="true"
                className="size-[22px] text-violet-600 dark:text-[#e7a5ed]"
                strokeWidth={1.8}
              />
            </div>
            <div className="min-w-0 pt-0.5">
              <h3 className="text-[13px] font-medium leading-5 text-zinc-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-1.5 max-w-[185px] text-[11px] leading-[18px] text-zinc-600 dark:text-white/60">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
