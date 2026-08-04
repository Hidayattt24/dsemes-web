export type SurveyType = "USER_SATISFACTION" | "SUS";
export type SurveyStatus = "draft" | "published" | "archived";

export interface QuestionRequest {
  id?: string;
  question_text: string;
  description?: string;
  image_url?: string;
  svg_illustration?: string;
  likert_labels?: string[];
  is_required?: boolean;
  display_order: number;
}

export interface QuestionDTO {
  id: string;
  survey_id: string;
  question_text: string;
  description?: string;
  image_url?: string;
  svg_illustration?: string;
  likert_labels: string[];
  is_required: boolean;
  display_order: number;
}

export interface SurveyListItem {
  id: string;
  title: string;
  description?: string;
  type: SurveyType;
  status: SurveyStatus;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  question_count: number;
  response_count: number;
  created_at: string;
}

export interface SurveyDetail extends SurveyListItem {
  questions: QuestionDTO[];
}

export interface CreateSurveyPayload {
  title: string;
  description?: string;
  type: SurveyType;
  start_date?: string;
  end_date?: string;
  questions: QuestionRequest[];
}

export interface UpdateSurveyPayload {
  title: string;
  description?: string;
  type: SurveyType;
  start_date?: string;
  end_date?: string;
  questions: QuestionRequest[];
}

export interface AnswerDetail {
  question_id: string;
  question_text: string;
  rating_value: number;
  adjusted_score?: number;
}

export interface SurveyResponseItem {
  id: string;
  survey_id: string;
  patient_id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  started_at?: string;
  completed_at: string;
  duration_seconds: number;
  total_score?: number;
  average_score?: number;
  percentage_score?: number;
  raw_score?: number;
  sus_score?: number;
  interpretation?: string;
  passed?: boolean;
  answers: AnswerDetail[];
}

export interface QuestionAnalytic {
  question_id: string;
  question_text: string;
  display_order: number;
  average_rating: number;
  rating_counts: Record<string, number>;
}

export interface DistributionItem {
  label: string;
  count: number;
  percentage: number;
}

export interface SurveyAnalytics {
  survey_id: string;
  survey_title: string;
  type: SurveyType;
  total_participants: number;
  completed_count: number;
  completion_rate: number;
  average_duration_secs: number;
  average_score?: number;
  average_percentage?: number;
  average_sus_score?: number;
  highest_sus_score?: number;
  lowest_sus_score?: number;
  pass_count?: number;
  fail_count?: number;
  pass_rate?: number;
  interpretations?: DistributionItem[];
  question_statistics: QuestionAnalytic[];
}
