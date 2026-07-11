"use client";

import { useState } from "react";
import { SidebarNavLink } from "@/components/layout/SidebarNavLink";
import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRouter }    from "next/navigation";
import { ROUTES }       from "@/constants/routes";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

export function SidebarNavbar() {
  const { logout } = useAuthStore();
  const router     = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogout = async (): Promise<void> => {
    setIsLogoutOpen(false);
    await authService.logout();
    logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <aside className="w-[280px] h-screen sticky left-0 top-0 bg-white flex flex-col py-8 border-r border-[#E2E8F0] hidden md:flex z-50">
      {/* Official branding logo: green shield icon + Deep Teal typography stack */}
      <div className="px-8 mb-10 flex items-center gap-3">
        <span className="material-symbols-outlined text-[32px] text-[#10B981] select-none">
          health_and_safety
        </span>
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0F766E] tracking-tight leading-none">
            DSMES Aceh
          </h1>
          <p className="font-[family-name:var(--font-poppins)] text-[9px] text-[#718096] mt-1.5 uppercase tracking-widest font-bold leading-none">
            HEALTHCARE ADMIN
          </p>
        </div>
      </div>

      {/* Main nav items */}
      <nav className="flex-1 px-4 flex flex-col gap-1" aria-label="Menu utama">
        {MAIN_NAV_ITEMS.map((item) => (
          <SidebarNavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Bottom logout section */}
      <div className="px-4 pt-6 border-t border-[#E2E8F0] flex flex-col gap-1">
        <button
          onClick={() => setIsLogoutOpen(true)}
          className={[
            "flex items-center gap-4 px-4 py-3 rounded-xl w-full cursor-pointer",
            "text-[#C53030] hover:bg-[#FFF5F5] transition-all duration-200",
            "font-[family-name:var(--font-poppins)] text-[15px] font-medium",
          ].join(" ")}
        >
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span>Keluar</span>
        </button>
      </div>

      <ConfirmationModal
        open={isLogoutOpen}
        title="Keluar dari Sistem?"
        description="Apakah Anda yakin ingin keluar dari akun ini?"
        variant="warning"
        confirmText="Keluar"
        cancelText="Batal"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutOpen(false)}
      />
    </aside>
  );
}
