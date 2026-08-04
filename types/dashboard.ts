/**
 * Dashboard domain types.
 */

export interface DashboardStats {
  readonly totalPasien: number;
  readonly pasienAktif: number;
  readonly artikelEdukasi: number;
  readonly puskesmas: number;
}

export interface MetricCard {
  readonly label: string;
  readonly value: string | number;
  readonly icon: string;
  readonly badgeLabel?: string;
  readonly badgeVariant: "primary" | "muted" | "warning" | "error";
  readonly progressBar?: number;
}

export interface ActivityDataPoint {
  readonly day: string;
  readonly value: number;
  readonly heightPercent: number;
}

export interface PatientGrowthDataPoint {
  readonly month: string;
  readonly value: number;
  readonly heightPercent: number;
  readonly isCurrent?: boolean;
}

export interface TopArticle {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly categoryVariant: "primary" | "warning" | "error" | "muted";
  readonly readCount: number;
  readonly thumbnailUrl?: string;
}
