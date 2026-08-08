"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const rolePrefix: 'admin' | 'staff' = pathname.startsWith("/admin") ? "admin" : "staff";

  const [detail, setDetail] = useState<ParticipantQuizDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await quizService.getParticipantDetail(quizId, participantId, rolePrefix);
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
  }, [quizId, participantId, rolePrefix]);

  useEffect(() => {
    if (quizId && participantId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
