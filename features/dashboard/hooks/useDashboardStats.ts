"use client";

import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboardService";
import type { MetricCard } from "@/types/dashboard";

const METRIC_CARDS_CONFIG: Omit<MetricCard, "value">[] = [
  { label: "Total Pasien", icon: "groups", badgeLabel: "+12.4%", badgeVariant: "primary" },
  { label: "Pasien Aktif", icon: "person_check", badgeLabel: "Stabil", badgeVariant: "muted" },
  { label: "Artikel Edukasi", icon: "article", badgeLabel: "+5 Baru", badgeVariant: "primary" },
] as const;

interface UseDashboardStatsReturn {
  readonly cards: MetricCard[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refetch: () => void;
}

export function useDashboardStats(): UseDashboardStatsReturn {
  const [cards, setCards] = useState<MetricCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const stats = await dashboardService.getDashboardStats();
      setCards([
        { ...METRIC_CARDS_CONFIG[0], value: stats.totalPasien },
        { ...METRIC_CARDS_CONFIG[1], value: stats.pasienAktif },
        { ...METRIC_CARDS_CONFIG[2], value: stats.artikelEdukasi },
      ]);
    } catch {
      setError("Gagal memuat statistik.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetch();
  }, []);

  return { cards, isLoading, error, refetch: fetch };
}
