"use client";

import { useState } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useToast } from "@/components/ui/Toast";

export default function PemantauanCatatanPasienPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsDeleting(false);
    setIsOpen(false);
    showToast({
      type: "success",
      title: "Berhasil",
      description: "Catatan pasien berhasil dihapus.",
    });
  };

  return (
    <section className="space-y-8 max-w-[1600px] mx-auto w-full">
      <div>
        <h2 className="text-2xl font-bold text-[#1A202C] tracking-tight font-[family-name:var(--font-poppins)]">
          Pemantauan Catatan Pasien
        </h2>
        <p className="text-sm text-[#718096] mt-1 font-[family-name:var(--font-poppins)]">
          Daftar dan analisis pemantauan catatan harian pasien DSMES Aceh.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-6">
          <div>
            <p className="text-lg font-semibold text-[#1A202C] font-[family-name:var(--font-poppins)]">
              Coming Soon
            </p>
            <p className="text-sm text-[#718096] mt-1 font-[family-name:var(--font-poppins)]">
              Halaman ini sedang dalam pengembangan.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Demo Interaktif</p>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-[#FFF5F5] border border-[#FEB2B2] text-[#C53030] hover:bg-[#FFF5F5]/80 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shadow-red-100"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>Simulasikan Hapus Catatan</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={isOpen}
        title="Hapus Catatan Pasien?"
        description="Apakah Anda yakin ingin menghapus catatan pasien ini?"
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsOpen(false)}
      />
    </section>
  );
}
