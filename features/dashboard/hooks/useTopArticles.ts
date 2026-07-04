"use client";

import { useEffect, useState } from "react";
import { dashboardService }    from "@/services/dashboardService";
import type { TopArticle }     from "@/types/dashboard";

interface UseTopArticlesReturn {
  readonly articles:  TopArticle[];
  readonly isLoading: boolean;
  readonly error:     string | null;
}

export function useTopArticles(): UseTopArticlesReturn {
  const [articles, setArticles]   = useState<TopArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    dashboardService
      .getTopArticles()
      .then((result) => { if (mounted) setArticles(result); })
      .catch(() => { if (mounted) setError("Gagal memuat artikel."); })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  return { articles, isLoading, error };
}
