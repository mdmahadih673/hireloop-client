import type { ReactNode } from "react"
import { requireRole } from "@/lib/core/server"

export default async function SeekerLayout({ children }: { children: ReactNode }) {
  await requireRole("seeker", "/Dashboard/Seeker")
  return children
}
