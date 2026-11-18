import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import React from 'react';
import { DashboardSidebar } from "@/app/components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider className="dark min-h-svh bg-[#111111] text-white">
            <DashboardSidebar />
            <main className="min-w-0 flex-1 overflow-x-hidden">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
};

export default DashboardLayout;
