"use client";

import { SidebarNavLink } from "./SidebarNavLink";
import { MAIN_NAV_ITEMS, BOTTOM_NAV_ITEMS } from "@/constants/navigation";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRouter }    from "next/navigation";
import { ROUTES }       from "@/constants/routes";

export function DashboardSidebar() {
  const { logout } = useAuthStore();
  const router     = useRouter();

  const handleLogout = async (): Promise<void> => {
    await authService.logout();
    logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <aside className="w-[280px] h-screen sticky left-0 top-0 bg-white flex flex-col py-8 border-r border-[#E2E8F0] hidden md:flex z-50">
      {/* Brand */}
      <div className="px-8 mb-10">
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#00695C] tracking-tight">
          DSMES Aceh
        </h1>
        <p className="font-[family-name:var(--font-poppins)] text-xs text-[#718096] mt-1 uppercase tracking-widest font-medium">
          Healthcare Admin
        </p>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-4 flex flex-col gap-1" aria-label="Menu utama">
        {MAIN_NAV_ITEMS.map((item) => (
          <SidebarNavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-4 pt-6 border-t border-[#E2E8F0] flex flex-col gap-1">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <SidebarNavLink key={item.href} item={item} />
        ))}
        <button
          onClick={handleLogout}
          className={[
            "flex items-center gap-4 px-4 py-3 rounded-xl w-full",
            "text-[#C53030] hover:bg-[#FFF5F5] transition-all duration-200",
            "font-[family-name:var(--font-poppins)] text-[15px] font-medium",
          ].join(" ")}
        >
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
