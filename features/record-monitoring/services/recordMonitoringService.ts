import type {
  PatientRecord,
  BloodSugarLog,
  MealLog,
  ActivityLog,
  MedicationLog,
  RecordMonitoringStats,
} from "../types/record";

const MOCK_PATIENT_RECORDS: PatientRecord[] = [
  {
    id: "5", // Siti Aminah matching patient list
    name: "Siti Aminah",
    age: 62,
    gender: "Perempuan",
    address: "Jl. T. Nyak Arief No. 123, Banda Aceh",
    initials: "SA",
    puskesmas: "Puskesmas Ulee Kareng",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhU-Hk4J7-QwG_TgPPscW97PKMfOmlGhJXO-dOqkzp2jJ9aWwYOM1rXPsgUkcIYNo5rof32MqUsTekD7rrupTDWloq1aOYVP-dleSPZl-1BuAf4Prl5F00nKJCC22biA_O_nBXDtnBMKt-BO871B3BvtBlf4eAT0RJHk54Wceci-JqbMoGBpddQ5HGHtNpVEqQlWJmb7-ZGaPw2Ss2XNUbwCsDcuDusTjFrPfb2ay8SLCj54EtrIlAWMcHPm6KokYQuPqFRpyDXybM",
    lastActive: "Hari ini, 08:15",
    diagnosisDate: "12 Okt 2021",
    emergencyContact: "0812-3456-7890 (Anak)",
    dailySummary: {
      bloodSugar: "145 mg/dL",
      bloodSugarTime: "2 jam lalu",
      meal: "1.250 kcal",
      mealType: "Makan Siang",
      activity: "30 Menit",
      activityType: "Jalan Kaki",
      status: "Stabil",
    },
  },
  {
    id: "1",
    name: "Ahmad Nurrahman",
    age: 54,
    gender: "Laki-laki",
    address: "Jl. Diponegoro No. 45, Banda Aceh",
    initials: "AN",
    puskesmas: "Puskesmas Kuta Alam",
    lastActive: "Hari ini, 09:24",
    diagnosisDate: "15 Jan 2023",
    emergencyContact: "0811-9921-002 (Istri)",
    dailySummary: {
      bloodSugar: "110 mg/dL",
      bloodSugarTime: "1 jam lalu",
      meal: "1.850 kcal",
      mealType: "Makan Malam",
      activity: "45 Menit",
      activityType: "Sepeda",
      status: "Stabil",
    },
  },
  {
    id: "2",
    name: "Siti Maryam",
    age: 42,
    gender: "Perempuan",
    address: "Jl. T. Nyak Arief No. 123, Banda Aceh",
    initials: "SM",
    puskesmas: "Puskesmas Kuta Alam",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBonHLOi4DDR8Fl6O72N8wIWCIp9Ym2wPa1_3ST_Z2K8fJvYa2863-5Y0LRfVmavV-p0Fy0LS2-oH461IazfxZAiYY0BcqzJt-7gpWA0dTtpkAPKJ53BIDfL_TYSca0G0KHXKr97AfLSZ_RW1Q6GG5U6nKnAMo-NEVKQwqllgbhO0cgm80p2sM0RyTeBI6KTWOyMGI6zXUJokQOJlsBSxGG9FEtglu-HJ8fRF0thI6vI48rloIsrpsyQ2urYhat0TddrT4iOpvIpLYD",
    lastActive: "Kemarin, 17:40",
    diagnosisDate: "01 Sep 2023",
    emergencyContact: "0812-9900-1122 (Suami)",
    dailySummary: {
      bloodSugar: "195 mg/dL",
      bloodSugarTime: "3 jam lalu",
      meal: "2.100 kcal",
      mealType: "Makan Malam",
      activity: "0 Menit",
      activityType: "-",
      status: "Waspada",
    },
  },
  {
    id: "3",
    name: "Bambang Kusuma",
    age: 61,
    gender: "Laki-laki",
    address: "Jl. Gajah Mada No. 12, Banda Aceh",
    initials: "BK",
    puskesmas: "Puskesmas Meuraxa",
    lastActive: "3 hari lalu",
    diagnosisDate: "15 Apr 2023",
    emergencyContact: "0813-8822-004 (Anak)",
    dailySummary: {
      bloodSugar: "160 mg/dL",
      bloodSugarTime: "4 jam lalu",
      meal: "1.450 kcal",
      mealType: "Sore",
      activity: "15 Menit",
      activityType: "Jalan kaki",
      status: "Tinggi",
    },
  },
  {
    id: "4",
    name: "Farah Hani",
    age: 38,
    gender: "Perempuan",
    address: "Jl. Teuku Umar No. 88, Banda Aceh",
    initials: "FH",
    puskesmas: "Puskesmas Syiah Kuala",
    lastActive: "Kemarin, 14:20",
    diagnosisDate: "10 Okt 2022",
    emergencyContact: "0815-7733-005 (Suami)",
    dailySummary: {
      bloodSugar: "98 mg/dL",
      bloodSugarTime: "1 jam lalu",
      meal: "1.100 kcal",
      mealType: "Makan Siang",
      activity: "60 Menit",
      activityType: "Senam",
      status: "Normal",
    },
  },
];

const MOCK_BLOOD_SUGAR_LOGS: Record<string, BloodSugarLog[]> = {
  "5": [
    { id: "bs1", date: "Hari ini", before: 110, after: 165 },
    { id: "bs2", date: "Kemarin", before: 105, after: 138 },
    { id: "bs3", date: "3 hari lalu", before: 120, after: 142 },
    { id: "bs4", date: "4 hari lalu", before: 99, after: 130 },
    { id: "bs5", date: "5 hari lalu", before: 115, after: 155 },
    { id: "bs6", date: "6 hari lalu", before: 108, after: 148 },
    { id: "bs7", date: "7 hari lalu", before: 102, after: 135 },
  ],
};

const MOCK_MEAL_LOGS: Record<string, MealLog[]> = {
  "5": [
    { id: "m1", type: "Sarapan", title: "Nasi Goreng Porsi Kecil", time: "07:30 WIB", calories: 350 },
    { id: "m2", type: "Siang", title: "Sayur Bayam & Ikan Bakar", time: "13:00 WIB", calories: 550 },
    { id: "m3", type: "Cemilan", title: "Buah Pisang", time: "16:00 WIB", calories: 105 },
    { id: "m4", type: "Malam", title: "Tahu Tempe & Sayur Sop", time: "19:00 WIB", calories: 245 },
  ],
};

const MOCK_ACTIVITY_LOGS: Record<string, ActivityLog[]> = {
  "5": [
    { id: "a1", name: "Jalan Santai", time: "Hari ini, 06:00 WIB", intensity: "Ringan", duration: 45, caloriesBurned: 150 },
    { id: "a2", name: "Berkebun", time: "Kemarin, 16:30 WIB", intensity: "Sedang", duration: 30, caloriesBurned: 120 },
  ],
};

const MOCK_MEDICATION_LOGS: Record<string, MedicationLog[]> = {
  "5": [
    { id: "med1", name: "Metformin", dosage: "500mg", time: "Sesudah Makan (08:00)", status: "Diminum", dateGroup: "Hari Ini, 24 Okt" },
    { id: "med2", name: "Glibenclamide", dosage: "5mg", time: "Sebelum Makan Malam (19:00)", status: "Mendatang", dateGroup: "Hari Ini, 24 Okt" },
    { id: "med3", name: "Metformin", dosage: "500mg", time: "Sesudah Makan (08:00)", status: "Terlewat", dateGroup: "Kemarin, 23 Okt" },
  ],
};

export const recordMonitoringService = {
  async getPatientRecords(): Promise<PatientRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...MOCK_PATIENT_RECORDS];
  },

  async getPatientRecordById(id: string): Promise<PatientRecord | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const patient = MOCK_PATIENT_RECORDS.find((p) => p.id === id);
    return patient ?? null;
  },

  async getBloodSugarLogs(patientId: string): Promise<BloodSugarLog[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_BLOOD_SUGAR_LOGS[patientId] ?? [
      { id: "bs_d1", date: "Hari ini", before: 100, after: 135 },
      { id: "bs_d2", date: "Kemarin", before: 95, after: 120 },
    ];
  },

  async getMealLogs(patientId: string): Promise<MealLog[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_MEAL_LOGS[patientId] ?? [
      { id: "m_d1", type: "Sarapan", title: "Bubur Ayam", time: "07:15 WIB", calories: 300 },
      { id: "m_d2", type: "Siang", title: "Nasi Rames", time: "12:30 WIB", calories: 600 },
    ];
  },

  async getActivityLogs(patientId: string): Promise<ActivityLog[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_ACTIVITY_LOGS[patientId] ?? [
      { id: "a_d1", name: "Jalan Santai", time: "Hari ini, 06:15 WIB", intensity: "Ringan", duration: 30, caloriesBurned: 100 },
    ];
  },

  async getMedicationLogs(patientId: string): Promise<MedicationLog[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_MEDICATION_LOGS[patientId] ?? [
      { id: "med_d1", name: "Metformin", dosage: "500mg", time: "Sesudah Makan (08:00)", status: "Diminum", dateGroup: "Hari Ini, 24 Okt" },
    ];
  },

  async getStats(): Promise<RecordMonitoringStats> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return {
      totalBloodSugarRecords: 1245,
      totalMealRecords: 3890,
      totalActivityRecords: 2150,
      totalMedicationRecords: 4521,
    };
  },
} as const;
