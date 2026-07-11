export interface DailySummary {
  readonly bloodSugar: string; // e.g. "145 mg/dL"
  readonly bloodSugarTime: string; // e.g. "2 jam lalu"
  readonly meal: string; // e.g. "1.250 kcal"
  readonly mealType: string; // e.g. "Makan Siang"
  readonly activity: string; // e.g. "30 Menit"
  readonly activityType: string; // e.g. "Jalan Kaki"
  readonly status: "Stabil" | "Waspada" | "Tinggi" | "Normal";
}

export interface PatientRecord {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly gender: "Laki-laki" | "Perempuan";
  readonly address: string;
  readonly initials: string;
  readonly puskesmas: string;
  readonly avatarUrl?: string;
  readonly lastActive: string;
  readonly dailySummary: DailySummary;
  readonly diagnosisDate: string;
  readonly emergencyContact: string;
}

export interface BloodSugarLog {
  readonly id: string;
  readonly date: string; // e.g. "Hari ini" or "Kemarin"
  readonly before: number; // mg/dL
  readonly after: number; // mg/dL
}

export interface MealLog {
  readonly id: string;
  readonly type: "Sarapan" | "Siang" | "Cemilan" | "Malam";
  readonly title: string;
  readonly time: string; // e.g. "07:30 WIB"
  readonly calories: number; // kcal
}

export interface ActivityLog {
  readonly id: string;
  readonly name: string;
  readonly time: string;
  readonly intensity: "Ringan" | "Sedang" | "Berat";
  readonly duration: number; // minutes
  readonly caloriesBurned: number; // kcal
}

export interface MedicationLog {
  readonly id: string;
  readonly name: string;
  readonly dosage: string; // e.g. "500mg"
  readonly time: string; // e.g. "Sesudah Makan (08:00)"
  readonly status: "Diminum" | "Terlewat" | "Mendatang";
  readonly dateGroup: string; // e.g. "Hari Ini, 24 Okt" or "Kemarin, 23 Okt"
}

export interface RecordMonitoringStats {
  readonly totalBloodSugarRecords: number;
  readonly totalMealRecords: number;
  readonly totalActivityRecords: number;
  readonly totalMedicationRecords: number;
}
