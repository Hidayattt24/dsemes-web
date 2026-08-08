"use client";

import { useState, useEffect } from "react";
import type { Patient } from "@/types/patient";
import { Select } from "@/components/ui/Select";

interface EditPatientModalProps {
  readonly isOpen: boolean;
  readonly patient: Patient;
  readonly onClose: () => void;
  readonly onSubmit: (data: Record<string, unknown>) => Promise<void>;
}

const genderOptions = [
  { value: "laki_laki", label: "Laki-laki" },
  { value: "perempuan", label: "Perempuan" },
] as const;

export function EditPatientModal({
  isOpen,
  patient,
  onClose,
  onSubmit,
}: EditPatientModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: patient.name ?? "",
    whatsapp_number: patient.whatsapp ?? "",
    gender: patient.gender === "Laki-laki" ? "laki_laki" : "perempuan",
    date_of_birth: "",
    address: patient.address ?? "",
  });

  // Lock body scrollbar when modal opens to eliminate scrollbar track right margin gap
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto font-[family-name:var(--font-poppins)]">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-auto">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Edit Informasi Pasien (Peneliti Admin)</h3>
            <p className="text-xs text-slate-500 mt-1">Memperbarui informasi personal &amp; profil pasien</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nama Lengkap */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Pasien</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] transition-all"
                required
              />
            </div>

            {/* Nomor WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Nomor WhatsApp</label>
              <input
                type="text"
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] transition-all"
                required
              />
            </div>

            {/* Custom Select: Jenis Kelamin */}
            <div>
              <Select
                label="Jenis Kelamin"
                value={formData.gender}
                options={genderOptions}
                onChange={(val) => setFormData({ ...formData, gender: val })}
              />
            </div>

            {/* Alamat */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Lengkap</label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#00695C] hover:bg-[#004D40] text-white text-xs font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Simpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
