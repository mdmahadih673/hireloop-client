"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react"

export default function GetStartedPage() {
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    console.log("Registration form submitted", {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      accountType: formData.get("accountType"),
      termsAccepted: formData.get("termsAccepted") === "on",
      password: "[redacted]",
    })
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#101014] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-20 size-[520px] rounded-full bg-[#6653ff]/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 bottom-[-180px] size-[560px] rounded-full bg-[#8b5cf6]/10 blur-[140px]"
      />

      <div className="relative mx-auto grid min-h-svh w-full max-w-[1440px] lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-white/[0.07] px-12 py-10 lg:flex xl:px-20">
          <Link aria-label="Hireloop home" className="w-fit" href="/">
            <Image
              alt="Hireloop"
              height={33}
              priority
              src="/images/logo.png"
              width={150}
            />
          </Link>

          <div className="relative z-10 max-w-xl pb-8">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8d7cff]/25 bg-[#6653ff]/10 px-3.5 py-2 text-xs font-medium text-[#c2baff]">
              <Sparkles aria-hidden="true" className="size-4" />
              A better way to find your fit
            </div>
            <h1 className="text-5xl font-semibold leading-[1.12] tracking-[-0.04em] xl:text-6xl">
              Good things
              <br />
              start with a hello.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/55">
              Create your free account and take the first step toward work
              you&apos;ll love.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                <p className="text-2xl font-semibold tracking-tight">One</p>
                <p className="mt-1 text-xs text-white/45">profile to get started</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                <p className="text-2xl font-semibold tracking-tight">More</p>
                <p className="mt-1 text-xs text-white/45">ways to move forward</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/35">
            Find your fit. Build your future.
          </p>
        </section>

        <section className="flex min-h-svh flex-col px-5 py-6 sm:px-10 lg:px-14">
          <header className="flex items-center justify-between lg:justify-end">
            <Link aria-label="Hireloop home" className="lg:hidden" href="/">
              <Image
                alt="Hireloop"
                height={29}
                priority
                src="/images/logo.png"
                width={132}
              />
            </Link>
            <p className="text-sm text-white/55">
              Already have an account?{" "}
              <Link
                className="font-medium text-[#a99dff] transition-colors hover:text-white"
                href="/sign-in"
              >
                Sign in
              </Link>
            </p>
          </header>

          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-[440px]">
              <p className="text-sm font-medium text-[#a99dff]">Get started</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Create your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/50">
                A few details are all it takes to join Hireloop.
              </p>

              <SocialAuthButtons />

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-white/80"
                    htmlFor="fullName"
                  >
                    Full name
                  </label>
                  <input
                    autoComplete="name"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#8170ff] focus:ring-4 focus:ring-[#6653ff]/15"
                    id="fullName"
                    name="fullName"
                    placeholder="Your name"
                    required
                    type="text"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-white/80"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#8170ff] focus:ring-4 focus:ring-[#6653ff]/15"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-white/80"
                    htmlFor="accountType"
                  >
                    I&apos;m here to
                  </label>
                  <select
                    className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#18181d] px-4 text-sm text-white outline-none transition focus:border-[#8170ff] focus:ring-4 focus:ring-[#6653ff]/15"
                    defaultValue="job-seeker"
                    id="accountType"
                    name="accountType"
                  >
                    <option value="job-seeker">Find my next opportunity</option>
                    <option value="hiring-team">Hire great people</option>
                  </select>
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-white/80"
                    htmlFor="password"
                  >
                    Create a password
                  </label>
                  <div className="relative">
                    <input
                      autoComplete="new-password"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 pr-12 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#8170ff] focus:ring-4 focus:ring-[#6653ff]/15"
                      id="password"
                      minLength={8}
                      name="password"
                      placeholder="At least 8 characters"
                      required
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/40 transition hover:text-white/80"
                      onClick={() => setShowPassword((visible) => !visible)}
                      type="button"
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" className="size-[18px]" />
                      ) : (
                        <Eye aria-hidden="true" className="size-[18px]" />
                      )}
                    </button>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-5 text-white/50">
                  <input
                    className="mt-0.5 size-4 shrink-0 accent-[#7968ff]"
                    name="termsAccepted"
                    required
                    type="checkbox"
                  />
                  <span>
                    I agree to the Hireloop terms and understand my information
                    will be used to create this demo account.
                  </span>
                </label>

                <button
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#705dff] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(102,83,255,0.22)] transition hover:bg-[#806fff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a99dff]"
                  type="submit"
                >
                  Create account
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </form>

              <p className="mt-6 text-center text-xs leading-5 text-white/35">
                Demo form only. Your password is never printed to the console.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
