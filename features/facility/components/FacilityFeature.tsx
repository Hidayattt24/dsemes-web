"use client";

import { useState } from "react";
import { useFacility } from "../hooks/useFacility";
import type { HealthFacility } from "@/types/facility";
import { DataTable, type TableColumn } from "@/components/common/DataTable";
import { Badge } from "@/components/ui/Badge";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useToast } from "@/components/ui/Toast";

export function FacilityFeature() {
  const {
    facilities,
    isLoading,
    searchQuery,
    setSearchQuery,
    createFacility,
    updateFacility,
    removeFacility,
  } = useFacility();

  const { showToast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<HealthFacility | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setAddress("");
    setIsFormOpen(true);
  };

  const openEdit = (facility: HealthFacility) => {
    setEditing(facility);
    setName(facility.name);
    setAddress(facility.address);
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      showToast({ type: "error", title: "Gagal", description: "Nama puskesmas wajib diisi." });
      return;
    }
    setIsSaving(true);
    try {
      const payload = { name: name.trim(), address: address.trim() || undefined };
      if (editing) {
        await updateFacility(editing.id, payload);
        showToast({ type: "success", title: "Berhasil", description: "Puskesmas berhasil diperbarui." });
      } else {
        await createFacility(payload);
        showToast({ type: "success", title: "Berhasil", description: "Puskesmas berhasil ditambahkan." });
      }
      setIsFormOpen(false);
    } catch {
      showToast({ type: "error", title: "Gagal", description: "Terjadi kesalahan saat menyimpan data." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await removeFacility(deleteId);
      showToast({ type: "success", title: "Berhasil", description: "Puskesmas berhasil dihapus." });
    } catch {
      showToast({ type: "error", title: "Gagal", description: "Gagal menghapus puskesmas." });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const columns: TableColumn<HealthFacility>[] = [
    {
      key: "name",
      header: "Nama Puskesmas",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#F0F9F8] rounded-full flex items-center justify-center text-[#00695C]">
            <span className="material-symbols-outlined text-[18px]">local_hospital</span>
          </div>
          <span className="text-sm font-semibold text-[#1A202C] font-[family-name:var(--font-poppins)]">
            {row.name}
          </span>
        </div>
      ),
    },
    {
      key: "address",
      header: "Alamat",
      render: (row) => (
        <span className="text-sm text-[#1A202C] font-medium font-[family-name:var(--font-poppins)]">
          {row.address || "-"}
        </span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (row) => (
        <Badge variant={row.isActive ? "primary" : "muted"}>
          {row.isActive ? "Aktif" : "Nonaktif"}
        </Badge>
      ),
      className: "w-32",
    },
    {
      key: "createdAt",
      header: "Tanggal Dibuat",
      render: (row) => (
        <span className="text-xs text-[#718096] font-medium font-[family-name:var(--font-poppins)]">
          {row.createdAt}
        </span>
      ),
      className: "w-36",
    },
    {
      key: "actions",
      header: "Aksi",
      render: (row) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => openEdit(row)}
            className="w-8 h-8 flex items-center justify-center border border-[#E2E8F0] rounded-lg hover:bg-[#F4F6F8] transition-all text-[#718096] hover:text-[#00695C] cursor-pointer"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="w-8 h-8 flex items-center justify-center border border-red-100 rounded-lg hover:bg-red-50 transition-all text-red-500 hover:text-red-700 cursor-pointer"
            title="Hapus"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      ),
      className: "w-28 text-right",
    },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1A202C] tracking-tight font-[family-name:var(--font-poppins)]">
            Data Puskesmas
          </h2>
          <p className="text-sm text-[#718096] mt-1 font-[family-name:var(--font-poppins)]">
            Kelola daftar puskesmas (health facility) untuk pengelompokan data pasien dan staff.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#00695C] hover:bg-[#004f45] text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#00695C]/10 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Tambah Puskesmas</span>
        </button>
      </div>

      <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl border border-[#E2E8F0] w-full sm:w-96 focus-within:border-[#00695C] transition-all">
        <span className="material-symbols-outlined text-[#718096] text-xl">search</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama puskesmas..."
          className="bg-transparent border-none text-sm font-medium w-full placeholder:text-[#718096] text-[#1A202C] outline-none font-[family-name:var(--font-poppins)] focus:ring-0"
        />
      </div>

      <div className="premium-card overflow-hidden">
        <DataTable
          columns={columns}
          data={facilities}
          keyExtract={(row) => row.id}
          loading={isLoading}
          emptyTitle="Belum ada puskesmas"
          emptyMessage="Tambahkan puskesmas untuk mulai mengelompokkan data."
        />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsFormOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1E293B] font-[family-name:var(--font-poppins)]">
                {editing ? "Edit Puskesmas" : "Tambah Puskesmas"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-[#718096] hover:text-[#1A202C] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  Nama Puskesmas <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ulee Kareng"
                  className="w-full px-5 py-3.5 rounded-xl border border-[#E2E8F0] focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all text-sm font-medium font-[family-name:var(--font-poppins)] text-[#1E293B]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  Alamat
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Alamat puskesmas (opsional)"
                  className="w-full px-5 py-3.5 rounded-xl border border-[#E2E8F0] focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] outline-none transition-all text-sm font-medium font-[family-name:var(--font-poppins)] text-[#1E293B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2.5 rounded-full border border-[#E2E8F0] text-[#1E293B] text-sm font-semibold hover:bg-[#F1F5F9] transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-2.5 rounded-full bg-[#00695C] text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        open={deleteId !== null}
        title="Hapus Puskesmas?"
        description="Apakah Anda yakin ingin menghapus puskesmas ini?"
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
