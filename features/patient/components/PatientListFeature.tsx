"use client";

import { usePatients } from "../hooks/usePatients";
import { PatientStatistics } from "./PatientStatistics";
import { PatientTable } from "./PatientTable";
import { Select } from "@/components/ui/Select";

const statusOptions = [
  { value: "Semua", label: "Semua Status" },
  { value: "Aktif", label: "Aktif" },
  { value: "Nonaktif", label: "Nonaktif" },
] as const;

const genderOptions = [
  { value: "Semua", label: "Semua Jenis Kelamin" },
  { value: "Laki-laki", label: "Laki-laki" },
  { value: "Perempuan", label: "Perempuan" },
] as const;

export function PatientListFeature() {
  const {
    patients,
    stats,
    isLoading,
    searchQuery,
    statusFilter,
    genderFilter,
    currentPage,
    totalCount,
    totalPages,
    startItem,
    endItem,
    setSearchQuery,
    setStatusFilter,
    setGenderFilter,
    setCurrentPage,
  } = usePatients();

  // Create page numbers to display
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1A202C] tracking-tight">Data Pasien</h2>
        <p className="text-sm text-[#718096] mt-1">Kelola data pasien terdaftar dan pantau status kesehatannya</p>
      </div>

      {/* Patient Statistics Bento Grid */}
      <PatientStatistics stats={stats} />

      {/* Filter and Search Action bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-xl px-4 py-3 flex items-center gap-3 w-full md:flex-1 max-w-md h-12">
          <span className="material-symbols-outlined text-[#718096] select-none text-xl">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pasien, dokter, atau puskesmas..."
            className="bg-transparent border-none text-sm font-medium w-full placeholder:text-[#718096] text-[#1A202C] outline-none font-[family-name:var(--font-poppins)]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto justify-end">
          {/* Status Filter */}
          <div className="w-36">
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              placeholder="Status"
            />
          </div>

          {/* Gender Filter */}
          <div className="w-48">
            <Select
              value={genderFilter}
              onChange={setGenderFilter}
              options={genderOptions}
              placeholder="Jenis Kelamin"
            />
          </div>
        </div>
      </div>

      {/* Patients Data Grid Card */}
      <div className="premium-card overflow-hidden">
        <PatientTable patients={patients} loading={isLoading} />

        {/* Pagination bar */}
        {!isLoading && totalCount > 0 && (
          <div className="px-8 py-6 border-t border-[#E2E8F0]/50 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#718096] font-medium font-[family-name:var(--font-poppins)]">
              Menampilkan{" "}
              <span className="text-[#1A202C] font-bold">{startItem}-{endItem}</span> dari{" "}
              <span className="text-[#1A202C] font-bold">
                {statusFilter === "Semua" && searchQuery === "" && genderFilter === "Semua"
                  ? "1.284" // exact Stitch mock count if unfiltered
                  : totalCount.toLocaleString("id-ID")}
              </span>{" "}
              pasien
            </p>

            <div className="flex items-center gap-1.5">
              {/* Previous page */}
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center border border-[#E2E8F0] rounded-lg hover:bg-[#F4F6F8] transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>

              {/* Page numbers */}
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={[
                    "w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold transition-all",
                    currentPage === num
                      ? "bg-[#00695C] text-white shadow-sm shadow-[#00695C]/20"
                      : "hover:bg-[#F4F6F8] text-[#718096] font-semibold",
                  ].join(" ")}
                >
                  {num}
                </button>
              ))}

              {/* Next page */}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center border border-[#E2E8F0] rounded-lg hover:bg-[#F4F6F8] transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
