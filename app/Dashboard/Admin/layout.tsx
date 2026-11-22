import type { ReactNode } from "react"
import { requireRole } from "@/lib/core/server"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireRole("admin", "/Dashboard/Admin")
  return children
}
