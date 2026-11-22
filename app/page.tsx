import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Search,
} from "lucide-react"
import { FeaturesSection } from "@/components/homepage/features-section"
import { HowItWorksSection, PremiumCalloutSection, CommonQuestionsSection } from "@/components/homepage/homepage-sections"
import { TaglineReveal } from "@/components/homepage/tagline-reveal"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const highlights = [
  { title: "Search open roles", description: "Filter listings by job type, location, salary, and more." },
  { title: "Apply in one place", description: "Keep your applications together in your seeker dashboard." },
  { title: "Follow your progress", description: "See status updates shared by recruiters." },
]

export default function Page() {
  return (
    <>
      <main className="relative isolate min-h-[900px] overflow-hidden bg-[#f7f7fb] px-4 text-zinc-950 transition-colors dark:bg-[#08080a] dark:text-white sm:min-h-0 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(ellipse_at_top,rgba(102,83,255,0.12),transparent_72%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_72%)]"
      />

      <section className="relative isolate mx-auto min-h-[900px] w-full max-w-[1200px] pt-14 sm:min-h-[760px] sm:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-auto absolute left-1/2 top-0 z-0 aspect-[1440/1882] w-[min(118vw,920px)] -translate-x-1/2"
          style={{ top: "clamp(-210px, calc(330px - 69vw), 80px)" }}
        >
          <Image
            alt=""
            className="pointer-events-none object-contain opacity-35 dark:opacity-100"
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
              className="h-px min-w-5 flex-1 bg-[linear-gradient(90deg,transparent,#d4d4dc_85%,#c4c4ce)] dark:bg-[linear-gradient(90deg,transparent,#3a3a40_85%,#45454c)]"
            />
            <div className="flex shrink-0 items-center gap-4 rounded-full border border-zinc-200 bg-white/90 px-7 py-4 shadow-[0_8px_30px_rgba(30,30,45,0.1)] dark:border-[#2b2b2e] dark:border-b-black dark:bg-[linear-gradient(180deg,#1c1c1e,#0d0d0e)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_30px_rgba(0,0,0,0.6)] max-[720px]:gap-2 max-[720px]:px-4 max-[720px]:py-2">
              <span
                aria-hidden="true"
                className="text-[30px] leading-none max-[720px]:text-lg"
              >
                💼
              </span>
              <span className="whitespace-nowrap">
                <span className="font-mono text-[26px] font-bold tracking-[0] text-zinc-900 dark:text-white max-[720px]:text-sm">
                  Hireloop
                </span>{" "}
                <span className="-ml-[5px] font-mono text-[26px] font-normal tracking-[0] text-zinc-500 uppercase dark:text-[#8a8a8d] max-[720px]:-ml-0 max-[720px]:text-sm">
                  Find work. Hire talent.
                </span>
              </span>
            </div>
            <span
              aria-hidden="true"
              className="h-px min-w-5 flex-1 bg-[linear-gradient(270deg,transparent,#d4d4dc_85%,#c4c4ce)] dark:bg-[linear-gradient(270deg,transparent,#2a2a3a_85%,#34344a)]"
            />
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl md:text-[46px]">
            Find your next role on Hireloop
          </h1>
          <p className="mt-2 max-w-[560px] text-xs leading-5 text-zinc-600 dark:text-white/55 sm:text-sm sm:leading-6">
            Search job listings, apply to roles, and follow recruiter updates. Recruiters can publish openings and manage applicants in the same platform.
          </p>

          <form
            action="/browse-jobs"
            className="mt-6 flex w-full max-w-[640px] items-center gap-2 rounded-xl border border-zinc-200 bg-white/95 p-1.5 shadow-[0_8px_30px_rgba(30,30,45,0.12)] dark:border-white/10 dark:bg-[#171719]/95 dark:shadow-[0_8px_30px_rgba(0,0,0,0.28)] sm:mt-7 sm:gap-3 sm:p-1.5"
            role="search"
          >
            <label className="flex min-w-0 flex-1 items-center gap-2 px-1.5 sm:px-2">
              <Search
                aria-hidden="true"
                className="size-4 shrink-0 text-zinc-500 dark:text-white/70"
              />
              <span className="sr-only">Job title, skill or company</span>
              <input
                className="min-w-0 flex-1 bg-transparent py-2 text-[10px] text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-white/45 sm:text-xs"
                name="q"
                placeholder="Job title, skill or company"
                type="search"
              />
            </label>

            <span
              aria-hidden="true"
              className="h-6 w-px shrink-0 bg-zinc-200 dark:bg-white/10"
            />

            <label className="flex min-w-0 flex-1 items-center gap-2 px-1.5 sm:px-2">
              <MapPin
                aria-hidden="true"
                className="size-4 shrink-0 text-zinc-500 dark:text-white/70"
              />
              <span className="sr-only">Location</span>
              <input
                className="min-w-0 flex-1 bg-transparent py-2 text-[10px] text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-white/45 sm:text-xs"
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
            <span className="mr-1 text-zinc-500 dark:text-white/45">Try a search</span>
            {trendingPositions.map((position) => (
              <Link
                className="rounded-full border border-zinc-200 bg-white/75 px-2.5 py-1 text-zinc-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800 dark:border-white/[0.08] dark:bg-white/[0.08] dark:text-white/75 dark:hover:border-[#8e80ff]/50 dark:hover:bg-[#6653ff]/20 dark:hover:text-white"
                href={`/browse-jobs?q=${encodeURIComponent(position)}`}
                key={position}
              >
                {position}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-5 z-[120] mx-auto grid max-w-[920px] grid-cols-1 gap-3 sm:bottom-8 sm:grid-cols-3 sm:gap-4">
          {highlights.map(({ title, description }) => (
            <article
              className="min-h-24 rounded-xl border border-zinc-200 bg-white/90 p-4 shadow-[0_12px_30px_rgba(30,30,45,0.08)] dark:border-white/[0.09] dark:bg-[linear-gradient(145deg,rgba(5,5,7,0.97),rgba(25,25,27,0.96))] dark:shadow-[0_12px_30px_rgba(0,0,0,0.35)] sm:rounded-2xl sm:p-5"
              key={title}
            >
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-white/60">{description}</p>
            </article>
          ))}
        </div>
      </section>
      </main>
      <FeaturesSection />
      <TaglineReveal text="Make your next move with more clarity and less guesswork." />
      <HowItWorksSection />
      <PremiumCalloutSection />
      <CommonQuestionsSection />
    </>
  )
}
