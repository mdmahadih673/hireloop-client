"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/homepage/navbar"

export function ConditionalNavbar() {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/deshbord") || pathname.startsWith("/dashboard")

  if (isDashboard) return null

  return <Navbar />
}
