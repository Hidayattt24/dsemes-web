import type { ActivityDataPoint } from "@/types/dashboard";

interface ActivityBarChartProps {
  readonly data:       ActivityDataPoint[];
  readonly totalLabel: string;
  readonly trendLabel: string;
}

export function ActivityBarChart({
  data,
  totalLabel,
  trendLabel,
}: ActivityBarChartProps) {
  return (
    <div className="premium-card p-8 flex flex-col h-full">
      {/* Chart header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-lg font-bold text-[#1A202C] font-[family-name:var(--font-poppins)]">
            Aktivitas Pengguna
          </h3>
          <p className="text-xs text-[#718096] mt-1 font-medium uppercase tracking-widest font-[family-name:var(--font-poppins)]">
            7 Hari Terakhir
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#00695C] font-[family-name:var(--font-poppins)]">
            {totalLabel}
          </p>
          <p className="text-[11px] font-bold text-green-600 flex items-center justify-end gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            {trendLabel}
          </p>
        </div>
      </div>

      {/* Bars */}
      <div className="flex-1 flex items-end justify-between gap-3 px-2 h-48">
        {data.map((point, i) => (
          <div
            key={point.day}
            title={`${point.day}: ${point.value.toLocaleString("id-ID")}`}
            className={[
              "flex-1 rounded-t-lg relative group transition-all duration-200",
              i === data.length - 1
                ? "bg-[#00695C]"
                : "bg-[#F4F6F8] hover:bg-[#00695C]/20",
            ].join(" ")}
            style={{ height: `${point.heightPercent}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A202C] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {point.value.toLocaleString("id-ID")}
            </div>
          </div>
        ))}
      </div>

      {/* Day labels */}
      <div className="flex justify-between mt-6 text-[11px] font-bold text-[#718096] uppercase tracking-widest font-[family-name:var(--font-poppins)]">
        {data.map((point, i) => (
          <span
            key={point.day}
            className={i === data.length - 1 ? "text-[#00695C]" : ""}
          >
            {point.day}
          </span>
        ))}
      </div>
    </div>
  );
}
