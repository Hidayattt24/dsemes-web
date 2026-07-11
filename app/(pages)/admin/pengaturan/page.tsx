"use client";

import { useState } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useToast } from "@/components/ui/Toast";

export default function PengaturanPage() {
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
    showToast({
      type: "success",
      title: "Berhasil",
      description: "Pengaturan berhasil diperbarui.",
    });
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsResetting(false);
    setIsResetOpen(false);
    showToast({
      type: "success",
      title: "Berhasil",
      description: "Pengaturan berhasil direset.",
    });
  };

  return (
    <section className="space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1A202C] tracking-tight">
          Pengaturan Sistem
        </h2>
        <p className="text-sm text-[#718096] mt-1">
          Kelola konfigurasi platform Digital DSMES.
        </p>
      </div>

      {/* Settings Form Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm space-y-6">
        <div className="border-b border-[#E2E8F0]/60 pb-4">
          <h3 className="text-base font-bold text-[#1E293B]">Pengaturan Umum</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
              Nama Aplikasi
            </label>
            <input
              type="text"
              defaultValue="Digital DSMES Aceh"
              className="w-full px-5 py-3.5 rounded-xl border border-[#E2E8F0] focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none text-sm font-semibold text-[#1A202C] bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
              Frekuensi Notifikasi Pasien
            </label>
            <select
              defaultValue="daily"
              className="appearance-none w-full px-5 py-3.5 rounded-xl border border-[#E2E8F0] focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none text-sm font-semibold text-[#1A202C] bg-white cursor-pointer"
            >
              <option value="daily">Setiap Hari</option>
              <option value="weekly">Setiap Minggu</option>
              <option value="disabled">Nonaktifkan</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E2E8F0]/40 flex justify-between items-center flex-wrap gap-4">
          {/* Reset Settings Button */}
          <button
            onClick={() => setIsResetOpen(true)}
            className="flex items-center gap-2 border border-amber-200 bg-[#FFFBEB] hover:bg-[#FFFBEB]/80 text-[#B45309] px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset Default</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#00695C] hover:bg-[#004f45] text-white px-8 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-xl shadow-[#00695C]/25 disabled:opacity-50"
          >
            {isSaving ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <span className="material-symbols-outlined text-[18px]">save</span>
            )}
            <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>
        </div>
      </div>

      <ConfirmationModal
        open={isResetOpen}
        title="Reset Pengaturan?"
        description="Semua perubahan yang belum disimpan akan hilang."
        variant="warning"
        confirmText="Reset"
        cancelText="Batal"
        loading={isResetting}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetOpen(false)}
      />
    </section>
  );
}
