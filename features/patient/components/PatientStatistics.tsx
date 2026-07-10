"use client";

import type { PatientStats } from "@/types/patient";

interface PatientStatisticsProps {
  readonly stats: PatientStats | null;
}

export function PatientStatistics({ stats }: PatientStatisticsProps) {
  const total = stats?.totalPatients ?? 0;
  const active = stats?.activePatients ?? 0;
  const averageAge = stats?.averageAge ?? 0;
  
  // Calculate percentage of active patients
  const activePercent = total > 0 ? Math.round((active / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Total Pasien */}
      <div className="premium-card p-7 hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center justify-between mb-6">
          <span className="w-10 h-10 rounded-full bg-[#F0F9F8] text-[#00695C] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">group</span>
          </span>
          <span className="text-[10px] font-bold text-[#166534] bg-[#F0FDF4] px-2 py-0.5 rounded-full uppercase">
            +12 Bulan ini
          </span>
        </div>
        <h4 className="text-[11px] font-bold text-[#718096] uppercase tracking-widest mb-1 font-[family-name:var(--font-poppins)]">
          Total Pasien
        </h4>
        <p className="text-3xl font-bold text-[#1A202C] font-[family-name:var(--font-poppins)]">
          {total.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Pasien Aktif */}
      <div className="premium-card p-7 hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center justify-between mb-6">
          <span className="w-10 h-10 rounded-full bg-[#F0F9F8] text-[#00695C] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </span>
        </div>
        <h4 className="text-[11px] font-bold text-[#718096] uppercase tracking-widest mb-1 font-[family-name:var(--font-poppins)]">
          Pasien Aktif
        </h4>
        <p className="text-3xl font-bold text-[#1A202C] font-[family-name:var(--font-poppins)]">
          {active.toLocaleString("id-ID")}
        </p>
        <div className="w-full bg-[#F4F6F8] h-1.5 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-[#00695C] h-full rounded-full transition-all duration-500" 
            style={{ width: `${activePercent}%` }}
          />
        </div>
      </div>

      {/* Rata-rata Usia */}
      <div className="premium-card p-7 hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center justify-between mb-6">
          <span className="w-10 h-10 rounded-full bg-[#FFFBEB] text-[#B45309] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          </span>
        </div>
        <h4 className="text-[11px] font-bold text-[#718096] uppercase tracking-widest mb-1 font-[family-name:var(--font-poppins)]">
          Rata-rata Usia
        </h4>
        <p className="text-3xl font-bold text-[#1A202C] font-[family-name:var(--font-poppins)]">
          {averageAge}{" "}
          <span className="text-sm text-[#718096] font-normal">Tahun</span>
        </p>
      </div>
    </div>
  );
}
