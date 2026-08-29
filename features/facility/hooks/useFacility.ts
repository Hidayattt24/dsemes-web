"use client";

import { useState, useEffect, useCallback } from "react";
import { facilityService } from "@/services/facilityService";
import type { HealthFacility } from "@/types/facility";

export function useFacility() {
  const [facilities, setFacilities] = useState<HealthFacility[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await facilityService.list({
        search: searchQuery || undefined,
        limit: 100,
        page: 1,
      });
      setFacilities(result.items);
    } catch {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const createFacility = async (data: { name: string; address?: string }) => {
    await facilityService.create(data);
    await loadData();
  };

  const updateFacility = async (id: string, data: { name: string; address?: string }) => {
    await facilityService.update(id, data);
    await loadData();
  };

  const removeFacility = async (id: string) => {
    await facilityService.remove(id);
    await loadData();
  };

  return {
    facilities,
    isLoading,
    searchQuery,
    setSearchQuery,
    createFacility,
    updateFacility,
    removeFacility,
    refetch: loadData,
  };
}
