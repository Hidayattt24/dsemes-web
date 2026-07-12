import { StatisticCard } from "@/components/dashboard/StatisticCard";
import { StatisticCardSkeleton } from "@/components/ui/Skeleton";
import type { DashboardSummaryCardData } from "../hooks/useStaffDashboard";
import type { MetricCard } from "@/types/dashboard";

interface DashboardSummaryCardsProps {
  readonly cards: readonly DashboardSummaryCardData[];
  readonly loading: boolean;
}

export function DashboardSummaryCards({ cards, loading }: DashboardSummaryCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatisticCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const metricCard: MetricCard = {
          label: card.label,
          value: card.value,
          badgeVariant: card.variant,
          badgeLabel: card.change,
          icon: card.icon,
        };
        return <StatisticCard key={card.label} card={metricCard} />;
      })}
    </div>
  );
}
