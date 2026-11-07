import Image from "next/image"
import Link from "next/link"

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

export function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 rounded-2xl border border-white/[0.035] bg-[#111111] px-5 py-[18px] shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-0"
    >
      <div className="flex items-center justify-between sm:contents">
        <Brand />
        <div className="flex items-center gap-4 sm:hidden">
          <SignInLink />
          <GetStartedLabel />
        </div>
      </div>

      <div className="flex items-center justify-center sm:hidden">
        <NavigationLabels mobile />
      </div>

      <div className="hidden items-center gap-5 sm:flex lg:gap-7">
        <NavigationLabels />
        <span aria-hidden="true" className="h-5 w-px bg-white/15" />
        <SignInLink />
        <GetStartedLabel />
      </div>
    </nav>
  )
}
