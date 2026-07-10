"use client";

import type { Patient } from "@/types/patient";

interface PatientProfileCardProps {
  readonly patient: Patient;
}

export function PatientProfileCard({ patient }: PatientProfileCardProps) {
  return (
    <div className="premium-card p-8 flex flex-col items-center text-center justify-center min-h-[350px]">
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full border-2 border-[#00695C]/20 p-1.5">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#F4F6F8] shadow-inner flex items-center justify-center">
            {patient.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold text-3xl text-[#00695C] select-none">
                {patient.initials}
              </span>
            )}
          </div>
        </div>
        {patient.accountStatus === "Terverifikasi" && (
          <div className="absolute -bottom-1 right-2 w-8 h-8 bg-[#00695C] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
        )}
      </div>

      <h3 className="font-semibold text-2xl text-[#1A202C] mb-1 font-[family-name:var(--font-poppins)]">
        {patient.name}
      </h3>
      <div className="px-4 py-1 bg-[#00695C]/5 rounded-full border border-[#00695C]/10 mb-6">
        <p className="text-[#00695C] font-semibold text-xs tracking-wide font-[family-name:var(--font-poppins)]">
          # AC-{882900 + parseInt(patient.id)}
        </p>
      </div>

      <div className="space-y-3 w-full">
        <div className="px-4 py-2.5 bg-green-50 rounded-lg flex items-center justify-center gap-2 border border-green-100">
          <span className="material-symbols-outlined text-[16px] text-green-700">task_alt</span>
          <span className="text-[11px] font-bold text-green-700 uppercase tracking-widest font-[family-name:var(--font-poppins)]">
            Kepatuhan: Patuh ({patient.compliance}%)
          </span>
        </div>
        <div className="px-4 py-2.5 bg-slate-50 rounded-lg flex items-center justify-center gap-2 border border-slate-100">
          <span className="material-symbols-outlined text-[16px] text-slate-600">smartphone</span>
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest font-[family-name:var(--font-poppins)]">
            Tipe Intervensi: {patient.interventionType}
          </span>
        </div>
      </div>
    </div>
  );
}
