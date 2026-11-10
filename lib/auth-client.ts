import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

function normalizeAuthUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim()
  if (!candidate) return undefined

  try {
    return new URL(candidate.includes("://") ? candidate : `https://${candidate}`).origin
  } catch {
    return undefined
  }
}

export const authClient = createAuthClient({
  baseURL: normalizeAuthUrl(
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
      process.env.BETTER_AUTH_URL ||
      process.env.VERCEL_URL
  ),
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, signOut, useSession } = authClient
