"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"

export default function ProfilePage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const user = session?.user

  useEffect(() => {
    if (!isPending && !user) router.replace("/sign-in")
  }, [isPending, router, user])

  if (isPending || !user) {
    return <main className="min-h-svh bg-[#101014]" aria-label="Loading profile" />
  }

  const initials = user.name?.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U"

  return (
    <main className="min-h-svh bg-[#101014] px-5 py-12 text-white sm:px-8">
      <section className="mx-auto max-w-3xl">
        <Link className="text-sm text-[#b3a8ff] hover:text-white" href="/dashboard">← Dashboard</Link>
        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-9">
          <p className="text-sm font-medium text-[#a99dff]">Account</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">My Profile</h1>
          <div className="mt-8 flex items-center gap-5 border-b border-white/10 pb-7">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="Profile" className="size-20 rounded-full object-cover" src={user.image} />
            ) : (
              <span className="flex size-20 items-center justify-center rounded-full bg-[#6653ff] text-2xl font-semibold">{initials}</span>
            )}
            <div>
              <h2 className="text-xl font-semibold">{user.name || "Hireloop member"}</h2>
              <p className="mt-1 text-sm text-white/50">{user.email}</p>
            </div>
          </div>
          <dl className="grid gap-5 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/40">Name</dt>
              <dd className="mt-1 text-sm text-white/85">{user.name || "Not set"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/40">Email</dt>
              <dd className="mt-1 text-sm text-white/85">{user.email}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  )
}
