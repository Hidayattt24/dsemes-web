import { Skeleton } from "@/components/ui/Skeleton";

export function FormSkeleton() {
  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] relative animate-pulse">
      {/* Action Toolbar */}
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-2">
          <Skeleton width={260} height={32} />
          <Skeleton width={320} height={16} />
        </div>
        <div className="flex gap-3">
          <Skeleton width={80} height={40} rounded="rounded-full" />
          <Skeleton width={130} height={40} rounded="rounded-full" />
        </div>
      </div>

      {/* Form Cards Stack */}
      <div className="space-y-8 w-full">
        {/* Card 1: Informasi Akun */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm space-y-6">
          <div className="border-b border-[#E2E8F0]/60 pb-3">
            <Skeleton width={120} height={18} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Skeleton width={100} height={12} />
              <Skeleton width="100%" height={48} rounded="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton width={80} height={12} />
              <Skeleton width="100%" height={48} rounded="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton width={80} height={12} />
              <Skeleton width="100%" height={48} rounded="rounded-xl" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Skeleton width={120} height={12} />
              <Skeleton width="100%" height={48} rounded="rounded-xl" />
            </div>
          </div>
        </div>

        {/* Card 2: Keamanan */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm space-y-6">
          <div className="border-b border-[#E2E8F0]/60 pb-3">
            <Skeleton width={80} height={18} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton width={80} height={12} />
              <Skeleton width="100%" height={48} rounded="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton width={140} height={12} />
              <Skeleton width="100%" height={48} rounded="rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
