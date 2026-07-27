import type {
  QuestionnaireRecord,
  QuizStats,
  QuizParticipant,
  ParticipantQuizDetail,
  ParticipantQuestionAnalysis,
  PaginationMeta,
  QuizListParams,
  QuestionCategoryItem,
  QuestionItem,
  QuestionChoice,
  QuestionnaireFormFields,
} from "../types/quiz";
import { axiosInstance } from "@/lib/axios";

interface ApiChoiceResponse {
  readonly id: string;
  readonly option_text: string;
  readonly is_correct: boolean;
  readonly display_order: number;
}

interface ApiQuestionResponse {
  readonly id: string;
  readonly question_text: string;
  readonly explanation?: string;
  readonly display_order: number;
  readonly choices: readonly ApiChoiceResponse[];
}

interface ApiCategoryResponse {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly display_order: number;
  readonly questions: readonly ApiQuestionResponse[];
}

interface ApiQuestionnaireResponse {
  readonly id: string;
  readonly title: string;
  readonly type: "PRE_TEST" | "POST_TEST";
  readonly description?: string;
  readonly education_id?: string;
  readonly education_title?: string;
  readonly passing_score?: number;
  readonly difficulty?: string;
  readonly status: string;
  readonly category_count: number;
  readonly question_count: number;
  readonly participant_count: number;
  readonly average_score: number | null;
  readonly created_by: string;
  readonly created_at: string;
  readonly updated_at: string;
}

interface ApiQuestionnaireDetailResponse extends ApiQuestionnaireResponse {
  readonly categories: readonly ApiCategoryResponse[];
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

function mapQuestionnaireFromApi(api: ApiQuestionnaireDetailResponse): QuestionnaireRecord {
  const categories: QuestionCategoryItem[] = (api.categories ?? []).map((cat) => ({
    id: cat.id,
    title: cat.title,
    description: cat.description,
    displayOrder: cat.display_order,
    questions: (cat.questions ?? []).map((q): QuestionItem => ({
      id: q.id,
      questionText: q.question_text,
      explanation: q.explanation,
      displayOrder: q.display_order,
      choices: (q.choices ?? []).map((c): QuestionChoice => ({
        id: c.id,
        optionText: c.option_text,
        isCorrect: c.is_correct,
        displayOrder: c.display_order,
      })),
    })),
  }));

  return {
    id: api.id,
    title: api.title,
    type: api.type,
    description: api.description,
    educationId: api.education_id,
    educationTitle: api.education_title,
    passingScore: api.passing_score,
    difficulty: api.difficulty as QuestionnaireRecord["difficulty"],
    status: api.status as QuestionnaireRecord["status"],
    categoryCount: api.category_count,
    questionCount: api.question_count,
    participantCount: api.participant_count,
    averageScore: api.average_score,
    createdBy: api.created_by ?? "-",
    createdAt: api.created_at,
    updatedAt: api.updated_at,
    categories,
  };
}

function mapQuestionnaireListItemFromApi(api: ApiQuestionnaireResponse): QuestionnaireRecord {
  return {
    id: api.id,
    title: api.title,
    type: api.type,
    description: api.description,
    educationId: api.education_id,
    educationTitle: api.education_title,
    passingScore: api.passing_score,
    difficulty: api.difficulty as QuestionnaireRecord["difficulty"],
    status: api.status as QuestionnaireRecord["status"],
    categoryCount: api.category_count ?? 0,
    questionCount: api.question_count ?? 0,
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

function formatQuestionnairePayload(fields: QuestionnaireFormFields) {
  return {
    title: fields.title.trim(),
    type: fields.type,
    description: fields.description ? fields.description.trim() : "",
    education_id: fields.type === "POST_TEST" && fields.educationId ? fields.educationId : null,
    passing_score: fields.type === "POST_TEST" && fields.passingScore ? Number(fields.passingScore) : null,
    difficulty: fields.type === "POST_TEST" && fields.difficulty ? fields.difficulty : null,
    status: fields.status ? fields.status.toLowerCase() : "aktif",
    categories: fields.categories.map((cat, catIdx) => ({
      ...(cat.id ? { id: cat.id } : {}),
      title: cat.title.trim(),
      description: cat.description ? cat.description.trim() : "",
      display_order: catIdx + 1,
      questions: cat.questions.map((q, qIdx) => ({
        ...(q.id ? { id: q.id } : {}),
        question_text: q.questionText.trim(),
        explanation: q.explanation ? q.explanation.trim() : "",
        display_order: qIdx + 1,
        choices: q.choices.map((c, cIdx) => ({
          ...(c.id ? { id: c.id } : {}),
          option_text: c.optionText.trim(),
          is_correct: c.isCorrect,
          display_order: cIdx + 1,
        })),
      })),
    })),
  };
}

export const quizService = {
  /** Get paginated questionnaires */
  async getQuizzes(
    params: QuizListParams = {},
    rolePrefix: "admin" | "staff" = "staff"
  ): Promise<{ items: QuestionnaireRecord[]; pagination: PaginationMeta }> {
    const res = await axiosInstance.get(`/${rolePrefix}/quiz`, {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        search: params.search || undefined,
        type: params.type || undefined,
        status: params.status || undefined,
        sort_by: params.sort_by || undefined,
        sort_order: params.sort_order || undefined,
      },
    });
    const items: ApiQuestionnaireResponse[] = res.data.data ?? [];
    const meta = res.data?.meta ?? { page: 1, per_page: 10, total: 0, total_pages: 0 };
    return {
      items: items.map(mapQuestionnaireListItemFromApi),
      pagination: meta,
    };
  },

  /** Get single questionnaire by ID */
  async getQuizById(id: string, rolePrefix: "admin" | "staff" = "admin"): Promise<QuestionnaireRecord | null> {
    try {
      const res = await axiosInstance.get(`/${rolePrefix}/quiz/${id}`);
      const data: ApiQuestionnaireDetailResponse = res.data.data;
      return mapQuestionnaireFromApi(data);
    } catch {
      return null;
    }
  },

  /** Create new questionnaire */
  async createQuiz(payload: QuestionnaireFormFields): Promise<QuestionnaireRecord> {
    const formatted = formatQuestionnairePayload(payload);
    const res = await axiosInstance.post("/admin/quiz", formatted);
    const data: ApiQuestionnaireDetailResponse = res.data.data;
    return mapQuestionnaireFromApi(data);
  },

  /** Update existing questionnaire */
  async updateQuiz(id: string, payload: QuestionnaireFormFields): Promise<QuestionnaireRecord> {
    const formatted = formatQuestionnairePayload(payload);
    const res = await axiosInstance.put(`/admin/quiz/${id}`, formatted);
    const data: ApiQuestionnaireDetailResponse = res.data.data;
    return mapQuestionnaireFromApi(data);
  },

  /** Save (Create or Update) questionnaire */
  async saveQuestionnaire(
    payload: QuestionnaireFormFields & { id?: string }
  ): Promise<QuestionnaireRecord> {
    if (payload.id) {
      return this.updateQuiz(payload.id, payload);
    }
    return this.createQuiz(payload);
  },

  /** Delete questionnaire */
  async deleteQuiz(id: string): Promise<boolean> {
    try {
      await axiosInstance.delete(`/admin/quiz/${id}`);
      return true;
    } catch {
      return false;
    }
  },

  /** Get statistics summary */
  async getStats(rolePrefix: "admin" | "staff" = "staff"): Promise<QuizStats> {
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

  /** Get participants for a specific questionnaire */
  async getParticipantsByQuizId(quizId: string, rolePrefix: "admin" | "staff" = "staff"): Promise<QuizParticipant[]> {
    const res = await axiosInstance.get(`/${rolePrefix}/quiz/${quizId}/participants`);
    const items: ApiParticipantResponse[] = res.data.data ?? [];
    return items.map(mapParticipantFromApi);
  },

  /** Get participant questionnaire detail */
  async getParticipantDetail(
    quizId: string,
    participantId: string,
    rolePrefix: "admin" | "staff" = "staff"
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
