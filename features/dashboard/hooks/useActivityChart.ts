"use client";

import { useEffect, useState } from "react";
import { dashboardService }   from "@/services/dashboardService";
import type { ActivityDataPoint } from "@/types/dashboard";

interface UseActivityChartReturn {
  readonly data:      ActivityDataPoint[];
  readonly isLoading: boolean;
  readonly error:     string | null;
}

export function useActivityChart(): UseActivityChartReturn {
  const [data, setData]           = useState<ActivityDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    dashboardService
      .getActivityChart()
      .then((result) => { if (mounted) setData(result); })
      .catch(() => { if (mounted) setError("Gagal memuat aktivitas."); })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  return { data, isLoading, error };
}
