import type {
  Quiz,
  QuizStats,
  QuizParticipant,
  ParticipantQuizDetail,
  ParticipantQuestionAnalysis,
  PaginationMeta,
  QuizListParams,
} from "../types/quiz";
import { axiosInstance } from "@/lib/axios";

// ── Types matching the backend response ──────────────────────────────────────

interface ApiQuizResponse {
  readonly id: string;
  readonly title: string;
  readonly linked_article_id: string;
  readonly linked_article_title: string;
  readonly difficulty: string;
  readonly passing_score: number;
  readonly status: string;
  readonly question_count: number;
  readonly participant_count: number;
  readonly average_score: number | null;
  readonly created_by: string;
  readonly created_at: string;
  readonly updated_at: string;
}

interface ApiQuizDetailResponse extends ApiQuizResponse {
  readonly questions: readonly {
    readonly id: string;
    readonly question_text: string;
    readonly option_a: string;
    readonly option_b: string;
    readonly option_c: string;
    readonly option_d: string;
    readonly correct_option: "A" | "B" | "C" | "D";
    readonly explanation?: string;
  }[];
}

interface ApiParticipantResponse {
  readonly id: string;
  readonly patient_id: string;
  readonly patient_name: string;
  readonly patient_avatar?: string;
  readonly puskesmas: string;
  readonly completion_date: string;
  readonly score: number;
  readonly passed: boolean;
  readonly duration: string;
}

interface ApiParticipantDetailResponse {
  readonly participant: ApiParticipantResponse;
  readonly quiz_title: string;
  readonly question_analysis: readonly {
    readonly id: string;
    readonly question_number: number;
    readonly question_text: string;
    readonly patient_answer: string;
    readonly correct_answer: string;
    readonly is_correct: boolean;
    readonly explanation?: string;
  }[];
}

interface ApiQuizStats {
  readonly total_quizzes: number;
  readonly published_quizzes: number;
  readonly draft_quizzes: number;
  readonly total_attempts: number;
  readonly average_score: number;
}

// ── Mapper functions ─────────────────────────────────────────────────────────

function mapQuizFromApi(api: ApiQuizDetailResponse): Quiz {
  return {
    id: api.id,
    title: api.title,
    linkedArticleId: api.linked_article_id,
    linkedArticleTitle: api.linked_article_title,
    difficulty: api.difficulty as Quiz["difficulty"],
    passingScore: api.passing_score,
    status: api.status as Quiz["status"],
    questions: (api.questions ?? []).map((q) => ({
      id: q.id,
      questionText: q.question_text,
      options: {
        A: q.option_a,
        B: q.option_b,
        C: q.option_c,
        D: q.option_d,
      },
      correctOption: q.correct_option,
      explanation: q.explanation,
    })),
    participantCount: api.participant_count,
    averageScore: api.average_score,
    createdBy: api.created_by ?? "-",
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  };
}

function mapQuizListItemFromApi(api: ApiQuizResponse): Quiz {
  return {
    id: api.id,
    title: api.title,
    linkedArticleId: api.linked_article_id,
    linkedArticleTitle: api.linked_article_title,
    difficulty: api.difficulty as Quiz["difficulty"],
    passingScore: api.passing_score,
    status: api.status as Quiz["status"],
    // For list view, questions array length comes from question_count
    questions: Array.from({ length: api.question_count ?? 0 }, (_, i) => ({
      id: `placeholder_${i}`,
      questionText: "",
      options: { A: "", B: "", C: "", D: "" },
      correctOption: "A" as const,
    })),
    participantCount: api.participant_count,
    averageScore: api.average_score,
    createdBy: api.created_by ?? "-",
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  };
}

function mapParticipantFromApi(api: ApiParticipantResponse): QuizParticipant {
  const date = new Date(api.completion_date);
  const formatted = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return {
    id: api.id,
    patientId: api.patient_id,
    patientName: api.patient_name,
    patientAvatar: api.patient_avatar,
    puskesmas: api.puskesmas ?? "-",
    completionDate: formatted,
    score: api.score,
    passed: api.passed,
    duration: api.duration,
  };
}

function mapQuestionAnalysisFromApi(
  qa: ApiParticipantDetailResponse["question_analysis"][number]
): ParticipantQuestionAnalysis {
  return {
    id: qa.id,
    questionNumber: qa.question_number,
    questionText: qa.question_text,
    patientAnswer: qa.patient_answer,
    correctAnswer: qa.correct_answer,
    isCorrect: qa.is_correct,
    explanation: qa.explanation,
  };
}

// ── Service ───────────────────────────────────────────────────────────────────

export const quizService = {
  /** Get paginated quizzes (flat list, no questions array) */
  async getQuizzes(
    params: QuizListParams = {},
    rolePrefix: 'admin' | 'staff' = 'staff'
  ): Promise<{ items: Quiz[]; pagination: PaginationMeta }> {
    const res = await axiosInstance.get(`/${rolePrefix}/quiz`, {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        search: params.search || undefined,
        status: params.status || undefined,
        sort_by: params.sort_by || undefined,
        sort_order: params.sort_order || undefined,
      },
    });
    const items: ApiQuizResponse[] = res.data.data ?? [];
    const meta = res.data?.meta ?? { page: 1, per_page: 10, total: 0, total_pages: 0 };
    return {
      items: items.map(mapQuizListItemFromApi),
      pagination: meta,
    };
  },

  /** Get single quiz by ID (includes full questions) */
  async getQuizById(id: string, rolePrefix: 'admin' | 'staff' = 'staff'): Promise<Quiz | null> {
    try {
      const res = await axiosInstance.get(`/${rolePrefix}/quiz/${id}`);
      const data: ApiQuizDetailResponse = res.data.data;
      return mapQuizFromApi(data);
    } catch {
      return null;
    }
  },

  /** Save (Create or Update) quiz */
  async saveQuiz(
    quiz: Partial<Quiz> & { id?: string }
  ): Promise<Quiz> {
    const statusNormalized =
      quiz.status === "Terbit" ? "Terbit" : "Draft";

    const payload = {
      title: quiz.title ?? "",
      linked_article_id: quiz.linkedArticleId ?? "",
      difficulty: quiz.difficulty ?? "Sedang",
      passing_score: quiz.passingScore ?? 80,
      status: statusNormalized,
      questions: (quiz.questions ?? []).map((q) => ({
        question_text: q.questionText,
        option_a: q.options.A,
        option_b: q.options.B,
        option_c: q.options.C,
        option_d: q.options.D,
        correct_option: q.correctOption,
        explanation: q.explanation ?? "",
      })),
    };

    let res;
    if (quiz.id) {
      res = await axiosInstance.put(`/admin/quiz/${quiz.id}`, payload);
    } else {
      res = await axiosInstance.post("/admin/quiz", payload);
    }
    const data: ApiQuizDetailResponse = res.data.data;
    return mapQuizFromApi(data);
  },

  /** Delete quiz */
  async deleteQuiz(id: string): Promise<boolean> {
    try {
      await axiosInstance.delete(`/admin/quiz/${id}`);
      return true;
    } catch {
      return false;
    }
  },

  /** Get statistics summary */
  async getStats(rolePrefix: 'admin' | 'staff' = 'staff'): Promise<QuizStats> {
    const res = await axiosInstance.get(`/${rolePrefix}/quiz/stats`);
    const data: ApiQuizStats = res.data.data;
    return {
      totalQuizzes: data.total_quizzes,
      publishedQuizzes: data.published_quizzes,
      draftQuizzes: data.draft_quizzes,
      totalAttempts: data.total_attempts,
      averageScore: data.average_score,
    };
  },

  /** Get participants for a specific quiz */
  async getParticipantsByQuizId(quizId: string, rolePrefix: 'admin' | 'staff' = 'staff'): Promise<QuizParticipant[]> {
    const res = await axiosInstance.get(`/${rolePrefix}/quiz/${quizId}/participants`);
    const items: ApiParticipantResponse[] = res.data.data ?? [];
    return items.map(mapParticipantFromApi);
  },

  /** Get participant quiz detail (question-by-question analysis) */
  async getParticipantDetail(
    quizId: string,
    participantId: string,
    rolePrefix: 'admin' | 'staff' = 'staff'
  ): Promise<ParticipantQuizDetail | null> {
    try {
      const res = await axiosInstance.get(
        `/${rolePrefix}/quiz/${quizId}/participant/${participantId}`
      );
      const data: ApiParticipantDetailResponse = res.data.data;

      return {
        participant: mapParticipantFromApi(data.participant),
        quizTitle: data.quiz_title,
        questionAnalysis: data.question_analysis.map(mapQuestionAnalysisFromApi),
      };
    } catch {
      return null;
    }
  },

  /** Get published articles for the quiz form dropdown */
  async getArticles(): Promise<{ value: string; label: string }[]> {
    const res = await axiosInstance.get("/admin/education/articles", {
      params: { limit: 200, status: "publikasi" },
    });
    const items: { id: string; title: string }[] = res.data.data ?? [];
    return items.map((a) => ({ value: a.id, label: a.title }));
  },
} as const;
