"use client";

import { useState, useEffect, useMemo } from "react";
import { recordMonitoringService } from "../services/recordMonitoringService";
import type { PatientRecord, RecordMonitoringStats } from "../types/record";

interface UseRecordMonitoringReturn {
  readonly patients: PatientRecord[];
  readonly stats: RecordMonitoringStats | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly searchQuery: string;
  readonly dateFilter: string;
  readonly setSearchQuery: (q: string) => void;
  readonly setDateFilter: (d: string) => void;
  readonly refetch: () => void;
}

export function useRecordMonitoring(): UseRecordMonitoringReturn {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [stats, setStats] = useState<RecordMonitoringStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [patientList, statsSummary] = await Promise.all([
        recordMonitoringService.getPatientRecords(),
        recordMonitoringService.getStats(),
      ]);
      setPatients(patientList);
      setStats(statsSummary);
    } catch {
      setError("Gagal memuat data monitoring catatan.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `p-00${patient.id}`.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate = true; // Simulated match

      return matchesSearch && matchesDate;
    });
  }, [patients, searchQuery, dateFilter]);

  return {
    patients: filteredPatients,
    stats,
    isLoading,
    error,
    searchQuery,
    dateFilter,
    setSearchQuery,
    setDateFilter,
    refetch: fetchData,
  };
}
