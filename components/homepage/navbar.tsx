"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession, signOut } from "@/lib/auth-client"

function Brand() {
  return (
    <Link aria-label="Hireloop home" className="shrink-0" href="/">
      <Image alt="Hireloop" height={33} priority src="/images/logo.png" width={150} />
    </Link>
  )
}

function NavigationLabels({ mobile = false }: { mobile?: boolean }) {
  const linkClassName = "transition-colors hover:text-white"

  return (
    <div
      className={
        mobile
          ? "flex items-center justify-center gap-6 text-xs text-white/85 sm:gap-8"
          : "flex items-center gap-5 text-xs text-white/90 lg:gap-7"
      }
    >
      <Link className={linkClassName} href="/jobs">
        Browse Jobs
      </Link>
      <Link className={linkClassName} href="/companies">
        Companies
      </Link>
      <Link className={linkClassName} href="/pricing">
        Pricing
      </Link>
    </div>
  )
}

function GetStartedLabel() {
  return (
    <Link
      className="rounded-[10px] bg-[#6653ff] px-4 py-[11px] text-xs font-medium text-white shadow-[0_0_0_4px_rgba(102,83,255,0.12)]"
      href="/get-started"
    >
      Get Started
    </Link>
  )
}

function SignInLink() {
  return (
    <Link
      className="text-xs text-[#816cff] transition-colors hover:text-[#a497ff]"
      href="/sign-in"
    >
      Sign In
    </Link>
  )
}

function AccountMenu() {
  const { data: session, isPending } = useSession()
  const user = session?.user
  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U"

  if (isPending) {
    return <span aria-label="Loading account" className="size-9 animate-pulse rounded-full bg-white/10" />
  }

  if (!user) {
    return (
      <div className="flex items-center gap-5 lg:gap-7">
        <SignInLink />
        <GetStartedLabel />
      </div>
    )
  }

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-left transition hover:bg-white/[0.08] [&::-webkit-details-marker]:hidden">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" className="size-8 rounded-full object-cover" src={user.image} />
        ) : (
          <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-[#6653ff] text-xs font-semibold text-white">
            {initials}
          </span>
        )}
        <span className="max-w-28 truncate text-xs font-medium text-white/90">{user.name || user.email}</span>
        <span aria-hidden="true" className="text-[10px] text-white/50">▾</span>
      </summary>
      <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-white/10 bg-[#18181d] p-1.5 shadow-xl">
        <div className="border-b border-white/10 px-3 py-2.5">
          <p className="truncate text-sm font-medium text-white">{user.name || "Your account"}</p>
          <p className="truncate text-xs text-white/45">{user.email}</p>
        </div>
        <Link className="block rounded-lg px-3 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.07] hover:text-white" href="/profile">My Profile</Link>
        <Link className="block rounded-lg px-3 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.07] hover:text-white" href="/dashboard">Dashboard</Link>
        <button
          className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-white/65 transition hover:bg-white/[0.07] hover:text-white"
          onClick={async () => {
            await signOut()
            window.location.assign("/")
          }}
          type="button"
        >
          Sign out
        </button>
      </div>
    </details>
  )
}

export function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-4 z-50 mx-auto flex w-full max-w-[1200px] flex-col gap-6 rounded-2xl border border-white/[0.035] bg-[#111111] px-5 py-[18px] shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-0"
    >
      <div className="flex items-center justify-between sm:contents">
        <Brand />
        <div className="flex items-center gap-4 sm:hidden">
          <AccountMenu />
        </div>
      </div>

      <div className="flex items-center justify-center sm:hidden">
        <NavigationLabels mobile />
      </div>

      <div className="hidden items-center gap-5 sm:flex lg:gap-7">
        <NavigationLabels />
        <span aria-hidden="true" className="h-5 w-px bg-white/15" />
        <AccountMenu />
      </div>
    </nav>
  )
}
