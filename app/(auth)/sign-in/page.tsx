"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"
import { ArrowRight, Eye, EyeOff, LockKeyhole, Sparkles } from "lucide-react"
import { signIn } from "@/lib/auth-client"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [signInError, setSignInError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    try {
      const { data, error } = await signIn.email({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        callbackURL: "/",
      })
      if (error) {
        console.error("Sign-in failed", error)
        setSignInError(error.message ?? "Sign-in failed.")
        return
      }

      console.log("Sign-in successful", data)
      window.location.assign("/")

    } catch (error) {
      console.error("Sign-in request failed", error)
      setSignInError(
        error instanceof Error
          ? error.message
          : "Sign-in could not be completed. Please try again.",
      )
    }
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
              Your next opportunity starts here
            </div>
            <h1 className="text-5xl font-semibold leading-[1.12] tracking-[-0.04em] xl:text-6xl">
              Make your next
              <br />
              move a great one.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/55">
              Sign in to pick up where you left off and find the work that
              moves you forward.
            </p>

            <div className="mt-12 flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#6653ff]/15 text-[#a99dff]">
                <LockKeyhole aria-hidden="true" className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium">A space built around you</p>
                <p className="mt-1 text-xs leading-5 text-white/45">
                  Keep your search, applications, and career plans together.
                </p>
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
              New to Hireloop?{" "}
              <Link
                className="font-medium text-[#a99dff] transition-colors hover:text-white"
                href="/get-started"
              >
                Create account
              </Link>
            </p>
          </header>

          <div className="flex flex-1 items-center justify-center py-12">
            <div className="w-full max-w-[420px]">
              <p className="text-sm font-medium text-[#a99dff]">Welcome back</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Sign in to Hireloop
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/50">
                Enter your details below to access your account.
              </p>

              <SocialAuthButtons />

              <form className="space-y-5" onSubmit={handleSubmit}>
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
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      className="text-sm font-medium text-white/80"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <span className="text-xs text-white/40">
                      At least 8 characters
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="current-password"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 pr-12 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#8170ff] focus:ring-4 focus:ring-[#6653ff]/15"
                      id="password"
                      minLength={8}
                      name="password"
                      placeholder="Enter your password"
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

                <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-white/55">
                  <input
                    className="size-4 accent-[#7968ff]"
                    name="rememberMe"
                    type="checkbox"
                  />
                  Keep me signed in
                </label>

                <button
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#705dff] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(102,83,255,0.22)] transition hover:bg-[#806fff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a99dff]"
                  type="submit"
                >
                  Sign in
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </form>

              <p className="mt-8 text-center text-xs leading-5 text-white/35">
                Demo form only. Your password is never printed to the console.
              </p>
              {signInError && (
                <p className="mt-3 text-center text-sm text-red-400" role="alert">
                  {signInError}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
