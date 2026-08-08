import { useState, useEffect, useCallback } from "react";
import { quizService } from "../services/quizService";
import type { Quiz } from "../types/quiz";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface UseQuizDetailReturn {
  readonly quiz: Quiz | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly isDeleting: boolean;
  readonly refetch: () => Promise<void>;
  readonly deleteQuiz: () => Promise<boolean>;
  readonly goBack: () => void;
  readonly goToEdit: () => void;
}

export function useQuizDetail(quizId: string): UseQuizDetailReturn {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await quizService.getQuizById(quizId);
      if (data) {
        setQuiz(data);
      } else {
        setError("Kuesioner tidak ditemukan.");
      }
    } catch {
      setError("Gagal memuat detail kuesioner.");
    } finally {
      setIsLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    if (quizId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchDetail();
    }
  }, [quizId, fetchDetail]);

  const deleteQuiz = useCallback(async (): Promise<boolean> => {
    if (!quiz) return false;
    setIsDeleting(true);
    try {
      const success = await quizService.deleteQuiz(quiz.id);
      if (success) {
        router.push(ROUTES.MANAJEMEN_KUISIONER);
        router.refresh();
        return true;
      }
      return false;
    } catch {
      setError("Gagal menghapus kuesioner.");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [quiz, router]);

  const goBack = useCallback(() => {
    router.push(ROUTES.MANAJEMEN_KUISIONER);
  }, [router]);

  const goToEdit = useCallback(() => {
    router.push(`${ROUTES.MANAJEMEN_KUISIONER}/${quizId}/edit`);
  }, [router, quizId]);

  return {
    quiz,
    isLoading,
    error,
    isDeleting,
    refetch: fetchDetail,
    deleteQuiz,
    goBack,
    goToEdit,
  };
}
