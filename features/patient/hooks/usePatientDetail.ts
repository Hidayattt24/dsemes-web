"use client";

import { useEffect, useState } from "react";
import { patientService } from "@/services/patientService";
import type { Patient } from "@/types/patient";

interface UsePatientDetailReturn {
  readonly patient: Patient | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refetch: () => void;
}

export function usePatientDetail(id: string): UsePatientDetailReturn {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await patientService.getPatientById(id);
      if (data) {
        setPatient(data);
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
    isLoading,
    error,
    refetch: fetchPatient,
  };
}
