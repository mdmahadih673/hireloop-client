"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { BrowseJobCard } from "@/components/jobs/browse-job-card"
import { BrowseJobFilters } from "@/components/jobs/browse-job-filters"
import { BrowseJobSearch } from "@/components/jobs/browse-job-search"
import type { StoredJob } from "@/lib/types/jobs"

type Filters = {
  jobTypes: string[]
  categories: string[]
  location: string
  remoteOnly: boolean
  minSalary: string
  maxSalary: string
}

const emptyFilters: Filters = {
  jobTypes: [],
  categories: [],
  location: "",
  remoteOnly: false,
  minSalary: "",
  maxSalary: "",
}

function salary(job: StoredJob) {
  return {
    min: Number(job.minSalary) || 0,
    max: Number(job.maxSalary) || Number(job.minSalary) || 0,
  }
}

function updateUrl(
  query: string,
  filters: Filters,
  sort: string,
  page: number
) {
  const params = new URLSearchParams(window.location.search)
  for (const key of [
    "q",
    "jobType",
    "category",
    "location",
    "remote",
    "minSalary",
    "maxSalary",
    "sort",
    "page",
  ]) {
    params.delete(key)
  }

  query.trim() && params.set("q", query.trim())
  filters.jobTypes.forEach((type) => params.append("jobType", type))
  filters.categories.forEach((category) => params.append("category", category))
  filters.location.trim() && params.set("location", filters.location.trim())
  filters.remoteOnly && params.set("remote", "true")
  filters.minSalary && params.set("minSalary", filters.minSalary)
  filters.maxSalary && params.set("maxSalary", filters.maxSalary)
  sort !== "recent" && params.set("sort", sort)
  page > 1 && params.set("page", String(page))

  const search = params.toString()
  window.history.replaceState(
    null,
    "",
    search ? `${window.location.pathname}?${search}` : window.location.pathname
  )
}

export function BrowseJobsResults({
  jobs,
  initialQuery = "",
  initialPage = 1,
}: {
  jobs: StoredJob[]
  initialQuery?: string
  initialPage?: number
}) {
  const [searchInput, setSearchInput] = useState(initialQuery)
  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState(emptyFilters)
  const [sort, setSort] = useState("recent")
  const [currentPage, setCurrentPage] = useState(initialPage)

  const visibleJobs = useMemo(() => {
    const term = query.trim().toLowerCase()
    const minSalary = Number(filters.minSalary) || 0
    const maxSalary = Number(filters.maxSalary) || Infinity

    return jobs
      .filter((job) => {
        const searchable = [
          job.title,
          job.companyName,
          job.category,
          job.location,
          job.description,
          job.requirements,
        ]
          .join(" ")
          .toLowerCase()
        const pay = salary(job)
        return (
          (!term || searchable.includes(term)) &&
          (!filters.jobTypes.length ||
            filters.jobTypes.includes(job.jobType)) &&
          (!filters.categories.length ||
            filters.categories.includes(job.category)) &&
          (!filters.location ||
            job.location
              .toLowerCase()
              .includes(filters.location.trim().toLowerCase())) &&
          (!filters.remoteOnly || job.isRemote) &&
          pay.max >= minSalary &&
          pay.min <= maxSalary
        )
      })
      .sort((a, b) => {
        const comparators: Record<string, () => number> = {
          "salary-high": () => salary(b).max - salary(a).max,
          "salary-low": () => salary(a).min - salary(b).min,
          title: () => a.title.localeCompare(b.title),
          recent: () => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""),
        }
        return (comparators[sort] ?? comparators.recent)()
      })
  }, [jobs, query, filters, sort])

  const pageSize = 5
  const pageCount = Math.ceil(visibleJobs.length / pageSize)
  const page = Math.min(currentPage, Math.max(pageCount, 1))
  const pageJobs = visibleJobs.slice((page - 1) * pageSize, page * pageSize)

  function changePage(nextPage: number) {
    const boundedPage = Math.max(1, Math.min(nextPage, pageCount))
    setCurrentPage(boundedPage)
    updateUrl(query, filters, sort, boundedPage)
  }

  return (
    <>
      <BrowseJobSearch
        value={searchInput}
        onChange={setSearchInput}
        onSubmit={() => {
          setQuery(searchInput)
          setCurrentPage(1)
          updateUrl(searchInput, filters, sort, 1)
        }}
      />

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <BrowseJobFilters
          jobs={jobs}
          filters={filters}
          onChange={(nextFilters) => {
            setFilters(nextFilters)
            setCurrentPage(1)
            updateUrl(query, nextFilters, sort, 1)
          }}
        />

        <section aria-label="Job listings" className="min-w-0">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-base font-semibold">
                Found {visibleJobs.length.toLocaleString()} Professional Jobs
              </h1>
              <p className="mt-1 text-[11px] text-white/45">
                Explore opportunities that match your next career move.
              </p>
            </div>
            <label className="flex items-center gap-2 text-[10px] text-white/45">
              Sort by:
              <select
                className="h-9 rounded-lg border border-white/[0.08] bg-[#141416] px-3 text-[10px] text-white/80 outline-none focus:border-[#6653ff]"
                onChange={(event) => {
                  setSort(event.target.value)
                  setCurrentPage(1)
                  updateUrl(query, filters, event.target.value, 1)
                }}
                value={sort}
              >
                <option value="recent">Most Recent</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
                <option value="title">Job Title</option>
              </select>
            </label>
          </div>

          {visibleJobs.length ? (
            <div className="space-y-3">
              {pageJobs.map((job) => (
                <BrowseJobCard job={job} key={job._id} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/[0.08] bg-[#141416] px-5 py-14 text-center">
              <Search
                aria-hidden="true"
                className="mx-auto size-5 text-white/35"
              />
              <h2 className="mt-3 text-sm font-medium">No matching jobs</h2>
              <p className="mt-1 text-xs text-white/45">
                Try changing your search or filters.
              </p>
            </div>
          )}

          {pageCount > 1 && (
            <nav
              aria-label="Job pages"
              className="mt-7 flex flex-wrap items-center justify-center gap-1.5"
            >
              <button
                aria-label="Previous page"
                className="size-9 rounded-lg border border-white/[0.08] text-white/65 disabled:opacity-40"
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
                type="button"
              >
                ‹
              </button>
              {Array.from(
                { length: Math.min(3, pageCount) },
                (_, index) => index + 1
              ).map((number) => (
                <button
                  aria-current={page === number ? "page" : undefined}
                  className={`size-9 rounded-lg border text-xs ${page === number ? "border-white bg-white font-semibold text-[#141416]" : "border-white/[0.08] text-white/65"}`}
                  key={number}
                  onClick={() => changePage(number)}
                  type="button"
                >
                  {number}
                </button>
              ))}
              {pageCount > 4 && (
                <>
                  <span className="px-1 text-xs text-white/40">…</span>
                  <button
                    aria-current={page === pageCount ? "page" : undefined}
                    className={`size-9 rounded-lg border text-xs ${page === pageCount ? "border-white bg-white font-semibold text-[#141416]" : "border-white/[0.08] text-white/65"}`}
                    onClick={() => changePage(pageCount)}
                    type="button"
                  >
                    {pageCount}
                  </button>
                </>
              )}
              {pageCount > 3 && pageCount <= 4 && (
                <button
                  aria-current={page === pageCount ? "page" : undefined}
                  className={`size-9 rounded-lg border text-xs ${page === pageCount ? "border-white bg-white font-semibold text-[#141416]" : "border-white/[0.08] text-white/65"}`}
                  onClick={() => changePage(pageCount)}
                  type="button"
                >
                  {pageCount}
                </button>
              )}
              <button
                aria-label="Next page"
                className="size-9 rounded-lg border border-white/[0.08] text-white/65 disabled:opacity-40"
                disabled={page === pageCount}
                onClick={() => changePage(page + 1)}
                type="button"
              >
                ›
              </button>
            </nav>
          )}
        </section>
      </div>
    </>
  )
}
