export interface EducationArticle {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly shortDescription: string;
  readonly content: string;
  readonly duration: number; // Reading duration in minutes
  readonly youtubeLink?: string;
  readonly thumbnail: string;
  readonly coverImage?: string;
  readonly status: "Diterbitkan" | "Draf";
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly readCount: number;
}

export interface EducationStats {
  readonly totalEducation: number;
  readonly totalCategories: number;
  readonly publishedArticles: number;
  readonly totalReads: number;
}

export interface EducationProgressItem {
  readonly patient_id: string;
  readonly patient_name: string;
  readonly puskesmas: string;
  readonly article_read: boolean;
  readonly article_read_at: string | null;
  readonly youtube_watched: boolean;
  readonly youtube_watched_at: string | null;
  readonly completed: boolean;
  readonly completed_at: string | null;
  readonly last_activity_at: string | null;
}

export interface EducationProgressAnalytics {
  readonly total_patients: number;
  readonly completed_count: number;
  readonly read_article_count: number;
  readonly watched_video_count: number;
  readonly read_and_video_count: number;
  readonly not_started_count: number;
}
