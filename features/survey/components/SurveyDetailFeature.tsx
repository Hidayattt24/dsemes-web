"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { surveyService } from "@/services/surveyService";
import type { SurveyDetail } from "@/types/survey";
import { BackButton } from "@/components/common/BackButton";
import { useToast } from "@/components/ui/Toast";
import { DetailPageLoader } from "@/components/ui/loading/DetailPageLoader";

interface SurveyDetailFeatureProps {
  surveyId: string;
  isStaff?: boolean;
}

export function SurveyDetailFeature({ surveyId, isStaff = false }: SurveyDetailFeatureProps) {
  const { showToast } = useToast();
  const [survey, setSurvey] = useState<SurveyDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    surveyService
      .getSurveyById(surveyId, isStaff)
      .then(setSurvey)
      .catch(() => {
        showToast({
          type: "error",
          title: "Gagal Memuat",
          description: "Gagal mengambil detail survey.",
        });
      })
      .finally(() => setIsLoading(false));
  }, [surveyId, isStaff, showToast]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-6">
        <DetailPageLoader type="education" />
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="p-12 text-center text-red-600 bg-white rounded-2xl border border-red-200">
        Survey tidak ditemukan
      </div>
    );
  }

  const isSUS = survey.type === "SUS";
  const basePath = isStaff ? "/staff/survey" : "/admin/survey";

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 font-[family-name:var(--font-poppins)]">
      {/* Back button */}
      <div>
        <BackButton href={basePath} label="Daftar Survey Penelitian" />
      </div>

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                isSUS
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {isSUS ? "System Usability Scale (SUS)" : "Kepuasan Pengguna"}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${
                survey.status === "published" || survey.is_active
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              {survey.status === "published" || survey.is_active ? "Aktif" : "Draft"}
            </span>
            {survey.is_active && (
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                AKTIF MOBILE
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-[#1A202C]">{survey.title}</h1>
          <p className="text-sm text-[#718096] mt-1">
            {survey.description || "Tidak ada deskripsi"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            {showPreview ? "Tutup Pratinjau" : "Pratinjau Mobile"}
          </button>

          <Link
            href={`${basePath}/${survey.id}/analytics`}
            className="px-4 py-2.5 bg-[#00695C] hover:bg-[#004D40] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-base">analytics</span>
            Analitik & Respons
          </Link>

          {!isStaff && (
            <Link
              href={`/admin/survey/${survey.id}/edit`}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">edit</span>
              Edit Survey
            </Link>
          )}
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div className="bg-[#F8FAFC] p-6 rounded-2xl border-2 border-dashed border-[#00695C] space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h3 className="font-bold text-sm text-[#00695C] flex items-center gap-2">
              <span className="material-symbols-outlined">smartphone</span>
              Pratinjau Tampilan Responden (Simulasi App Mobile)
            </h3>
            <span className="text-xs text-[#718096] bg-white px-3 py-1 rounded-full border">
              Mode Simulasi
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] max-w-lg mx-auto shadow-md space-y-6">
            <div>
              <h4 className="font-bold text-base text-[#1A202C]">{survey.title}</h4>
              <p className="text-xs text-[#718096] mt-1">{survey.description}</p>
            </div>

            {survey.questions.map((q, idx) => (
              <div key={q.id} className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-3">
                <p className="text-sm font-semibold text-[#2D3748]">
                  {idx + 1}. {q.question_text}
                </p>
                {q.description && <p className="text-xs text-[#718096]">{q.description}</p>}
                <div className="grid grid-cols-5 gap-1.5 pt-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <div
                      key={val}
                      className="p-2 border rounded-lg text-center text-xs hover:border-[#00695C] cursor-pointer bg-white transition-all hover:bg-[#E6FFFA]"
                    >
                      <div className="font-bold text-[#00695C]">{val}</div>
                      <div className="text-[9px] text-[#718096] mt-0.5 line-clamp-1">
                        {q.likert_labels[val - 1]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question List Details */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#1A202C]">
          Daftar Pertanyaan ({survey.questions.length})
        </h2>

        <div className="space-y-4">
          {survey.questions.map((q, idx) => (
            <div key={q.id} className="p-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-[#1A202C]">
                  {idx + 1}. {q.question_text}
                </h4>
                {q.is_required && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    Wajib
                  </span>
                )}
              </div>
              {q.description && <p className="text-xs text-[#718096]">{q.description}</p>}

              <div className="pt-2 flex flex-wrap gap-2">
                {q.likert_labels.map((lbl, lIdx) => (
                  <span
                    key={lIdx}
                    className="px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#4A5568]"
                  >
                    <strong className="text-[#00695C] mr-1">{lIdx + 1}:</strong> {lbl}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
