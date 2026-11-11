import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import React from 'react';
import { DashboardSidebar } from "../components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="min-w-0 flex-1 overflow-x-hidden">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
};

export default DashboardLayout;
