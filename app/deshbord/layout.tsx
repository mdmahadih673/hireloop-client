import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import React from 'react';
import { DashboardSidebar } from "../component/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
};

export default DashboardLayout;