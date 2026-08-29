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

        {/* LINGKAR PINGGANG */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">straighten</span> Lingkar Pinggang
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)]">
            {patient.waistCircumferenceCm || patient.latestMeasurement?.waistCircumferenceCm
              ? `${patient.waistCircumferenceCm ?? patient.latestMeasurement?.waistCircumferenceCm} cm`
              : "-"}
          </p>
        </div>
      </div>

      {/* Data Sosiodemografi (Onboarding) */}
      <h4 className="font-semibold text-base text-[#1A202C] mt-10 mb-6 font-[family-name:var(--font-poppins)]">
        Data Sosiodemografi
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PUSKESMAS */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">local_hospital</span> Puskesmas
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">
            {patient.puskesmas && patient.puskesmas !== "-" ? patient.puskesmas : "-"}
          </p>
        </div>

        {/* KECAMATAN */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">map</span> Kecamatan
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">
            {patient.district || "-"}
          </p>
        </div>

        {/* KOTA */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">location_city</span> Kota
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">
            {patient.city || "-"}
          </p>
        </div>

        {/* ALAMAT */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">home</span> Alamat
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">
            {patient.address || "-"}
          </p>
        </div>

        {/* TANGGAL LAHIR */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">cake</span> Tanggal Lahir
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">
            {patient.dateOfBirth
              ? new Date(patient.dateOfBirth).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
              : "-"}
          </p>
        </div>

        {/* PENDIDIKAN */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">school</span> Pendidikan
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">
            {patient.educationLevel || "-"}
          </p>
        </div>

        {/* TINGGAL BERSAMA */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">groups</span> Tinggal Bersama
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">
            {patient.livingArrangement || "-"}
          </p>
        </div>

        {/* DURASI DIABETES */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">schedule</span> Durasi Diabetes
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">
            {patient.diabetesDuration || "-"}
          </p>
        </div>

        {/* AKTIVITAS FISIK */}
        <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30 min-w-0 overflow-hidden">
          <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
            <span className="material-symbols-outlined text-[14px]">directions_walk</span> Aktivitas Fisik
          </p>
          <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)] break-all sm:break-words">
            {patient.physicalActivityLevel || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
