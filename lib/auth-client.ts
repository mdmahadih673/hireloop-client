import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

function normalizeAuthUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim()
  if (!candidate) return undefined

  for (const part of candidate.split("||")) {
    const trimmed = part.trim()
    if (!trimmed) continue

    try {
      return new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`).origin
    } catch {
      // Ignore malformed fragments and continue to the next possible value.
    }
  }

  return undefined
}

export const authClient = createAuthClient({
  baseURL:
    normalizeAuthUrl(process.env.NEXT_PUBLIC_BETTER_AUTH_URL) ||
    normalizeAuthUrl(process.env.BETTER_AUTH_URL) ||
    normalizeAuthUrl(process.env.VERCEL_URL) ||
    "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, signOut, useSession } = authClient
