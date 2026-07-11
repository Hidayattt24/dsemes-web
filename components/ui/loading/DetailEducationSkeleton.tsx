import { Skeleton } from "@/components/ui/Skeleton";

export function DetailEducationSkeleton() {
  return (
    <div className="max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] p-6 space-y-8 animate-pulse">
      {/* Breadcrumbs & Actions Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-[13px]">
          <Skeleton width={120} height={14} />
          <span className="text-[#E2E8F0]">/</span>
          <Skeleton width={80} height={14} />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton width={130} height={38} rounded="rounded-xl" />
          <Skeleton width={90} height={38} rounded="rounded-xl" />
        </div>
      </div>

      {/* 12-Column Responsive Grid */}
      <div className="grid grid-cols-12 gap-8 items-start">
        
        {/* Main Content Area: 9 Columns */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          
          {/* Article Card Container */}
          <div className="premium-card p-8 lg:p-10 space-y-8">
            
            {/* Hero Image */}
            <Skeleton width="100%" height={380} rounded="rounded-xl" />

            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton width={100} height={20} rounded="rounded-full" />
                <Skeleton width={120} height={20} rounded="rounded-full" />
              </div>
              
              <Skeleton width="90%" height={36} />
              <Skeleton width="50%" height={28} />

              <div className="flex items-center gap-8 py-4 border-b border-[#E2E8F0]">
                <Skeleton width={120} height={16} />
                <Skeleton width={100} height={16} />
                <Skeleton width={100} height={16} />
              </div>
            </div>

            {/* Article Content Body */}
            <div className="space-y-4 pt-4">
              <Skeleton width="100%" height={16} />
              <Skeleton width="100%" height={16} />
              <Skeleton width="95%" height={16} />
              <Skeleton width="98%" height={16} />
              <Skeleton width="80%" height={16} />
            </div>
          </div>

          {/* Footer Back link */}
          <div className="flex justify-between items-center py-6">
            <Skeleton width={200} height={16} />
            <Skeleton width={240} height={12} />
          </div>
        </div>

        {/* Right Sidebar: 3 Columns */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          {/* Status Card */}
          <div className="premium-card p-6 space-y-4">
            <Skeleton width={100} height={14} />
            <div className="space-y-3 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton width={70} height={12} />
                  <Skeleton width={90} height={12} />
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles Card */}
          <div className="premium-card p-6 space-y-4">
            <Skeleton width={110} height={14} />
            <div className="space-y-4 pt-2">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton width={64} height={64} rounded="rounded-lg" className="flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton width="100%" height={12} />
                    <Skeleton width="60%" height={10} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
