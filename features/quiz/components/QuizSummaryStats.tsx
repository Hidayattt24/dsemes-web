import type { QuestionnaireRecord } from "../types/quiz";

interface QuizSummaryStatsProps {
  readonly quiz: QuestionnaireRecord;
}

export function QuizSummaryStats({ quiz }: QuizSummaryStatsProps) {
  const isPreTest = quiz.type === "PRE_TEST";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-[family-name:var(--font-poppins)]">
      {/* Quiz Info */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="w-10 h-10 rounded-full bg-[#00695C]/10 flex items-center justify-center text-[#00695C] mb-4">
          <span className="material-symbols-outlined select-none text-xl">assignment</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#718096] uppercase tracking-wider">Kuesioner</span>
            <span
              className={[
                "px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border",
                isPreTest
                  ? "bg-[#F0F9F8] text-[#00695C] border-[#00695C]/20"
                  : "bg-teal-50 text-teal-800 border-teal-200",
              ].join(" ")}
            >
              {isPreTest ? "Pre-Test" : "Post-Test"}
            </span>
          </div>
          <p className="text-base font-bold text-[#1A202C] line-clamp-1">{quiz.title}</p>
          <p className="text-xs text-[#718096] mt-1 line-clamp-1">
            {isPreTest ? "Evaluasi Pengetahuan Awal Pasien" : quiz.educationTitle ? `Materi: ${quiz.educationTitle}` : "-"}
          </p>
        </div>
      </div>

      {/* Kategori & Soal */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-4">
          <span className="material-symbols-outlined select-none text-xl">folder_special</span>
        </div>
        <div>
          <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">Struktur Kuesioner</p>
          <p className="text-base font-bold text-[#1A202C]">
            {quiz.categoryCount ?? 0} Kategori • {quiz.questionCount ?? 0} Soal
          </p>
          <p className="text-xs text-[#718096] mt-1">
            {isPreTest ? "Tanpa Passing Score" : `Passing Score: ${quiz.passingScore ?? "-"}% (${quiz.difficulty ?? "-"})`}
          </p>
        </div>
      </div>

      {/* Partisipan & Avg Score */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
          <span className="material-symbols-outlined select-none text-xl">group</span>
        </div>
        <div>
          <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">Partisipan & Rata-rata</p>
          <p className="text-base font-bold text-[#1A202C]">{quiz.participantCount} Pasien</p>
          <p className="text-xs text-[#00695C] font-semibold mt-1">
            Rerata: {quiz.averageScore !== null ? `${quiz.averageScore}%` : "-"}
          </p>
        </div>
      </div>

      {/* Status & Created At */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
          <span className="material-symbols-outlined select-none text-xl">calendar_today</span>
        </div>
        <div>
          <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">Status Kuesioner</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={[
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border",
                (quiz.status as string) === "Aktif" || (quiz.status as string) === "Terbit"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : (quiz.status as string) === "Nonaktif"
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-slate-100 text-[#718096] border-slate-200",
              ].join(" ")}
            >
              {quiz.status}
            </span>
          </div>
          <p className="text-xs text-[#718096] mt-2">
            Dibuat: {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
