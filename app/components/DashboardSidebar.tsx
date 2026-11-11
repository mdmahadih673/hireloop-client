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
  UsersRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { usePathname } from "next/navigation"
import Link from "next/link"

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

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
