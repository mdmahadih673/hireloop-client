import { BrowseJobsResults } from "@/components/jobs/browse-jobs-results"
import { listJobs } from "@/lib/api/jobs"
import type { StoredJob } from "@/lib/types/jobs"

export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const initialQuery = typeof params.q === "string" ? params.q : ""
  const initialPage = Number(params.page) > 0 ? Number(params.page) : 1

  const result = await listJobs()
    .then((jobs) => ({ jobs, error: "" }))
    .catch(() => ({ jobs: [] as StoredJob[], error: "Could not load jobs right now. Please try again later." }))

  return (
    <main className="min-h-svh bg-[#09090b] px-4 pt-5 pb-12 text-white sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        {result.error ? (
          <p
            className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-6 text-sm text-red-200"
            role="alert"
          >
            {result.error}
          </p>
        ) : (
          <BrowseJobsResults
            initialPage={initialPage}
            initialQuery={initialQuery}
            jobs={result.jobs}
          />
        )}
      </div>
    </main>
  )
}
