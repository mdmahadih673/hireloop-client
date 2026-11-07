import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Search,
  Star,
  UsersRound,
} from "lucide-react"
import { FeaturesSection } from "@/components/homepage/features-section"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  { icon: BriefcaseBusiness, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: UsersRound, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export default function Page() {
  return (
    <>
      <main className="relative isolate min-h-[900px] overflow-hidden bg-[#08080a] px-4 text-white sm:min-h-0 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_72%)]"
      />

      <section className="relative isolate mx-auto min-h-[900px] w-full max-w-[1200px] pt-14 sm:min-h-[760px] sm:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-auto absolute left-1/2 top-0 z-0 aspect-[1440/1882] w-[min(118vw,920px)] -translate-x-1/2"
          style={{ top: "clamp(-210px, calc(330px - 69vw), 80px)" }}
        >
          <Image
            alt=""
            className="pointer-events-none object-contain"
            fill
            priority
            sizes="(max-width: 768px) 118vw, 920px"
            unoptimized
            src="/images/globe.png"
          />
        </div>

        <div className="relative z-[100] mx-auto flex max-w-[1000px] flex-col items-center text-center">
          <div className="flex w-full max-w-[980px] items-center justify-center">
            <span
              aria-hidden="true"
              className="h-px min-w-5 flex-1 bg-[linear-gradient(90deg,transparent,#3a3a40_85%,#45454c)]"
            />
            <div className="flex shrink-0 items-center gap-4 rounded-full border border-[#2b2b2e] border-b-black bg-[linear-gradient(180deg,#1c1c1e,#0d0d0e)] px-7 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_30px_rgba(0,0,0,0.6)] max-[720px]:gap-2 max-[720px]:px-4 max-[720px]:py-2">
              <span
                aria-hidden="true"
                className="text-[30px] leading-none max-[720px]:text-lg"
              >
                💼
              </span>
              <span className="whitespace-nowrap">
                <span className="font-mono text-[26px] font-bold tracking-[0] text-white max-[720px]:text-sm">
                  50,000+
                </span>{" "}
                <span className="-ml-[5px] font-mono text-[26px] font-normal tracking-[0] text-[#8a8a8d] uppercase max-[720px]:-ml-0 max-[720px]:text-sm">
                  New jobs this month
                </span>
              </span>
            </div>
            <span
              aria-hidden="true"
              className="h-px min-w-5 flex-1 bg-[linear-gradient(270deg,transparent,#2a2a3a_85%,#34344a)]"
            />
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl md:text-[46px]">
            Find Your Dream Job Today
          </h1>
          <p className="mt-2 max-w-[560px] text-xs leading-5 text-white/55 sm:text-sm sm:leading-6">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          <form
            action="/jobs"
            className="mt-6 flex w-full max-w-[640px] items-center gap-2 rounded-xl border border-white/10 bg-[#171719]/95 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.28)] sm:mt-7 sm:gap-3 sm:p-1.5"
            role="search"
          >
            <label className="flex min-w-0 flex-1 items-center gap-2 px-1.5 sm:px-2">
              <Search
                aria-hidden="true"
                className="size-4 shrink-0 text-white/70"
              />
              <span className="sr-only">Job title, skill or company</span>
              <input
                className="min-w-0 flex-1 bg-transparent py-2 text-[10px] text-white outline-none placeholder:text-white/45 sm:text-xs"
                name="q"
                placeholder="Job title, skill or company"
                type="search"
              />
            </label>

            <span
              aria-hidden="true"
              className="h-6 w-px shrink-0 bg-white/10"
            />

            <label className="flex min-w-0 flex-1 items-center gap-2 px-1.5 sm:px-2">
              <MapPin
                aria-hidden="true"
                className="size-4 shrink-0 text-white/70"
              />
              <span className="sr-only">Location</span>
              <input
                className="min-w-0 flex-1 bg-transparent py-2 text-[10px] text-white outline-none placeholder:text-white/45 sm:text-xs"
                name="location"
                placeholder="Location or Remote"
                type="search"
              />
            </label>

            <button
              aria-label="Search jobs"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#6653ff] text-white transition hover:bg-[#7969ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              type="submit"
            >
              <Search aria-hidden="true" className="size-4" />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-[10px] sm:gap-2">
            <span className="mr-1 text-white/45">Trending Position</span>
            {trendingPositions.map((position) => (
              <Link
                className="rounded-full border border-white/[0.08] bg-white/[0.08] px-2.5 py-1 text-white/75 transition hover:border-[#8e80ff]/50 hover:bg-[#6653ff]/20 hover:text-white"
                href={`/jobs?q=${encodeURIComponent(position)}`}
                key={position}
              >
                {position}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-[270px] z-[110] mx-auto max-w-[620px] px-6 text-center sm:bottom-[174px]">
          <p className="text-xl font-medium leading-tight tracking-[-0.035em] text-white/80 sm:text-2xl">
            Assisting over{" "}
            <span className="text-white">15,000 job seekers</span>
            <br className="hidden sm:block" /> find their dream positions.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-5 z-[120] mx-auto grid max-w-[1120px] grid-cols-2 gap-3 sm:bottom-8 sm:grid-cols-4 sm:gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <article
              className="min-h-[112px] rounded-xl border border-white/[0.09] bg-[linear-gradient(145deg,rgba(5,5,7,0.97),rgba(25,25,27,0.96))] p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.35)] sm:min-h-[138px] sm:rounded-2xl sm:p-4"
              key={label}
            >
              <Icon
                aria-hidden="true"
                className="size-4 text-white/85"
                strokeWidth={1.8}
              />
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:mt-8 sm:text-[30px]">
                {value}
              </p>
              <p className="mt-1 text-[10px] text-white/75 sm:text-xs">
                {label}
              </p>
            </article>
          ))}
        </div>
      </section>
      </main>
      <FeaturesSection />
    </>
  )
}
