"use client";

import { useQuizForm } from "../hooks/useQuizForm";
import { QuizQuestionCard } from "./QuizQuestionCard";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface QuizFormFeatureProps {
  readonly quizId?: string;
}

export function QuizFormFeature({ quizId }: QuizFormFeatureProps) {
  const {
    fields,
    isLoading,
    isSaving,
    handleChange,
    handleQuestionChange,
    handleOptionChange,
    addQuestion,
    deleteQuestion,
    duplicateQuestion,
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
    save("Terbit");
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-[#E2E8F0] pb-4">
        <div>
          <Link
            href={ROUTES.MANAJEMEN_KUISIONER}
            className="flex items-center gap-2 text-[#00695C] hover:underline text-xs font-semibold mb-2"
          >
            <span className="material-symbols-outlined text-sm select-none">arrow_back</span>
            <span>Kembali ke Manajemen Kuesioner</span>
          </Link>
          <h2 className="text-2xl font-bold text-[#1A202C]">
            {quizId ? "Edit Kuesioner" : "Tambah Kuesioner Baru"}
          </h2>
        </div>
        <div className="flex gap-3 w-full sm:w-auto flex-wrap">
          <button
            onClick={cancel}
            type="button"
            className="flex-1 sm:flex-initial h-12 px-6 rounded-xl border border-[#E2E8F0] bg-white text-sm font-bold text-[#1A202C] hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
          >
            Batal
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={isSaving}
            type="button"
            className="flex-1 sm:flex-initial h-12 px-6 rounded-xl border border-[#00695C] bg-[#F0F9F8] text-[#00695C] text-sm font-bold hover:bg-[#B2DFDB]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            Simpan Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={isSaving}
            type="button"
            className="flex-1 sm:flex-initial h-12 px-6 rounded-xl bg-[#00695C] text-white text-sm font-bold hover:bg-[#004d43] transition-all cursor-pointer shadow-md shadow-[#00695C]/10 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg select-none">publish</span>
            <span>Terbitkan</span>
          </button>
        </div>
      </div>

      <form className="space-y-8">
        {/* Basic Info Section */}
        <section className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm space-y-6">
          <h3 className="text-base font-bold text-[#1A202C] mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00695C] text-xl select-none">info</span>
            <span>Informasi Dasar Kuesioner</span>
          </h3>
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
                placeholder="Masukkan judul kuesioner..."
                required
                type="text"
              />
            </div>
            {/* Linked Material */}
            <div className="col-span-1">
              <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                Materi Edukasi Terkait <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={fields.linkedArticleId}
                  onChange={(e) => handleChange("linkedArticleId", e.target.value)}
                  className="w-full h-12 rounded-xl border border-[#E2E8F0] bg-white px-4 appearance-none focus:ring-1 focus:ring-[#00695C] focus:border-[#00695C] text-sm text-[#1A202C] pr-10 cursor-pointer outline-none"
                  required
                >
                  <option value="" disabled>Pilih Materi Edukasi</option>
                  <option value="1">Pencegahan Diabetes Tipe 2</option>
                  <option value="2">Pola Makan Sehat untuk Pasien</option>
                  <option value="3">Pentingnya Aktivitas Fisik Harian</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#718096] text-lg pointer-events-none select-none">
                  expand_more
                </span>
              </div>
            </div>
            {/* Difficulty */}
            <div className="col-span-1">
              <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                Tingkat Kesulitan
              </label>
              <div className="relative">
                <select
                  value={fields.difficulty}
                  onChange={(e) => handleChange("difficulty", e.target.value)}
                  className="w-full h-12 rounded-xl border border-[#E2E8F0] bg-white px-4 appearance-none focus:ring-1 focus:ring-[#00695C] focus:border-[#00695C] text-sm text-[#1A202C] pr-10 cursor-pointer outline-none"
                >
                  <option value="Mudah">Mudah</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Sulit">Sulit</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#718096] text-lg pointer-events-none select-none">
                  expand_more
                </span>
              </div>
            </div>
            {/* Passing Score */}
            <div className="col-span-1">
              <label className="block text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                Nilai Kelulusan (%) <span className="text-red-500">*</span>
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
          </div>
        </section>

        {/* Question Builder Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1A202C] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00695C] text-xl select-none">quiz</span>
              <span>Daftar Pertanyaan</span>
            </h3>
            <span className="px-3 py-1 rounded-full bg-[#F0F9F8] text-[#00695C] text-xs font-bold border border-[#B2DFDB]/20">
              {fields.questions.length} Pertanyaan
            </span>
          </div>

          <div className="space-y-6">
            {fields.questions.map((question, index) => (
              <QuizQuestionCard
                key={question.id}
                question={question}
                index={index}
                onQuestionChange={handleQuestionChange}
                onOptionChange={handleOptionChange}
                onDuplicate={duplicateQuestion}
                onDelete={deleteQuestion}
              />
            ))}
          </div>

          {/* Add Question Button */}
          <div className="flex justify-center">
            <button
              onClick={addQuestion}
              className="px-6 py-3 rounded-xl border border-dashed border-[#00695C] text-[#00695C] text-sm font-bold hover:bg-[#F0F9F8]/80 transition-all flex items-center justify-center gap-2 w-full md:w-auto cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined select-none">add_circle</span>
              <span>Tambah Pertanyaan Baru</span>
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
