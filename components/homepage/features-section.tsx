import {
  Bookmark,
  ChartNoAxesColumnIncreasing,
  FileUser,
  Hexagon,
  MousePointerClick,
  Search,
  Building2,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

const features: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: Search,
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: Building2,
  },
  {
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: Bookmark,
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    icon: MousePointerClick,
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: FileUser,
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: Hexagon,
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: TrendingUp,
  },
]

export function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className="mx-auto w-full max-w-[1200px] border-y border-white/[0.025] bg-[#141414] px-6 py-14 text-white sm:px-10 sm:py-16 lg:px-[44px] lg:py-[70px]"
    >
      <header className="text-center">
        <p className="flex items-center justify-center gap-3 font-mono text-xs text-white/70">
          <span aria-hidden="true" className="size-1.5 bg-[#6653ff]" />
          FEATURES JOB
          <span aria-hidden="true" className="size-1.5 bg-[#6653ff]" />
        </p>
        <h2
          className="mx-auto mt-3 max-w-[410px] text-[30px] font-medium leading-[1.12] tracking-[-0.04em] sm:text-[34px]"
          id="features-heading"
        >
          Everything you need
          <br />
          to succeed
        </h2>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-9">
        {features.map(({ title, description, icon: Icon }) => (
          <article className="flex min-w-0 items-start gap-[18px]" key={title}>
            <div className="flex size-14 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-[linear-gradient(145deg,#050505,#171719)] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
              <Icon
                aria-hidden="true"
                className="size-[22px] text-[#e7a5ed]"
                strokeWidth={1.8}
              />
            </div>
            <div className="min-w-0 pt-0.5">
              <h3 className="text-[13px] font-medium leading-5 text-white">
                {title}
              </h3>
              <p className="mt-1.5 max-w-[185px] text-[11px] leading-[18px] text-white/60">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
