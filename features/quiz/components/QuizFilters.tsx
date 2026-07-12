import { Select } from "@/components/ui/Select";

interface QuizFiltersProps {
  readonly searchQuery: string;
  readonly filterStatus: "Semua" | "Terbit" | "Draft";
  readonly onSearchChange: (val: string) => void;
  readonly onStatusChange: (val: "Semua" | "Terbit" | "Draft") => void;
}

const statusOptions = [
  { value: "Semua", label: "Semua Status" },
  { value: "Terbit", label: "Terbit" },
  { value: "Draft", label: "Draft" },
] as const;

export function QuizFilters({
  searchQuery,
  filterStatus,
  onSearchChange,
  onStatusChange,
}: QuizFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row gap-4 items-center w-full">
      {/* Search Input */}
      <div className="flex-1 w-full relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#718096] select-none">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari Kuesioner..."
          className="w-full bg-[#F4F6F8]/60 border border-[#E2E8F0] rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all font-medium text-[#1A202C] placeholder:text-[#718096] h-12"
        />
      </div>

      {/* Status Filter */}
      <div className="w-full sm:w-64">
        <Select
          value={filterStatus}
          onChange={(val) => onStatusChange(val as "Semua" | "Terbit" | "Draft")}
          options={statusOptions}
          placeholder="Status"
        />
      </div>
    </div>
  );
}
