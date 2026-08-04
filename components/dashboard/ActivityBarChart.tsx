import type { ActivityDataPoint } from "@/types/dashboard";

interface ActivityBarChartProps {
  readonly data: ActivityDataPoint[];
  readonly totalLabel: string;
}

export function ActivityBarChart({
  data,
  totalLabel,
}: ActivityBarChartProps) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col h-full font-[family-name:var(--font-poppins)]">
      {/* Chart header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-bold text-[#1A202C]">Aktivitas Pengguna</h3>
          <p className="text-xs text-[#718096] mt-1 font-semibold uppercase tracking-wider">
            7 Hari Terakhir
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#00695C]">{totalLabel}</p>
        </div>
      </div>

      {/* Chart Main Area */}
      <div className="flex-1 flex gap-4 h-64 relative items-stretch">
        {/* Y-axis Labels */}
        {(() => {
          const maxValue = data.length > 0 ? Math.max(...data.map(p => p.value)) : 0;
          const stepsCount = 5;
          const stepVal = maxValue > 0 ? Math.ceil(maxValue / stepsCount) : 100;
          const axisLabels = Array.from({ length: stepsCount + 1 }).map((_, idx) => {
            const val = (stepsCount - idx) * stepVal;
            return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toString();
          });
          return (
            <div className="flex flex-col justify-between text-[10px] font-bold text-[#718096] text-right w-10 select-none pb-6">
              {axisLabels.map((lbl, idx) => (
                <span key={idx}>{lbl}</span>
              ))}
            </div>
          );
        })()}

        {/* Chart Grid and Bars Area */}
        <div className="flex-1 flex flex-col justify-between relative pb-6">
          {/* Horizontal Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none">
            <div className="border-b border-dashed border-[#E2E8F0]/80 w-full h-0" />
            <div className="border-b border-dashed border-[#E2E8F0]/80 w-full h-0" />
            <div className="border-b border-dashed border-[#E2E8F0]/80 w-full h-0" />
            <div className="border-b border-dashed border-[#E2E8F0]/80 w-full h-0" />
            <div className="border-b border-dashed border-[#E2E8F0]/80 w-full h-0" />
            <div className="border-b border-[#E2E8F0] w-full h-0" />
          </div>

          {/* Bars */}
          <div className="flex-1 flex items-end justify-between gap-4 px-2 relative z-10 h-full">
            {data.map((point, i) => (
              <div
                key={point.day}
                title={`${point.day}: ${point.value.toLocaleString("id-ID")}`}
                className={[
                  "flex-1 rounded-t-lg relative group transition-all duration-300 hover:scale-x-105 cursor-pointer",
                  i === data.length - 1
                    ? "bg-[#00695C] shadow-lg shadow-[#00695C]/20"
                    : "bg-[#F4F6F8] hover:bg-[#00695C]/25",
                ].join(" ")}
                style={{ height: `${point.heightPercent}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md whitespace-nowrap pointer-events-none z-20 scale-95 group-hover:scale-100">
                  {point.value.toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>

          {/* X-axis Labels */}
          <div className="flex justify-between text-[11px] font-bold text-[#718096] uppercase tracking-widest pt-4 relative z-10">
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
      </div>
    </div>
  );
}
