"use client";

import { useState } from "react";
import { useQuizForm } from "../hooks/useQuizForm";
import { BackButton } from "@/components/common/BackButton";
import { ROUTES } from "@/constants/routes";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Select } from "@/components/ui/Select";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useToast } from "@/components/ui/Toast";

interface QuizFormFeatureProps {
  readonly quizId?: string;
}

const difficultyOptions = [
  { value: "Mudah", label: "Mudah" },
  { value: "Sedang", label: "Sedang" },
  { value: "Sulit", label: "Sulit" },
] as const;

export function QuizFormFeature({ quizId }: QuizFormFeatureProps) {
  const { showToast } = useToast();

  // Modal confirmation for deleting a Category (Pre-Test only)
  const [categoryToDeleteIndex, setCategoryToDeleteIndex] = useState<number | null>(null);

  const {
    fields,
    articleOptions,
    isLoading,
    isSaving,
    handleChange,
    addCategory,
    deleteCategory,
    handleCategoryChange,
    addQuestion,
    deleteQuestion,
    handleQuestionChange,
    addChoice,
    deleteChoice,
    handleChoiceChange,
    setCorrectChoice,
    save,
    cancel,
  } = useQuizForm(quizId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    save("Draft");
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    save("Aktif");
  };

  const isPreTest = fields.type === "PRE_TEST";

  return (
    <div className="max-w-[1400px] mx-auto w-full font-[family-name:var(--font-poppins)] space-y-8 pb-12">
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-[#E2E8F0] pb-4">
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <BackButton href={ROUTES.MANAJEMEN_KUISIONER} label="Manajemen Kuesioner" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A202C]">
            {quizId ? "Edit Kuesioner" : "Tambah Kuesioner Baru"}
          </h2>
          <p className="text-xs text-[#718096] mt-1 flex items-center gap-1.5">
            {isPreTest
              ? "Pre-Test Evaluasi Pengetahuan Awal (Tanpa Passing Score & Memiliki Kategori Pembelajaran)"
              : "Post-Test Evaluasi Pemahaman Edukasi (Terikat Khusus pada 1 Materi Edukasi & Tanpa Kategori)"}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto flex-wrap sm:flex-nowrap">
          <button
            onClick={cancel}
            type="button"
            className="h-12 px-6 rounded-xl border border-[#E2E8F0] bg-white text-sm font-bold text-[#1A202C] hover:bg-slate-50 transition-all cursor-pointer shadow-xs shrink-0"
          >
            Batal
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={isSaving}
            type="button"
            className="h-12 px-6 rounded-xl border border-[#00695C] bg-[#F0F9F8] text-[#00695C] text-sm font-bold hover:bg-[#B2DFDB]/20 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            Simpan Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={isSaving}
            type="button"
            className="h-12 px-6 rounded-xl bg-[#00695C] text-white text-sm font-bold hover:bg-[#004d43] transition-all cursor-pointer shadow-md shadow-[#00695C]/10 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
          >
            <span className="material-symbols-outlined text-lg select-none">publish</span>
            <span>Aktifkan / Terbitkan</span>
          </button>
        </div>
      </div>

      <form className="space-y-8">
        {/* Section 1: Type Switcher & Basic Info */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
          <h3 className="text-base font-bold text-[#1A202C] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <span className="material-symbols-outlined text-[#00695C] text-xl select-none">tune</span>
            <span>Tipe & Informasi Dasar Kuesioner</span>
          </h3>

          {/* Type Switcher */}
          <div>
            <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-3">
              Pilih Tipe Kuesioner <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
              {/* PRE-TEST Card */}
              <div
                onClick={() => handleChange("type", "PRE_TEST")}
                className={[
                  "relative p-5 sm:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between select-none group",
                  isPreTest
                    ? "border-[#00695C] bg-gradient-to-br from-[#F0F9F8] via-white to-[#E6F2F1]/30 shadow-md shadow-[#00695C]/10 ring-2 ring-[#00695C]/20"
                    : "border-[#E2E8F0] bg-white hover:border-[#00695C]/40 hover:bg-[#F0F9F8]/40 shadow-xs",
                ].join(" ")}
              >
                {isPreTest && (
                  <div className="absolute top-4 right-4 bg-[#00695C] text-white p-1 rounded-full flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-base">check</span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div
                      className={[
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        isPreTest
                          ? "bg-[#00695C] text-white shadow-md shadow-[#00695C]/30"
                          : "bg-teal-100 text-[#00695C] group-hover:bg-[#00695C] group-hover:text-white",
                      ].join(" ")}
                    >
                      <span className="material-symbols-outlined text-2xl">psychology</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-[#1A202C]">PRE-TEST</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-teal-100 text-teal-800 uppercase">
                          Awal
                        </span>
                      </div>
                      <span className="text-xs text-[#718096] font-medium block">
                        Pengetahuan Awal Pasien
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#4A5568] leading-relaxed mb-4">
                    Mengukur tingkat pengetahuan awal pasien sebelum mempelajari materi edukasi DSMES.
                  </p>
                </div>
                <div className="pt-3 border-t border-teal-100/80 grid grid-cols-1 gap-1.5 text-[11px] font-bold text-[#4A5568]">
                  <div className="flex items-center gap-1.5 text-[#00695C]">
                    <span className="material-symbols-outlined text-sm">folder_special</span>
                    <span>Memiliki Kategori Pembelajaran & Soal</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#00695C]">
                    <span className="material-symbols-outlined text-sm">remove_circle_outline</span>
                    <span>Tanpa Passing Score & Tanpa Materi Terkait</span>
                  </div>
                </div>
              </div>

              {/* POST-TEST Card */}
              <div
                onClick={() => handleChange("type", "POST_TEST")}
                className={[
                  "relative p-5 sm:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between select-none group",
                  !isPreTest
                    ? "border-[#00695C] bg-gradient-to-br from-[#F0F9F8] via-white to-[#E6F2F1]/30 shadow-md shadow-[#00695C]/10 ring-2 ring-[#00695C]/20"
                    : "border-[#E2E8F0] bg-white hover:border-[#00695C]/40 hover:bg-[#F0F9F8]/40 shadow-xs",
                ].join(" ")}
              >
                {!isPreTest && (
                  <div className="absolute top-4 right-4 bg-[#00695C] text-white p-1 rounded-full flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-base">check</span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div
                      className={[
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        !isPreTest
                          ? "bg-[#00695C] text-white shadow-md shadow-[#00695C]/30"
                          : "bg-teal-100 text-[#00695C] group-hover:bg-[#00695C] group-hover:text-white",
                      ].join(" ")}
                    >
                      <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-[#1A202C]">POST-TEST</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-teal-100 text-teal-800 uppercase">
                          Evaluasi
                        </span>
                      </div>
                      <span className="text-xs text-[#718096] font-medium block">
                        Uji Pemahaman Edukasi
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#4A5568] leading-relaxed mb-4">
                    Menguji tingkat pemahaman pasien setelah membaca dan menyelesaikan materi edukasi spesifik.
                  </p>
                </div>
                <div className="pt-3 border-t border-teal-100/80 grid grid-cols-1 gap-1.5 text-[11px] font-bold text-[#4A5568]">
                  <div className="flex items-center gap-1.5 text-[#00695C]">
                    <span className="material-symbols-outlined text-sm">menu_book</span>
                    <span>Terikat Khusus pada 1 Materi Edukasi</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#00695C]">
                    <span className="material-symbols-outlined text-sm">assignment</span>
                    <span>Langsung Daftar Soal (Tanpa Kategori)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                Judul Kuesioner <span className="text-red-500">*</span>
              </label>
              <input
                value={fields.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full h-12 rounded-xl border border-[#E2E8F0] bg-white px-4 focus:ring-1 focus:ring-[#00695C] focus:border-[#00695C] text-sm text-[#1A202C] outline-none"
                placeholder={isPreTest ? "misal: Pre-Test Evaluasi Pengetahuan Awal DSMES" : "misal: Quiz Evaluasi Nutrisi Sehat Diabetes"}
                required
                type="text"
              />
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                Deskripsi Kuesioner (Opsional)
              </label>
              <textarea
                value={fields.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 focus:ring-1 focus:ring-[#00695C] focus:border-[#00695C] text-sm text-[#1A202C] outline-none"
                placeholder="Penjelasan singkat mengenai kuesioner ini..."
              />
            </div>

            {/* Conditional Fields: Only for POST-TEST */}
            {!isPreTest && (
              <>
                {/* Linked Education Material */}
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                    Materi Edukasi Terkait <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={fields.educationId}
                    onChange={(val) => handleChange("educationId", val)}
                    options={articleOptions}
                    placeholder="Pilih Materi Edukasi"
                    required
                  />
                </div>

                {/* Difficulty */}
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                    Tingkat Kesulitan <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={fields.difficulty}
                    onChange={(val) => handleChange("difficulty", val)}
                    options={difficultyOptions}
                    placeholder="Pilih Tingkat Kesulitan"
                    required
                  />
                </div>

                {/* Passing Score */}
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                    Nilai Kelulusan (Passing Score) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      value={fields.passingScore}
                      onChange={(e) => handleChange("passingScore", parseInt(e.target.value) || 0)}
                      className="w-full h-12 rounded-xl border border-[#E2E8F0] bg-white px-4 focus:ring-1 focus:ring-[#00695C] focus:border-[#00695C] text-sm text-[#1A202C] pr-12 outline-none"
                      max={100}
                      min={0}
                      placeholder="80"
                      required
                      type="number"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#718096] text-sm font-semibold select-none">
                      %
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Section 2: Questions Builder */}
        {!isPreTest ? (
          /* POST-TEST: Direct Questions Builder (No Categories) */
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#1A202C] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00695C] text-xl select-none">quiz</span>
                  <span>Daftar Soal Post-Test</span>
                </h3>
                <p className="text-xs text-[#718096] mt-1">
                  Soal-soal evaluasi langsung untuk menguji pemahaman materi edukasi terkait (Tanpa Kategori).
                </p>
              </div>
              <span className="text-xs font-extrabold text-[#00695C] bg-[#F0F9F8] px-3 py-1.5 rounded-full border border-[#00695C]/20 self-start sm:self-auto">
                Total {fields.categories[0]?.questions.length || 0} Soal
              </span>
            </div>

            {/* Direct Questions List */}
            <div className="space-y-6">
              {(fields.categories[0]?.questions || []).map((question, qIdx) => (
                <div
                  key={`post_q_${qIdx}`}
                  className="bg-slate-50/50 rounded-2xl border border-[#E2E8F0] p-6 space-y-4 hover:border-[#00695C]/30 transition-all"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between border-b border-[#E2E8F0]/80 pb-3">
                    <span className="text-xs font-bold text-[#00695C] bg-[#E6F2F1] px-3 py-1 rounded-lg">
                      Soal #{qIdx + 1}
                    </span>
                    {(fields.categories[0]?.questions.length || 0) > 1 && (
                      <button
                        onClick={() => deleteQuestion(0, qIdx)}
                        type="button"
                        className="px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-red-200"
                      >
                        <span className="material-symbols-outlined text-base select-none">delete</span>
                        <span>Hapus Soal</span>
                      </button>
                    )}
                  </div>

                  {/* Question Text */}
                  <div>
                    <label className="block text-xs font-bold text-[#4A5568] mb-1.5">
                      Teks Pertanyaan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(0, qIdx, "questionText", e.target.value)}
                      rows={2}
                      className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3.5 text-sm text-[#1A202C] focus:ring-1 focus:ring-[#00695C] outline-none"
                      placeholder="Tuliskan pertanyaan evaluasi di sini..."
                    />
                  </div>

                  {/* Choices */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-[#4A5568]">
                        Pilihan Jawaban (Tandai jawaban yang benar) <span className="text-red-500">*</span>
                      </label>
                      <button
                        onClick={() => addChoice(0, qIdx)}
                        type="button"
                        className="text-xs font-bold text-[#00695C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                        <span>Tambah Pilihan</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {question.choices.map((choice, choiceIdx) => (
                        <div
                          key={`post_c_${qIdx}_${choiceIdx}`}
                          className={[
                            "flex items-center gap-2 p-2.5 rounded-xl border transition-all",
                            choice.isCorrect
                              ? "border-emerald-500 bg-emerald-50/50"
                              : "border-[#E2E8F0] bg-white",
                          ].join(" ")}
                        >
                          <input
                            type="radio"
                            name={`correct_post_${qIdx}`}
                            checked={choice.isCorrect}
                            onChange={() => setCorrectChoice(0, qIdx, choiceIdx)}
                            className="w-4 h-4 accent-emerald-600 cursor-pointer"
                          />
                          <input
                            value={choice.optionText}
                            onChange={(e) => handleChoiceChange(0, qIdx, choiceIdx, e.target.value)}
                            className="flex-1 text-xs text-[#1A202C] bg-transparent outline-none font-semibold"
                            placeholder={`Pilihan ${String.fromCharCode(65 + choiceIdx)}...`}
                          />
                          {choice.isCorrect && (
                            <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full select-none">
                              BENAR
                            </span>
                          )}
                          {question.choices.length > 2 && (
                            <button
                              onClick={() => deleteChoice(0, qIdx, choiceIdx)}
                              type="button"
                              className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-[#718096] mb-1.5">
                      Pembahasan / Penjelasan Jawaban (Opsional)
                    </label>
                    <input
                      value={question.explanation}
                      onChange={(e) => handleQuestionChange(0, qIdx, "explanation", e.target.value)}
                      className="w-full h-11 rounded-xl border border-[#E2E8F0] bg-white px-4 text-xs text-[#1A202C] focus:ring-1 focus:ring-[#00695C] outline-none"
                      placeholder="Penjelasan mengapa jawaban tersebut benar..."
                    />
                  </div>
                </div>
              ))}

              {/* Add Question Button */}
              <button
                onClick={() => addQuestion(0)}
                type="button"
                className="w-full py-4 rounded-xl border-2 border-dashed border-[#00695C] text-[#00695C] text-sm font-bold hover:bg-[#F0F9F8] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                <span>Tambah Soal Post-Test Baru</span>
              </button>
            </div>
          </section>
        ) : (
          /* PRE-TEST: Question Categories Builder */
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div>
                <h3 className="text-base font-bold text-[#1A202C] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00695C] text-xl select-none">folder_special</span>
                  <span>Kategori Pembelajaran & Soal Pre-Test</span>
                </h3>
                <p className="text-xs text-[#718096] mt-1">
                  Kelompokkan soal ke dalam kategori (seperti Nutrisi Umum, Pengetahuan Obat, Gaya Hidup)
                </p>
              </div>
              <button
                onClick={addCategory}
                className="px-5 py-2.5 rounded-xl bg-[#F0F9F8] border border-[#00695C]/20 text-[#00695C] text-xs font-bold hover:bg-[#00695C] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
                type="button"
              >
                <span className="material-symbols-outlined text-sm select-none">add_circle</span>
                <span>Tambah Kategori Baru</span>
              </button>
            </div>

            {/* Categories List */}
            <div className="space-y-8">
              {fields.categories.map((category, catIdx) => (
                <div
                  key={`cat_${catIdx}`}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6 relative"
                >
                  {/* Category Header Controls */}
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                    <h3 className="text-base font-bold text-[#1A202C] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#00695C] text-white text-xs font-black flex items-center justify-center">
                        {catIdx + 1}
                      </span>
                      <span>Bagian Kategori {catIdx + 1}: {category.title || `Pengetahuan Umum`}</span>
                    </h3>
                    {fields.categories.length > 1 && (
                      <button
                        onClick={() => setCategoryToDeleteIndex(catIdx)}
                        type="button"
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer border border-red-200"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        <span>Hapus Kategori</span>
                      </button>
                    )}
                  </div>

                  {/* Category Title & Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/60 p-5 rounded-2xl border border-[#E2E8F0]">
                    <div>
                      <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                        Nama Kategori <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={category.title}
                        onChange={(e) => handleCategoryChange(catIdx, "title", e.target.value)}
                        className="w-full h-12 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#1A202C] focus:ring-1 focus:ring-[#00695C] focus:border-[#00695C] outline-none"
                        placeholder="misal: Nutrisi Umum / Pengetahuan Diabetes"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                        Deskripsi Kategori (Opsional)
                      </label>
                      <input
                        value={category.description}
                        onChange={(e) => handleCategoryChange(catIdx, "description", e.target.value)}
                        className="w-full h-12 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#1A202C] focus:ring-1 focus:ring-[#00695C] focus:border-[#00695C] outline-none"
                        placeholder="Penjelasan singkat kategori ini..."
                        type="text"
                      />
                    </div>
                  </div>

                  {/* Category Questions List */}
                  <div className="space-y-6 pt-2">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0]/80 pb-3">
                      <h4 className="text-xs font-bold text-[#718096] uppercase tracking-wider flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#00695C] text-base">quiz</span>
                        <span>Daftar Soal — Kategori: {category.title || `Kategori ${catIdx + 1}`}</span>
                      </h4>
                      <span className="text-xs font-extrabold text-[#00695C] bg-[#F0F9F8] px-3 py-1 rounded-full border border-[#00695C]/20">
                        {category.questions.length} Soal
                      </span>
                    </div>

                    {category.questions.map((question, qIdx) => (
                      <div
                        key={`q_${catIdx}_${qIdx}`}
                        className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-2xs space-y-4 relative hover:border-[#00695C]/30 transition-all"
                      >
                        {/* Question Header */}
                        <div className="flex items-center justify-between border-b border-[#E2E8F0]/60 pb-3">
                          <span className="text-xs font-bold text-[#00695C] bg-[#E6F2F1] px-2.5 py-1 rounded-lg">
                            Soal #{qIdx + 1}
                          </span>
                          {category.questions.length > 1 && (
                            <button
                              onClick={() => deleteQuestion(catIdx, qIdx)}
                              type="button"
                              className="p-1 text-[#718096] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Soal"
                            >
                              <span className="material-symbols-outlined text-lg select-none">delete</span>
                            </button>
                          )}
                        </div>

                        {/* Question Text */}
                        <div>
                          <label className="block text-xs font-bold text-[#4A5568] mb-1.5">
                            Teks Pertanyaan <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(catIdx, qIdx, "questionText", e.target.value)}
                            rows={2}
                            className="w-full rounded-xl border border-[#E2E8F0] p-3 text-sm text-[#1A202C] focus:ring-1 focus:ring-[#00695C] outline-none"
                            placeholder="Tuliskan pertanyaan di sini..."
                          />
                        </div>

                        {/* Choices List */}
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold text-[#4A5568]">
                              Pilihan Jawaban (Tandai jawaban yang benar) <span className="text-red-500">*</span>
                            </label>
                            <button
                              onClick={() => addChoice(catIdx, qIdx)}
                              type="button"
                              className="text-xs font-bold text-[#00695C] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                              <span>Tambah Pilihan</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {question.choices.map((choice, choiceIdx) => (
                              <div
                                key={`c_${catIdx}_${qIdx}_${choiceIdx}`}
                                className={[
                                  "flex items-center gap-2 p-2.5 rounded-xl border transition-all",
                                  choice.isCorrect
                                    ? "border-emerald-500 bg-emerald-50/50"
                                    : "border-[#E2E8F0] bg-white",
                                ].join(" ")}
                              >
                                <input
                                  type="radio"
                                  name={`correct_${catIdx}_${qIdx}`}
                                  checked={choice.isCorrect}
                                  onChange={() => setCorrectChoice(catIdx, qIdx, choiceIdx)}
                                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                                />
                                <input
                                  value={choice.optionText}
                                  onChange={(e) => handleChoiceChange(catIdx, qIdx, choiceIdx, e.target.value)}
                                  className="flex-1 text-xs text-[#1A202C] bg-transparent outline-none font-semibold"
                                  placeholder={`Pilihan ${String.fromCharCode(65 + choiceIdx)}...`}
                                />
                                {choice.isCorrect && (
                                  <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full select-none">
                                    BENAR
                                  </span>
                                )}
                                {question.choices.length > 2 && (
                                  <button
                                    onClick={() => deleteChoice(catIdx, qIdx, choiceIdx)}
                                    type="button"
                                    className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                                  >
                                    <span className="material-symbols-outlined text-sm">close</span>
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="pt-2">
                          <label className="block text-xs font-bold text-[#718096] mb-1.5">
                            Pembahasan / Penjelasan Jawaban (Opsional)
                          </label>
                          <input
                            value={question.explanation}
                            onChange={(e) => handleQuestionChange(catIdx, qIdx, "explanation", e.target.value)}
                            className="w-full h-11 rounded-xl border border-[#E2E8F0] bg-white px-4 text-xs text-[#1A202C] focus:ring-1 focus:ring-[#00695C] outline-none"
                            placeholder="Penjelasan mengapa jawaban tersebut benar..."
                          />
                        </div>
                      </div>
                    ))}

                    {/* Add Question Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => addQuestion(catIdx)}
                        type="button"
                        className="w-full py-3.5 rounded-xl border border-dashed border-[#00695C] text-[#00695C] text-xs font-bold hover:bg-[#F0F9F8] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-base">add_circle</span>
                        <span>Tambah Soal untuk Kategori &quot;{category.title || `Kategori ${catIdx + 1}`}&quot;</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </form>

      {/* Confirmation Modal for Category Deletion */}
      <ConfirmationModal
        open={categoryToDeleteIndex !== null}
        title="Hapus Kategori Pembelajaran?"
        description={`Apakah Anda yakin ingin menghapus Bagian Kategori "${fields.categories[categoryToDeleteIndex ?? 0]?.title || 'Kategori'}" beserta seluruh soal di dalamnya?`}
        variant="danger"
        confirmText="Ya, Hapus Kategori"
        cancelText="Batal"
        onConfirm={() => {
          if (categoryToDeleteIndex !== null) {
            deleteCategory(categoryToDeleteIndex);
            setCategoryToDeleteIndex(null);
            showToast({
              type: "success",
              title: "Berhasil Hapus",
              description: "Kategori berhasil dihapus.",
            });
          }
        }}
        onCancel={() => setCategoryToDeleteIndex(null)}
      />
    </div>
  );
}
