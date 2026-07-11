import { Skeleton } from "@/components/ui/Skeleton";

export function DetailPatientSkeleton() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] animate-pulse">
      {/* Back Link & Header Action Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton width={80} height={14} />
            <span className="text-[#E2E8F0] text-sm">/</span>
            <Skeleton width={100} height={14} />
          </div>
        </div>
        <Skeleton width={120} height={36} rounded="rounded-xl" />
      </div>

      {/* Profile summary bento cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Col 4: PatientProfileCard Skeleton */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center space-y-6">
          <Skeleton width={80} height={80} rounded="rounded-full" />
          <div className="space-y-2 w-full flex flex-col items-center">
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={12} />
          </div>
          <div className="w-full pt-4 border-t border-[#E2E8F0]/60 space-y-3">
            <div className="flex justify-between">
              <Skeleton width={60} height={12} />
              <Skeleton width={100} height={12} />
            </div>
            <div className="flex justify-between">
              <Skeleton width={60} height={12} />
              <Skeleton width={120} height={12} />
            </div>
          </div>
        </div>

        {/* Col 8: PatientPersonalInfoCard Skeleton */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm space-y-6 h-full">
          <div className="pb-3 border-b border-[#E2E8F0]/60">
            <Skeleton width={140} height={18} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton width={100} height={12} />
                <Skeleton width="80%" height={16} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics & Analytics section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Col 12: PatientBloodSugarChart Skeleton */}
        <div className="lg:col-span-12 bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm space-y-6 h-[400px]">
          <div className="flex justify-between items-center">
            <Skeleton width={180} height={18} />
            <Skeleton width={110} height={32} />
          </div>
          <div className="flex-1 bg-[#F8FAFC] rounded-xl h-[280px] border border-[#E2E8F0] flex items-center justify-center">
            <Skeleton width="96%" height="90%" />
          </div>
        </div>

        {/* Col 7: PatientCalorieChart Skeleton */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm space-y-6 h-[400px]">
          <Skeleton width={160} height={18} />
          <div className="flex-1 bg-[#F8FAFC] rounded-xl h-[280px] border border-[#E2E8F0] flex items-center justify-center">
            <Skeleton width="96%" height="90%" />
          </div>
        </div>

        {/* Col 5: PatientEducationActivity Skeleton */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm space-y-6 h-[400px]">
          <Skeleton width={180} height={18} />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 items-center">
                <Skeleton width={40} height={40} rounded="rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton width="80%" height={12} />
                  <Skeleton width="40%" height={10} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
