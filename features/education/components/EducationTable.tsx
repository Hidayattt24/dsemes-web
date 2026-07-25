"use client";

import { useState } from "react";
import Link from "next/link";
import { DataTable, type TableColumn } from "@/components/common/DataTable";
import { Badge } from "@/components/ui/Badge";
import type { EducationArticle } from "../types/education";
import { ROUTES } from "@/constants/routes";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useToast } from "@/components/ui/Toast";

interface EducationTableProps {
  readonly articles: readonly EducationArticle[];
  readonly loading: boolean;
  readonly onDelete: (id: string) => void;
}

export function EducationTable({ articles, loading, onDelete }: EducationTableProps) {
  const [deleteArticleInfo, setDeleteArticleInfo] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const handleConfirmDelete = async () => {
    if (!deleteArticleInfo) return;
    setIsDeleting(true);
    try {
      await onDelete(deleteArticleInfo.id);
      showToast({
        type: "success",
        title: "Berhasil",
        description: "Materi edukasi berhasil dihapus.",
      });
    } catch {
      showToast({
        type: "error",
        title: "Gagal",
        description: "Gagal menghapus materi edukasi.",
      });
    } finally {
      setIsDeleting(false);
      setDeleteArticleInfo(null);
    }
  };

  const columns: TableColumn<EducationArticle>[] = [
    {
      key: "thumbnail",
      header: "Thumbnail",
      render: (row) => (
        <div className="w-16 h-12 rounded-lg overflow-hidden bg-[#F4F6F8] border border-[#E2E8F0] relative">
          {row.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.thumbnail}
              alt={row.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F0F9F8] text-[#00695C] text-xs font-bold font-[family-name:var(--font-poppins)]">
              DSMES
            </div>
          )}
        </div>
      ),
      className: "w-24",
    },
    {
      key: "title",
      header: "Judul Edukasi",
      render: (row) => (
        <div className="max-w-md">
          <Link
            href={`${ROUTES.MANAJEMEN_EDUKASI}/${row.id}`}
            className="font-bold text-[#1A202C] hover:text-[#0F766E] transition-all text-sm block truncate font-[family-name:var(--font-poppins)]"
          >
            {row.title}
          </Link>
          <span className="text-xs text-[#718096] font-medium block mt-1 font-[family-name:var(--font-poppins)]">
            {row.shortDescription}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Kategori",
      render: (row) => (
        <span className="text-xs font-semibold text-[#1A202C] font-[family-name:var(--font-poppins)]">
          {row.category}
        </span>
      ),
      className: "w-44",
    },
    {
      key: "duration",
      header: "Durasi",
      render: (row) => (
        <span className="text-xs font-semibold text-[#718096] font-[family-name:var(--font-poppins)]">
          {row.duration} mnt
        </span>
      ),
      className: "w-24",
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "Diterbitkan" ? "primary" : "muted"}>
          {row.status}
        </Badge>
      ),
      className: "w-32",
    },
    {
      key: "readCount",
      header: "Pembaca",
      render: (row) => (
        <span className="text-xs font-bold text-[#1A202C] font-[family-name:var(--font-poppins)]">
          {row.readCount.toLocaleString("id-ID")}
        </span>
      ),
      className: "w-28",
    },
    {
      key: "actions",
      header: "Aksi",
      render: (row) => (
        <div className="flex items-center gap-2">
          {/* Progress Link */}
          <Link
            href={`${ROUTES.MANAJEMEN_EDUKASI}/${row.id}/progress`}
            className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#E2E8F0] rounded-lg hover:bg-[#F0F9F8] hover:border-[#00695C]/30 transition-all text-[#718096] hover:text-[#00695C] text-xs font-bold"
            title="Lihat Progress Peserta"
          >
            <span className="material-symbols-outlined text-[16px]">monitoring</span>
            Progress
          </Link>
          {/* Detail Link */}
          <Link
            href={`${ROUTES.MANAJEMEN_EDUKASI}/${row.id}`}
            className="w-8 h-8 flex items-center justify-center border border-[#E2E8F0] rounded-lg hover:bg-[#F4F6F8] transition-all text-[#718096] hover:text-[#0F766E]"
            title="Lihat Detail"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </Link>
          {/* Edit Link */}
          <Link
            href={`${ROUTES.MANAJEMEN_EDUKASI}/${row.id}/edit`}
            className="w-8 h-8 flex items-center justify-center border border-[#E2E8F0] rounded-lg hover:bg-[#F4F6F8] transition-all text-[#718096] hover:text-[#0F766E]"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </Link>
          {/* Delete Button */}
          <button
            onClick={() => setDeleteArticleInfo({ id: row.id, title: row.title })}
            className="w-8 h-8 flex items-center justify-center border border-red-100 rounded-lg hover:bg-red-50 transition-all text-red-500 hover:text-red-700 cursor-pointer"
            title="Hapus"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      ),
      className: "w-36 text-center",
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={[...articles]}
        keyExtract={(row) => row.id}
        loading={loading}
        emptyTitle="Tidak ada artikel"
        emptyMessage="Belum ada artikel edukasi yang terdaftar."
      />

      <ConfirmationModal
        open={deleteArticleInfo !== null}
        title="Hapus Materi Edukasi?"
        description="Materi yang dihapus tidak dapat dikembalikan."
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteArticleInfo(null)}
      />
    </>
  );
}
