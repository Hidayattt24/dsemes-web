"use client";

import { usePathname } from "next/navigation";
import { useRecordDetail } from "../hooks/useRecordDetail";
import { RecordPatientSummaryCard } from "./RecordPatientSummaryCard";
import { RecordPatientProfileCard } from "./RecordPatientProfileCard";
import { BloodSugarHistoryCard } from "./BloodSugarHistoryCard";
import { MealHistoryCard } from "./MealHistoryCard";
import { ActivityHistoryCard } from "./ActivityHistoryCard";
import { MedicationComplianceCard } from "./MedicationComplianceCard";
import { ErrorState } from "@/components/common/ErrorState";
import { DetailPageLoader } from "@/components/ui/loading";
import { BackButton } from "@/components/common/BackButton";

interface RecordDetailFeatureProps {
  readonly patientId: string;
}

export function RecordDetailFeature({ patientId }: RecordDetailFeatureProps) {
  const pathname = usePathname();
  const isStaff = pathname.startsWith("/staff");
  const listHref = isStaff ? "/staff/pemantauan-catatan-pasien" : "/admin/pemantauan-catatan-pasien";

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
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4">
        <div>
          <div className="mb-2">
            <BackButton href={listHref} label="Data Pasien" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-[#1A202C]">{patient.name}</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#F0FDF4] text-[#166534]">
              Stabil
            </span>
          </div>
          <p className="text-xs font-medium text-[#718096] mt-1">
            {patient.puskesmas}
          </p>
        </div>
      </header>

      <RecordPatientSummaryCard patient={patient} />

      <RecordPatientProfileCard patient={patient} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
        <BloodSugarHistoryCard logs={bloodSugarLogs} />
        <MealHistoryCard logs={mealLogs} targetCalories={patient.dailyCalorieTarget} />
        <ActivityHistoryCard logs={activityLogs} />
        <MedicationComplianceCard logs={medicationLogs} />
      </div>
    </div>
  );
}
