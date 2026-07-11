import type { QuizQuestion } from "../types/quiz";

interface QuizQuestionCardProps {
  readonly question: QuizQuestion;
  readonly index: number;
  readonly onQuestionChange: (index: number, qFields: Partial<QuizQuestion>) => void;
  readonly onOptionChange: (qIndex: number, optionKey: "A" | "B" | "C" | "D", value: string) => void;
  readonly onDuplicate: (index: number) => void;
  readonly onDelete: (index: number) => void;
}

export function QuizQuestionCard({
  question,
  index,
  onQuestionChange,
  onOptionChange,
  onDuplicate,
  onDelete,
}: QuizQuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm relative group hover:shadow-md transition-all space-y-6">
      {/* Card Actions (Duplicate & Delete) */}
      <div className="absolute top-6 right-6 flex gap-2">
        <button
          onClick={() => onDuplicate(index)}
          className="p-2 text-[#718096] hover:text-[#00695C] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Duplikasi Pertanyaan"
          type="button"
        >
          <span className="material-symbols-outlined text-lg select-none">content_copy</span>
        </button>
        <button
          onClick={() => onDelete(index)}
          className="p-2 text-[#718096] hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
          title="Hapus Pertanyaan"
          type="button"
        >
          <span className="material-symbols-outlined text-lg select-none">delete</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
        <div className="w-8 h-8 rounded-full bg-[#046b5e] text-white flex items-center justify-center font-bold text-sm shadow-sm">
          {index + 1}
        </div>
        <h4 className="text-sm font-bold text-[#1A202C]">Pertanyaan Pilihan Ganda</h4>
      </div>

      {/* Question Textarea */}
      <div>
        <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
          Teks Pertanyaan <span className="text-red-500">*</span>
        </label>
        <textarea
          value={question.questionText}
          onChange={(e) => onQuestionChange(index, { questionText: e.target.value })}
          className="w-full rounded-xl border border-[#E2E8F0] bg-white p-4 focus:ring-1 focus:ring-[#00695C] focus:border-[#00695C] text-sm text-[#1A202C] transition-shadow resize-y min-h-[90px] outline-none"
          placeholder="Tuliskan pertanyaan di sini..."
          required
          rows={3}
        />
      </div>

      {/* Options Selection */}
      <div>
        <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-3">
          Pilihan Jawaban
          <span className="text-[11px] font-medium text-[#718096] lowercase normal-case ml-2">
            (Pilih radio button untuk jawaban benar)
          </span>
        </label>
        <div className="space-y-3">
          {(["A", "B", "C", "D"] as const).map((opt) => (
            <div
              key={opt}
              className={[
                "flex items-center gap-3 p-3 rounded-xl border bg-white transition-all focus-within:border-[#00695C] focus-within:ring-1 focus-within:ring-[#00695C]",
                question.correctOption === opt ? "border-[#00695C] ring-1 ring-[#00695C]" : "border-[#E2E8F0]",
              ].join(" ")}
            >
              <input
                type="radio"
                name={`correct_q_${index}`}
                checked={question.correctOption === opt}
                onChange={() => onQuestionChange(index, { correctOption: opt })}
                className="w-5 h-5 text-[#00695C] border-[#E2E8F0] focus:ring-[#00695C] cursor-pointer"
                required
              />
              <div className="flex-1 flex items-center gap-3">
                <span className="text-xs font-bold text-[#718096] w-6 text-center">{opt}</span>
                <input
                  type="text"
                  value={question.options[opt]}
                  onChange={(e) => onOptionChange(index, opt, e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm text-[#1A202C] placeholder:text-[#BEC9C5] outline-none"
                  placeholder={`Pilihan ${opt}`}
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation (Optional) */}
      <div className="pt-2">
        <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-amber-500 select-none">lightbulb</span>
          <span>Penjelasan Jawaban (Opsional)</span>
        </label>
        <textarea
          value={question.explanation ?? ""}
          onChange={(e) => onQuestionChange(index, { explanation: e.target.value })}
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F4F6F8]/60 p-4 focus:ring-1 focus:ring-[#00695C] focus:border-[#00695C] text-sm text-[#1A202C] transition-shadow resize-y min-h-[70px] outline-none"
          placeholder="Tulis penjelasan mengapa jawaban tersebut benar untuk edukasi lanjutan..."
          rows={2}
        />
      </div>
    </div>
  );
}
