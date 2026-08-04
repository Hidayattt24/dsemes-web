"use client";

import { DataTable, type TableColumn } from "@/components/common/DataTable";
import type { Patient } from "@/types/patient";
import Link from "next/link";

interface PatientTableProps {
  readonly patients: Patient[];
  readonly loading: boolean;
}

export function PatientTable({ patients, loading }: PatientTableProps) {
  const columns: TableColumn<Patient>[] = [
    {
      key: "name",
      header: "Nama Pasien",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div
            className={[
              "w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] tracking-tighter",
              row.status === "Aktif"
                ? "bg-[#F0F9F8] text-[#00695C]"
                : "bg-[#E2E8F0]/40 text-[#718096]",
            ].join(" ")}
          >
            {row.initials}
          </div>
          <span className="text-sm font-semibold text-[#1A202C]">{row.name}</span>
        </div>
      ),
    },
    {
      key: "age",
      header: "Usia",
      render: (row) => (
        <span className="text-sm text-[#718096]">{row.age} thn</span>
      ),
    },
    {
      key: "gender",
      header: "Jenis Kelamin",
      render: (row) => (
        <span className="text-sm text-[#718096]">{row.gender}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const isAktif = row.status === "Aktif";
        return (
          <span
            className={[
              "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight",
              isAktif
                ? "bg-[#F0FDF4] text-[#166534]"
                : "bg-[#F4F6F8] text-[#718096] border border-[#E2E8F0]",
            ].join(" ")}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Aksi",
      className: "text-right",
      render: (row) => (
        <Link
          href={`/admin/data-pasien/${row.id}`}
          className="text-[11px] font-bold text-[#00695C] hover:underline underline-offset-4 uppercase tracking-widest"
        >
          Detail
        </Link>
      ),
    },
  ];

  return (
    <DataTable<Patient>
      columns={columns}
      data={patients}
      keyExtract={(row) => row.id}
      loading={loading}
      emptyTitle="Tidak ada pasien"
      emptyMessage="Tidak ditemukan data pasien yang cocok dengan kriteria pencarian."
    />
  );
}
