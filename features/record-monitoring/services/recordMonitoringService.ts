import { axiosInstance } from "@/lib/axios";
import type {
  PatientRecord,
  BloodSugarLog,
  MealLog,
  ActivityLog,
  MedicationLog,
  RecordMonitoringStats,
} from "../types/record";

const mapPatientRecord = (data: any): PatientRecord => {
  // Format age from date_of_birth
  let age = 50; // default fallback
  if (data.date_of_birth) {
    const dob = new Date(data.date_of_birth);
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs);
    age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  // Format emergency contact
  const emergencyContact = data.emergency_phone
    ? `${data.emergency_phone} (${data.emergency_relation ?? "Keluarga"})`
    : "-";

  // Build dailySummary
  const bloodSugar = data.latest_blood_sugar ? `${data.latest_blood_sugar} mg/dL` : "-";
  
  let bloodSugarTime = "-";
  if (data.latest_blood_sugar_time) {
    const bsTime = new Date(data.latest_blood_sugar_time);
    bloodSugarTime = bsTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
  }

  const meal = data.latest_meal_calories ? `${Math.round(data.latest_meal_calories)} kcal` : "-";
  const mealType = data.latest_meal_type ? (
    data.latest_meal_type === "sarapan" ? "Sarapan" :
    data.latest_meal_type === "makan_siang" ? "Makan Siang" :
    data.latest_meal_type === "makan_malam" ? "Makan Malam" : "Cemilan"
  ) : "-";

  const activity = data.latest_activity_time ? "30 Menit" : "-";
  const activityType = data.latest_activity_name ?? "-";

  // Map status: Stabil / Waspada / Tinggi / Normal
  let status: "Stabil" | "Waspada" | "Tinggi" | "Normal" = "Normal";
  const statusStr = data.latest_blood_sugar_status ?? "";
  if (statusStr === "tinggi") {
    status = "Waspada";
  } else if (statusStr === "sangat_tinggi") {
    status = "Tinggi";
  } else if (statusStr === "rendah") {
    status = "Waspada";
  } else if (data.latest_blood_sugar) {
    status = "Stabil";
  }

  // Initials
  const initials = data.full_name
    ? data.full_name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase()
    : "P";

  return {
    id: data.id,
    name: data.full_name,
    age,
    gender: data.gender === "laki_laki" ? "Laki-laki" : "Perempuan",
    address: data.address ?? "-",
    initials,
    puskesmas: "Puskesmas Ulee Kareng",
    lastActive: data.latest_activity_time
      ? new Date(data.latest_activity_time).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
      : "Hari ini",
    diagnosisDate: data.diagnosis_date
      ? new Date(data.diagnosis_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
      : "-",
    emergencyContact,
    dailySummary: {
      bloodSugar,
      bloodSugarTime,
      meal,
      mealType,
      activity,
      activityType,
      status,
    },
  };
};

export const recordMonitoringService = {
  async getPatientRecords(): Promise<PatientRecord[]> {
    const res = await axiosInstance.get("/admin/patients", { params: { limit: 100 } });
    const list = res.data?.data ?? [];
    return list.map(mapPatientRecord);
  },

  async getPatientRecordById(id: string): Promise<PatientRecord | null> {
    try {
      const res = await axiosInstance.get(`/admin/patients/${id}`);
      if (res.data?.data) {
        return mapPatientRecord(res.data.data);
      }
      return null;
    } catch {
      return null;
    }
  },

  async getBloodSugarLogs(patientId: string): Promise<BloodSugarLog[]> {
    const res = await axiosInstance.get(`/admin/patients/${patientId}/blood-sugar`, { params: { limit: 100 } });
    const list = res.data?.data ?? [];
    
    const dailyMap: { [key: string]: { before: number; after: number; dateStr: string; rawDate: Date } } = {};
    list.forEach((log: any) => {
      const d = new Date(log.measured_at);
      const dateKey = d.toDateString();
      const formattedDate = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = { before: 0, after: 0, dateStr: formattedDate, rawDate: d };
      }
      if (log.measurement_time_type === "sebelum_makan") {
        dailyMap[dateKey].before = log.glucose_value;
      } else {
        dailyMap[dateKey].after = log.glucose_value;
      }
    });

    return Object.values(dailyMap)
      .map((item, idx) => ({
        id: `bs-${idx}`,
        date: item.dateStr,
        before: item.before > 0 ? item.before : 100,
        after: item.after > 0 ? item.after : 140,
        rawDate: item.rawDate,
      }))
      .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
  },

  async getMealLogs(patientId: string): Promise<MealLog[]> {
    const res = await axiosInstance.get(`/admin/patients/${patientId}/meals`, { params: { limit: 100 } });
    const list = res.data?.data ?? [];
    return list.map((log: any) => {
      const loggedDate = new Date(log.logged_at);
      const timeStr = loggedDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
      const dateStr = loggedDate.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      
      let type: "Sarapan" | "Siang" | "Cemilan" | "Malam" = "Sarapan";
      if (log.meal_type === "makan_siang") type = "Siang";
      else if (log.meal_type === "makan_malam") type = "Malam";
      else if (log.meal_type === "cemilan") type = "Cemilan";

      return {
        id: log.id,
        type,
        title: `${log.food?.name ?? "Makanan"} (${dateStr})`,
        time: timeStr,
        calories: Math.round((log.food?.calories ?? 0) * (log.portion_multiplier ?? 1)),
      };
    });
  },

  async getActivityLogs(patientId: string): Promise<ActivityLog[]> {
    const res = await axiosInstance.get(`/admin/patients/${patientId}/activities`, { params: { limit: 100 } });
    const list = res.data?.data ?? [];
    return list.map((log: any) => {
      const loggedDate = new Date(log.logged_at);
      const dateStr = loggedDate.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      const timeStr = loggedDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";

      let intensity: "Ringan" | "Sedang" | "Berat" = "Ringan";
      if (log.intensity === "sedang") intensity = "Sedang";
      else if (log.intensity === "berat") intensity = "Berat";

      return {
        id: log.id,
        name: log.activity_name,
        time: `${dateStr}, ${timeStr}`,
        intensity,
        duration: log.duration_minutes,
        caloriesBurned: Math.round(log.calories_burned),
      };
    });
  },

  async getMedicationLogs(patientId: string): Promise<MedicationLog[]> {
    const res = await axiosInstance.get(`/admin/patients/${patientId}/medications`, { params: { limit: 100 } });
    const list = res.data?.data ?? [];
    return list.map((log: any) => {
      let status: "Diminum" | "Terlewat" | "Mendatang" = "Mendatang";
      if (log.status === "completed") status = "Diminum";
      else if (log.status === "skipped") status = "Terlewat";

      const logDate = log.logged_date ? new Date(log.logged_date) : new Date();
      const dateGroup = logDate.toLocaleDateString("id-ID", { day: "numeric", month: "short", weekday: "short" });

      return {
        id: log.id || log.reminder_id,
        name: log.activity_name,
        dosage: "Sesuai Petunjuk",
        time: `Jadwal: ${log.scheduled_time || "08:00"}`,
        status,
        dateGroup,
      };
    });
  },

  async getStats(): Promise<RecordMonitoringStats> {
    const res = await axiosInstance.get("/admin/dashboard");
    const d = res.data?.data ?? {};
    return {
      totalBloodSugarRecords: d.total_sugar_logs ?? 0,
      totalMealRecords: d.total_meal_logs ?? 0,
      totalActivityRecords: d.total_activity_logs ?? 0,
      totalMedicationRecords: d.total_medication_logs ?? 0,
    };
  },
} as const;
