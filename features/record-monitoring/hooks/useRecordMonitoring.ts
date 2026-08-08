"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { recordMonitoringService } from "../services/recordMonitoringService";
import type { PatientRecord, RecordMonitoringStats, PaginationMeta, PatientListParams } from "../types/record";

interface UseRecordMonitoringReturn {
  readonly patients: PatientRecord[];
  readonly stats: RecordMonitoringStats | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly searchQuery: string;
  readonly dateFilter: string;
  readonly complianceFilter: string;
  readonly riskFilter: string;
  readonly genderFilter: string;
  readonly bloodSugarStatusFilter: string;
  readonly sortBy: string;
  readonly sortOrder: string;
  readonly pagination: PaginationMeta;
  readonly rolePrefix: 'admin' | 'staff';
  readonly setSearchQuery: (q: string) => void;
  readonly setDateFilter: (d: string) => void;
  readonly setComplianceFilter: (c: string) => void;
  readonly setRiskFilter: (r: string) => void;
  readonly setGenderFilter: (g: string) => void;
  readonly setBloodSugarStatusFilter: (b: string) => void;
  readonly setSortBy: (s: string) => void;
  readonly setSortOrder: (s: string) => void;
  readonly setPage: (p: number) => void;
  readonly refetch: () => void;
}

export function useRecordMonitoring(): UseRecordMonitoringReturn {
  const pathname = usePathname();
  const rolePrefix: 'admin' | 'staff' = pathname.startsWith("/admin") ? "admin" : "staff";

  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [stats, setStats] = useState<RecordMonitoringStats | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>({ page: 1, per_page: 10, total: 0, total_pages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [complianceFilter, setComplianceFilter] = useState("Semua");
  const [riskFilter, setRiskFilter] = useState("Semua");
  const [genderFilter, setGenderFilter] = useState("Semua");
  const [bloodSugarStatusFilter, setBloodSugarStatusFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const buildParams = useCallback((): PatientListParams => {
    const params: Record<string, unknown> = {
      page,
      limit: 10,
    };

    if (searchQuery) params.search = searchQuery;
    if (genderFilter !== "Semua") params.gender = genderFilter;
    if (bloodSugarStatusFilter !== "Semua") params.blood_sugar_status = bloodSugarStatusFilter;
    if (riskFilter !== "Semua") params.risk_level = riskFilter;

    if (complianceFilter !== "Semua") {
      if (complianceFilter === "Patuh") {
        params.compliance_min = 70;
      } else if (complianceFilter === "Kurang Patuh") {
        params.compliance_min = 40;
        params.compliance_max = 69;
      } else if (complianceFilter === "Tidak Patuh") {
        params.compliance_max = 39;
      }
    }

    if (sortBy) {
      params.sort_by = sortBy;
      params.sort_order = sortOrder;
    }

    return params as PatientListParams;
  }, [page, searchQuery, genderFilter, bloodSugarStatusFilter, riskFilter, complianceFilter, sortBy, sortOrder]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [patientResult, statsSummary] = await Promise.all([
        recordMonitoringService.getPatientRecords(buildParams(), rolePrefix),
        recordMonitoringService.getStats(rolePrefix),
      ]);
      setPatients(patientResult.items);
      setPagination(patientResult.pagination);
      setStats(statsSummary);
    } catch {
      setError("Gagal memuat data monitoring catatan.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildParams]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  const handleSetSearchQuery = useCallback((q: string) => {
    setSearchQuery(q);
    setPage(1);
  }, []);

  const handleSetGenderFilter = useCallback((g: string) => {
    setGenderFilter(g);
    setPage(1);
  }, []);

  const handleSetBloodSugarStatusFilter = useCallback((b: string) => {
    setBloodSugarStatusFilter(b);
    setPage(1);
  }, []);

  const handleSetComplianceFilter = useCallback((c: string) => {
    setComplianceFilter(c);
    setPage(1);
  }, []);

  const handleSetRiskFilter = useCallback((r: string) => {
    setRiskFilter(r);
    setPage(1);
  }, []);

  const handleSetSortBy = useCallback((s: string) => {
    if (s === sortBy) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(s);
      setSortOrder("desc");
    }
    setPage(1);
  }, [sortBy]);

  return {
    patients,
    stats,
    isLoading,
    error,
    searchQuery,
    dateFilter,
    complianceFilter,
    riskFilter,
    genderFilter,
    bloodSugarStatusFilter,
    sortBy,
    sortOrder,
    pagination,
    rolePrefix,
    setSearchQuery: handleSetSearchQuery,
    setDateFilter,
    setComplianceFilter: handleSetComplianceFilter,
    setRiskFilter: handleSetRiskFilter,
    setGenderFilter: handleSetGenderFilter,
    setBloodSugarStatusFilter: handleSetBloodSugarStatusFilter,
    setSortBy: handleSetSortBy,
    setSortOrder,
    setPage,
    refetch: fetchData,
  };
}
