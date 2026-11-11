import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toast"

import React from 'react';
import { DashboardSidebar } from "@/app/components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="min-w-0 flex-1 overflow-x-hidden">
                <SidebarTrigger />
                {children}
            </main>
                <Toaster />
        </SidebarProvider>
    )
};

export default DashboardLayout;
