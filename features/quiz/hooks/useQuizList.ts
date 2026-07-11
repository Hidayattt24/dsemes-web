import { useState, useEffect, useMemo, useCallback } from "react";
import { quizService } from "../services/quizService";
import type { Quiz, QuizStats } from "../types/quiz";

interface UseQuizListReturn {
  readonly quizzes: readonly Quiz[];
  readonly stats: QuizStats | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly searchQuery: string;
  readonly filterStatus: "Semua" | "Terbit" | "Draft";
  readonly deleteId: string | null;
  readonly isDeleting: boolean;
  readonly setSearchQuery: (q: string) => void;
  readonly setFilterStatus: (status: "Semua" | "Terbit" | "Draft") => void;
  readonly setDeleteId: (id: string | null) => void;
  readonly refetch: () => Promise<void>;
  readonly handleDelete: () => Promise<void>;
}

export function useQuizList(): UseQuizListReturn {
  const [quizzes, setQuizzes] = useState<readonly Quiz[]>([]);
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Semua" | "Terbit" | "Draft">("Semua");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [list, summary] = await Promise.all([
        quizService.getQuizzes(),
        quizService.getStats(),
      ]);
      setQuizzes(list);
      setStats(summary);
    } catch {
      setError("Gagal memuat data kuesioner.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const success = await quizService.deleteQuiz(deleteId);
      if (success) {
        await fetchData();
      }
    } catch {
      setError("Gagal menghapus kuesioner.");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  }, [deleteId, fetchData]);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.linkedArticleTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "Semua" || quiz.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [quizzes, searchQuery, filterStatus]);

  return {
    quizzes: filteredQuizzes,
    stats,
    isLoading,
    error,
    searchQuery,
    filterStatus,
    deleteId,
    isDeleting,
    setSearchQuery,
    setFilterStatus,
    setDeleteId,
    refetch: fetchData,
    handleDelete,
  };
}
