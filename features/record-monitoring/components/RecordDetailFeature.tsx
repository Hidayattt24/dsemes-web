"use client";

import { useRecordDetail } from "../hooks/useRecordDetail";
import { RecordDetailProfileCard } from "./RecordDetailProfileCard";
import { BloodSugarHistoryCard } from "./BloodSugarHistoryCard";
import { MealHistoryCard } from "./MealHistoryCard";
import { ActivityHistoryCard } from "./ActivityHistoryCard";
import { MedicationComplianceCard } from "./MedicationComplianceCard";
import { ErrorState } from "@/components/common/ErrorState";
import { DetailPageLoader } from "@/components/ui/loading";
import Link from "next/link";

interface RecordDetailFeatureProps {
  readonly patientId: string;
}

export function RecordDetailFeature({ patientId }: RecordDetailFeatureProps) {
  const {
    patient,
    bloodSugarLogs,
    mealLogs,
    activityLogs,
    medicationLogs,
    isLoading,
    error,
    refetch,
  } = useRecordDetail(patientId);

  if (isLoading) {
    return <DetailPageLoader type="record" />;
  }

  if (error || !patient) {
    return <ErrorState message={error ?? "Data catatan pasien tidak ditemukan."} onRetry={refetch} />;
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Breadcrumbs & Title Toolbar */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#718096] mb-2">
            <Link href="/admin/pemantauan-catatan-pasien" className="hover:text-[#00695C] transition-colors">
              Data Pasien
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-[#00695C] font-bold">{patient.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-[#1A202C]">{patient.name}</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#F0FDF4] text-[#166534]">
              Stabil
            </span>
          </div>
          <p className="text-xs font-medium text-[#718096] mt-1">
            ID: P-00{patient.id} • {patient.puskesmas}
          </p>
        </div>
      </header>

      {/* Patient Overview Card */}
      <RecordDetailProfileCard patient={patient} />

      {/* Grid Layout for Charts & Lists */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
        <BloodSugarHistoryCard logs={bloodSugarLogs} />
        <MealHistoryCard logs={mealLogs} />
        <ActivityHistoryCard logs={activityLogs} />
        <MedicationComplianceCard logs={medicationLogs} />
      </div>
    </div>
  );
}
