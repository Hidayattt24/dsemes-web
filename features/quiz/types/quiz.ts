export interface QuizQuestion {
  readonly id: string;
  readonly questionText: string;
  readonly options: {
    readonly A: string;
    readonly B: string;
    readonly C: string;
    readonly D: string;
  };
  readonly correctOption: "A" | "B" | "C" | "D";
  readonly explanation?: string;
}

export type QuizDifficulty = "Mudah" | "Sedang" | "Sulit";
export type QuizStatus = "Terbit" | "Draft";

export interface Quiz {
  readonly id: string;
  readonly title: string;
  readonly linkedArticleId: string;
  readonly linkedArticleTitle: string;
  readonly difficulty: QuizDifficulty;
  readonly passingScore: number; // e.g. 80
  readonly status: QuizStatus;
  readonly questions: readonly QuizQuestion[];
  readonly participantCount: number;
  readonly averageScore: number | null; // e.g. 78 or null if 0 participants
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface QuizStats {
  readonly totalQuizzes: number;
  readonly publishedQuizzes: number;
  readonly draftQuizzes: number;
  readonly totalAttempts: number;
  readonly averageScore: number;
}

export interface QuizParticipant {
  readonly id: string;
  readonly patientId: string;
  readonly patientName: string;
  readonly patientAvatar?: string;
  readonly puskesmas: string;
  readonly completionDate: string;
  readonly score: number;
  readonly passed: boolean;
  readonly duration: string; // e.g., "5m 20s"
}

export interface ParticipantQuestionAnalysis {
  readonly id: string;
  readonly questionNumber: number;
  readonly questionText: string;
  readonly patientAnswer: string; // e.g., "A. Pencegahan Diabetes"
  readonly correctAnswer: string; // e.g., "B. Gangguan metabolik kronis..."
  readonly isCorrect: boolean;
  readonly explanation?: string;
}

export interface ParticipantQuizDetail {
  readonly participant: QuizParticipant;
  readonly quizTitle: string;
  readonly questionAnalysis: readonly ParticipantQuestionAnalysis[];
}

export interface PaginationMeta {
  readonly page: number;
  readonly per_page: number;
  readonly total: number;
  readonly total_pages: number;
}

export type QuizSortBy = "newest" | "oldest" | "title";

export interface QuizListParams {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
  readonly status?: string;
  readonly sort_by?: QuizSortBy;
  readonly sort_order?: "asc" | "desc";
}
