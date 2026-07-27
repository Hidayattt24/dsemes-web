import { axiosInstance } from "@/lib/axios";
import type { Patient, PatientStats, PatientMeasurement } from "@/types/patient";

function mapBackendPatientToFrontend(p: any): Patient {
  // Initials
  const names = p.full_name ? p.full_name.split(" ") : ["P"];
  const initials = names.map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  // Age calculation
  let age = 0;
  if (p.date_of_birth) {
    const dob = new Date(p.date_of_birth);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  // Doctor/Staff and Puskesmas
  const doctor = p.assigned_staff?.full_name ?? "-";
  const puskesmas = p.assigned_staff?.position_title ?? "-";

  return {
    id: String(p.id),
    name: p.full_name ?? "",
    age,
    gender: p.gender === "laki_laki" || p.gender === "Laki-laki" ? "Laki-laki" : "Perempuan",
    status: p.status === "aktif" || p.status === "Aktif" ? "Aktif" : "Nonaktif",
    lastActive: p.last_active_at ? new Date(p.last_active_at).toLocaleDateString("id-ID") : "Belum aktif",
    initials,
    whatsapp: p.whatsapp_number ?? "",
    height: p.height_cm ?? 0,
    weight: p.weight_kg ?? 0,
    bloodType: p.blood_type ?? "O",
    registeredAt: p.created_at ? new Date(p.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "",
    compliance: p.compliance ?? 0,
    interventionType: p.intervention_type ?? "Mobile App",
    diabetesType: p.diabetes_type ?? "Diabetes Tipe 2",
    doctor,
    puskesmas,
    address: p.address ?? "",
    email: p.email ?? "",
    accountStatus: p.status === "aktif" || p.status === "Aktif" ? "Terverifikasi" : "Belum Terverifikasi",
    nik: p.nik ?? "",
    bpjs: p.bpjs ?? "",
    emergencyName: p.emergency_name ?? "",
    emergencyRelation: p.emergency_relation ?? "",
    emergencyPhone: p.emergency_phone ?? "",
    avatarUrl: p.profile_photo_url || undefined,
    
    // Extended Information
    patientCode: p.patient_code ?? "",
    diagnosisDate: p.diagnosis_date ?? "",
    currentMedication: p.current_medication ?? "",
    allergies: p.allergies ?? "",
    smokingStatus: p.smoking_status ?? "",
    physicalActivityLevel: p.physical_activity_level ?? "",

    // Summary Stats
    latestBloodSugar: p.latest_blood_sugar,
    averageBloodSugar: p.average_blood_sugar,
    latestWeight: p.latest_weight,
    bmi: p.bmi,
    waistCircumferenceCm: p.waist_circumference_cm,
    dailyCalorieTarget: p.daily_calorie_target,
    latestActivityTime: p.latest_activity_time,
    latestActivityName: p.latest_activity_name,
    calorieStatusInfo: p.calorie_status_info ? {
      targetCalories: p.calorie_status_info.target_calories || 0,
      consumedCalories: p.calorie_status_info.consumed_calories ?? 0,
      achievementPercentage: p.calorie_status_info.achievement_percentage ?? 0,
      calorieDifference: p.calorie_status_info.calorie_difference ?? 0,
      calorieDifferenceStr: p.calorie_status_info.calorie_difference_str ?? "0 kcal",
      calorieStatus: p.calorie_status_info.calorie_status ?? "Asupan Sangat Rendah",
      calorieStatusCode: p.calorie_status_info.calorie_status_code ?? "very_low",
      calorieDescription: p.calorie_status_info.calorie_description ?? "-",
    } : undefined,
    measurements: Array.isArray(p.measurements)
      ? p.measurements.map(mapBackendMeasurementToFrontend)
      : undefined,
    latestMeasurement: p.latest_measurement
      ? mapBackendMeasurementToFrontend(p.latest_measurement)
      : undefined,
  };
}

function mapBackendMeasurementToFrontend(m: any): PatientMeasurement {
  return {
    id: m.id,
    patientId: m.patient_id,
    weightKg: m.weight_kg,
    heightCm: m.height_cm,
    bmi: m.bmi,
    bloodPressureSystolic: m.blood_pressure_systolic,
    bloodPressureDiastolic: m.blood_pressure_diastolic,
    bloodSugar: m.blood_sugar,
    bloodSugarTimeType: m.blood_sugar_time_type || m.measurement_time_type || "fasting",
    waistCircumferenceCm: m.waist_circumference_cm,
    dailyCalorieTarget: m.daily_calorie_target,
    notes: m.notes,
    recordedById: m.recorded_by_id,
    recordedByName: m.recorded_by_name ?? "System",
    recordedByRole: m.recorded_by_role ?? "admin",
    measuredAt: m.measured_at,
    createdAt: m.created_at,
  };
}

export const patientService = {
  /** Fetch patients with backend filtering and pagination */
  async getPatients(params?: {
    search?: string;
    gender?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ patients: Patient[]; total: number }> {
    const res = await axiosInstance.get("/admin/patients", { params });
    const items = res.data?.data ?? [];
    const total = res.data?.meta?.total ?? items.length;
    return {
      patients: items.map(mapBackendPatientToFrontend),
      total,
    };
  },

  /** Fetch a specific patient by ID */
  async getPatientById(id: string): Promise<Patient | null> {
    try {
      const res = await axiosInstance.get(`/admin/patients/${id}`);
      if (res.data?.success && res.data?.data) {
        return mapBackendPatientToFrontend(res.data.data);
      }
      return null;
    } catch {
      return null;
    }
  },

  /** Fetch statistics summary for the patient metrics */
  async getPatientStats(): Promise<PatientStats> {
    try {
      const res = await axiosInstance.get("/admin/patients/stats");
      const data = res.data?.data;
      let youngest = data?.youngest_age ?? 0;
      let oldest = data?.oldest_age ?? 0;

      // Fallback: If stats returns 0 (e.g., pending backend restart), compute from patient list
      if ((!youngest || !oldest) && (data?.total_patients ?? 0) > 0) {
        const patientsRes = await patientService.getPatients({ limit: 100 });
        const ages = patientsRes.patients
          .map((p) => p.age)
          .filter((a) => typeof a === "number" && a > 0);
        if (ages.length > 0) {
          youngest = Math.min(...ages);
          oldest = Math.max(...ages);
        }
      }

      return {
        totalPatients: data?.total_patients ?? 0,
        activePatients: data?.active_patients ?? 0,
        youngestAge: youngest,
        oldestAge: oldest,
      };
    } catch {
      return { totalPatients: 0, activePatients: 0, youngestAge: 0, oldestAge: 0 };
    }
  },

  /** Fetch patient blood sugar history */
  async getPatientBloodSugar(id: string): Promise<any[]> {
    const res = await axiosInstance.get(`/admin/patients/${id}/blood-sugar`, { params: { limit: 100 } });
    return res.data?.data ?? [];
  },

  /** Fetch patient meal logs (past 30 days) */
  async getPatientMeals(id: string): Promise<any[]> {
    const res = await axiosInstance.get(`/admin/patients/${id}/meals`);
    return res.data?.data ?? [];
  },

  /** Fetch patient activities timeline */
  async getPatientActivities(id: string): Promise<any[]> {
    const res = await axiosInstance.get(`/admin/patients/${id}/activities`);
    return res.data?.data ?? [];
  },

  /** Fetch health measurements history for a patient */
  async getPatientMeasurements(id: string, rolePrefix: 'admin' | 'staff' = 'admin'): Promise<PatientMeasurement[]> {
    try {
      const res = await axiosInstance.get(`/${rolePrefix}/patients/${id}/measurements`);
      const data = res.data?.data;
      if (Array.isArray(data)) {
        return data.map(mapBackendMeasurementToFrontend);
      }
      return [];
    } catch {
      return [];
    }
  },

  /** Create a new health measurement record as Admin */
  async createPatientMeasurement(id: string, data: any): Promise<PatientMeasurement | null> {
    const res = await axiosInstance.post(`/admin/patients/${id}/measurements`, data);
    if (res.data?.success && res.data?.data) {
      return mapBackendMeasurementToFrontend(res.data.data);
    }
    return null;
  },

  /** Update patient personal & health info as Admin */
  async updatePatientByAdmin(id: string, data: any): Promise<Patient | null> {
    const res = await axiosInstance.put(`/admin/patients/${id}`, data);
    if (res.data?.success && res.data?.data) {
      return mapBackendPatientToFrontend(res.data.data);
    }
    return null;
  },
} as const;
