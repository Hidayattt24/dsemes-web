"use client";

import type { ActivityLog } from "../types/record";

interface ActivityHistoryCardProps {
  readonly logs: ActivityLog[];
}

export function ActivityHistoryCard({ logs = [] }: ActivityHistoryCardProps) {
  const hasData = logs.length > 0;

  // Group activities by date
  const dailyMap: { [dateStr: string]: { duration: number; date: Date } } = {};
  logs.forEach((log) => {
    const cleanTime = log.time.replace(" WIB", "").replace("WIB", "");
    const d = new Date(cleanTime);
    const dateStr = d.toDateString();
    if (!dailyMap[dateStr]) {
      dailyMap[dateStr] = { duration: 0, date: d };
    }
    dailyMap[dateStr].duration += log.duration;
  });

  // Generate 5 days of chart bars ending today
  const daysIndo = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const chartBars = Array.from({ length: 5 }).map((_, idx) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - (4 - idx));
    const dayLabel = daysIndo[targetDate.getDay()];
    const dateStr = targetDate.toDateString();

    const duration = dailyMap[dateStr]?.duration ?? 0;
    // Scale height based on a target of 60 minutes
    const height = duration > 0 ? `${Math.min(100, Math.max(10, Math.round((duration / 60) * 100)))}%` : "8px";

    return {
      label: dayLabel,
      value: duration,
      height,
      active: idx === 4,
    };
  });

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col h-[520px] font-[family-name:var(--font-poppins)]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-[#1A202C] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#166534]">directions_run</span>
          Riwayat Aktivitas Fisik
        </h3>
      </div>

      {/* Styled Bar Chart */}
      <div className="flex-1 w-full bg-[#F8FAFC] rounded-xl mb-4 p-4 border border-[#E2E8F0] flex flex-col justify-end">
        {!hasData ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <span className="material-symbols-outlined text-[#718096] text-3xl mb-2">directions_run</span>
            <p className="font-semibold text-sm text-[#4A5568]">Belum Ada Catatan Aktivitas</p>
            <p className="text-xs text-[#718096] mt-1">Data grafik durasi aktivitas fisik pasien akan muncul di sini.</p>
          </div>
        ) : (
          <div className="flex-1 flex items-end justify-around pb-2">
            {chartBars.map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-10">
                <span className="text-[10px] font-bold text-[#718096]">{bar.value}m</span>
                <div 
                  style={{ height: bar.height }}
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
        )}
      </div>

      {/* Activity Log List */}
      <div className="overflow-y-auto pr-1 h-[170px]">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center text-center p-6 h-full min-h-[120px]">
            <p className="text-xs text-[#718096]">Tidak ada riwayat aktivitas fisik.</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
