"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/homepage/navbar"

export function ConditionalNavbar() {
  const pathname = usePathname()
  const normalizedPathname = pathname.toLowerCase()
  const isDashboard = normalizedPathname.startsWith("/deshbord") || normalizedPathname.startsWith("/dashboard")

  if (isDashboard) return null

  return <Navbar />
}
