import type { EducationArticle, EducationStats } from "../types/education";
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
};
