import { Search } from "lucide-react"

export function BrowseJobSearch({
  value,
  onChange,
  onSubmit,
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}) {
  return (
    <form
      action="/browse-jobs"
      aria-label="Search jobs"
      className="flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-[#141416] p-3 sm:flex-row sm:p-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <label className="relative flex-1">
        <span className="sr-only">
          Search by job title, company, or keywords
        </span>
        <Search
          aria-hidden="true"
          className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/45"
        />
        <input
          className="h-11 w-full rounded-lg border border-white/[0.07] bg-[#1b1b1e] pr-3 pl-10 text-xs text-white outline-none placeholder:text-white/40 focus:border-[#6653ff]"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by job title, keywords..."
          type="search"
          value={value}
        />
      </label>
      <button
        className="h-11 shrink-0 rounded-lg bg-white px-5 text-xs font-semibold text-[#18181b] transition hover:bg-white/85"
        type="submit"
      >
        Search Jobs
      </button>
    </form>
  )
}
