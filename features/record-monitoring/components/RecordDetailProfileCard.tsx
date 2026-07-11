"use client";

import Image from "next/image";
import type { PatientRecord } from "../types/record";

interface RecordDetailProfileCardProps {
  readonly patient: PatientRecord;
}

export function RecordDetailProfileCard({ patient }: RecordDetailProfileCardProps) {
  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDhU-Hk4J7-QwG_TgPPscW97PKMfOmlGhJXO-dOqkzp2jJ9aWwYOM1rXPsgUkcIYNo5rof32MqUsTekD7rrupTDWloq1aOYVP-dleSPZl-1BuAf4Prl5F00nKJCC22biA_O_nBXDtnBMKt-BO871B3BvtBlf4eAT0RJHk54Wceci-JqbMoGBpddQ5HGHtNpVEqQlWJmb7-ZGaPw2Ss2XNUbwCsDcuDusTjFrPfb2ay8SLCj54EtrIlAWMcHPm6KokYQuPqFRpyDXybM";

  return (
    <section className="bg-white rounded-2xl p-6 mb-6 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={patient.avatarUrl ?? defaultAvatar}
          alt={patient.name}
          fill
          sizes="96px"
          className="rounded-full object-cover border-4 border-[#F4F6F8]"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 w-full text-center md:text-left">
        <div>
          <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">Usia</p>
          <p className="text-lg font-bold text-[#1A202C]">{patient.age} Thn</p>
        </div>
        <div>
          <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">Jenis Kelamin</p>
          <p className="text-sm font-semibold text-[#1A202C]">{patient.gender}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">Kontak Darurat</p>
          <p className="text-sm font-semibold text-[#1A202C]">{patient.emergencyContact}</p>
        </div>
      </div>
    </section>
  );
}
