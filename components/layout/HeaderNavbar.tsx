"use client";

import { Avatar } from "@/components/ui/Avatar";
import { useAuthStore } from "@/lib/stores/authStore";

export function HeaderNavbar() {
  const { user } = useAuthStore();

  const doctorAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDb1KUY-_QSdBdqr2297B6t9UU7Zv4G2xxqAqHFHa17vEkmU84tkQA0wlpfQjEOa2p6JCwBuaAwtxllXhMQJWX-Fh32sGp53qysZvoCzaaMPnUPcGvKzGbUaPuzVLBWnL5YLJHG11W421EfDPx3HK5L7YeILoMbRTD55WXEvXOaztccIYZksiEMRKx1SVjPk-OWY91z6CxUoFiqTatRWYAFmSI6xVdHGinX2J9fIZ3Go0ORDAsMHfSwZIqijQE5lIeqMxayXT_z-Glm";

  return (
    <header className="h-20 w-full sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex justify-between items-center px-10">
      {/* Search bar */}
      <div className="flex items-center gap-3 bg-[#F4F6F8] px-5 py-2.5 rounded-full w-96 border border-transparent focus-within:border-[#00695C]/20 focus-within:bg-white transition-all">
        <span className="material-symbols-outlined text-[#718096] text-xl">search</span>
        <input
          type="text"
          placeholder="Cari data pasien atau artikel..."
          aria-label="Cari data"
          className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full placeholder:text-[#718096] text-[#1A202C] outline-none font-[family-name:var(--font-poppins)]"
        />
      </div>

      {/* User profile with Dr. Ahmad Faisal as target header */}
      <div className="flex items-center gap-4 pl-6 border-l border-[#E2E8F0]">
        <div className="text-right">
          <p className="text-sm font-bold text-[#1A202C] font-[family-name:var(--font-poppins)] leading-none">
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
    </header>
  );
}
