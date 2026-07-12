"use client";

import { Select } from "@/components/ui/Select";

interface RecordMonitoringFiltersProps {
  readonly searchQuery: string;
  readonly dateFilter: string;
  readonly complianceFilter: string;
  readonly riskFilter: string;
  readonly onSearchChange: (val: string) => void;
  readonly onDateChange: (val: string) => void;
  readonly onComplianceChange: (val: string) => void;
  readonly onRiskChange: (val: string) => void;
}

const complianceOptions = [
  { value: "Semua", label: "Semua Kepatuhan" },
  { value: "Patuh", label: "Patuh" },
  { value: "Kurang Patuh", label: "Kurang Patuh" },
  { value: "Tidak Patuh", label: "Tidak Patuh" },
] as const;

const riskOptions = [
  { value: "Semua", label: "Semua Tingkat Risiko" },
  { value: "Rendah", label: "Risiko Rendah" },
  { value: "Sedang", label: "Risiko Sedang" },
  { value: "Tinggi", label: "Risiko Tinggi" },
  { value: "Sangat Tinggi", label: "Risiko Sangat Tinggi" },
] as const;

export function RecordMonitoringFilters({
  searchQuery,
  dateFilter,
  complianceFilter,
  riskFilter,
  onSearchChange,
  onDateChange,
  onComplianceChange,
  onRiskChange,
}: RecordMonitoringFiltersProps) {
  return (
    <div className="premium-card p-5 flex flex-col md:flex-row gap-4 items-center w-full font-[family-name:var(--font-poppins)]">
      {/* Search Input */}
      <div className="flex-1 w-full relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#718096]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari Pasien..."
          className="w-full bg-[#F4F6F8]/60 border border-[#E2E8F0] rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all font-medium text-[#1A202C] placeholder:text-[#718096] h-12"
        />
      </div>

      {/* Date Filter */}
      <div className="w-full md:w-44">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full bg-white border border-[#E2E8F0] rounded-xl py-3 px-4 text-sm focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all font-medium text-[#1A202C] h-12 cursor-pointer"
        />
      </div>

      {/* Status Kepatuhan Filter */}
      <div className="w-full md:w-48">
        <Select
          value={complianceFilter}
          onChange={onComplianceChange}
          options={complianceOptions}
          placeholder="Status Kepatuhan"
        />
      </div>

      {/* Level Risiko Filter */}
      <div className="w-full md:w-48">
        <Select
          value={riskFilter}
          onChange={onRiskChange}
          options={riskOptions}
          placeholder="Level Risiko"
        />
      </div>
    </div>
  );
}
