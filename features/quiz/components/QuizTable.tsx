import type { QuestionnaireRecord, PaginationMeta } from "../types/quiz";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface QuizTableProps {
  readonly quizzes: readonly QuestionnaireRecord[];
  readonly pagination: PaginationMeta;
  readonly onDeleteClick: (id: string) => void;
  readonly onPageChange: (page: number) => void;
}

export function QuizTable({ quizzes, pagination, onDeleteClick, onPageChange }: QuizTableProps) {
  const pathname = usePathname();
  const isStaff = pathname.startsWith("/staff");

  const handlePrevPage = () => {
    if (pagination.page > 1) onPageChange(pagination.page - 1);
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.total_pages) onPageChange(pagination.page + 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden font-[family-name:var(--font-poppins)]">
      {/* Table Header */}
      <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
        <div>
          <h3 className="text-base font-bold text-[#1A202C]">Daftar Kuesioner</h3>
          <p className="text-xs text-[#718096]">Manajemen kuesioner Pre-Test & Post-Test pasien</p>
        </div>
        <span className="text-xs font-semibold text-[#00695C] bg-[#F0F9F8] px-3 py-1.5 rounded-full border border-[#00695C]/15">
          Total: {pagination.total} Kuesioner
        </span>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-white text-xs font-bold text-[#718096] uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold">Nama Kuesioner</th>
              <th className="py-4 px-6 font-semibold">Tipe</th>
              <th className="py-4 px-6 font-semibold">Materi Edukasi</th>
              <th className="py-4 px-6 font-semibold text-center">Passing / Kesulitan</th>
              <th className="py-4 px-6 font-semibold text-center">Kategori</th>
              <th className="py-4 px-6 font-semibold text-center">Soal</th>
              <th className="py-4 px-6 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-[#1A202C] divide-y divide-[#E2E8F0]/60">
            {quizzes.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 px-6 text-center text-[#718096]">
                  Tidak ada kuesioner ditemukan.
                </td>
              </tr>
            ) : (
              quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Nama */}
                  <td className="py-4 px-6 font-semibold text-[#00695C] hover:underline">
                    <Link href={isStaff ? `/staff/manajemen-kuisioner/${quiz.id}` : `${ROUTES.MANAJEMEN_KUISIONER}/${quiz.id}`}>
                      {quiz.title}
                    </Link>
                  </td>

                  {/* Tipe */}
                  <td className="py-4 px-6">
                    <span
                      className={[
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold border",
                        quiz.type === "PRE_TEST"
                          ? "bg-[#F0F9F8] text-[#00695C] border-[#00695C]/20"
                          : "bg-teal-50 text-teal-800 border-teal-200",
                      ].join(" ")}
                    >
                      {quiz.type === "PRE_TEST" ? "Pre-Test" : "Post-Test"}
                    </span>
                  </td>

                  {/* Materi Edukasi */}
                  <td className="py-4 px-6 text-[#718096] font-medium">
                    {quiz.educationTitle || "-"}
                  </td>

                  {/* Passing / Kesulitan */}
                  <td className="py-4 px-6 text-center text-xs">
                    {quiz.type === "PRE_TEST" ? (
                      <span className="text-[#A0AEC0]">-</span>
                    ) : (
                      <div>
                        <span className="font-bold text-[#00695C]">{quiz.passingScore ?? "-"}%</span>
                        <span className="text-[#718096] ml-1">({quiz.difficulty ?? "-"})</span>
                      </div>
                    )}
                  </td>

                  {/* Total Kategori */}
                  <td className="py-4 px-6 text-center font-semibold">
                    {quiz.categoryCount ?? 0}
                  </td>

                  {/* Total Soal */}
                  <td className="py-4 px-6 text-center font-semibold">
                    {quiz.questionCount ?? 0}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={[
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border",
                        quiz.status === "Aktif" || quiz.status === "Terbit"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : quiz.status === "Nonaktif"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-slate-100 text-[#718096] border-slate-200",
                      ].join(" ")}
                    >
                      {quiz.status}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2 text-[#718096]">
                      <Link
                        href={isStaff ? `/staff/manajemen-kuisioner/${quiz.id}` : `${ROUTES.MANAJEMEN_KUISIONER}/${quiz.id}`}
                        className="p-2 hover:text-[#00695C] hover:bg-[#00695C]/10 rounded-lg transition-colors flex items-center"
                        title="Lihat Detail"
                      >
                        <span className="material-symbols-outlined text-[20px] select-none">visibility</span>
                      </Link>
                      {!isStaff && (
                        <>
                          <Link
                            href={`${ROUTES.MANAJEMEN_KUISIONER}/${quiz.id}/edit`}
                            className="p-2 hover:text-[#B45309] hover:bg-[#B45309]/10 rounded-lg transition-colors flex items-center"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-[20px] select-none">edit</span>
                          </Link>
                          <button
                            onClick={() => onDeleteClick(quiz.id)}
                            className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center cursor-pointer"
                            title="Hapus"
                          >
                            <span className="material-symbols-outlined text-[20px] select-none">delete</span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination.total_pages > 1 && (
        <div className="p-4 border-t border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC] text-xs font-semibold text-[#718096]">
          <span>
            Menampilkan {(pagination.page - 1) * pagination.per_page + 1}-
            {Math.min(pagination.page * pagination.per_page, pagination.total)} dari {pagination.total} data
          </span>
          <div className="flex gap-1">
            <button
              onClick={handlePrevPage}
              disabled={pagination.page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#718096] hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm select-none">chevron_left</span>
            </button>
            {Array.from({ length: pagination.total_pages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onPageChange(idx + 1)}
                className={[
                  "w-8 h-8 flex items-center justify-center rounded-lg font-bold transition-colors cursor-pointer",
                  pagination.page === idx + 1
                    ? "bg-[#00695C] text-white"
                    : "border border-[#E2E8F0] text-[#1A202C] hover:bg-slate-100",
                ].join(" ")}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={pagination.page === pagination.total_pages}
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
