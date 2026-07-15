import { axiosInstance } from "@/lib/axios";
import type {
  ActivityDataPoint,
  DashboardStats,
  PatientGrowthDataPoint,
  TopArticle,
} from "@/types/dashboard";

/**
 * Dashboard API service.
 */

export const dashboardService = {
  /** Fetch headline statistics for the 4 metric cards. */
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await axiosInstance.get("/admin/dashboard");
    const data = res.data?.data;
    return {
      totalPasien:   data?.total_patients ?? 0,
      pasienAktif:   data?.active_patients ?? 0,
      artikelEdukasi: data?.total_articles ?? 0,
      puskesmas:     24,
    };
  },
  /** Fetch 7-day activity chart data. */
  async getActivityChart(): Promise<ActivityDataPoint[]> {
    const res = await axiosInstance.get("/admin/dashboard/activity-chart");
    const list = res.data?.data ?? [];
    return list.map((item: any) => ({
      day: item.day,
      value: Number(item.value ?? 0),
      heightPercent: Number(item.height_percent ?? 10),
    }));
  },

  /** Fetch 12-month patient growth data. (Unused but kept for consistency) */
  async getPatientGrowth(year: number): Promise<PatientGrowthDataPoint[]> {
    await new Promise((r) => setTimeout(r, 400));
    void year;
    return [
      { month: "Jan", value: 30,  heightPercent: 30,  isCurrent: false },
      { month: "Feb", value: 45,  heightPercent: 45,  isCurrent: false },
      { month: "Mar", value: 40,  heightPercent: 40,  isCurrent: false },
      { month: "Apr", value: 60,  heightPercent: 60,  isCurrent: false },
      { month: "Mei", value: 55,  heightPercent: 55,  isCurrent: false },
      { month: "Jun", value: 75,  heightPercent: 75,  isCurrent: false },
      { month: "Jul", value: 80,  heightPercent: 80,  isCurrent: false },
      { month: "Agu", value: 90,  heightPercent: 90,  isCurrent: true  },
      { month: "Sep", value: 5,   heightPercent: 5,   isCurrent: false },
      { month: "Okt", value: 5,   heightPercent: 5,   isCurrent: false },
      { month: "Nov", value: 5,   heightPercent: 5,   isCurrent: false },
      { month: "Des", value: 5,   heightPercent: 5,   isCurrent: false },
    ];
  },

  /** Fetch top education articles. */
  async getTopArticles(): Promise<TopArticle[]> {
    const res = await axiosInstance.get("/admin/dashboard/top-articles");
    const list = res.data?.data ?? [];
    return list.map((item: any) => {
      let categoryVariant: "primary" | "warning" | "error" | "muted" = "primary";
      const cat = item.category?.toLowerCase() ?? "";
      if (cat.includes("aktivitas") || cat.includes("olahraga")) {
        categoryVariant = "warning";
      } else if (cat.includes("medis") || cat.includes("obat")) {
        categoryVariant = "error";
      } else if (cat.includes("nutrisi") || cat.includes("diet")) {
        categoryVariant = "primary";
      } else {
        categoryVariant = "muted";
      }
      return {
        id: item.id,
        title: item.title,
        category: item.category ?? "Edukasi",
        categoryVariant,
        readCount: Number(item.read_count ?? 0),
        thumbnailUrl: item.thumbnail_url,
      };
    });
  },
} as const;
