import type { QuizParticipant } from "../types/quiz";
import { DataTable, TableColumn } from "@/components/common/DataTable";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useState, useMemo } from "react";

interface ParticipantTableProps {
  readonly quizId: string;
  readonly participants: readonly QuizParticipant[];
  readonly searchQuery: string;
  readonly onSearchChange: (q: string) => void;
}

export function ParticipantTable({
  quizId,
  participants,
  searchQuery,
  onSearchChange,
}: ParticipantTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return participants.slice(start, start + itemsPerPage);
  }, [participants, currentPage]);

  const totalPages = Math.ceil(participants.length / itemsPerPage) || 1;

  const columns = useMemo<TableColumn<QuizParticipant>[]>(() => [
    {
      key: "patient",
      header: "Pasien",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.patientAvatar} name={row.patientName} size={36} />
          <span className="font-semibold text-slate-800">{row.patientName}</span>
        </div>
      ),
    },
    {
      key: "patientId",
      header: "ID Pasien",
      render: (row) => <span className="font-medium text-slate-500">P-00{row.patientId}</span>,
    },
    {
      key: "puskesmas",
      header: "Puskesmas",
      render: (row) => <span className="font-medium text-slate-600">{row.puskesmas}</span>,
    },
    {
      key: "completionDate",
      header: "Tanggal Selesai",
      render: (row) => <span className="text-slate-500 font-medium">{row.completionDate}</span>,
    },
    {
      key: "score",
      header: "Skor",
      className: "text-center",
      render: (row) => (
        <span className="font-bold text-[#00695C]">{row.score}%</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={row.passed ? "primary" : "error"}>
          {row.passed ? "Lulus" : "Gagal"}
        </Badge>
      ),
    },
    {
      key: "duration",
      header: "Durasi",
      render: (row) => <span className="text-slate-500 font-medium">{row.duration}</span>,
    },
    {
      key: "action",
      header: "Aksi",
      className: "text-right",
      render: (row) => (
        <Link
          href={`${ROUTES.MANAJEMEN_KUISIONER}/${quizId}/participant/${row.patientId}`}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-xs font-bold text-[#00695C] transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
        >
          Detail
        </Link>
      ),
    },
  ], [quizId]);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden space-y-4">
      {/* Table Toolbar Search */}
      <div className="p-6 pb-2 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h3 className="text-base font-bold text-slate-800">Daftar Partisipan Kuesioner</h3>
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#718096] text-lg select-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari pasien atau puskesmas..."
            className="w-full bg-[#F4F6F8]/60 border border-[#E2E8F0] rounded-xl py-2 pl-11 pr-4 text-xs focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all font-medium text-[#1A202C] placeholder:text-[#718096] h-10"
          />
        </div>
      </div>

      {/* Reusable DataTable */}
      <DataTable
        columns={columns}
        data={[...paginatedData]}
        keyExtract={(row) => row.id}
        emptyTitle="Tidak Ada Partisipan"
        emptyMessage="Belum ada pasien yang menyelesaikan kuesioner ini."
      />

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC] text-xs font-semibold text-[#718096]">
          <span>
            Menampilkan {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, participants.length)} dari {participants.length} data
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#718096] hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm select-none">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={[
                  "w-8 h-8 flex items-center justify-center rounded-lg font-bold transition-colors cursor-pointer",
                  currentPage === idx + 1
                    ? "bg-[#00695C] text-white"
                    : "border border-[#E2E8F0] text-[#1A202C] hover:bg-slate-100",
                ].join(" ")}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#718096] hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm select-none">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
