"use client";

import { useState, useEffect } from "react";
import { administratorService } from "../services/administratorService";
import type { Administrator } from "../types/administrator";

export function useAdministrator() {
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await administratorService.getAdministrators();
      setAdministrators(data);
    } catch {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteAdmin = async (id: string) => {
    try {
      await administratorService.deleteAdministrator(id);
      await loadData();
    } catch {
      // Error handling
    }
  };

  // Filtered List
  const filteredAdministrators = administrators.filter((admin) => {
    const matchSearch =
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchRole = roleFilter === "Semua" || admin.role === roleFilter;
    const matchStatus = statusFilter === "Semua" || admin.status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  // Stats
  const totalCount = administrators.length;
  const activeCount = administrators.filter((a) => a.status === "Aktif").length;

  return {
    administrators: filteredAdministrators,
    totalCount,
    activeCount,
    isLoading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    deleteAdmin,
    refetch: loadData,
  };
}
