"use client";

import { useCallback, useState } from "react";
import { useQuizList } from "../hooks/useQuizList";
import { QuizStatsCards } from "./QuizStatsCards";
import { QuizFilters } from "./QuizFilters";
import { QuizTable } from "./QuizTable";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { TableLoader } from "@/components/ui/loading";
import { useToast } from "@/components/ui/Toast";
import { quizService } from "../services/quizService";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { usePathname } from "next/navigation";

export function QuizListFeature() {
  const pathname = usePathname();
  const isStaff = pathname.startsWith("/staff");
  const {
    quizzes,
    stats,
    isLoading,
    searchQuery,
    filterType,
    filterStatus,
    sortBy,
    pagination,
    setSearchQuery,
    setFilterType,
    setFilterStatus,
    setSortBy,
    setPage,
    refetch,
  } = useQuizList();

  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const success = await quizService.deleteQuiz(deleteId);
      if (success) {
        showToast({
          type: "success",
          title: "Berhasil",
          description: "Kuesioner berhasil dihapus.",
        });
        refetch();
      }
    } catch {
      showToast({
        type: "error",
        title: "Gagal",
        description: "Gagal menghapus kuesioner.",
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  }, [deleteId, showToast, refetch]);

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-4 w-80 bg-slate-100 rounded mt-2 animate-pulse" />
          </div>
        </div>
        <TableLoader />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Page Header & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1A202C] tracking-tight">
            {isStaff ? "Pemantauan Kuesioner" : "Manajemen Kuesioner (Pre-Test & Post-Test)"}
          </h2>
          <p className="text-sm text-[#718096] mt-1">
            {isStaff
              ? "Pantau kuesioner Pre-Test / Post-Test dan progres belajar pasien"
              : "Kelola kuesioner Pre-Test & Post-Test berbasis kategori dan pantau hasil evaluasi pasien"}
          </p>
        </div>
        {!isStaff && (
          <Link
            href={`${ROUTES.MANAJEMEN_KUISIONER}/tambah`}
            className="bg-[#00695C] text-white text-sm font-bold h-12 px-6 rounded-xl flex items-center gap-2 hover:bg-[#004d43] transition-colors shadow-md shadow-[#00695C]/10 cursor-pointer active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined text-lg select-none">add</span>
            <span>Tambah Kuesioner Baru</span>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <QuizStatsCards stats={stats} />

      {/* Filter panel */}
      <QuizFilters
        searchQuery={searchQuery}
        filterType={filterType}
        filterStatus={filterStatus}
        sortBy={sortBy}
        onSearchChange={setSearchQuery}
        onTypeChange={setFilterType}
        onStatusChange={setFilterStatus}
        onSortChange={setSortBy}
      />

      {/* Data Table */}
      <QuizTable
        quizzes={quizzes}
        pagination={pagination}
        onDeleteClick={setDeleteId}
        onPageChange={setPage}
      />

      {/* Delete Confirmation Modal — admin only */}
      {!isStaff && (
        <ConfirmationModal
          open={!!deleteId}
          title="Hapus Kuesioner?"
          description="Apakah Anda yakin ingin menghapus kuesioner ini? Aksi ini tidak dapat dibatalkan."
          variant="danger"
          confirmText="Ya, Hapus"
          cancelText="Batal"
          loading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
