"use client";

import { useRecordMonitoring } from "../hooks/useRecordMonitoring";
import { RecordMonitoringStats } from "./RecordMonitoringStats";
import { RecordMonitoringFilters } from "./RecordMonitoringFilters";
import { RecordMonitoringTable } from "./RecordMonitoringTable";

export function RecordMonitoringFeature() {
  const {
    patients,
    stats,
    isLoading,
    searchQuery,
    dateFilter,
    setSearchQuery,
    setDateFilter,
  } = useRecordMonitoring();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1A202C] tracking-tight">
          Monitoring Record Pasien
        </h2>
        <p className="text-sm text-[#718096] mt-1">
          Pantau aktivitas harian dan catatan kesehatan seluruh pasien
        </p>
      </div>

      {/* Stats Bento Grid */}
      <RecordMonitoringStats stats={stats} />

      {/* Filter panel */}
      <RecordMonitoringFilters
        searchQuery={searchQuery}
        dateFilter={dateFilter}
        onSearchChange={setSearchQuery}
        onDateChange={setDateFilter}
      />

      {/* Main Table Card */}
      <div className="premium-card overflow-hidden">
        <RecordMonitoringTable patients={patients} loading={isLoading} />
      </div>
    </div>
  );
}
