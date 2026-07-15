"use client";

import type { PatientRecord } from "../types/record";

interface RecordPatientProfileCardProps {
  readonly patient: PatientRecord;
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  const displayValue = value === "" || value === undefined || value === null ? "-" : String(value);
  return (
    <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E2E8F0]/30">
      <p className="text-[#718096] text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5 font-[family-name:var(--font-poppins)]">
        <span className="material-symbols-outlined text-[14px]">{icon}</span> {label}
      </p>
      <p className="font-medium text-[#1A202C] text-sm font-[family-name:var(--font-poppins)]">{displayValue}</p>
    </div>
  );
}

export function RecordPatientProfileCard({ patient }: RecordPatientProfileCardProps) {
  const genderIcon = patient.gender === "Laki-laki" ? "male" : "female";

  const bmiVal = patient.bmi ? patient.bmi.toFixed(1) : "-";

  return (
    <div className="space-y-6">
      {/* Avatar + Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 premium-card p-8 flex flex-col items-center text-center justify-center min-h-[350px]">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full border-2 border-[#00695C]/20 p-1.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#F4F6F8] shadow-inner flex items-center justify-center">
                {patient.avatarUrl ? (
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
              {patient.patientCode !== "-" ? `# ${patient.patientCode}` : `# PS-${patient.id.slice(0, 8)}`}
            </p>
          </div>

          <div className="space-y-3 w-full">
            <div className="px-4 py-2.5 bg-green-50 rounded-lg flex items-center justify-center gap-2 border border-green-100">
              <span className="material-symbols-outlined text-[16px] text-green-700">task_alt</span>
              <span className="text-[11px] font-bold text-green-700 uppercase tracking-widest font-[family-name:var(--font-poppins)]">
                Kepatuhan: {patient.compliance >= 70 ? "Patuh" : patient.compliance >= 40 ? "Kurang Patuh" : "Tidak Patuh"} ({patient.compliance}%)
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

        {/* Personal Identity */}
        <div className="lg:col-span-8 premium-card p-8 flex flex-col justify-center min-h-[350px]">
          <h4 className="font-semibold text-lg text-[#1A202C] mb-8 font-[family-name:var(--font-poppins)]">
            Informasi Personal
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoRow icon="person" label="Nama" value={patient.name} />
            <InfoRow icon="calendar_today" label="Umur" value={`${patient.age} Tahun`} />
            <InfoRow icon="chat" label="WhatsApp" value={patient.whatsapp} />
            <InfoRow icon={genderIcon} label="Jenis Kelamin" value={patient.gender} />
            <InfoRow icon="fitness_center" label="Tinggi / BB" value={`${patient.height} cm / ${patient.weight} kg`} />
            <InfoRow icon="bloodtype" label="Gol. Darah" value={patient.bloodType} />
            <InfoRow icon="event" label="Registrasi" value={patient.registeredAt} />
            <InfoRow icon="cake" label="Tanggal Lahir" value={patient.dateOfBirth} />
            <InfoRow icon="email" label="Email" value={patient.email} />
            <InfoRow icon="home" label="Alamat" value={patient.address} />
            <InfoRow icon="badge" label="NIK" value={patient.nik} />
            <InfoRow icon="card_membership" label="BPJS" value={patient.bpjs} />
          </div>
        </div>
      </div>

    </div>
  );
}
