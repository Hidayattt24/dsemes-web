import { axiosInstance } from "@/lib/axios";
import type {
  PatientRecord,
  PatientListParams,
  PaginationMeta,
  BloodSugarLog,
  MealLog,
  ActivityLog,
  MedicationLog,
  RecordMonitoringStats,
} from "../types/record";

const mapPatientRecord = (data: any): PatientRecord => {
  let age = 50;
  if (data.date_of_birth) {
    const dob = new Date(data.date_of_birth);
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs);
    age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const emergencyContact = data.emergency_phone
    ? `${data.emergency_phone} (${data.emergency_relation ?? "Keluarga"})`
    : "-";

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

  const initials = data.full_name
    ? data.full_name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase()
    : "P";

  const doctor = data.assigned_staff?.full_name ?? "Dr. Ahmad Faisal";
  const puskesmas = data.assigned_staff?.position_title ?? "Puskesmas Ulee Kareng";
  const registeredAt = data.created_at
    ? new Date(data.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    : "-";

  return {
    id: data.id,
    name: data.full_name,
    age,
    gender: data.gender === "laki_laki" ? "Laki-laki" : "Perempuan",
    dateOfBirth: data.date_of_birth ?? "-",
    address: data.address ?? "-",
    initials,
    puskesmas,
    avatarUrl: data.profile_photo_url || undefined,
    lastActive: data.latest_activity_time
      ? new Date(data.latest_activity_time).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
      : "Hari ini",
    diagnosisDate: data.diagnosis_date ?? "-",
    emergencyContact,
    dailyCalorieTarget: data.daily_calorie_target,
    compliance: data.compliance ?? 0,
    lastActiveAt: data.last_active_at,
    whatsapp: data.whatsapp_number ?? "-",
    height: data.height_cm ?? 0,
    weight: data.weight_kg ?? 0,
    bloodType: data.blood_type ?? "-",
    registeredAt,
    interventionType: data.intervention_type ?? "-",
    diabetesType: data.diabetes_type ?? "-",
    doctor,
    email: data.email ?? "-",
    accountStatus: data.status === "aktif" || data.status === "Aktif" ? "Terverifikasi" : "Belum Terverifikasi",
    nik: data.nik ?? "-",
    bpjs: data.bpjs ?? "-",
    emergencyName: data.emergency_name ?? "-",
    emergencyRelation: data.emergency_relation ?? "-",
    emergencyPhone: data.emergency_phone ?? "-",
    patientCode: data.patient_code ?? "-",
    currentMedication: data.current_medication ?? "-",
    allergies: data.allergies ?? "-",
    smokingStatus: data.smoking_status ?? "-",
    physicalActivityLevel: data.physical_activity_level ?? "-",
    latestBloodSugar: data.latest_blood_sugar,
    averageBloodSugar: data.average_blood_sugar,
    latestWeight: data.latest_weight,
    bmi: data.bmi,
    latestActivityTime: data.latest_activity_time,
    latestActivityName: data.latest_activity_name,
    dailySummary: {
      bloodSugar,
      bloodSugarTime,
      meal,
      mealType,
      activity,
      activityType,
      status,
      bloodSugarStatus: data.latest_blood_sugar_status,
      avgBloodSugar: data.average_blood_sugar,
    },
  };
};

export const recordMonitoringService = {
  async getPatientRecords(params: PatientListParams = {}, rolePrefix: 'admin' | 'staff' = 'staff'): Promise<{ items: PatientRecord[]; pagination: PaginationMeta }> {
    const res = await axiosInstance.get(`/${rolePrefix}/patients`, {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        search: params.search || undefined,
        gender: params.gender || undefined,
        status: params.status || undefined,
        sort_by: params.sort_by || undefined,
        sort_order: params.sort_order || undefined,
        blood_sugar_status: params.blood_sugar_status || undefined,
        risk_level: params.risk_level || undefined,
        compliance_min: params.compliance_min,
        compliance_max: params.compliance_max,
        age_min: params.age_min,
        age_max: params.age_max,
      },
    });
    const list = res.data?.data ?? [];
    const meta = res.data?.meta ?? { page: 1, per_page: 10, total: 0, total_pages: 0 };
    return {
      items: list.map(mapPatientRecord),
      pagination: meta,
    };
  },

  async getPatientRecordById(id: string, rolePrefix: 'admin' | 'staff' = 'staff'): Promise<PatientRecord | null> {
    try {
      const res = await axiosInstance.get(`/${rolePrefix}/patients/${id}`);
      if (res.data?.data) {
        return mapPatientRecord(res.data.data);
      }
      return null;
    } catch {
      return null;
    }
  },

  async getBloodSugarLogs(patientId: string, rolePrefix: 'admin' | 'staff' = 'staff'): Promise<BloodSugarLog[]> {
    const res = await axiosInstance.get(`/${rolePrefix}/patients/${patientId}/blood-sugar`, { params: { limit: 100 } });
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
      .map((item) => ({
        id: `bs-${item.rawDate.getTime()}`,
        date: item.dateStr,
        before: item.before > 0 ? item.before : 100,
        after: item.after > 0 ? item.after : 140,
        rawDate: item.rawDate,
      }))
      .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
  },

  async getMealLogs(patientId: string, rolePrefix: 'admin' | 'staff' = 'staff'): Promise<MealLog[]> {
    const res = await axiosInstance.get(`/${rolePrefix}/patients/${patientId}/meals`, { params: { limit: 100 } });
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

  async getActivityLogs(patientId: string, rolePrefix: 'admin' | 'staff' = 'staff'): Promise<ActivityLog[]> {
    const res = await axiosInstance.get(`/${rolePrefix}/patients/${patientId}/activities`, { params: { limit: 100 } });
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

  async getMedicationLogs(patientId: string, rolePrefix: 'admin' | 'staff' = 'staff'): Promise<MedicationLog[]> {
    const res = await axiosInstance.get(`/${rolePrefix}/patients/${patientId}/medications`, { params: { limit: 100 } });
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

  async getStats(rolePrefix: 'admin' | 'staff' = 'staff'): Promise<RecordMonitoringStats> {
    const res = await axiosInstance.get(`/${rolePrefix}/dashboard/stats`);
    const d = res.data?.data ?? {};
    return {
      totalBloodSugarRecords: d.total_sugar_logs ?? 0,
      totalMealRecords: d.total_meal_logs ?? 0,
      totalActivityRecords: d.total_activity_logs ?? 0,
      totalMedicationRecords: d.total_medication_logs ?? 0,
    };
  },
} as const;
