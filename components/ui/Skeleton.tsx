interface SkeletonProps {
  readonly className?: string;
  readonly height?:    string | number;
  readonly width?:     string | number;
  readonly rounded?:   string;
}

export function Skeleton({
  className = "",
  height,
  width,
  rounded = "rounded-lg",
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[#E2E8F0] ${rounded} ${className}`}
      style={{ height, width }}
      aria-hidden="true"
    />
  );
}

/** Pre-built skeleton for a stat card */
export function StatisticCardSkeleton() {
  return (
    <div className="premium-card p-6 flex flex-col gap-4">
      <div className="flex justify-between">
        <Skeleton width={48} height={48} rounded="rounded-2xl" />
        <Skeleton width={60} height={24} rounded="rounded-full" />
      </div>
      <Skeleton height={12} width="50%" />
      <Skeleton height={32} width="40%" />
    </div>
  );
}
