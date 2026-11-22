import type { ReactNode } from "react"
import { requireRole } from "@/lib/core/server"

export default async function RecruiterLayout({ children }: { children: ReactNode }) {
  await requireRole("recruiter", "/Dashboard/Recruiter")
  return children
}
