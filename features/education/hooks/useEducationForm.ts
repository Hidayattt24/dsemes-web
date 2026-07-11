"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { educationService } from "../services/educationService";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/components/ui/Toast";

interface FormFields {
  readonly title: string;
  readonly category: string;
  readonly shortDescription: string;
  readonly content: string;
  readonly youtubeLink: string;
  readonly duration: number;
  readonly status: "Diterbitkan" | "Draf";
  readonly thumbnail: string;
}

export function useEducationForm(articleId?: string) {
  const router = useRouter();
  const { showToast } = useToast();
  const [fields, setFields] = useState<FormFields>({
    title: "",
    category: "Nutrisi & Makanan",
    shortDescription: "",
    content: "",
    youtubeLink: "",
    duration: 5,
    status: "Draf",
    thumbnail: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});

  useEffect(() => {
    if (!articleId) return;

    const loadArticle = async () => {
      setIsLoading(true);
      try {
        const art = await educationService.getArticleById(articleId);
        if (art) {
          setFields({
            title: art.title,
            category: art.category,
            shortDescription: art.shortDescription,
            content: art.content,
            youtubeLink: art.youtubeLink ?? "",
            duration: art.duration,
            status: art.status,
            thumbnail: art.thumbnail,
          });
        }
      } catch {
        // Handle error if needed
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  const handleChange = (key: keyof FormFields, val: string | number) => {
    setFields((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormFields, string>> = {};
    if (!fields.title.trim()) newErrors.title = "Judul edukasi wajib diisi.";
    if (!fields.shortDescription.trim()) newErrors.shortDescription = "Deskripsi singkat wajib diisi.";
    if (!fields.content.trim()) newErrors.content = "Konten edukasi wajib diisi.";
    if (fields.duration <= 0) newErrors.duration = "Durasi membaca harus lebih dari 0 menit.";
    if (!fields.thumbnail.trim()) newErrors.thumbnail = "Thumbnail artikel wajib diunggah.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = async (forcedStatus?: "Diterbitkan" | "Draf") => {
    if (!validate()) return;

    setIsSaving(true);
    try {
      await educationService.saveArticle({
        id: articleId,
        ...fields,
        status: forcedStatus ?? fields.status,
      });
      showToast({
        type: "success",
        title: "Berhasil",
        description: articleId ? "Materi edukasi berhasil diperbarui." : "Materi edukasi berhasil ditambahkan.",
      });
      router.push(ROUTES.MANAJEMEN_EDUKASI);
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
    save,
    cancel: () => router.push(ROUTES.MANAJEMEN_EDUKASI),
  };
}
