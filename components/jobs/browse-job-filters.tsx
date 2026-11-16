import { CircleDollarSign, MapPin, SlidersHorizontal } from "lucide-react"
import type { JobFormData } from "@/lib/types/jobs"

type Filters = {
  jobTypes: string[]
  categories: string[]
  location: string
  remoteOnly: boolean
  minSalary: string
  maxSalary: string
}

type Props = {
  jobs: JobFormData[]
  filters: Filters
  onChange: (filters: Filters) => void
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-white/[0.07] py-4 first:border-0 first:pt-0">
      <h3 className="mb-3 text-xs font-medium text-white/85">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </section>
  )
}

function CheckOption({
  label,
  count,
  checked,
  onChange,
}: {
  label: string
  count: number
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-xs text-white/60 hover:text-white/90">
      <input
        checked={checked}
        className="size-3.5 rounded border-white/20 bg-[#202023] accent-[#6653ff]"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span className="flex-1">{label}</span>
      <span className="text-[10px] text-white/35">
        {count.toLocaleString()}
      </span>
    </label>
  )
}

export function BrowseJobFilters({ jobs, filters, onChange }: Props) {
  const jobTypes = [
    ...new Set(jobs.map((job) => job.jobType).filter(Boolean)),
  ].sort()
  const categories = [
    ...new Set(jobs.map((job) => job.category).filter(Boolean)),
  ].sort()
  const toggleValue = (
    key: "jobTypes" | "categories",
    value: string,
    checked: boolean
  ) => {
    const values = filters[key].filter((item) => item !== value)
    onChange({ ...filters, [key]: checked ? [...values, value] : values })
  }

  return (
    <aside className="h-fit rounded-xl border border-white/[0.08] bg-[#141416] p-4 sm:p-5">
      <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
        <SlidersHorizontal
          aria-hidden="true"
          className="size-4 text-[#a99dff]"
        />
        Filters
      </h2>

      {jobTypes.length > 0 && (
        <FilterSection title="Job Type">
          {jobTypes.map((type) => (
            <CheckOption
              checked={filters.jobTypes.includes(type)}
              count={jobs.filter((job) => job.jobType === type).length}
              key={type}
              label={type}
              onChange={(checked) => toggleValue("jobTypes", type, checked)}
            />
          ))}
        </FilterSection>
      )}

      {categories.length > 0 && (
        <FilterSection title="Category">
          {categories.map((category) => (
            <CheckOption
              checked={filters.categories.includes(category)}
              count={jobs.filter((job) => job.category === category).length}
              key={category}
              label={category}
              onChange={(checked) =>
                toggleValue("categories", category, checked)
              }
            />
          ))}
        </FilterSection>
      )}

      <FilterSection title="Location">
        <label className="relative block">
          <MapPin
            aria-hidden="true"
            className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/35"
          />
          <input
            className="h-9 w-full rounded-lg border border-white/[0.08] bg-[#1b1b1e] pr-3 pl-9 text-xs text-white outline-none placeholder:text-white/35 focus:border-[#6653ff]"
            onChange={(event) =>
              onChange({ ...filters, location: event.target.value })
            }
            placeholder="City or region"
            type="search"
            value={filters.location}
          />
        </label>
        <CheckOption
          checked={filters.remoteOnly}
          count={jobs.filter((job) => job.isRemote).length}
          label="Remote only"
          onChange={(remoteOnly) => onChange({ ...filters, remoteOnly })}
        />
      </FilterSection>

      <FilterSection title="Salary range">
        <div className="grid grid-cols-2 gap-2">
          {(["minSalary", "maxSalary"] as const).map((key) => (
            <label className="relative" key={key}>
              <span className="sr-only">
                {key === "minSalary" ? "Minimum" : "Maximum"} salary
              </span>
              <CircleDollarSign
                aria-hidden="true"
                className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-white/35"
              />
              <input
                className="h-9 w-full rounded-lg border border-white/[0.08] bg-[#1b1b1e] pr-2 pl-8 text-xs text-white outline-none placeholder:text-white/35 focus:border-[#6653ff]"
                min="0"
                onChange={(event) =>
                  onChange({ ...filters, [key]: event.target.value })
                }
                placeholder={key === "minSalary" ? "Min" : "Max"}
                type="number"
                value={filters[key]}
              />
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  )
}
