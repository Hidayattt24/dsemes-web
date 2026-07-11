"use client";

interface RecordMonitoringFiltersProps {
  readonly searchQuery: string;
  readonly dateFilter: string;
  readonly onSearchChange: (val: string) => void;
  readonly onDateChange: (val: string) => void;
}

export function RecordMonitoringFilters({
  searchQuery,
  dateFilter,
  onSearchChange,
  onDateChange,
}: RecordMonitoringFiltersProps) {
  return (
    <div className="premium-card p-5 flex flex-col sm:flex-row gap-4 items-center w-full">
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
      <div className="w-full sm:w-64">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full bg-white border border-[#E2E8F0] rounded-xl py-3 px-4 text-sm focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all font-medium text-[#1A202C] h-12 cursor-pointer"
        />
      </div>
    </div>
  );
}
