"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRecordMonitoring } from "../hooks/useRecordMonitoring";
import { RecordMonitoringStats } from "./RecordMonitoringStats";
import { RecordMonitoringFilters } from "./RecordMonitoringFilters";
import { RecordMonitoringTable } from "./RecordMonitoringTable";
import { MonitoringTabs } from "./MonitoringTabs";
import { StaffPriorityPatientTable } from "./StaffPriorityPatientTable";
import { IncreasingTrendTable } from "./IncreasingTrendTable";

export function RecordMonitoringFeature() {
  const pathname = usePathname();
  const isStaff = pathname.startsWith("/staff");

  const [activeTab, setActiveTab] = useState("semua");

  const {
    patients,
    stats,
    isLoading,
    searchQuery,
    dateFilter,
    complianceFilter,
    riskFilter,
    setSearchQuery,
    setDateFilter,
    setComplianceFilter,
    setRiskFilter,
  } = useRecordMonitoring();

  // Filter lists for specialized tabs
  const priorityPatients = patients.filter(
    (p) => p.dailySummary.status === "Tinggi" || p.dailySummary.status === "Waspada"
  );

  const trendPatients = patients.filter(
    (p) => parseInt(p.id) % 2 !== 0 // odd IDs represent increasing trend for demonstration
  );

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
        complianceFilter={complianceFilter}
        riskFilter={riskFilter}
        onSearchChange={setSearchQuery}
        onDateChange={setDateFilter}
        onComplianceChange={setComplianceFilter}
        onRiskChange={setRiskFilter}
      />

      {/* Tab Selector (only visible in Staff layout) */}
      {isStaff && (
        <MonitoringTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            { id: "semua", label: "Semua Pasien", icon: "group", badgeCount: patients.length },
            {
              id: "prioritas",
              label: "Pasien Prioritas Hari Ini",
              icon: "emergency",
              badgeCount: priorityPatients.length,
            },
            {
              id: "tren",
              label: "Pasien dengan Tren Meningkat",
              icon: "trending_up",
              badgeCount: trendPatients.length,
            },
          ] as const}
        />
      )}

      {/* Main Table Card */}
      <div className="premium-card overflow-hidden">
        {isStaff ? (
          <>
            {activeTab === "semua" && (
              <RecordMonitoringTable patients={patients} loading={isLoading} />
            )}
            {activeTab === "prioritas" && (
              <StaffPriorityPatientTable patients={priorityPatients} loading={isLoading} />
            )}
            {activeTab === "tren" && (
              <IncreasingTrendTable patients={trendPatients} loading={isLoading} />
            )}
          </>
        ) : (
          <RecordMonitoringTable patients={patients} loading={isLoading} />
        )}
      </div>
    </div>
  );
}
