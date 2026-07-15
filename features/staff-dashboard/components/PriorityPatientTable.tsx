import { DataTable, type TableColumn } from "@/components/common/DataTable";
import { Badge } from "@/components/ui/Badge";
import type { PriorityPatient } from "../hooks/useStaffDashboard";
import Link from "next/link";

interface PriorityPatientTableProps {
  readonly patients: readonly PriorityPatient[];
  readonly loading: boolean;
}

function GlucoseBadge({ status, value }: { readonly status: string; readonly value: number | null }) {
  if (status === "sangat_tinggi") {
    return <Badge variant="error">Sangat Tinggi</Badge>;
  }
  if (status === "tinggi" || (value !== null && value > 140)) {
    return <Badge variant="warning">Tinggi</Badge>;
  }
  if (status === "rendah") {
    return <Badge variant="error">Rendah</Badge>;
  }
  return <Badge variant="muted">Normal</Badge>;
}

export function PriorityPatientTable({ patients, loading }: PriorityPatientTableProps) {
  const columns: TableColumn<PriorityPatient>[] = [
    {
      key: "patient",
      header: "Nama Pasien",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#00695C] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {row.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-sm text-[#1A202C]">{row.name}</p>
            <p className="text-xs text-[#718096]">Kepatuhan: {row.compliance}%</p>
          </div>
        </div>
      ),
    },
    {
      key: "bloodSugar",
      header: "Gula Darah Terakhir",
      render: (row) => (
        <span className="font-bold text-sm" style={{ color: row.bloodSugar !== null && row.bloodSugar > 180 ? "#DC2626" : "#D97706" }}>
          {row.bloodSugar !== null ? `${row.bloodSugar} mg/dL` : "-"}
        </span>
      ),
    },
    {
      key: "risk",
      header: "Tingkat Risiko",
      render: (row) => <GlucoseBadge status={row.glucoseStatus} value={row.bloodSugar} />,
    },
    {
      key: "reason",
      header: "Catatan Terakhir",
      render: (row) => (
        <span className="text-xs text-[#718096] font-medium line-clamp-2 max-w-[200px]">{row.reason}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: () => <Badge variant="warning">Waspada</Badge>,
    },
    {
      key: "action",
      header: "Aksi",
      className: "text-right",
      render: (row) => (
        <Link
          href={`/staff/pemantauan-catatan-pasien/${row.id}`}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-xs font-bold text-[#00695C] transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
        >
          <span>Detail</span>
          <span className="material-symbols-outlined text-sm select-none ml-1">visibility</span>
        </Link>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden w-full flex flex-col font-[family-name:var(--font-poppins)]">
      <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
        <div>
          <h3 className="text-sm font-bold text-[#1A202C]">Pasien Prioritas Hari Ini</h3>
          <p className="text-[11px] text-[#718096] mt-0.5 font-medium">Daftar pasien yang memerlukan perhatian segera hari ini</p>
        </div>
        <span className="text-xs font-bold text-[#E53E3E] bg-[#FFF5F5] px-2.5 py-1 rounded-full border border-red-100">
          {patients.length} Pasien
        </span>
      </div>
      <div className="w-full">
        <DataTable
          columns={columns}
          data={patients as PriorityPatient[]}
          keyExtract={(row) => row.id}
          loading={loading}
          emptyTitle="Semua pasien stabil"
          emptyMessage="Hari ini belum ada catatan gula darah kategori tinggi."
        />
      </div>
    </div>
  );
}
