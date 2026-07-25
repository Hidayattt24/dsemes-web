import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { quizService } from "../services/quizService";
import type {
  QuestionnaireType,
  QuestionnaireDifficulty,
  QuestionnaireStatus,
  QuestionCategoryItem,
  QuestionItem,
  QuestionChoice,
} from "../types/quiz";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/components/ui/Toast";

export interface FormChoice {
  id?: string;
  optionText: string;
  isCorrect: boolean;
}

export interface FormQuestion {
  id?: string;
  questionText: string;
  explanation: string;
  choices: FormChoice[];
}

export interface FormCategory {
  id?: string;
  title: string;
  description: string;
  questions: FormQuestion[];
}

export interface QuestionnaireFormFields {
  title: string;
  type: QuestionnaireType;
  description: string;
  educationId: string;
  difficulty: QuestionnaireDifficulty;
  passingScore: number;
  status: QuestionnaireStatus;
  categories: FormCategory[];
}

interface ArticleOption {
  readonly value: string;
  readonly label: string;
}

const createEmptyChoice = (label = "", isCorrect = false): FormChoice => ({
  optionText: label,
  isCorrect,
});

const createEmptyQuestion = (): FormQuestion => ({
  questionText: "",
  explanation: "",
  choices: [
    createEmptyChoice("", true),
    createEmptyChoice("", false),
    createEmptyChoice("", false),
    createEmptyChoice("", false),
  ],
});

const createEmptyCategory = (title = ""): FormCategory => ({
  title,
  description: "",
  questions: [createEmptyQuestion()],
});

export function useQuizForm(quizId?: string) {
  const router = useRouter();
  const { showToast } = useToast();

  const [fields, setFields] = useState<QuestionnaireFormFields>({
    title: "",
    type: "POST_TEST",
    description: "",
    educationId: "",
    difficulty: "Sedang",
    passingScore: 80,
    status: "Draft",
    categories: [createEmptyCategory("")],
  });

  const [articleOptions, setArticleOptions] = useState<readonly ArticleOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load published articles for dropdown
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articles = await quizService.getArticles();
        setArticleOptions(articles);
      } catch {
        showToast({
          type: "warning",
          title: "Peringatan",
          description: "Gagal memuat daftar materi edukasi.",
        });
      }
    };
    loadArticles();
  }, [showToast]);

  // Load initial data if editing
  useEffect(() => {
    if (!quizId) return;
    const loadQuiz = async () => {
      setIsLoading(true);
      try {
        const rolePrefix = typeof window !== "undefined" && window.location.pathname.startsWith("/staff") ? "staff" : "admin";
        const found = await quizService.getQuizById(quizId, rolePrefix);
        if (found) {
          const loadedCategories: FormCategory[] = (found.categories ?? []).map((cat) => ({
            id: cat.id,
            title: cat.title,
            description: cat.description ?? "",
            questions: (cat.questions ?? []).map((q) => ({
              id: q.id,
              questionText: q.questionText,
              explanation: q.explanation ?? "",
              choices: (q.choices ?? []).map((c) => ({
                id: c.id,
                optionText: c.optionText,
                isCorrect: c.isCorrect,
              })),
            })),
          }));

          setFields({
            title: found.title,
            type: found.type,
            description: found.description ?? "",
            educationId: found.educationId ?? "",
            difficulty: found.difficulty ?? "Sedang",
            passingScore: found.passingScore ?? 80,
            status: found.status,
            categories: loadedCategories.length > 0 ? loadedCategories : [createEmptyCategory()],
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

  const handleChange = useCallback((key: keyof QuestionnaireFormFields, val: unknown) => {
    setFields((prev) => {
      const updated = { ...prev, [key]: val };
      if (key === "type" && val === "PRE_TEST") {
        updated.educationId = "";
      }
      return updated;
    });
  }, []);

  // Category manipulation
  const addCategory = useCallback(() => {
    setFields((prev) => ({
      ...prev,
      categories: [...prev.categories, createEmptyCategory(`Kategori ${prev.categories.length + 1}`)],
    }));
  }, []);

  const deleteCategory = useCallback(
    (catIndex: number) => {
      setFields((prev) => {
        if (prev.categories.length <= 1) {
          showToast({
            type: "warning",
            title: "Peringatan",
            description: "Kuesioner minimal harus memiliki 1 kategori.",
          });
          return prev;
        }
        return {
          ...prev,
          categories: prev.categories.filter((_, i) => i !== catIndex),
        };
      });
    },
    [showToast]
  );

  const handleCategoryChange = useCallback((catIndex: number, field: "title" | "description", value: string) => {
    setFields((prev) => {
      const updated = [...prev.categories];
      updated[catIndex] = { ...updated[catIndex], [field]: value };
      return { ...prev, categories: updated };
    });
  }, []);

  // Question manipulation inside a Category
  const addQuestion = useCallback((catIndex: number) => {
    setFields((prev) => {
      const updated = [...prev.categories];
      const targetCat = updated[catIndex];
      updated[catIndex] = {
        ...targetCat,
        questions: [...targetCat.questions, createEmptyQuestion()],
      };
      return { ...prev, categories: updated };
    });
  }, []);

  const deleteQuestion = useCallback(
    (catIndex: number, qIndex: number) => {
      setFields((prev) => {
        const updated = [...prev.categories];
        const targetCat = updated[catIndex];
        if (targetCat.questions.length <= 1) {
          showToast({
            type: "warning",
            title: "Peringatan",
            description: "Kategori minimal harus memiliki 1 pertanyaan.",
          });
          return prev;
        }
        updated[catIndex] = {
          ...targetCat,
          questions: targetCat.questions.filter((_, i) => i !== qIndex),
        };
        return { ...prev, categories: updated };
      });
    },
    [showToast]
  );

  const handleQuestionChange = useCallback(
    (catIndex: number, qIndex: number, field: "questionText" | "explanation", value: string) => {
      setFields((prev) => {
        const updated = [...prev.categories];
        const targetCat = updated[catIndex];
        const updatedQuestions = [...targetCat.questions];
        updatedQuestions[qIndex] = {
          ...updatedQuestions[qIndex],
          [field]: value,
        };
        updated[catIndex] = { ...targetCat, questions: updatedQuestions };
        return { ...prev, categories: updated };
      });
    },
    []
  );

  // Choice manipulation inside a Question
  const addChoice = useCallback((catIndex: number, qIndex: number) => {
    setFields((prev) => {
      const updated = [...prev.categories];
      const targetCat = updated[catIndex];
      const updatedQuestions = [...targetCat.questions];
      const targetQ = updatedQuestions[qIndex];
      updatedQuestions[qIndex] = {
        ...targetQ,
        choices: [...targetQ.choices, createEmptyChoice(`Pilihan ${targetQ.choices.length + 1}`, false)],
      };
      updated[catIndex] = { ...targetCat, questions: updatedQuestions };
      return { ...prev, categories: updated };
    });
  }, []);

  const deleteChoice = useCallback(
    (catIndex: number, qIndex: number, choiceIndex: number) => {
      setFields((prev) => {
        const updated = [...prev.categories];
        const targetCat = updated[catIndex];
        const updatedQuestions = [...targetCat.questions];
        const targetQ = updatedQuestions[qIndex];
        if (targetQ.choices.length <= 2) {
          showToast({
            type: "warning",
            title: "Peringatan",
            description: "Pertanyaan minimal harus memiliki 2 pilihan jawaban.",
          });
          return prev;
        }
        updatedQuestions[qIndex] = {
          ...targetQ,
          choices: targetQ.choices.filter((_, i) => i !== choiceIndex),
        };
        updated[catIndex] = { ...targetCat, questions: updatedQuestions };
        return { ...prev, categories: updated };
      });
    },
    [showToast]
  );

  const handleChoiceChange = useCallback(
    (catIndex: number, qIndex: number, choiceIndex: number, value: string) => {
      setFields((prev) => {
        const updated = [...prev.categories];
        const targetCat = updated[catIndex];
        const updatedQuestions = [...targetCat.questions];
        const targetQ = updatedQuestions[qIndex];
        const updatedChoices = [...targetQ.choices];
        updatedChoices[choiceIndex] = {
          ...updatedChoices[choiceIndex],
          optionText: value,
        };
        updatedQuestions[qIndex] = { ...targetQ, choices: updatedChoices };
        updated[catIndex] = { ...targetCat, questions: updatedQuestions };
        return { ...prev, categories: updated };
      });
    },
    []
  );

  const setCorrectChoice = useCallback((catIndex: number, qIndex: number, choiceIndex: number) => {
    setFields((prev) => {
      const updated = [...prev.categories];
      const targetCat = updated[catIndex];
      const updatedQuestions = [...targetCat.questions];
      const targetQ = updatedQuestions[qIndex];
      const updatedChoices = targetQ.choices.map((c, i) => ({
        ...c,
        isCorrect: i === choiceIndex,
      }));
      updatedQuestions[qIndex] = { ...targetQ, choices: updatedChoices };
      updated[catIndex] = { ...targetCat, questions: updatedQuestions };
      return { ...prev, categories: updated };
    });
  }, []);

  const validate = useCallback((): boolean => {
    if (!fields.title.trim()) {
      showToast({ type: "error", title: "Validasi Gagal", description: "Judul kuesioner wajib diisi" });
      return false;
    }

    if (fields.type === "POST_TEST") {
      if (!fields.educationId) {
        showToast({ type: "error", title: "Validasi Gagal", description: "Materi edukasi terkait wajib dipilih untuk Post-Test" });
        return false;
      }
      if (fields.passingScore === undefined || fields.passingScore < 0 || fields.passingScore > 100) {
        showToast({ type: "error", title: "Validasi Gagal", description: "Nilai kelulusan harus berkisar 0-100" });
        return false;
      }
    }

    if (fields.categories.length === 0) {
      showToast({ type: "error", title: "Validasi Gagal", description: "Kuesioner wajib memiliki minimal 1 kategori" });
      return false;
    }

    for (let cIdx = 0; cIdx < fields.categories.length; cIdx++) {
      const cat = fields.categories[cIdx];
      if (!cat.title.trim()) {
        showToast({ type: "error", title: "Validasi Gagal", description: `Nama Kategori ke-${cIdx + 1} wajib diisi` });
        return false;
      }
      if (cat.questions.length === 0) {
        showToast({ type: "error", title: "Validasi Gagal", description: `Kategori "${cat.title}" wajib memiliki minimal 1 pertanyaan` });
        return false;
      }

      for (let qIdx = 0; qIdx < cat.questions.length; qIdx++) {
        const q = cat.questions[qIdx];
        if (!q.questionText.trim()) {
          showToast({ type: "error", title: "Validasi Gagal", description: `Teks pertanyaan ke-${qIdx + 1} pada kategori "${cat.title}" tidak boleh kosong` });
          return false;
        }
        if (q.choices.length < 2) {
          showToast({ type: "error", title: "Validasi Gagal", description: `Pertanyaan ke-${qIdx + 1} pada kategori "${cat.title}" minimal memiliki 2 pilihan` });
          return false;
        }
        const hasCorrect = q.choices.some((c) => c.isCorrect);
        if (!hasCorrect) {
          showToast({ type: "error", title: "Validasi Gagal", description: `Pertanyaan ke-${qIdx + 1} pada kategori "${cat.title}" belum memilih kunci jawaban yang benar` });
          return false;
        }
      }
    }

    return true;
  }, [fields, showToast]);

  const save = useCallback(
    async (targetStatus: QuestionnaireStatus = "Draft") => {
      if (!validate()) return;
      setIsSaving(true);
      try {
        const payload = {
          id: quizId,
          title: fields.title,
          type: fields.type,
          description: fields.description,
          education_id: fields.type === "POST_TEST" ? fields.educationId : null,
          passing_score: fields.type === "POST_TEST" ? fields.passingScore : null,
          difficulty: fields.type === "POST_TEST" ? fields.difficulty : null,
          status: targetStatus === "Aktif" ? "aktif" : targetStatus === "Nonaktif" ? "nonaktif" : "draft",
          categories: fields.categories.map((cat, cIdx) => ({
            title: cat.title,
            description: cat.description,
            display_order: cIdx,
            questions: cat.questions.map((q, qIdx) => ({
              question_text: q.questionText,
              explanation: q.explanation,
              display_order: qIdx,
              choices: q.choices.map((c, chIdx) => ({
                option_text: c.optionText,
                is_correct: c.isCorrect,
                display_order: chIdx,
              })),
            })),
          })),
        };

        await quizService.saveQuestionnaire(payload);

        showToast({
          type: "success",
          title: "Berhasil",
          description: `Kuesioner berhasil disimpan sebagai ${targetStatus}.`,
        });
        router.push(ROUTES.MANAJEMEN_KUISIONER);
        router.refresh();
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Gagal menyimpan kuesioner.";
        showToast({
          type: "error",
          title: "Gagal",
          description: msg,
        });
      } finally {
        setIsSaving(false);
      }
    },
    [quizId, fields, validate, router, showToast]
  );

  const cancel = useCallback(() => {
    router.push(ROUTES.MANAJEMEN_KUISIONER);
  }, [router]);

  return {
    fields,
    articleOptions,
    isLoading,
    isSaving,
    handleChange,
    addCategory,
    deleteCategory,
    handleCategoryChange,
    addQuestion,
    deleteQuestion,
    handleQuestionChange,
    addChoice,
    deleteChoice,
    handleChoiceChange,
    setCorrectChoice,
    save,
    cancel,
  };
}
