"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { quizService } from "../services/quizService";
import type { Quiz, QuizStats, PaginationMeta, QuizSortBy } from "../types/quiz";

interface UseQuizListReturn {
  readonly quizzes: readonly Quiz[];
  readonly stats: QuizStats | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly searchQuery: string;
  readonly filterStatus: "Semua" | "Terbit" | "Draft";
  readonly sortBy: QuizSortBy;
  readonly pagination: PaginationMeta;
  readonly rolePrefix: 'admin' | 'staff';
  readonly setSearchQuery: (q: string) => void;
  readonly setFilterStatus: (status: "Semua" | "Terbit" | "Draft") => void;
  readonly setSortBy: (sort: QuizSortBy) => void;
  readonly setPage: (p: number) => void;
  readonly refetch: () => Promise<void>;
}

export function useQuizList(): UseQuizListReturn {
  const pathname = usePathname();
  const rolePrefix: 'admin' | 'staff' = pathname.startsWith("/admin") ? "admin" : "staff";

  const [quizzes, setQuizzes] = useState<readonly Quiz[]>([]);
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>({ page: 1, per_page: 10, total: 0, total_pages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Semua" | "Terbit" | "Draft">("Semua");
  const [sortBy, setSortBy] = useState<QuizSortBy>("newest");
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 10,
        search: searchQuery || undefined,
        status: filterStatus !== "Semua" ? filterStatus : undefined,
        sort_by: sortBy,
        sort_order: (sortBy === "title" ? "asc" : "desc") as "asc" | "desc",
      };
      const [result, summary] = await Promise.all([
        quizService.getQuizzes(params, rolePrefix),
        quizService.getStats(rolePrefix),
      ]);
      setQuizzes(result.items);
      setPagination(result.pagination);
      setStats(summary);
    } catch {
      setError("Gagal memuat data kuesioner.");
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery, filterStatus, sortBy, rolePrefix]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSetSearchQuery = useCallback((q: string) => {
    setSearchQuery(q);
    setPage(1);
  }, []);

  const handleSetFilterStatus = useCallback((status: "Semua" | "Terbit" | "Draft") => {
    setFilterStatus(status);
    setPage(1);
  }, []);

  const handleSetSortBy = useCallback((sort: QuizSortBy) => {
    setSortBy(sort);
    setPage(1);
  }, []);

  return {
    quizzes,
    stats,
    isLoading,
    error,
    searchQuery,
    filterStatus,
    sortBy,
    pagination,
    rolePrefix,
    setSearchQuery: handleSetSearchQuery,
    setFilterStatus: handleSetFilterStatus,
    setSortBy: handleSetSortBy,
    setPage,
    refetch: fetchData,
  };
}
