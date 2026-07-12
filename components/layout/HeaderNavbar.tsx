"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { useAuthStore } from "@/lib/stores/authStore";
import { useSidebarStore } from "@/lib/stores/sidebarStore";
import { MAIN_NAV_ITEMS, STAFF_NAV_ITEMS } from "@/constants/navigation";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { authService } from "@/services/authService";
import { ROUTES } from "@/constants/routes";

export function HeaderNavbar() {
  const { user, logout } = useAuthStore();
  const { openMobile } = useSidebarStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const doctorAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDb1KUY-_QSdBdqr2297B6t9UU7Zv4G2xxqAqHFHa17vEkmU84tkQA0wlpfQjEOa2p6JCwBuaAwtxllXhMQJWX-Fh32sGp53qysZvoCzaaMPnUPcGvKzGbUaPuzVLBWnL5YLJHG11W421EfDPx3HK5L7YeILoMbRTD55WXEvXOaztccIYZksiEMRKx1SVjPk-OWY91z6CxUoFiqTatRWYAFmSI6xVdHGinX2J9fIZ3Go0ORDAsMHfSwZIqijQE5lIeqMxayXT_z-Glm";

  // Match current path to Nav item label for page title
  const getPageTitle = () => {
    const allItems = [...MAIN_NAV_ITEMS, ...STAFF_NAV_ITEMS];
    const matched = allItems.find(
      (item) =>
        pathname === item.href ||
        (item.href !== "/admin" && item.href !== "/staff" && pathname.startsWith(`${item.href}/`))
    );
    return matched ? matched.label : "Admin";
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async (): Promise<void> => {
    setIsLogoutOpen(false);
    setIsDropdownOpen(false);
    await authService.logout();
    logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <header className="h-20 w-full sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex justify-between items-center px-6 md:px-10">
      
      {/* Left side: Mobile only */}
      <div className="flex md:hidden items-center gap-3 mr-auto">
        <button
          onClick={openMobile}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-[#718096] cursor-pointer"
          aria-label="Buka menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <h1 className="text-base font-bold text-[#1A202C] font-[family-name:var(--font-poppins)] tracking-tight truncate max-w-[150px] sm:max-w-none">
          {getPageTitle()}
        </h1>
      </div>

      {/* Center placeholder or search (hidden on mobile) */}
      <div className="hidden md:block flex-1" />

      {/* Right side: Notification + User Profile */}
      <div className="flex items-center gap-4">

        {/* User profile block */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Desktop User Info */}
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#1A202C] font-[family-name:var(--font-poppins)] leading-none group-hover:text-[#00695C] transition-colors">
                {user?.name ?? "Dr. Ahmad Faisal"}
              </p>
              <p className="text-[11px] text-[#718096] font-medium font-[family-name:var(--font-poppins)] mt-1.5 leading-none">
                Dokter Utama
              </p>
            </div>
            
            <Avatar
              src={user?.avatarUrl ?? doctorAvatar}
              name={user?.name ?? "Dr. Ahmad Faisal"}
              size={40}
              showOnline={true}
            />
          </div>

          {/* Floating Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-2xl border border-[#E2E8F0] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="px-4 py-2 border-b border-[#E2E8F0] sm:hidden">
                <p className="text-sm font-bold text-[#1A202C] truncate">
                  {user?.name ?? "Dr. Ahmad Faisal"}
                </p>
                <p className="text-[10px] text-[#718096] mt-0.5">
                  Dokter Utama
                </p>
              </div>
              <Link
                href="/admin/pengaturan"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#4A5568] hover:bg-[#F4F6F8] hover:text-[#00695C] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>Profil</span>
              </Link>
              <Link
                href="/admin/pengaturan"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#4A5568] hover:bg-[#F4F6F8] hover:text-[#00695C] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
                <span>Pengaturan</span>
              </Link>
              <button
                onClick={() => setIsLogoutOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#C53030] hover:bg-[#FFF5F5] transition-colors cursor-pointer text-left border-t border-[#E2E8F0] select-none"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
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
    </header>
  );
}
