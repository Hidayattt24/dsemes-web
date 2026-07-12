"use client";

import { useQuizParticipants } from "../hooks/useQuizParticipants";
import { QuizSummaryStats } from "./QuizSummaryStats";
import { ParticipantTable } from "./ParticipantTable";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useRouter, usePathname } from "next/navigation";
import { quizService } from "../services/quizService";

interface QuizDetailFeatureProps {
  readonly quizId: string;
}

export function QuizDetailFeature({ quizId }: QuizDetailFeatureProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isStaff = pathname.startsWith("/staff");
  const { showToast } = useToast();
  const {
    quiz,
    participants,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    refetch,
  } = useQuizParticipants(quizId);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!quiz) return;
    setIsDeleting(true);
    try {
      const success = await quizService.deleteQuiz(quiz.id);
      if (success) {
        showToast({
          type: "success",
          title: "Berhasil",
          description: "Kuesioner berhasil dihapus.",
        });
        router.push(ROUTES.MANAJEMEN_KUISIONER);
        router.refresh();
      }
    } catch {
      showToast({
        type: "error",
        title: "Gagal",
        description: "Gagal menghapus kuesioner.",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !quiz) {
    return <ErrorState message={error ?? "Kuesioner tidak ditemukan."} onRetry={refetch} />;
  }

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <Link
            href={isStaff ? "/staff/manajemen-kuisioner" : ROUTES.MANAJEMEN_KUISIONER}
            className="flex items-center gap-2 text-[#00695C] hover:underline text-xs font-semibold mb-2"
          >
            <span className="material-symbols-outlined text-sm select-none">arrow_back</span>
            <span>Kembali ke Manajemen Kuesioner</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-[#1A202C]">Hasil Kuesioner Pasien</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#F0F9F8] text-[#00695C] border border-[#B2DFDB]/20">
              Monitoring Progres
            </span>
          </div>
          <p className="text-xs font-medium text-[#718096] mt-1">
            Lihat hasil evaluasi belajar dan tingkat kelulusan pasien
          </p>
        </div>
        {!isStaff && (
          <div className="flex gap-3 w-full sm:w-auto">
            <Link
              href={`${ROUTES.MANAJEMEN_KUISIONER}/${quiz.id}/edit`}
              className="flex-1 sm:flex-initial h-12 px-5 rounded-xl border border-[#E2E8F0] bg-white text-sm font-bold text-[#1A202C] hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-lg select-none">edit</span>
              <span>Edit Kuesioner</span>
            </Link>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="flex-1 sm:flex-initial h-12 px-5 rounded-xl bg-red-50 text-red-600 text-sm font-bold border border-red-100 hover:bg-red-100/60 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-lg select-none">delete</span>
              <span>Hapus</span>
            </button>
          </div>
        )}
      </div>

      {/* Summary Stat Cards */}
      <QuizSummaryStats quiz={quiz} />

      {/* Participant Table */}
      <ParticipantTable
        quizId={quizId}
        participants={participants}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteOpen}
        title="Hapus Kuesioner?"
        description="Apakah Anda yakin ingin menghapus kuesioner ini? Tindakan ini akan menghapus semua riwayat dan progres belajar partisipan."
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}
