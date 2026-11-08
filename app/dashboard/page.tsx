"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"

export default function DashboardPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const user = session?.user

  useEffect(() => {
    if (!isPending && !user) router.replace("/sign-in")
  }, [isPending, router, user])

  if (isPending || !user) {
    return <main className="min-h-svh bg-[#101014]" aria-label="Loading dashboard" />
  }

  return (
    <main className="min-h-svh bg-[#101014] px-5 py-12 text-white sm:px-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#a99dff]">Hireloop</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome, {user.name || "there"}</h1>
        <p className="mt-2 text-sm text-white/50">Your account dashboard</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#8170ff]/50 hover:bg-white/[0.06]" href="/profile">
            <h2 className="font-semibold">My Profile</h2>
            <p className="mt-2 text-sm text-white/50">View your account details.</p>
          </Link>
          <Link className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#8170ff]/50 hover:bg-white/[0.06]" href="/jobs">
            <h2 className="font-semibold">Browse Jobs</h2>
            <p className="mt-2 text-sm text-white/50">Explore opportunities on Hireloop.</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
