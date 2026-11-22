import Link from "next/link"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { BriefcaseBusiness, FileText, UsersRound } from "lucide-react"
import { getSesson } from "@/lib/core/server"

type AdminStats = { userCount: number; jobCount: number; applicationCount: number }

async function loadAdminData(cookie: string) {
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
  const response = await fetch(`${backendUrl}/admin/stats`, { headers: { cookie }, cache: "no-store" })
  if (!response.ok) throw new Error("Platform statistics could not be loaded.")
  return response.json() as Promise<AdminStats>
}

export default async function AdminDashboardPage() {
  const session = await getSesson()
  if (!session?.user) redirect("/sign-in?redirect=%2FDashboard%2FAdmin")
  if (session.user.role?.toLowerCase() !== "admin") redirect("/")

  const cookie = (await headers()).get("cookie") ?? ""
  let stats: AdminStats | null = null
  let error = ""
  try {
    stats = await loadAdminData(cookie)
  } catch (loadError) {
    error = loadError instanceof Error ? loadError.message : "Platform statistics could not be loaded."
  }
  const cards = [
    { label: "Registered users", value: stats?.userCount, hint: "Across seeker and recruiter accounts", icon: UsersRound },
    { label: "Job posts", value: stats?.jobCount, hint: "Listings currently in Hireloop", icon: BriefcaseBusiness },
    { label: "Applications", value: stats?.applicationCount, hint: "Submitted across all job posts", icon: FileText },
  ]

  return (
    <main className="min-h-svh bg-[#111111] px-5 py-7 text-white sm:px-8 sm:py-9">
      <div className="mx-auto max-w-6xl">
        <header>
          <p className="text-sm text-violet-200">Hireloop administration</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Platform overview</h1>
          <p className="mt-2 text-sm text-white/50">A snapshot of users, job posts, and applications across the platform.</p>
        </header>

        {error && (
          <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm text-amber-100" role="status">
            {error}
          </div>
        )}

        <section aria-label="Platform statistics" className="mt-8 grid gap-4 sm:grid-cols-3">
          {cards.map(({ label, value, hint, icon: Icon }) => (
            <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-5" key={label}>
              <div className="flex items-center gap-3 text-white/55"><Icon aria-hidden="true" className="size-4" /><p className="text-sm">{label}</p></div>
              <p className="mt-4 text-3xl font-semibold">{value ?? "—"}</p>
              <p className="mt-2 text-xs text-white/40">{hint}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <h2 className="font-semibold">Quick links</h2>
          <p className="mt-1 text-sm text-white/50">Open the public directories to review current platform content.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white" href="/companies">Company directory</Link>
            <Link className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white" href="/browse-jobs">Job listings</Link>
          </div>
        </section>
      </div>
    </main>
  )
}
