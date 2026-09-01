"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { administratorService } from "../services/administratorService";
import { useToast } from "@/components/ui/Toast";

export interface FormFields {
  readonly fullName: string;
  readonly username: string;
  readonly email: string;
  readonly whatsappNumber: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly role: "admin" | "staff";
  readonly positionTitle: string;
  readonly shortBio: string;
  readonly healthFacilityId: string;
}

export function useAdministratorForm(adminId?: string) {
  const router = useRouter();
  const { showToast } = useToast();
  const [fields, setFields] = useState<FormFields>({
    fullName: "",
    username: "",
    email: "",
    whatsappNumber: "",
    password: "",
    confirmPassword: "",
    role: "staff",
    positionTitle: "",
    shortBio: "",
    healthFacilityId: "",
  });

  const [isLoading, setIsLoading] = useState(!!adminId);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});

  useEffect(() => {
    if (!adminId) return;

    const loadAdmin = async () => {
      setIsLoading(true);
      try {
        const found = await administratorService.getById(adminId);
        if (found) {
          setFields({
            fullName: found.fullName,
            username: found.username,
            email: found.email,
            whatsappNumber: found.whatsappNumber,
            password: "",
            confirmPassword: "",
            role: found.role,
            positionTitle: found.positionTitle,
            shortBio: found.shortBio,
            healthFacilityId: found.healthFacilityId ?? "",
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

  const handleChange = (key: keyof FormFields, val: string) => {
    setFields((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormFields, string>> = {};

    if (!fields.fullName.trim()) newErrors.fullName = "Nama lengkap wajib diisi.";
    if (!fields.username.trim()) newErrors.username = "Username wajib diisi.";
    if (!fields.email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!adminId) {
      if (!fields.password) {
        newErrors.password = "Password wajib diisi.";
      } else if (fields.password.length < 6) {
        newErrors.password = "Password minimal 6 karakter.";
      }

      if (fields.password !== fields.confirmPassword) {
        newErrors.confirmPassword = "Konfirmasi password tidak cocok.";
      }
    } else {
      if (fields.password && fields.password.length < 6) {
        newErrors.password = "Password minimal 6 karakter.";
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
      if (adminId) {
        await administratorService.update(adminId, {
          full_name: fields.fullName,
          username: fields.username,
          email: fields.email,
          whatsapp_number: fields.whatsappNumber,
          position_title: fields.positionTitle || undefined,
          short_bio: fields.shortBio || undefined,
          health_facility_id: fields.healthFacilityId || undefined,
        });
        showToast({
          type: "success",
          title: "Berhasil",
          description: "Staff Monitoring berhasil diperbarui.",
        });
      } else {
        await administratorService.create({
          full_name: fields.fullName,
          username: fields.username,
          email: fields.email,
          password: fields.password,
          whatsapp_number: fields.whatsappNumber,
          role: fields.role,
          position_title: fields.positionTitle || undefined,
          short_bio: fields.shortBio || undefined,
          health_facility_id: fields.healthFacilityId || undefined,
        });
        showToast({
          type: "success",
          title: "Berhasil",
          description: "Staff Monitoring berhasil ditambahkan.",
        });
      }
      router.push("/admin/administrator");
      router.refresh();
    } catch {
      showToast({
        type: "error",
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan data.",
      });
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
    save,
    cancel: () => router.push("/admin/administrator"),
  };
}
