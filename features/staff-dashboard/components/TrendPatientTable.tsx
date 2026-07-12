import { DataTable, type TableColumn } from "@/components/common/DataTable";
import { Avatar } from "@/components/ui/Avatar";
import type { TrendPatient } from "../hooks/useStaffDashboard";
import Link from "next/link";

interface TrendPatientTableProps {
  readonly patients: readonly TrendPatient[];
  readonly loading: boolean;
}

export function TrendPatientTable({ patients, loading }: TrendPatientTableProps) {
  const columns: TableColumn<TrendPatient>[] = [
    {
      key: "patient",
      header: "Nama Pasien",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatarUrl} name={row.name} size={36} />
          <div>
            <p className="font-semibold text-sm text-[#1A202C]">{row.name}</p>
            <p className="text-xs text-[#718096]">ID: P-00{row.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "avgStart",
      header: "Rerata Sebelumnya",
      render: (row) => (
        <span className="text-sm text-[#718096] font-medium">{row.avgStart} mg/dL</span>
      ),
    },
    {
      key: "avgCurrent",
      header: "Rerata Saat Ini",
      render: (row) => (
        <span className="font-bold text-sm text-red-600">{row.avgCurrent} mg/dL</span>
      ),
    },
    {
      key: "percentageIncrease",
      header: "Persentase Kenaikan",
      render: (row) => {
        const percent = ((row.avgCurrent - row.avgStart) / row.avgStart) * 100;
        return (
          <span className="font-extrabold text-sm text-red-600">
            +{percent.toFixed(1)}%
          </span>
        );
      },
    },
    {
      key: "trend",
      header: "Indikator Tren",
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9B2C2C] bg-[#FFF5F5] px-2.5 py-1 rounded-full border border-red-100">
          <span className="material-symbols-outlined text-[14px] select-none">trending_up</span>
          <span>Meningkat (+{row.increase} mg/dL)</span>
        </span>
      ),
    },
    {
      key: "lastUpdated",
      header: "Pembaruan Terakhir",
      render: () => <span className="text-xs text-[#718096] font-medium">Hari ini</span>,
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
          <h3 className="text-sm font-bold text-[#1A202C]">Pasien dengan Tren Meningkat</h3>
          <p className="text-[11px] text-[#718096] mt-0.5 font-medium">Pasien dengan peningkatan rata-rata gula darah signifikan</p>
        </div>
        <span className="text-xs font-bold text-[#D69E2E] bg-[#FEFCBF] px-2.5 py-1 rounded-full text-[#975A16] border border-[#FEEBC8]">
          {patients.length} Pasien
        </span>
      </div>
      <div className="w-full">
        <DataTable
          columns={columns}
          data={patients as TrendPatient[]}
          keyExtract={(row) => row.id}
          loading={loading}
          emptyTitle="Tidak ada kenaikan signifikan"
          emptyMessage="Semua pasien menunjukkan tren gula darah yang stabil atau menurun."
        />
      </div>
    </div>
  );
}
