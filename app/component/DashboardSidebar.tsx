import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,

  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"


const menuItemsByRole = {
  admin: [
  ],
  seeker: [
  ],
  Recruiter: [
  ],
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const role = (session?.user?.role || "seeker") as keyof typeof menuItemsByRole
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {
              // menuItemsByRole[role]?.map((item) => (
              //   <SidebarMenuItem key={item.name}>
              //     <SidebarMenuButton render={<a href={item.url} />}>
              //       <item.icon />
              //       <span>{item.name}</span>
              //     </SidebarMenuButton>
              //   </SidebarMenuItem>
              // ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}