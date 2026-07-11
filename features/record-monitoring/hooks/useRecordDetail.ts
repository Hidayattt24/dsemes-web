"use client";

import { useState, useEffect } from "react";
import { recordMonitoringService } from "../services/recordMonitoringService";
import type {
  PatientRecord,
  BloodSugarLog,
  MealLog,
  ActivityLog,
  MedicationLog,
} from "../types/record";

interface UseRecordDetailReturn {
  readonly patient: PatientRecord | null;
  readonly bloodSugarLogs: BloodSugarLog[];
  readonly mealLogs: MealLog[];
  readonly activityLogs: ActivityLog[];
  readonly medicationLogs: MedicationLog[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refetch: () => void;
}

export function useRecordDetail(patientId: string): UseRecordDetailReturn {
  const [patient, setPatient] = useState<PatientRecord | null>(null);
  const [bloodSugarLogs, setBloodSugarLogs] = useState<BloodSugarLog[]>([]);
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const p = await recordMonitoringService.getPatientRecordById(patientId);
      if (!p) {
        setError("Pasien tidak ditemukan.");
        return;
      }
      
      const [bs, meals, acts, meds] = await Promise.all([
        recordMonitoringService.getBloodSugarLogs(patientId),
        recordMonitoringService.getMealLogs(patientId),
        recordMonitoringService.getActivityLogs(patientId),
        recordMonitoringService.getMedicationLogs(patientId),
      ]);

      setPatient(p);
      setBloodSugarLogs(bs);
      setMealLogs(meals);
      setActivityLogs(acts);
      setMedicationLogs(meds);
    } catch {
      setError("Gagal memuat detail catatan monitoring.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchData();
    }
  }, [patientId]);

  return {
    patient,
    bloodSugarLogs,
    mealLogs,
    activityLogs,
    medicationLogs,
    isLoading,
    error,
    refetch: fetchData,
  };
}
