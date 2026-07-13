"use client";

import { ActivityBarChart } from "@/components/dashboard/ActivityBarChart";
import { Skeleton } from "@/components/ui/Skeleton";
import { useActivityChart } from "@/features/dashboard/hooks/useActivityChart";

export function DashboardCharts() {
  const { data: activityData, isLoading: activityLoading } = useActivityChart();

  const totalValue = activityData.reduce((sum, item) => sum + item.value, 0);
  const totalLabel = totalValue >= 1000 ? `${(totalValue / 1000).toFixed(1)}k` : totalValue.toString();

  // Compare second half of the week vs first half to calculate the trend
  const firstHalf = activityData.slice(0, 3).reduce((sum, item) => sum + item.value, 0);
  const secondHalf = activityData.slice(4, 7).reduce((sum, item) => sum + item.value, 0);
  const trendPercent = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0;
  const trendLabel = `${trendPercent >= 0 ? "+" : ""}${trendPercent.toFixed(1)}%`;

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        {activityLoading ? (
          <Skeleton height={280} rounded="rounded-2xl" />
        ) : (
          <ActivityBarChart
            data={activityData}
            totalLabel={totalLabel}
            trendLabel={trendLabel}
          />
        )}
      </div>
    </div>
  );
}
