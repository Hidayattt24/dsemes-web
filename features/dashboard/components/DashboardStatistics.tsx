"use client";

import { StatisticCard } from "@/components/dashboard/StatisticCard";
import { StatisticCardSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";

export function DashboardStatistics() {
  const { cards, isLoading, error, refetch } = useDashboardStats();

  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => <StatisticCardSkeleton key={i} />)
        : cards.map((card) => <StatisticCard key={card.label} card={card} />)}
    </div>
  );
}
