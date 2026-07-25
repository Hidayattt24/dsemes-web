"use client";

import type { Patient } from "@/types/patient";

interface PatientPersonalInfoCardProps {
  readonly patient: Patient;
}

export function PatientPersonalInfoCard({ patient }: PatientPersonalInfoCardProps) {
  const genderIcon = patient.gender === "Laki-laki" ? "male" : "female";

  return (
    <div className="premium-card p-8 flex flex-col justify-center min-h-[350px]">
      <h4 className="font-semibold text-lg text-[#1A202C] mb-8 font-[family-name:var(--font-poppins)]">
        Informasi Personal
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* NAMA */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">person</span> Nama
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">{patient.name}</p>
        </div>

        {/* UMUR */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span> Umur
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)]">{patient.age} Tahun</p>
        </div>

        {/* WHATSAPP */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">chat</span> WhatsApp
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)]">{patient.whatsapp}</p>
        </div>

        {/* JENIS KELAMIN */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">{genderIcon}</span> Jenis Kelamin
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)]">{patient.gender}</p>
        </div>

        {/* TINGGI / BB */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">fitness_center</span> Tinggi / BB
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)]">
            {patient.height} cm / {patient.weight} kg
          </p>
        </div>

        {/* GOL. DARAH */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">bloodtype</span> Gol. Darah
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)]">{patient.bloodType}</p>
        </div>

        {/* REGISTRASI */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">event</span> Registrasi
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)]">{patient.registeredAt}</p>
        </div>
      </div>
    </div>
  );
}
