import type { ReactNode } from "react";
import { SidebarNavbar } from "@/components/layout/SidebarNavbar";
import { HeaderNavbar } from "@/components/layout/HeaderNavbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F4F6F8] text-[#1A202C]">
      <SidebarNavbar />
      <main className="flex-1 flex flex-col min-w-0">
        <HeaderNavbar />
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
