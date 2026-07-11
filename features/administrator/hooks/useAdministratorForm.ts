"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { administratorService } from "../services/administratorService";
import type { Administrator } from "../types/administrator";
import { useToast } from "@/components/ui/Toast";

interface FormFields {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly whatsapp: string;
  readonly password?: string;
  readonly confirmPassword?: string;
  readonly role: "Monitoring Staff";
  readonly status: "Aktif" | "Nonaktif";
  readonly permissions: string[];
  readonly notes?: string;
}

export function useAdministratorForm(adminId?: string) {
  const router = useRouter();
  const { showToast } = useToast();
  const [fields, setFields] = useState<FormFields>({
    name: "",
    username: "",
    email: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
    role: "Monitoring Staff",
    status: "Aktif",
    permissions: ["baca_pasien"],
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(!!adminId);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});

  useEffect(() => {
    if (!adminId) return;

    const loadAdmin = async () => {
      setIsLoading(true);
      try {
        const list = await administratorService.getAdministrators();
        const found = list.find((a) => a.id === adminId);
        if (found) {
          setFields({
            name: found.name,
            username: found.username,
            email: found.email,
            whatsapp: found.whatsapp,
            password: "",
            confirmPassword: "",
            role: found.role,
            status: found.status,
            permissions: ["baca_pasien", "edit_pasien"],
            notes: found.notes ?? "",
          });
        }
      } catch {
        // Error handling
      } finally {
        setIsLoading(false);
      }
    };

    loadAdmin();
  }, [adminId]);

  const handleChange = (key: keyof FormFields, val: any) => {
    setFields((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleTogglePermission = (permission: string) => {
    setFields((prev) => {
      const current = prev.permissions;
      const next = current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission];
      return { ...prev, permissions: next };
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormFields, string>> = {};

    if (!fields.name.trim()) newErrors.name = "Nama lengkap wajib diisi.";
    if (!fields.username.trim()) newErrors.username = "Username wajib diisi.";
    if (!fields.email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!adminId) {
      if (!fields.password) {
        newErrors.password = "Password wajib diisi.";
      } else if (fields.password.length < 8) {
        newErrors.password = "Password minimal 8 karakter.";
      }

      if (fields.password !== fields.confirmPassword) {
        newErrors.confirmPassword = "Konfirmasi password tidak cocok.";
      }
    } else {
      if (fields.password && fields.password.length < 8) {
        newErrors.password = "Password minimal 8 karakter.";
      }
      if (fields.password && fields.password !== fields.confirmPassword) {
        newErrors.confirmPassword = "Konfirmasi password tidak cocok.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = async () => {
    if (!validate()) return;

    setIsSaving(true);
    try {
      const payload: Partial<Administrator> & { id?: string } = {
        name: fields.name,
        username: fields.username,
        email: fields.email,
        whatsapp: fields.whatsapp,
        role: fields.role,
        status: fields.status,
        notes: fields.notes,
      };

      if (adminId) {
        payload.id = adminId;
      }

      await administratorService.saveAdministrator(payload);
      showToast({
        type: "success",
        title: "Berhasil",
        description: adminId ? "Staff Monitoring berhasil diperbarui." : "Staff Monitoring berhasil ditambahkan.",
      });
      router.push("/admin/administrator");
      router.refresh();
    } catch {
      // Error handling
    } finally {
      setIsSaving(false);
    }
  };

  return {
    fields,
    isLoading,
    isSaving,
    errors,
    handleChange,
    handleTogglePermission,
    save,
    cancel: () => router.push("/admin/administrator"),
  };
}
