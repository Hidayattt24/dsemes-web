"use client";

import { ActivityBarChart } from "@/components/dashboard/ActivityBarChart";
import { Skeleton } from "@/components/ui/Skeleton";
import { useActivityChart } from "@/features/dashboard/hooks/useActivityChart";

export function DashboardCharts() {
  const { data: activityData, isLoading: activityLoading } = useActivityChart();

  const totalValue = activityData.reduce((sum, item) => sum + item.value, 0);
  const totalLabel = totalValue >= 1000 ? `${(totalValue / 1000).toFixed(1)}k` : totalValue.toString();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        {activityLoading ? (
          <Skeleton height={280} rounded="rounded-2xl" />
        ) : (
          <ActivityBarChart
            data={activityData}
            totalLabel={totalLabel}
          />
        )}
      </div>
    </div>
  );
}
