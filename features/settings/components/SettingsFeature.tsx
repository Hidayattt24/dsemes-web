"use client";

import { useState } from "react";
import { useSettingsForm } from "../hooks/useSettingsForm";
import { ProfilePhotoCard } from "./ProfilePhotoCard";
import { AccountInfoForm } from "./AccountInfoForm";
import { AccountSecurityForm } from "./AccountSecurityForm";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";

export function SettingsFeature() {
  const {
    fields,
    isLoading,
    isSaving,
    isFormDirty,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    handleChange,
    handleBatal,
    handleSave,
    handlePasswordChange,
  } = useSettingsForm();

  const { showToast } = useToast();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleBatalClick = () => {
    if (isFormDirty) {
      setIsCancelModalOpen(true);
    } else {
      showToast({
        type: "info",
        title: "Informasi",
        description: "Tidak ada perubahan untuk dibatalkan.",
      });
    }
  };

  const handleConfirmCancel = () => {
    handleBatal();
    setIsCancelModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Header / Action Toolbar Section */}
      <div className="flex justify-between items-end pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C] tracking-tight">Pengaturan Sistem</h1>
          <p className="text-[#718096] mt-1 text-sm">Kelola profil, keamanan, dan preferensi akun Anda.</p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleBatalClick}
            className="px-6 py-2.5 rounded-xl font-semibold text-[#718096] hover:text-[#1A202C] transition-colors border border-transparent cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#00695C] text-white px-8 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-md shadow-[#00695C]/10 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <span className="material-symbols-outlined text-xl select-none">save</span>
            )}
            <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>
        </div>
      </div>

      {/* Main Settings Form Blocks */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-8"
      >
        {/* Profile Photo Card */}
        <ProfilePhotoCard
          profilePhoto={fields.profilePhoto}
          name={fields.name}
          onChangePhoto={(photo) => handleChange("profilePhoto", photo)}
          onDeletePhoto={() => handleChange("profilePhoto", "")}
        />

        {/* Account Info Form Card */}
        <AccountInfoForm fields={fields} onChange={handleChange} />

        {/* Account Security Form Card */}
        <AccountSecurityForm
          isSaving={isSaving}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmNewPassword={confirmNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          onSubmitPassword={handlePasswordChange}
        />
      </form>

      {/* Cancel Warning Confirmation Dialog */}
      <ConfirmationModal
        open={isCancelModalOpen}
        title="Batalkan Perubahan?"
        description="Perubahan yang belum disimpan akan hilang."
        variant="warning"
        confirmText="Ya, Batalkan"
        cancelText="Lanjut Mengedit"
        onConfirm={handleConfirmCancel}
        onCancel={() => setIsCancelModalOpen(false)}
      />
    </div>
  );
}
