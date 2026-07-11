import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { quizService } from "../services/quizService";
import type { Quiz, QuizQuestion, QuizDifficulty, QuizStatus } from "../types/quiz";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/components/ui/Toast";

interface FormFields {
  readonly title: string;
  readonly linkedArticleId: string;
  readonly difficulty: QuizDifficulty;
  readonly passingScore: number;
  readonly status: QuizStatus;
  readonly questions: readonly QuizQuestion[];
}

export function useQuizForm(quizId?: string) {
  const router = useRouter();
  const { showToast } = useToast();
  const [fields, setFields] = useState<FormFields>({
    title: "",
    linkedArticleId: "",
    difficulty: "Sedang",
    passingScore: 80,
    status: "Draft",
    questions: [
      {
        id: "temp_1",
        questionText: "",
        options: { A: "", B: "", C: "", D: "" },
        correctOption: "A",
        explanation: "",
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields | "form", string>>>({});

  // Load initial data if editing
  useEffect(() => {
    if (!quizId) return;
    const loadQuiz = async () => {
      setIsLoading(true);
      try {
        const found = await quizService.getQuizById(quizId);
        if (found) {
          setFields({
            title: found.title,
            linkedArticleId: found.linkedArticleId,
            difficulty: found.difficulty,
            passingScore: found.passingScore,
            status: found.status,
            questions: found.questions,
          });
        }
      } catch {
        showToast({
          type: "error",
          title: "Gagal",
          description: "Gagal memuat kuesioner.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadQuiz();
  }, [quizId, showToast]);

  const handleChange = useCallback((key: keyof FormFields, val: any) => {
    setFields((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const handleQuestionChange = useCallback((index: number, qFields: Partial<QuizQuestion>) => {
    setFields((prev) => {
      const updated = [...prev.questions];
      updated[index] = { ...updated[index], ...qFields } as QuizQuestion;
      return { ...prev, questions: updated };
    });
  }, []);

  const handleOptionChange = useCallback((qIndex: number, optionKey: "A" | "B" | "C" | "D", value: string) => {
    setFields((prev) => {
      const updated = [...prev.questions];
      const q = updated[qIndex];
      updated[qIndex] = {
        ...q,
        options: { ...q.options, [optionKey]: value },
      };
      return { ...prev, questions: updated };
    });
  }, []);

  const addQuestion = useCallback(() => {
    setFields((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: `temp_${Date.now()}`,
          questionText: "",
          options: { A: "", B: "", C: "", D: "" },
          correctOption: "A",
          explanation: "",
        },
      ],
    }));
  }, []);

  const deleteQuestion = useCallback((index: number) => {
    setFields((prev) => {
      if (prev.questions.length <= 1) {
        showToast({
          type: "warning",
          title: "Peringatan",
          description: "Kuesioner minimal harus memiliki 1 pertanyaan.",
        });
        return prev;
      }
      const updated = prev.questions.filter((_, idx) => idx !== index);
      return { ...prev, questions: updated };
    });
  }, [showToast]);

  const duplicateQuestion = useCallback((index: number) => {
    setFields((prev) => {
      const target = prev.questions[index];
      const dup: QuizQuestion = {
        ...target,
        id: `temp_${Date.now()}`,
      };
      const updated = [...prev.questions];
      updated.splice(index + 1, 0, dup);
      return { ...prev, questions: updated };
    });
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: typeof errors = {};
    if (!fields.title.trim()) newErrors.title = "Judul kuesioner wajib diisi";
    if (!fields.linkedArticleId) newErrors.linkedArticleId = "Materi edukasi terkait wajib dipilih";
    if (fields.passingScore === undefined || fields.passingScore < 0 || fields.passingScore > 100) {
      newErrors.passingScore = "Nilai kelulusan harus berkisar 0-100";
    }
    
    // Validate each question
    fields.questions.forEach((q, idx) => {
      if (!q.questionText.trim()) {
        newErrors.form = `Teks pertanyaan ke-${idx + 1} tidak boleh kosong`;
      }
      if (!q.options.A.trim() || !q.options.B.trim()) {
        newErrors.form = `Pilihan A dan B pada pertanyaan ke-${idx + 1} wajib diisi`;
      }
    });

    setErrors(newErrors);
    if (newErrors.form) {
      showToast({ type: "error", title: "Validasi Gagal", description: newErrors.form });
    }
    return Object.keys(newErrors).length === 0;
  }, [fields, errors, showToast]);

  const save = useCallback(async (status: QuizStatus = "Draft") => {
    if (!validate()) return;
    setIsSaving(true);
    try {
      await quizService.saveQuiz({
        id: quizId,
        title: fields.title,
        linkedArticleId: fields.linkedArticleId,
        linkedArticleTitle: fields.linkedArticleId === "1"
          ? "Pengenalan Diabetes Mellitus"
          : fields.linkedArticleId === "2"
            ? "Olahraga Aman untuk Diabetisi"
            : "Panduan Nutrisi Harian", // Mock linkage
        difficulty: fields.difficulty,
        passingScore: fields.passingScore,
        status,
        questions: fields.questions,
      });

      showToast({
        type: "success",
        title: "Berhasil",
        description: `Kuesioner berhasil disimpan sebagai ${status === "Terbit" ? "Terbitan" : "Draft"}.`,
      });
      router.push(ROUTES.MANAJEMEN_KUISIONER);
      router.refresh();
    } catch {
      showToast({
        type: "error",
        title: "Gagal",
        description: "Gagal menyimpan kuesioner.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [quizId, fields, validate, router, showToast]);

  const cancel = useCallback(() => {
    router.push(ROUTES.MANAJEMEN_KUISIONER);
  }, [router]);

  return {
    fields,
    isLoading,
    isSaving,
    errors,
    handleChange,
    handleQuestionChange,
    handleOptionChange,
    addQuestion,
    deleteQuestion,
    duplicateQuestion,
    save,
    cancel,
  };
}
