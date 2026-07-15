"use client";

import { DataTable, type TableColumn } from "@/components/common/DataTable";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import type { PatientRecord, PaginationMeta } from "../types/record";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RecordMonitoringTableProps {
  readonly patients: PatientRecord[];
  readonly loading: boolean;
  readonly sortBy?: string;
  readonly sortOrder?: string;
  readonly pagination?: PaginationMeta;
  readonly onSort?: (key: string) => void;
  readonly onPageChange?: (page: number) => void;
}

function SortToolbar({ sortBy, sortOrder, onSort }: {
  sortBy?: string;
  sortOrder?: string;
  onSort?: (key: string) => void;
}) {
  const sorts = [
    { key: "name", label: "Nama" },
    { key: "newest", label: "Terbaru" },
    { key: "oldest", label: "Terlama" },
    { key: "latest_record", label: "Aktivitas Terakhir" },
    { key: "highest_blood_sugar", label: "Gula Darah" },
  ];

  return (
    <div className="flex items-center gap-2 px-8 py-3 border-b border-[#E2E8F0] bg-[#FAFBFC]">
      <span className="text-xs font-bold text-[#718096] uppercase tracking-wider mr-2">Urutkan:</span>
      {sorts.map((s) => {
        const isActive = sortBy === s.key;
        return (
          <button
            key={s.key}
            onClick={() => onSort?.(s.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isActive
                ? "bg-[#00695C] text-white shadow-sm"
                : "bg-white text-[#4A5568] border border-[#E2E8F0] hover:bg-[#F4F6F8]"
            }`}
          >
            {s.label}
            {isActive && (
              <span className="material-symbols-outlined text-[12px] ml-1 align-text-bottom">
                {sortOrder === "asc" ? "arrow_upward" : "arrow_downward"}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function PaginationBar({ pagination, onPageChange }: {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  const { page, total_pages, total } = pagination;
  if (total_pages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-8 py-4 border-t border-[#E2E8F0] bg-white">
      <span className="text-sm text-[#718096]">
        Total {total} pasien
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-sm disabled:opacity-40 hover:bg-[#F4F6F8] transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          Sebelumnya
        </button>
        <span className="text-sm font-semibold text-[#1A202C] px-3">
          {page} / {total_pages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= total_pages}
          className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-sm disabled:opacity-40 hover:bg-[#F4F6F8] transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}

export function RecordMonitoringTable({
  patients,
  loading,
  sortBy,
  sortOrder,
  pagination,
  onSort,
  onPageChange,
}: RecordMonitoringTableProps) {
  const pathname = usePathname();

  const columns: TableColumn<PatientRecord>[] = [
    {
      key: "patient",
      header: "Pasien",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatarUrl} name={row.name} size={40} />
          <div>
            <p className="font-semibold text-sm text-[#1A202C]">{row.name}</p>
          </div>
        </div>
      ),
    },
    {
      key: "bloodSugar",
      header: "Gula Darah Terakhir",
      render: (row) => {
        const value = row.dailySummary.bloodSugar;
        const time = row.dailySummary.bloodSugarTime;
        const isWarning = row.dailySummary.status === "Waspada" || row.dailySummary.status === "Tinggi";
        return (
          <div>
            <span className={`font-semibold text-sm ${isWarning ? "text-[#C53030]" : "text-[#1A202C]"}`}>
              {value}
            </span>
            <br />
            <span className="text-xs text-[#718096]">{time}</span>
          </div>
        );
      },
    },
    {
      key: "meal",
      header: "Makanan Terakhir",
      render: (row) => (
        <div>
          <span className="text-sm font-semibold text-[#1A202C]">{row.dailySummary.meal}</span>
          <br />
          <span className="text-xs text-[#718096]">{row.dailySummary.mealType}</span>
        </div>
      ),
    },
    {
      key: "activity",
      header: "Aktivitas Terakhir",
      render: (row) => (
        <div>
          <span className="text-sm font-semibold text-[#1A202C]">{row.dailySummary.activity}</span>
          <br />
          <span className="text-xs text-[#718096]">{row.dailySummary.activityType}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const status = row.dailySummary.status;
        let badgeVariant: "primary" | "warning" | "error" | "muted" = "muted";
        if (status === "Stabil" || status === "Normal") {
          badgeVariant = "primary";
        } else if (status === "Waspada") {
          badgeVariant = "warning";
        } else if (status === "Tinggi") {
          badgeVariant = "error";
        }
        return <Badge variant={badgeVariant}>{status}</Badge>;
      },
    },
    {
      key: "actions",
      header: "Aksi",
      render: (row) => (
        <Link
          href={pathname.startsWith("/staff") ? `/staff/pemantauan-catatan-pasien/${row.id}` : `/admin/pemantauan-catatan-pasien/${row.id}`}
          className="text-[#00695C] hover:text-[#004d43] font-semibold text-sm transition-colors inline-flex items-center gap-1 hover:underline"
        >
          Lihat
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </Link>
      ),
    },
  ];

  return (
    <div>
      {onSort && (
        <SortToolbar sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
      )}
      <DataTable<PatientRecord>
        columns={columns}
        data={patients}
        keyExtract={(row) => row.id}
        loading={loading}
        emptyTitle="Tidak ada catatan"
        emptyMessage="Belum ada data catatan monitoring yang cocok."
      />
      {pagination && onPageChange && (
        <PaginationBar pagination={pagination} onPageChange={onPageChange} />
      )}
    </div>
  );
}
