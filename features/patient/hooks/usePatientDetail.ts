"use client";

import { useEffect, useState } from "react";
import { patientService } from "@/services/patientService";
import type { Patient } from "@/types/patient";

interface UsePatientDetailReturn {
  readonly patient: Patient | null;
  readonly bloodSugar: any[];
  readonly meals: any[];
  readonly activities: any[];
  readonly educationActivities: any;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refetch: () => void;
}

export function usePatientDetail(id: string): UsePatientDetailReturn {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [bloodSugar, setBloodSugar] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [educationActivities, setEducationActivities] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const [patientData, bsData, mealsData, actData, eduActData] = await Promise.all([
        patientService.getPatientById(id),
        patientService.getPatientBloodSugar(id),
        patientService.getPatientMeals(id),
        patientService.getPatientActivities(id),
        patientService.getPatientEducationActivities(id),
      ]);
      if (patientData) {
        setPatient(patientData);
        setBloodSugar(bsData);
        setMeals(mealsData);
        setActivities(actData);
        setEducationActivities(eduActData);
      } else {
        setError("Pasien tidak ditemukan.");
      }
    } catch {
      setError("Gagal memuat detail pasien.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      void fetchPatient();
    }
  }, [id]);

  return {
    patient,
    bloodSugar,
    meals,
    activities,
    educationActivities,
    isLoading,
    error,
    refetch: fetchPatient,
  };
}
