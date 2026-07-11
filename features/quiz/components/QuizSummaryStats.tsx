import type { Quiz } from "../types/quiz";

interface QuizSummaryStatsProps {
  readonly quiz: Quiz;
}

export function QuizSummaryStats({ quiz }: QuizSummaryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Quiz Info */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="w-10 h-10 rounded-full bg-[#00695C]/10 flex items-center justify-center text-[#00695C] mb-4">
          <span className="material-symbols-outlined select-none text-xl">assignment</span>
        </div>
        <div>
          <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">Kuesioner</p>
          <p className="text-base font-bold text-[#1A202C] line-clamp-1">{quiz.title}</p>
          <p className="text-xs text-[#718096] mt-1 line-clamp-1">{quiz.linkedArticleTitle}</p>
        </div>
      </div>

      {/* Jml Soal & Passing Score */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-4">
          <span className="material-symbols-outlined select-none text-xl">quiz</span>
        </div>
        <div>
          <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">Soal & Passing Score</p>
          <p className="text-base font-bold text-[#1A202C]">{quiz.questions.length} Pertanyaan</p>
          <p className="text-xs text-[#718096] mt-1">Kelulusan: {quiz.passingScore}%</p>
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
          <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">Status & Tanggal</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={[
                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                quiz.status === "Terbit"
                  ? "bg-emerald-100/60 text-emerald-800"
                  : "bg-slate-100 text-[#718096]",
              ].join(" ")}
            >
              {quiz.status}
            </span>
          </div>
          <p className="text-xs text-[#718096] mt-2">Dibuat: {quiz.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
