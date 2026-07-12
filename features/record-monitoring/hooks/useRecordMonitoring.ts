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
  readonly complianceFilter: string;
  readonly riskFilter: string;
  readonly setSearchQuery: (q: string) => void;
  readonly setDateFilter: (d: string) => void;
  readonly setComplianceFilter: (c: string) => void;
  readonly setRiskFilter: (r: string) => void;
  readonly refetch: () => void;
}

export function useRecordMonitoring(): UseRecordMonitoringReturn {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [stats, setStats] = useState<RecordMonitoringStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [complianceFilter, setComplianceFilter] = useState("Semua");
  const [riskFilter, setRiskFilter] = useState("Semua");

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

      // Compliance calculation derived from patient id
      const compliance = parseInt(patient.id) % 3 === 0 ? "Tidak Patuh" : parseInt(patient.id) % 2 === 0 ? "Kurang Patuh" : "Patuh";
      const matchesCompliance = complianceFilter === "Semua" || compliance === complianceFilter;

      // Risk calculation derived from patient daily summary status
      let riskLevel = "Rendah";
      if (patient.dailySummary.status === "Tinggi") {
        riskLevel = parseInt(patient.id) % 2 === 0 ? "Sangat Tinggi" : "Tinggi";
      } else if (patient.dailySummary.status === "Waspada") {
        riskLevel = "Sedang";
      }
      const matchesRisk = riskFilter === "Semua" || riskLevel === riskFilter;

      return matchesSearch && matchesDate && matchesCompliance && matchesRisk;
    });
  }, [patients, searchQuery, dateFilter, complianceFilter, riskFilter]);

  return {
    patients: filteredPatients,
    stats,
    isLoading,
    error,
    searchQuery,
    dateFilter,
    complianceFilter,
    riskFilter,
    setSearchQuery,
    setDateFilter,
    setComplianceFilter,
    setRiskFilter,
    refetch: fetchData,
  };
}
