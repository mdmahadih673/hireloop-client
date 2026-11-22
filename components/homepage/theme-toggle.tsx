"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme } from "@teispace/next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"
  const Icon = mounted ? (isDark ? Sun : Moon) : SunMoon
  const label = mounted
    ? `Switch to ${isDark ? "light" : "dark"} mode`
    : "Toggle color theme"

  return (
    <button
      aria-label={label}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80 dark:hover:bg-white/[0.1] dark:focus-visible:outline-violet-300"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={label}
      type="button"
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  )
}
