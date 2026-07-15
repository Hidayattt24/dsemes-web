import { axiosInstance } from "@/lib/axios";
import type { Patient, PatientStats } from "@/types/patient";

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
  const doctor = p.assigned_staff?.full_name ?? "Dr. Ahmad Faisal";
  const puskesmas = p.assigned_staff?.position_title ?? "Puskesmas Kuta Alam";

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
    latestActivityTime: p.latest_activity_time,
    latestActivityName: p.latest_activity_name,
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
    const res = await axiosInstance.get("/admin/patients/stats");
    const data = res.data?.data;
    return {
      totalPatients: data?.total_patients ?? 0,
      activePatients: data?.active_patients ?? 0,
      averageAge: data?.average_age ?? 0,
    };
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
} as const;
