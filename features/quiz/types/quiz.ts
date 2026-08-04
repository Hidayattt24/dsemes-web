export type QuestionnaireType = "PRE_TEST" | "POST_TEST";
export type QuestionnaireDifficulty = "Mudah" | "Sedang" | "Sulit";
export type QuestionnaireStatus = "Aktif" | "Draft" | "Nonaktif";

export interface QuestionChoice {
  readonly id?: string;
  readonly optionText: string;
  readonly isCorrect: boolean;
  readonly displayOrder?: number;
}

export interface QuestionItem {
  readonly id?: string;
  readonly questionText: string;
  readonly questionImageUrl?: string;
  readonly explanation?: string;
  readonly displayOrder?: number;
  readonly choices: readonly QuestionChoice[];
}

export interface QuestionCategoryItem {
  readonly id?: string;
  readonly title: string;
  readonly description?: string;
  readonly displayOrder?: number;
  readonly questions: readonly QuestionItem[];
}

export interface QuestionnaireRecord {
  readonly id: string;
  readonly title: string;
  readonly type: QuestionnaireType;
  readonly description?: string;
  readonly educationId?: string;
  readonly educationTitle?: string;
  readonly passingScore?: number;
  readonly difficulty?: QuestionnaireDifficulty;
  readonly status: QuestionnaireStatus;
  readonly categoryCount: number;
  readonly questionCount: number;
  readonly participantCount: number;
  readonly averageScore: number | null;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly categories?: readonly QuestionCategoryItem[];
}

// Backward compatibility aliases
export type Quiz = QuestionnaireRecord;
export type QuizQuestion = FormQuestion;
export type QuizChoice = FormChoice;
export type QuizCategory = FormCategory;

export interface FormChoice {
  id?: string;
  optionText: string;
  isCorrect: boolean;
}

export interface FormQuestion {
  id?: string;
  questionText: string;
  questionImageUrl?: string;
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
  questions?: FormQuestion[];
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
  readonly duration: string;
  readonly selfEfficacyCategory?: string;
}

export interface ParticipantQuestionAnalysis {
  readonly id: string;
  readonly questionNumber: number;
  readonly questionText: string;
  readonly patientAnswer: string;
  readonly correctAnswer: string;
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
  readonly type?: string;
  readonly status?: string;
  readonly sort_by?: QuizSortBy;
  readonly sort_order?: "asc" | "desc";
}
