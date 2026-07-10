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
