export interface Patient {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly gender: "Laki-laki" | "Perempuan";
  readonly status: "Aktif" | "Nonaktif";
  readonly lastActive: string;
  readonly initials: string;
  readonly whatsapp: string;
  readonly height: number;
  readonly weight: number;
  readonly bloodType: "A" | "B" | "AB" | "O";
  readonly registeredAt: string;
  readonly compliance: number; // e.g. 85 for 85%
  readonly interventionType: "Mobile App" | "Web App";
  readonly diabetesType: string;
  readonly doctor: string;
  readonly puskesmas: string;
  readonly address: string;
  readonly email: string;
  readonly accountStatus: "Terverifikasi" | "Menunggu" | "Belum Terverifikasi";
  
  // NIK & BPJS
  readonly nik: string;
  readonly bpjs: string;

  // Emergency Contact
  readonly emergencyName: string;
  readonly emergencyRelation: string;
  readonly emergencyPhone: string;

  // Avatar Image URL
  readonly avatarUrl?: string;

  // Extended Information
  readonly patientCode?: string;
  readonly diagnosisDate?: string;
  readonly currentMedication?: string;
  readonly allergies?: string;
  readonly smokingStatus?: string;
  readonly physicalActivityLevel?: string;

  // Patient Summary Stats
  readonly latestBloodSugar?: number;
  readonly averageBloodSugar?: number;
  readonly latestWeight?: number;
  readonly bmi?: number;
  readonly latestActivityTime?: string;
  readonly latestActivityName?: string;
}

export interface PatientStats {
  readonly totalPatients: number;
  readonly activePatients: number;
  readonly averageAge: number;
}
