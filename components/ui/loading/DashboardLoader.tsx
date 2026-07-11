import { Skeleton } from "@/components/ui/Skeleton";

export function DashboardLoader() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] animate-pulse">
      {/* Title block */}
      <div className="space-y-2">
        <Skeleton width={200} height={28} />
        <Skeleton width={320} height={14} />
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton width={100} height={12} />
              <Skeleton width={24} height={24} rounded="rounded-full" />
            </div>
            <Skeleton width={80} height={28} />
            <Skeleton width="60%" height={10} />
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm h-[400px]">
          <Skeleton width={180} height={18} className="mb-6" />
          <Skeleton width="100%" height={280} rounded="rounded-xl" />
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm h-[400px]">
          <Skeleton width={140} height={18} className="mb-6" />
          <Skeleton width="100%" height={280} rounded="rounded-xl" />
        </div>
      </div>
    </div>
  );
}
