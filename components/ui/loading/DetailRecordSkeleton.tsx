import { Skeleton } from "@/components/ui/Skeleton";

export function DetailRecordSkeleton() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] animate-pulse">
      {/* Breadcrumbs & Title Toolbar */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4">
        <div className="space-y-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2">
            <Skeleton width={80} height={14} />
            <span className="text-[#E2E8F0] text-sm">/</span>
            <Skeleton width={120} height={14} />
          </div>
          {/* Name & Badge */}
          <div className="flex items-center gap-3">
            <Skeleton width={180} height={28} />
            <Skeleton width={60} height={24} rounded="rounded-full" />
          </div>
          {/* Subtitle */}
          <Skeleton width={240} height={14} />
        </div>
      </header>

      {/* Patient Overview Card Skeleton */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center gap-6">
        <Skeleton width={96} height={96} rounded="rounded-full" className="flex-shrink-0" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton width={80} height={12} />
              <Skeleton width={120} height={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layout for Charts & Lists Skeletons */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col h-[520px] justify-between"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Skeleton width={24} height={24} rounded="rounded-full" />
                <Skeleton width={160} height={18} />
              </div>
              {idx === 1 && <Skeleton width={110} height={32} />}
            </div>

            {/* Chart Area / Donut area placeholder */}
            <div className="flex-1 bg-[#F8FAFC] rounded-xl mb-4 p-4 border border-[#E2E8F0] flex flex-col justify-center items-center">
              <Skeleton width="100%" height="100%" />
            </div>

            {/* Table / List rows */}
            <div className="space-y-3 pt-2">
              <Skeleton width="100%" height={16} />
              <Skeleton width="100%" height={16} />
              <Skeleton width="80%" height={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
