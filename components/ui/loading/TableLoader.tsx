import { Skeleton } from "@/components/ui/Skeleton";

export function TableLoader() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] animate-pulse">
      {/* Search and Filters Skeleton */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-4 items-center w-full">
        <Skeleton width="100%" height={48} rounded="rounded-xl" className="flex-1" />
        <Skeleton width={180} height={48} rounded="rounded-xl" />
        <Skeleton width={180} height={48} rounded="rounded-xl" />
      </div>

      {/* Table Container Skeleton */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-4 flex justify-between items-center">
          <Skeleton width={120} height={16} />
          <Skeleton width={80} height={16} />
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[#E2E8F0] px-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="py-4 flex justify-between items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <Skeleton width={40} height={40} rounded="rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton width="40%" height={14} />
                  <Skeleton width="20%" height={10} />
                </div>
              </div>
              <Skeleton width={100} height={14} />
              <Skeleton width={120} height={14} />
              <Skeleton width={80} height={32} rounded="rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
