"use client";

import { useState }             from "react";
import { ActivityBarChart }     from "@/components/dashboard/ActivityBarChart";
import { PatientGrowthChart }   from "@/components/dashboard/PatientGrowthChart";
import { Skeleton }             from "@/components/ui/Skeleton";
import { useActivityChart }     from "@/features/dashboard/hooks/useActivityChart";
import { dashboardService }     from "@/services/dashboardService";
import type { PatientGrowthDataPoint } from "@/types/dashboard";
import { useEffect }            from "react";

export function DashboardCharts() {
  const { data: activityData, isLoading: activityLoading } = useActivityChart();
  const [growthData, setGrowthData]    = useState<PatientGrowthDataPoint[]>([]);
  const [growthLoading, setGrowthLoading] = useState(true);
  const [selectedYear, setSelectedYear]   = useState(2024);

  useEffect(() => {
    let mounted = true;
    setGrowthLoading(true);
    dashboardService
      .getPatientGrowth(selectedYear)
      .then((d) => { if (mounted) setGrowthData(d); })
      .finally(() => { if (mounted) setGrowthLoading(false); });
    return () => { mounted = false; };
  }, [selectedYear]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-6">
        {activityLoading ? (
          <Skeleton height={280} rounded="rounded-2xl" />
        ) : (
          <ActivityBarChart
            data={activityData}
            totalLabel="4.2k"
            trendLabel="8.4%"
          />
        )}
      </div>
      <div className="col-span-12 lg:col-span-6">
        {growthLoading ? (
          <Skeleton height={280} rounded="rounded-2xl" />
        ) : (
          <PatientGrowthChart
            data={growthData}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        )}
      </div>
    </div>
  );
}
