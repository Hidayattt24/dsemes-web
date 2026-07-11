"use client";

import { ActivityBarChart } from "@/components/dashboard/ActivityBarChart";
import { Skeleton } from "@/components/ui/Skeleton";
import { useActivityChart } from "@/features/dashboard/hooks/useActivityChart";

export function DashboardCharts() {
  const { data: activityData, isLoading: activityLoading } = useActivityChart();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
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
    </div>
  );
}
