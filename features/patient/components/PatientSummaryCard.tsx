"use client";

import type { Patient } from "@/types/patient";

interface PatientSummaryCardProps {
  readonly patient: Patient;
}

export function PatientSummaryCard({ patient }: PatientSummaryCardProps) {
  // Helper to determine BMI status
  const getBmiStatus = (bmi?: number) => {
    if (!bmi) return { label: "-", color: "text-slate-600 bg-slate-50 border-slate-100" };
    if (bmi < 18.5) return { label: "Kurus", color: "text-amber-700 bg-amber-50 border-amber-100" };
    if (bmi < 25) return { label: "Normal", color: "text-emerald-700 bg-emerald-50 border-emerald-100" };
    if (bmi < 30) return { label: "Gemuk", color: "text-orange-700 bg-orange-50 border-orange-100" };
    return { label: "Obesitas", color: "text-rose-700 bg-rose-50 border-rose-100" };
  };

  const bmiStatus = getBmiStatus(patient.bmi);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full font-[family-name:var(--font-poppins)]">
      {/* 1. Blood Sugar Card */}
      <div className="premium-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center justify-between mb-4">
          <span className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">bloodtype</span>
          </span>
          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase border border-rose-100">
            Glukosa
          </span>
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-[#718096] uppercase tracking-widest mb-1">
            Gula Darah Terakhir
          </h4>
          <p className="text-2xl font-bold text-[#1A202C]">
            {patient.latestBloodSugar ? `${patient.latestBloodSugar} ` : "- "}
            <span className="text-xs font-semibold text-[#718096]">mg/dL</span>
          </p>
          <p className="text-xs text-[#718096] mt-2 font-medium">
            Rata-rata: {patient.averageBloodSugar ? `${Math.round(patient.averageBloodSugar)} mg/dL` : "-"}
          </p>
        </div>
      </div>

      {/* 2. Physical State / BMI Card */}
      <div className="premium-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center justify-between mb-4">
          <span className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">fitness_center</span>
          </span>
          {patient.bmi && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${bmiStatus.color}`}>
              {bmiStatus.label}
            </span>
          )}
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-[#718096] uppercase tracking-widest mb-1">
            Berat Badan / BMI
          </h4>
          <p className="text-2xl font-bold text-[#1A202C]">
            {patient.weight ? `${patient.weight} ` : "- "}
            <span className="text-xs font-semibold text-[#718096]">kg</span>
          </p>
          <p className="text-xs text-[#718096] mt-2 font-medium">
            BMI: {patient.bmi ? patient.bmi.toFixed(1) : "-"}
          </p>
        </div>
      </div>

      {/* 3. Compliance & Calories Card */}
      <div className="premium-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center justify-between mb-4">
          <span className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
          </span>
          <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full uppercase border border-teal-100">
            Kepatuhan
          </span>
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-[#718096] uppercase tracking-widest mb-1">
            Tingkat Kepatuhan
          </h4>
          <p className="text-2xl font-bold text-[#1A202C]">
            {patient.compliance}%
          </p>
          <p className="text-xs text-[#718096] mt-2 font-medium">
            Target Kalori: {patient.height ? "2000" : "-"} kcal
          </p>
        </div>
      </div>

      {/* 4. Latest Activity Card */}
      <div className="premium-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center justify-between mb-4">
          <span className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">directions_walk</span>
          </span>
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase border border-amber-100">
            Aktivitas
          </span>
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-[#718096] uppercase tracking-widest mb-1">
            Aktivitas Terakhir
          </h4>
          <p className="text-sm font-bold text-[#1A202C] truncate max-w-full">
            {patient.latestActivityName ?? "Belum ada catatan"}
          </p>
          <p className="text-xs text-[#718096] mt-2 font-medium truncate">
            {patient.latestActivityTime
              ? new Date(patient.latestActivityTime).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
