"use client";

import { DataTable, type TableColumn } from "@/components/common/DataTable";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import type { PatientRecord } from "../types/record";
import Link from "next/link";

interface RecordMonitoringTableProps {
  readonly patients: PatientRecord[];
  readonly loading: boolean;
}

export function RecordMonitoringTable({ patients, loading }: RecordMonitoringTableProps) {
  const columns: TableColumn<PatientRecord>[] = [
    {
      key: "patient",
      header: "Pasien",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatarUrl} name={row.name} size={40} />
          <div>
            <p className="font-semibold text-sm text-[#1A202C]">{row.name}</p>
            <p className="text-xs text-[#718096]">ID: P-00{row.id}</p>
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
          href={`/admin/pemantauan-catatan-pasien/${row.id}`}
          className="text-[#00695C] hover:text-[#004d43] font-semibold text-sm transition-colors inline-flex items-center gap-1 hover:underline"
        >
          Lihat
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </Link>
      ),
    },
  ];

  return (
    <DataTable<PatientRecord>
      columns={columns}
      data={patients}
      keyExtract={(row) => row.id}
      loading={loading}
      emptyTitle="Tidak ada catatan"
      emptyMessage="Belum ada data catatan monitoring yang cocok."
    />
  );
}
