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
  Plus,
  Settings as SettingsIcon,
  UsersRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { usePathname } from "next/navigation"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<string, MenuItem[]> = {
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/Admin", icon: LayoutDashboard },
    { id: "users", name: "Users", url: "/dashboard/Admin/users", icon: UsersRound },
    { id: "companies", name: "Companies", url: "/companies", icon: Building2 },
    { id: "jobs", name: "Jobs", url: "/jobs", icon: BriefcaseBusiness },
    { id: "payments", name: "Payments", url: "/dashboard/Admin/payments", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/Admin/settings", icon: SettingsIcon },
  ],
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/Seeker", icon: LayoutDashboard },
    { id: "jobs", name: "Jobs", url: "/jobs", icon: BriefcaseBusiness },
    { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/Seeker/saved-jobs", icon: Bookmark },
    { id: "applications", name: "Applications", url: "/dashboard/Seeker/applications", icon: FileText },
    { id: "billing", name: "Billing", url: "/dashboard/Seeker/billing", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/Seeker/settings", icon: SettingsIcon },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/Recruiter", icon: LayoutDashboard },
    { id: "my-company", name: "My Company", url: "/companies", icon: Building2 },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/Recruiter/jobs", icon: BriefcaseBusiness },
    { id: "add-job", name: "Add Job", url: "/dashboard/Recruiter/job/new", icon: Plus },
    { id: "applications", name: "Applications", url: "/dashboard/Recruiter/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/dashboard/Recruiter/settings", icon: SettingsIcon },
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
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton render={<a href={item.url} />}>
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
