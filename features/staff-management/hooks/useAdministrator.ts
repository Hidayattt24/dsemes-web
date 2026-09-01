"use client";

import { useState, useEffect, useCallback } from "react";
import { administratorService } from "../services/administratorService";
import type { Administrator } from "../types/administrator";

export function useAdministrator() {
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await administratorService.list({
        search: searchQuery || undefined,
        status: statusFilter ? statusFilter.toLowerCase() : undefined,
        role: "staff",
        page,
        limit,
      });
      const staffItems = result.items.filter((item) => item.role === "staff");
      setAdministrators(staffItems);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter, page, limit]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [searchQuery, statusFilter]);

  const deleteAdmin = async (id: string) => {
    try {
      await administratorService.remove(id);
      await loadData();
    } catch {
      // Error handling
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      await administratorService.toggleStatus(id);
      await loadData();
    } catch {
      // Error handling
    }
  };

  const activeCount = administrators.filter((a) => a.status === "Aktif").length;

  return {
    administrators,
    totalCount: total,
    activeCount,
    isLoading,
    page,
    setPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    deleteAdmin,
    toggleStatus,
    refetch: loadData,
  };
}
