interface QuizFiltersProps {
  readonly searchQuery: string;
  readonly filterStatus: "Semua" | "Terbit" | "Draft";
  readonly onSearchChange: (val: string) => void;
  readonly onStatusChange: (val: "Semua" | "Terbit" | "Draft") => void;
}

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
      <div className="w-full sm:w-64 relative">
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value as "Semua" | "Terbit" | "Draft")}
          className="w-full appearance-none bg-white border border-[#E2E8F0] rounded-xl py-3 pl-4 pr-10 text-sm focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all font-medium text-[#1A202C] h-12 cursor-pointer"
        >
          <option value="Semua">Semua Status</option>
          <option value="Terbit">Terbit</option>
          <option value="Draft">Draft</option>
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#718096] text-lg select-none">
          expand_more
        </span>
      </div>
    </div>
  );
}
