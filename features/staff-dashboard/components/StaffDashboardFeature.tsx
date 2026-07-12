"use client";

import { useStaffDashboard } from "../hooks/useStaffDashboard";
import { DashboardSummaryCards } from "./DashboardSummaryCards";
import { MonitoringCharts } from "./MonitoringCharts";
import { PriorityPatientTable } from "./PriorityPatientTable";
import { TrendPatientTable } from "./TrendPatientTable";

export function StaffDashboardFeature() {
  const {
    isLoading,
    summaryCards,
    physicalActivity,
    foodIntake,
    medicationAdherence,
    priorityPatients,
    trendPatients,
  } = useStaffDashboard();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Welcome Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#1A202C] tracking-tight">Dashboard Pemantauan</h2>
        <p className="text-sm text-[#718096] mt-1">
          Pantau status kesehatan dan grafik tren populasi pasien diabetes secara menyeluruh
        </p>
      </div>

      {/* Summary Cards */}
      <DashboardSummaryCards cards={summaryCards} loading={isLoading} />

      {/* Population Trends & Distribution Charts */}
      <div className="space-y-6">
        <div className="border-b border-[#E2E8F0] pb-2">
          <h3 className="text-lg font-bold text-[#1A202C]">Metrik Kesehatan Populasi</h3>
          <p className="text-xs text-[#718096] mt-0.5">Grafik statistik agregasi dari seluruh catatan harian pasien</p>
        </div>
        <MonitoringCharts
          physicalActivity={physicalActivity}
          foodIntake={foodIntake}
          medicationAdherence={medicationAdherence}
        />
      </div>

      {/* Monitoring Tables (Stacked Vertically, Full Width) */}
      <div className="flex flex-col gap-8 w-full">
        <PriorityPatientTable patients={priorityPatients} loading={isLoading} />
        <TrendPatientTable patients={trendPatients} loading={isLoading} />
      </div>
    </div>
  );
}
