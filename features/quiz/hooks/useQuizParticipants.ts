import { useState, useEffect, useCallback, useMemo } from "react";
import { quizService } from "../services/quizService";
import type { Quiz, QuizParticipant } from "../types/quiz";

interface UseQuizParticipantsReturn {
  readonly quiz: Quiz | null;
  readonly participants: readonly QuizParticipant[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly searchQuery: string;
  readonly setSearchQuery: (q: string) => void;
  readonly refetch: () => Promise<void>;
}

export function useQuizParticipants(quizId: string): UseQuizParticipantsReturn {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [participants, setParticipants] = useState<readonly QuizParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [quizDetail, pList] = await Promise.all([
        quizService.getQuizById(quizId),
        quizService.getParticipantsByQuizId(quizId),
      ]);
      if (quizDetail) {
        setQuiz(quizDetail);
        setParticipants(pList);
      } else {
        setError("Kuesioner tidak ditemukan.");
      }
    } catch {
      setError("Gagal memuat data partisipan kuesioner.");
    } finally {
      setIsLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    if (quizId) {
      fetchData();
    }
  }, [quizId, fetchData]);

  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const query = searchQuery.toLowerCase();
      return (
        p.patientName.toLowerCase().includes(query) ||
        p.patientId.toLowerCase().includes(query) ||
        p.puskesmas.toLowerCase().includes(query)
      );
    });
  }, [participants, searchQuery]);

  return {
    quiz,
    participants: filteredParticipants,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    refetch: fetchData,
  };
}
