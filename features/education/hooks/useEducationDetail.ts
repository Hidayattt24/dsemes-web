"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { educationService } from "../services/educationService";
import type { EducationArticle } from "../types/education";
import { ROUTES } from "@/constants/routes";

export function useEducationDetail(articleId: string) {
  const router = useRouter();
  const [article, setArticle] = useState<EducationArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDetail = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const art = await educationService.getArticleById(articleId);
      if (art) {
        setArticle(art);
      } else {
        setError("Artikel edukasi tidak ditemukan.");
      }
    } catch {
      setError("Gagal memuat detail edukasi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [articleId]);

  const deleteArticle = async () => {
    if (!article) return;
    setIsDeleting(true);
    try {
      const success = await educationService.deleteArticle(article.id);
      if (success) {
        router.push(ROUTES.MANAJEMEN_EDUKASI);
        router.refresh();
      }
    } catch {
      setError("Gagal menghapus artikel.");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    article,
    isLoading,
    isDeleting,
    error,
    deleteArticle,
    refetch: fetchDetail,
    goBack: () => router.push(ROUTES.MANAJEMEN_EDUKASI),
    goToEdit: () => router.push(`${ROUTES.MANAJEMEN_EDUKASI}/${articleId}/edit`),
  };
}
