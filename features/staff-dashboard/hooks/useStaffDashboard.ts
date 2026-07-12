import { useState, useEffect } from "react";

export interface DashboardSummaryCardData {
  readonly label: string;
  readonly value: string | number;
  readonly change: string;
  readonly isPositive: boolean;
  readonly icon: string;
  readonly variant: "primary" | "muted" | "warning" | "error";
}

export interface ChartDataPoint {
  readonly label: string;
  readonly value: number;
}

export interface ActivityDataPoint {
  readonly day: string;
  readonly value: number;
  readonly heightPercent: number;
}

export interface FoodIntakeItem {
  readonly category: string;
  readonly percentage: number;
  readonly count: number;
  readonly color: string;
}

export interface AdherenceItem {
  readonly label: string;
  readonly percentage: number;
  readonly color: string;
  readonly count: number;
}

export interface PriorityPatient {
  readonly id: string;
  readonly name: string;
  readonly avatarUrl: string;
  readonly bloodSugar: number;
  readonly time: string;
}

export interface TrendPatient {
  readonly id: string;
  readonly name: string;
  readonly avatarUrl: string;
  readonly avgStart: number;
  readonly avgCurrent: number;
  readonly increase: number;
}

export function useStaffDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Summary statistics mock data
  const summaryCards: readonly DashboardSummaryCardData[] = [
    {
      label: "Total Pasien Terdaftar",
      value: 154,
      change: "+12% bulan ini",
      isPositive: true,
      icon: "groups",
      variant: "primary",
    },
    {
      label: "Pasien Gula Darah Tinggi",
      value: 24,
      change: "-4% dibanding minggu lalu",
      isPositive: true, // positive meaning decreasing high risk is good
      icon: "error",
      variant: "error",
    },
    {
      label: "Rata-rata Gula Darah Pop.",
      value: "135 mg/dL",
      change: "-3 mg/dL dari kemarin",
      isPositive: true,
      icon: "monitoring",
      variant: "muted",
    },
    {
      label: "Persentase Normal (Stabil)",
      value: "84.5%",
      change: "+2.4% minggu ini",
      isPositive: true,
      icon: "check_circle",
      variant: "primary",
    },
  ];

  // Average Blood Sugar Trend
  const bloodSugarTrend: readonly { day: string; val: number; x: number; y: number }[] = [
    { day: "Sen", val: 142, x: 71, y: 130 },
    { day: "Sel", val: 138, x: 214, y: 150 },
    { day: "Rab", val: 135, x: 357, y: 165 },
    { day: "Kam", val: 140, x: 500, y: 140 },
    { day: "Jum", val: 134, x: 643, y: 170 },
    { day: "Sab", val: 137, x: 785, y: 155 },
    { day: "Min", val: 135, x: 928, y: 165 },
  ];

  // Physical Activity (Vertical columns percentage)
  const physicalActivity: readonly ActivityDataPoint[] = [
    { day: "Ringan", value: 45, heightPercent: 45 },
    { day: "Sedang", value: 38, heightPercent: 38 },
    { day: "Berat", value: 17, heightPercent: 17 },
  ];

  // Global Food Intake daily meal distribution
  const foodIntake: readonly FoodIntakeItem[] = [
    { category: "Sarapan", percentage: 32, count: 480, color: "#00695C" },
    { category: "Makan Siang", percentage: 38, count: 570, color: "#10B981" },
    { category: "Makan Malam", percentage: 22, count: 330, color: "#F59E0B" },
    { category: "Cemilan", percentage: 8, count: 120, color: "#EF4444" },
  ];

  // Medication Adherence
  const medicationAdherence: readonly AdherenceItem[] = [
    { label: "Patuh", percentage: 84, color: "#00695C", count: 129 },
    { label: "Kadang-kadang", percentage: 12, color: "#F59E0B", count: 19 },
    { label: "Tidak Patuh", percentage: 4, color: "#EF4444", count: 6 },
  ];

  // Priority Patients Today
  const priorityPatients: readonly PriorityPatient[] = [
    {
      id: "1",
      name: "Budi Santoso",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      bloodSugar: 182,
      time: "08:30 WIB",
    },
    {
      id: "2",
      name: "Siti Aminah",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
      bloodSugar: 195,
      time: "09:15 WIB",
    },
    {
      id: "3",
      name: "Ahmad Ridwan",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      bloodSugar: 176,
      time: "10:00 WIB",
    },
  ];

  // Patients with Increasing Blood Sugar Trend
  const trendPatients: readonly TrendPatient[] = [
    {
      id: "4",
      name: "Diana Lestari",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      avgStart: 115,
      avgCurrent: 158,
      increase: 43,
    },
    {
      id: "5",
      name: "Eko Prasetyo",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      avgStart: 120,
      avgCurrent: 152,
      increase: 32,
    },
    {
      id: "6",
      name: "Farhan Maulana",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
      avgStart: 110,
      avgCurrent: 141,
      increase: 31,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    summaryCards,
    bloodSugarTrend,
    physicalActivity,
    foodIntake,
    medicationAdherence,
    priorityPatients,
    trendPatients,
  };
}
