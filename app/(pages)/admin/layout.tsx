import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader }  from "@/components/dashboard/DashboardHeader";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F4F6F8] text-[#1A202C]">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
