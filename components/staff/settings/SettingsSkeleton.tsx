import { Skeleton } from "@/components/ui/Skeleton";

export function SettingsSkeleton() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] animate-pulse">
      {/* Header / Action Toolbar Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-[#E2E8F0] gap-4">
        <div className="space-y-2">
          <Skeleton height={32} width={240} className="rounded-xl" />
          <Skeleton height={18} width={360} className="rounded-lg" />
        </div>
        <div className="flex w-full sm:w-auto justify-end gap-3 flex-wrap">
          <Skeleton height={44} width={100} className="rounded-xl" />
          <Skeleton height={44} width={200} className="rounded-xl" />
        </div>
      </div>

      {/* Main Settings Form Blocks */}
      <div className="space-y-8">
        {/* Profile Photo Card Skeleton */}
        <div className="premium-card p-8 bg-white">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <Skeleton height={128} width={128} rounded="rounded-full" />
            <div className="text-center sm:text-left space-y-3 flex-1">
              <Skeleton height={20} width={100} className="rounded-lg" />
              <Skeleton height={14} width={320} className="rounded-lg" />
              <div className="flex justify-center sm:justify-start gap-3">
                <Skeleton height={38} width={120} className="rounded-xl" />
                <Skeleton height={38} width={80} className="rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Account Info Form Card Skeleton */}
        <div className="premium-card p-8 bg-white">
          <div className="flex items-center gap-2 mb-8">
            <Skeleton height={24} width={24} rounded="rounded-full" />
            <Skeleton height={24} width={160} className="rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Skeleton height={14} width={100} className="rounded-md" />
              <Skeleton height={48} className="w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton height={14} width={100} className="rounded-md" />
              <Skeleton height={48} className="w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton height={14} width={100} className="rounded-md" />
              <Skeleton height={48} className="w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton height={14} width={100} className="rounded-md" />
              <Skeleton height={48} className="w-full rounded-xl" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Skeleton height={14} width={100} className="rounded-md" />
              <Skeleton height={48} className="w-full md:w-1/2 rounded-xl" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Skeleton height={14} width={100} className="rounded-md" />
              <Skeleton height={100} className="w-full rounded-xl" />
            </div>
          </div>
        </div>

        {/* Account Security Form Card Skeleton */}
        <div className="premium-card p-8 bg-white">
          <div className="flex items-center gap-2 mb-8">
            <Skeleton height={24} width={24} rounded="rounded-full" />
            <Skeleton height={24} width={160} className="rounded-lg" />
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2 space-y-2">
                <Skeleton height={14} width={150} className="rounded-md" />
                <Skeleton height={48} className="w-full md:w-1/2 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton height={14} width={120} className="rounded-md" />
                <Skeleton height={48} className="w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton height={14} width={180} className="rounded-md" />
                <Skeleton height={48} className="w-full rounded-xl" />
              </div>
            </div>
            <Skeleton height={48} className="w-full rounded-xl" />
            <Skeleton height={44} width={180} className="rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
