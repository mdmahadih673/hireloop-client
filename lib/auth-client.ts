import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

function normalizeAuthUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim()
  const validCandidate = candidate
    ?.split("||")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.includes("://") ? part : `https://${part}`)
    .find((part) => URL.canParse(part))
  return validCandidate ? new URL(validCandidate).origin : undefined
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
