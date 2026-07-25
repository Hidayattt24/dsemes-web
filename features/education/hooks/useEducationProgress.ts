"use client";

import { useState, useEffect, useCallback } from "react";
import { educationService } from "../services/educationService";
import type { EducationProgressItem, EducationProgressAnalytics } from "../types/education";

interface UseEducationProgressReturn {
  readonly progress: readonly EducationProgressItem[];
  readonly analytics: EducationProgressAnalytics | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refetch: () => void;
}

export function useEducationProgress(articleId: string): UseEducationProgressReturn {
  const [progress, setProgress] = useState<readonly EducationProgressItem[]>([]);
  const [analytics, setAnalytics] = useState<EducationProgressAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!articleId) return;
    setIsLoading(true);
    setError(null);
    try {
      const [prog, an] = await Promise.all([
        educationService.getProgress(articleId),
        educationService.getProgressAnalytics(articleId),
      ]);
      setProgress(prog);
      setAnalytics(an);
    } catch {
      setError("Gagal memuat data progress edukasi.");
    } finally {
      setIsLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    progress,
    analytics,
    isLoading,
    error,
    refetch: fetchData,
  };
}
