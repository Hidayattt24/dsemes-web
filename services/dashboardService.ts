import type {
  ActivityDataPoint,
  DashboardStats,
  PatientGrowthDataPoint,
  TopArticle,
} from "@/types/dashboard";

/**
 * Dashboard API service.
 * Stub data matches the Stitch design wireframe exactly.
 */

export const dashboardService = {
  /** Fetch headline statistics for the 4 metric cards. */
  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise((r) => setTimeout(r, 600));
    return {
      totalPasien:   1284,
      pasienAktif:   942,
      artikelEdukasi: 156,
      puskesmas:     24,
    };
  },

  /** Fetch 7-day activity chart data. */
  async getActivityChart(): Promise<ActivityDataPoint[]> {
    await new Promise((r) => setTimeout(r, 400));
    return [
      { day: "Sen", value: 1200, heightPercent: 40 },
      { day: "Sel", value: 1950, heightPercent: 65 },
      { day: "Rab", value: 1650, heightPercent: 55 },
      { day: "Kam", value: 2400, heightPercent: 80 },
      { day: "Jum", value: 2100, heightPercent: 70 },
      { day: "Sab", value: 2850, heightPercent: 95 },
      { day: "Min", value: 2550, heightPercent: 85 },
    ];
  },

  /** Fetch 12-month patient growth data. */
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
    await new Promise((r) => setTimeout(r, 500));
    return [
      {
        id:              "1",
        title:           "Panduan Nutrisi Penderita Diabetes Tipe 2",
        category:        "Nutrisi",
        categoryVariant: "primary",
        readCount:       2415,
      },
      {
        id:              "2",
        title:           "Olahraga Rutin Menjaga Gula Darah",
        category:        "Aktivitas",
        categoryVariant: "warning",
        readCount:       1890,
      },
      {
        id:              "3",
        title:           "Mengenal Alat Pemantauan Mandiri",
        category:        "Medis",
        categoryVariant: "error",
        readCount:       1542,
      },
    ];
  },
} as const;
