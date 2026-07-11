"use client";

import type { ActivityLog } from "../types/record";

interface ActivityHistoryCardProps {
  readonly logs: ActivityLog[];
}

export function ActivityHistoryCard({ logs }: ActivityHistoryCardProps) {
  // Mock data for the bar chart matching the HTML reference:
  // Bars: 30m, 20m, 45m (highlighted), 15m, 0m
  const chartBars = [
    { label: "Sen", value: 30, height: "60%", active: false },
    { label: "Sel", value: 20, height: "40%", active: false },
    { label: "Rab", value: 45, height: "80%", active: true },
    { label: "Kam", value: 15, height: "30%", active: false },
    { label: "Jum", value: 0, height: "10%", active: false },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col h-[520px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-[#1A202C] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#166534]">directions_run</span>
          Riwayat Aktivitas Fisik
        </h3>
      </div>

      {/* Styled Bar Chart */}
      <div className="flex-1 w-full bg-[#F8FAFC] rounded-xl mb-4 p-4 border border-[#E2E8F0] flex flex-col justify-end">
        <div className="flex-1 flex items-end justify-around pb-2">
          {chartBars.map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 w-10">
              <span className="text-[10px] font-bold text-[#718096]">{bar.value}m</span>
              <div 
                style={{ height: bar.value > 0 ? `${bar.value * 2}px` : "8px" }}
                className={[
                  "w-6 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer",
                  bar.active 
                    ? "bg-[#00695C] shadow-md shadow-[#00695C]/20" 
                    : "bg-[#EBF8FF] text-[#2B6CB0]"
                ].join(" ")}
              />
              <span className="text-[10px] font-semibold text-[#718096]">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log List */}
      <div className="overflow-y-auto pr-1 h-[170px]">
        <ul className="divide-y divide-[#E2E8F0]/40">
          {logs.map((log) => (
            <li key={log.id} className="flex justify-between items-center py-3 px-1.5 hover:bg-[#F8FAFC] rounded-xl transition-colors">
              <div>
                <p className="text-sm font-semibold text-[#1A202C]">{log.name}</p>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-xs text-[#718096]">{log.time}</span>
                  <span className={[
                    "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                    log.intensity === "Ringan"
                      ? "bg-[#F0FDF4] text-[#166534]"
                      : log.intensity === "Sedang"
                      ? "bg-[#FFFBEB] text-[#B45309]"
                      : "bg-[#FFF5F5] text-[#C53030]"
                  ].join(" ")}>
                    {log.intensity}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#1A202C]">{log.duration} Menit</p>
                <p className="text-xs text-[#718096] mt-0.5">-{log.caloriesBurned} kcal</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
