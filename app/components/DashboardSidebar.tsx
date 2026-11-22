"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BriefcaseBusiness,
  CreditCard,
  FileText,
  LayoutDashboard,
  PlusCircle,
  UserRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useSession, signOut } from "@/lib/auth-client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<string, MenuItem[]> = {
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/Dashboard/Admin", icon: LayoutDashboard },
  ],
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/Dashboard/Seeker", icon: LayoutDashboard },
    { id: "jobs", name: "Browse Jobs", url: "/browse-jobs", icon: BriefcaseBusiness },
    { id: "applications", name: "Applications", url: "/Dashboard/Seeker/applications", icon: FileText },
    { id: "premium", name: "Premium plans", url: "/payment", icon: CreditCard },
    { id: "profile", name: "My profile", url: "/profile", icon: UserRound },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/Dashboard/Recruiter", icon: LayoutDashboard },
    { id: "manage-jobs", name: "Manage Jobs", url: "/Dashboard/Recruiter/jobs", icon: BriefcaseBusiness },
    { id: "add-job", name: "Add Job", url: "/Dashboard/Recruiter/jobs/new", icon: PlusCircle },
    { id: "premium", name: "Premium plan", url: "/Dashboard/Recruiter/Premium", icon: CreditCard },
    { id: "profile", name: "My profile", url: "/profile", icon: UserRound },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const roleName = session?.user?.role?.toLowerCase() ?? "seeker"
  const routeRole = pathname.match(/^\/dashboard\/(admin|recruiter|seeker)(?:\/|$)/i)?.[1]?.toLowerCase()
  const requestedRole = routeRole ?? roleName
  const role = Object.hasOwn(menuItemsByRole, requestedRole) ? requestedRole : "seeker"
  const currentPath = pathname.toLowerCase()
  const activeMenuUrl = menuItemsByRole[role]
    .filter((item) => currentPath === item.url.toLowerCase() || currentPath.startsWith(`${item.url.toLowerCase()}/`))
    .sort((a, b) => b.url.length - a.url.length)[0]?.url.toLowerCase()
  const portalName = role === "seeker" ? "Seeker Portal" : `${role[0].toUpperCase()}${role.slice(1)} Portal`

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-4 border-b border-white/[0.07] p-3">
        <Link aria-label="Hireloop home" className="px-1 py-1" href="/">
          <Image alt="Hireloop" height={28} priority src="/images/logo.png" width={112} />
        </Link>
        <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.035] p-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#29292d] text-white/75"><UserRound className="size-4" /></span>
          <span className="min-w-0"><span className="block truncate text-[11px] font-medium text-white/90">{portalName}</span><span className="mt-0.5 block truncate text-[10px] text-white/45">{session?.user?.name || "Professional Tier"}</span></span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton isActive={activeMenuUrl === item.url.toLowerCase()} render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-2 border-t border-white/[0.07] p-3">
        <button className="flex h-9 w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-[11px] font-semibold text-white/85 transition hover:bg-white/[0.1] hover:text-white" onClick={() => signOut().then(() => window.location.assign("/"))} type="button">Sign Out</button>
      </SidebarFooter>
    </Sidebar>
  )
}
