"use client";

import { useEffect, useState } from "react";
import { patientService } from "@/services/patientService";
import type { Patient, PatientStats } from "@/types/patient";

interface UsePatientsReturn {
  readonly patients: Patient[];
  readonly stats: PatientStats | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly searchQuery: string;
  readonly statusFilter: string;
  readonly genderFilter: string;
  readonly currentPage: number;
  readonly itemsPerPage: number;
  readonly totalCount: number;
  readonly totalPages: number;
  readonly startItem: number;
  readonly endItem: number;
  readonly setSearchQuery: (q: string) => void;
  readonly setStatusFilter: (status: string) => void;
  readonly setGenderFilter: (gender: string) => void;
  readonly setCurrentPage: (page: number) => void;
  readonly refetch: () => void;
}

export function usePatients(): UsePatientsReturn {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<PatientStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [genderFilter, setGenderFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const genderParam = genderFilter === "Laki-laki" ? "laki_laki" : genderFilter === "Perempuan" ? "perempuan" : genderFilter;
      const statusParam = statusFilter === "Aktif" ? "aktif" : statusFilter === "Nonaktif" ? "nonaktif" : statusFilter;

      const [patientListRes, statsSummary] = await Promise.all([
        patientService.getPatients({
          search: searchQuery,
          status: statusParam,
          gender: genderParam,
          page: currentPage,
          limit: itemsPerPage,
        }),
        patientService.getPatientStats(),
      ]);
      setPatients(patientListRes.patients);
      setTotalCount(patientListRes.total);
      setStats(statsSummary);
    } catch {
      setError("Gagal memuat data pasien.");
    } finally {
      setIsLoading(false);
    }
  };

  // Re-fetch when parameters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, statusFilter, genderFilter, currentPage]);

  // Handle page resets when filters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchQuery, statusFilter, genderFilter]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  return {
    patients,
    stats,
    isLoading,
    error,
    searchQuery,
    statusFilter,
    genderFilter,
    currentPage,
    itemsPerPage,
    totalCount,
    totalPages,
    startItem,
    endItem,
    setSearchQuery,
    setStatusFilter,
    setGenderFilter,
    setCurrentPage,
    refetch: fetchData,
  };
}
