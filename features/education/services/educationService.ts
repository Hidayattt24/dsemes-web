import type { EducationArticle, EducationStats, EducationProgressItem, EducationProgressAnalytics } from "../types/education";
import { axiosInstance } from "@/lib/axios";

const mapArticleFromBackend = (data: any): EducationArticle => {
  return {
    id: data.id,
    title: data.title,
    category: data.category_name || "Lainnya",
    shortDescription: data.summary || "",
    content: data.content || "",
    duration: data.estimated_read_minutes || 5,
    youtubeLink: data.youtube_link || "",
    thumbnail: data.banner_image_url || "",
    status: data.status === "publikasi" ? "Diterbitkan" : "Draf",
    createdBy: data.author_name || "-",
    createdAt: new Date(data.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    updatedAt: new Date(data.updated_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    readCount: data.read_count || 0,
  };
};

export const educationService = {
  /** Get all categories */
  async getCategories(): Promise<string[]> {
    try {
      const res = await axiosInstance.get("/education/categories");
      const list = res.data?.data ?? [];
      return list.map((c: any) => c.name || c.category_name || c).filter(Boolean);
    } catch {
      return [];
    }
  },

  /** Get all articles */
  async getArticles(): Promise<EducationArticle[]> {
    const res = await axiosInstance.get("/admin/education/articles", { params: { limit: 100 } });
    const list = res.data?.data ?? [];
    return list.map(mapArticleFromBackend);
  },

  /** Get single article by ID */
  async getArticleById(id: string): Promise<EducationArticle | null> {
    try {
      const res = await axiosInstance.get(`/education/articles/${id}`);
      if (res.data?.data) {
        return mapArticleFromBackend(res.data.data);
      }
      return null;
    } catch {
      return null;
    }
  },

  /** Save (Create or Update) */
  async saveArticle(article: Partial<EducationArticle> & { id?: string }): Promise<EducationArticle> {
    const payload = {
      title: article.title,
      category_name: article.category,
      estimated_read_minutes: article.duration,
      author_name: article.createdBy || "-",
      banner_image_url: article.thumbnail,
      summary: article.shortDescription,
      content: article.content,
      youtube_link: article.youtubeLink,
      status: article.status === "Diterbitkan" ? "publikasi" : "draft",
    };

    if (article.id) {
      // Update
      const res = await axiosInstance.put(`/admin/education/articles/${article.id}`, payload);
      const data = res.data?.data;
      return mapArticleFromBackend(data);
    } else {
      // Create
      const res = await axiosInstance.post("/admin/education/articles", payload);
      const data = res.data?.data;
      return mapArticleFromBackend(data);
    }
  },

  /** Delete article */
  async deleteArticle(id: string): Promise<boolean> {
    try {
      await axiosInstance.delete(`/admin/education/articles/${id}`);
      return true;
    } catch {
      return false;
    }
  },

  /** Get statistics counts */
  async getStats(): Promise<EducationStats> {
    const res = await axiosInstance.get("/admin/education/stats");
    const data = res.data?.data ?? {};
    return {
      totalEducation: data.total_education || 0,
      totalCategories: data.total_categories || 0,
      publishedArticles: data.published_articles || 0,
      totalReads: data.total_reads || 0,
    };
  },

  /** Get all patients' progress for an education article */
  async getProgress(articleId: string): Promise<EducationProgressItem[]> {
    const res = await axiosInstance.get(`/admin/education/${articleId}/progress`);
    const raw: any[] = res.data?.data ?? [];
    return raw.map((r) => ({
      patient_id: r.patient_id ?? "",
      patient_name: r.patient_name ?? "-",
      puskesmas: r.puskesmas ?? "-",
      article_read: r.article_read ?? false,
      article_read_at: r.article_read_at ?? null,
      article_started_at: r.article_started_at ?? null,
      article_finished_at: r.article_finished_at ?? null,
      article_reading_duration: r.article_reading_duration ?? 0,
      article_last_scroll_position: r.article_last_scroll_position ?? 0,
      youtube_watched: r.youtube_watched ?? false,
      youtube_watched_at: r.youtube_watched_at ?? null,
      video_started_at: r.video_started_at ?? null,
      video_finished_at: r.video_finished_at ?? null,
      video_watch_duration: r.video_watch_duration ?? 0,
      video_last_timestamp: r.video_last_timestamp ?? 0,
      completed: r.completed ?? false,
      completed_at: r.completed_at ?? null,
      completion_source: r.completion_source ?? "",
      last_activity_at: r.last_activity_at ?? null,
    }));
  },


  /** Get progress analytics summary for an education article */
  async getProgressAnalytics(articleId: string): Promise<EducationProgressAnalytics> {
    const res = await axiosInstance.get(`/admin/education/${articleId}/progress/analytics`);
    const data = res.data?.data ?? {};
    return {
      total_patients: data.total_patients || 0,
      completed_count: data.completed_count || 0,
      read_article_count: data.read_article_count || 0,
      watched_video_count: data.watched_video_count || 0,
      read_and_video_count: data.read_and_video_count || 0,
      not_started_count: data.not_started_count || 0,
    };
  },
};
