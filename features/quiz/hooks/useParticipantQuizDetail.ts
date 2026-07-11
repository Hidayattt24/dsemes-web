import { useState, useEffect, useCallback } from "react";
import { quizService } from "../services/quizService";
import type { ParticipantQuizDetail } from "../types/quiz";

interface UseParticipantQuizDetailReturn {
  readonly detail: ParticipantQuizDetail | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refetch: () => Promise<void>;
}

export function useParticipantQuizDetail(
  quizId: string,
  participantId: string
): UseParticipantQuizDetailReturn {
  const [detail, setDetail] = useState<ParticipantQuizDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await quizService.getParticipantDetail(quizId, participantId);
      if (data) {
        setDetail(data);
      } else {
        setError("Detail hasil kuesioner tidak ditemukan.");
      }
    } catch {
      setError("Gagal memuat detail hasil kuesioner.");
    } finally {
      setIsLoading(false);
    }
  }, [quizId, participantId]);

  useEffect(() => {
    if (quizId && participantId) {
      fetchDetail();
    }
  }, [quizId, participantId, fetchDetail]);

  return {
    detail,
    isLoading,
    error,
    refetch: fetchDetail,
  };
}
