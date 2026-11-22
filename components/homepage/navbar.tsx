"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "@/lib/auth-client"
import { ThemeToggle } from "@/components/homepage/theme-toggle"

function Brand() {
  return (
    <Link aria-label="Hireloop home" className="shrink-0" href="/">
      <Image alt="Hireloop" height={33} priority src="/images/logo.png" width={150} />
    </Link>
  )
}

function NavigationLabels({ mobile = false, lightMode = false }: { mobile?: boolean; lightMode?: boolean }) {
  const linkClassName = lightMode
    ? "text-zinc-700 transition-colors hover:text-violet-700 dark:text-white/85 dark:hover:text-white"
    : "text-white/85 transition-colors hover:text-white"

  return (
    <div
      className={
        mobile
          ? "flex items-center justify-center gap-6 text-xs text-white/85 sm:gap-8"
          : "flex items-center gap-5 text-xs text-white/90 lg:gap-7"
      }
    >
      <Link className={linkClassName} href="/browse-jobs">
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

function AccountMenu({ lightMode = false }: { lightMode?: boolean }) {
  const { data: session, isPending } = useSession()
  const user = session?.user
  const role = user?.role?.toLowerCase()
  const dashboardUrl = role === "admin"
    ? "/Dashboard/Admin"
    : role === "recruiter"
      ? "/Dashboard/Recruiter"
      : "/Dashboard/Seeker"


  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U"

  return isPending ? (
    <span aria-label="Loading account" className="size-9 animate-pulse rounded-full bg-white/10" />
  ) : !user ? (
    <div className="flex items-center gap-5 lg:gap-7">
      <SignInLink />
      <GetStartedLabel />
    </div>
  ) : (
    <details className="group relative">
      <summary className={`flex cursor-pointer list-none items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-left transition [&::-webkit-details-marker]:hidden ${lightMode ? "border-zinc-200 bg-white/80 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"}`}>
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" className="size-8 rounded-full object-cover" src={user.image} />
        ) : (
          <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-[#6653ff] text-xs font-semibold text-white">
            {initials}
          </span>
        )}
        <span className={`max-w-28 truncate text-xs font-medium ${lightMode ? "text-zinc-800 dark:text-white/90" : "text-white/90"}`}>{user.name || user.email}</span>
        <span aria-hidden="true" className={`text-[10px] ${lightMode ? "text-zinc-500 dark:text-white/50" : "text-white/50"}`}>▾</span>
      </summary>
      <div className={`absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border p-1.5 shadow-xl ${lightMode ? "border-zinc-200 bg-white dark:border-white/10 dark:bg-[#18181d]" : "border-white/10 bg-[#18181d]"}`}>
        <div className={`border-b px-3 py-2.5 ${lightMode ? "border-zinc-200 dark:border-white/10" : "border-white/10"}`}>
          <p className={`truncate text-sm font-medium ${lightMode ? "text-zinc-900 dark:text-white" : "text-white"}`}>{user.name || "Your account"}</p>
          <p className={`truncate text-xs ${lightMode ? "text-zinc-500 dark:text-white/45" : "text-white/45"}`}>{user.email}</p>
        </div>
        <Link className={`block rounded-lg px-3 py-2.5 text-sm transition ${lightMode ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-white/80 dark:hover:bg-white/[0.07] dark:hover:text-white" : "text-white/80 hover:bg-white/[0.07] hover:text-white"}`} href="/profile">My Profile</Link>
        <Link className={`block rounded-lg px-3 py-2.5 text-sm transition ${lightMode ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-white/80 dark:hover:bg-white/[0.07] dark:hover:text-white" : "text-white/80 hover:bg-white/[0.07] hover:text-white"}`} href={dashboardUrl}>Dashboard</Link>
        <button
          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${lightMode ? "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-white/65 dark:hover:bg-white/[0.07] dark:hover:text-white" : "text-white/65 hover:bg-white/[0.07] hover:text-white"}`}
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
  const isHome = usePathname() === "/"

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-4 z-50 mx-auto flex w-full max-w-[1200px] flex-col gap-6 rounded-2xl border px-5 py-[18px] shadow-[0_12px_30px_rgba(0,0,0,0.12)] sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-0 ${isHome ? "border-zinc-200 bg-white/90 text-zinc-900 backdrop-blur dark:border-white/[0.035] dark:bg-[#111111] dark:text-white" : "border-white/[0.035] bg-[#111111] text-white"}`}
    >
      <div className="flex items-center justify-between sm:contents">
        <Brand />
        <div className="flex items-center gap-4 sm:hidden">
          {isHome && <ThemeToggle />}
          <AccountMenu lightMode={isHome} />
        </div>
      </div>

      <div className="flex items-center justify-center sm:hidden">
        <NavigationLabels lightMode={isHome} mobile />
      </div>

      <div className="hidden items-center gap-5 sm:flex lg:gap-7">
        <NavigationLabels lightMode={isHome} />
        <span aria-hidden="true" className={`h-5 w-px ${isHome ? "bg-zinc-200 dark:bg-white/15" : "bg-white/15"}`} />
        {isHome && <ThemeToggle />}
        <AccountMenu lightMode={isHome} />
      </div>
    </nav>
  )
}
