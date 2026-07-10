"use client";

import { useEffect, useState, useMemo } from "react";
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

  const fetchData = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const [patientList, statsSummary] = await Promise.all([
        patientService.getPatients(),
        patientService.getPatientStats(),
      ]);
      setPatients(patientList);
      setStats(statsSummary);
    } catch {
      setError("Gagal memuat data pasien.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  // Filter patients locally
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.puskesmas.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.doctor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "Semua" || patient.status === statusFilter;

      const matchesGender =
        genderFilter === "Semua" || patient.gender === genderFilter;

      return matchesSearch && matchesStatus && matchesGender;
    });
  }, [patients, searchQuery, statusFilter, genderFilter]);

  // Handle page resets when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, genderFilter]);

  // Pagination calculation
  const totalCount = filteredPatients.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  const paginatedPatients = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredPatients, currentPage, itemsPerPage]);

  return {
    patients: paginatedPatients,
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
