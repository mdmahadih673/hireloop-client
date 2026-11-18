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
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings as SettingsIcon,
  UserRound,
  UsersRound,
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
    { id: "users", name: "Users", url: "/Dashboard/Admin/users", icon: UsersRound },
    { id: "companies", name: "Companies", url: "/Dashboard/Admin/companies", icon: Building2 },
    { id: "jobs", name: "Jobs", url: "/Dashboard/Admin/jobs", icon: BriefcaseBusiness },
    { id: "payments", name: "Payments", url: "/Dashboard/Admin/payments", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/Dashboard/Admin/settings", icon: SettingsIcon },
  ],
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/Dashboard/Seeker", icon: LayoutDashboard },
    { id: "jobs", name: "Jobs", url: "/Dashboard/Seeker/jobs", icon: BriefcaseBusiness },
    { id: "saved-jobs", name: "Saved Jobs", url: "/Dashboard/Seeker/saved-jobs", icon: Bookmark },
    { id: "applications", name: "Applications", url: "/Dashboard/Seeker/applications", icon: FileText },
    { id: "billing", name: "Billing", url: "/Dashboard/Seeker/billing", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/Dashboard/Seeker/settings", icon: SettingsIcon },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/Dashboard/Recruiter", icon: LayoutDashboard },
    { id: "my-company", name: "My Company", url: "/Dashboard/Recruiter/companies", icon: Building2 },
    { id: "manage-jobs", name: "Manage Jobs", url: "/Dashboard/Recruiter/jobs", icon: BriefcaseBusiness },
    { id: "add-job", name: "Add Job", url: "/Dashboard/Recruiter/jobs/new", icon: PlusCircle },
    { id: "applications", name: "Applications", url: "/Dashboard/Recruiter/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/Dashboard/Recruiter/settings", icon: SettingsIcon },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const roleName = session?.user?.role?.toLowerCase() ?? "seeker"
  const routeRole = pathname.match(/^\/dashboard\/(admin|recruiter|seeker)(?:\/|$)/i)?.[1]?.toLowerCase()
  const requestedRole = routeRole ?? roleName
  const role = Object.hasOwn(menuItemsByRole, requestedRole) ? requestedRole : "seeker"
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
                <SidebarMenuButton isActive={pathname.toLowerCase() === item.url.toLowerCase()} render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-2 border-t border-white/[0.07] p-3">
        <Link className="flex h-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-[11px] font-semibold text-white/85 transition hover:bg-white/[0.1] hover:text-white" href="/profile">Post Resume</Link>
        <button className="flex h-8 items-center gap-2 px-2 text-[11px] text-white/50 transition hover:text-white" onClick={() => signOut().then(() => window.location.assign("/"))} type="button">Logout</button>
      </SidebarFooter>
    </Sidebar>
  )
}
