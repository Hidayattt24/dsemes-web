"use client";

import { useState } from "react";
import { calculateDSMESCalorieTarget } from "@/lib/calorieCalculator";

interface CaloriePoint {
  readonly day: string;
  readonly targetHeight: string;
  readonly actualHeight: string;
  readonly hoverVal: string;
}

interface PatientCalorieChartProps {
  readonly data?: Record<string, unknown>[];
  readonly patient?: Record<string, unknown>;
}

export function PatientCalorieChart({ data = [], patient }: PatientCalorieChartProps) {
  const [selectedRange, setSelectedRange] = useState<"7" | "30">("7");
  const [hoveredCalorieIndex, setHoveredCalorieIndex] = useState<number | null>(null);

  const targetCalorie = calculateDSMESCalorieTarget(patient || {});

  // Filter logs based on the selected range
  const limitDays = parseInt(selectedRange);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - limitDays);

  const filteredLogs = data.filter((log: Record<string, unknown>) => {
    return new Date(log.logged_at) >= cutoffDate;
  });

  const hasData = filteredLogs.length > 0;

  // Calculate statistics from filteredLogs
  const dailyCaloriesMap: { [dateStr: string]: number } = {};
  filteredLogs.forEach((log: Record<string, unknown>) => {
    const dStr = new Date(log.logged_at).toDateString();
    const cals = (log.food?.calories ?? 0) * (log.portion_multiplier ?? 1);
    dailyCaloriesMap[dStr] = (dailyCaloriesMap[dStr] || 0) + cals;
  });

  const dailyValues = Object.values(dailyCaloriesMap);
  const avgCalorie = dailyValues.length > 0 ? Math.round(dailyValues.reduce((a, b) => a + b, 0) / dailyValues.length) : null;
  const targetAchievedCount = dailyValues.filter(val => val >= targetCalorie * 0.9 && val <= targetCalorie * 1.1).length;
  const compliancePercent = dailyValues.length > 0 ? Math.round((targetAchievedCount / dailyValues.length) * 100) : null;

  // Generate 7 days for the chart
  const daysIndo = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const barData: CaloriePoint[] = Array.from({ length: 7 }).map((_, idx) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - (6 - idx));
    const dayName = daysIndo[targetDate.getDay()];
    const dateStr = targetDate.toDateString();
    
    const dayLogs = data.filter((log: Record<string, unknown>) => new Date(log.logged_at).toDateString() === dateStr);
    
    let actualCalories = 0;
    if (dayLogs.length > 0) {
      actualCalories = Math.round(dayLogs.reduce((sum, log) => {
        return sum + (log.food?.calories ?? 0) * (log.portion_multiplier ?? 1);
      }, 0));
    }

    const targetHeightVal = 90;
    const actualHeightVal = actualCalories > 0 ? Math.min(100, Math.round((actualCalories / targetCalorie) * targetHeightVal)) : 0;

    const fullDaysMap: { [key: string]: string } = {
      Sen: "Senin", Sel: "Selasa", Rab: "Rabu", Kam: "Kamis", Jum: "Jumat", Sab: "Sabtu", Min: "Minggu"
    };

    return {
      day: dayName,
      targetHeight: `${targetHeightVal}%`,
      actualHeight: `${actualHeightVal}%`,
      hoverVal: `${fullDaysMap[dayName] || dayName}: ${actualCalories.toLocaleString("id-ID")} kkal`,
    };
  });

  return (
    <div className="premium-card p-8 flex flex-col justify-between h-full font-[family-name:var(--font-poppins)]">
      {/* Header with isolated target threshold label */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-3">
          <h4 className="font-semibold text-lg text-[#1A202C]">
            Asupan Kalori
          </h4>
          <span className="text-xs font-semibold text-[#718096] bg-[#F4F6F8] px-2.5 py-1 rounded-full border border-[#E2E8F0]/30">
            Target: {targetCalorie.toLocaleString("id-ID")} kkal
          </span>
        </div>

        {/* Range Selector */}
        <div className="flex bg-[#F4F6F8] p-1 rounded-full border border-[#E2E8F0]/30">
          {(["7", "30"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={[
                "px-4 py-1.5 text-[10px] font-bold rounded-full transition-all duration-200 cursor-pointer",
                selectedRange === range
                  ? "bg-[#0F766E] text-white shadow-sm shadow-[#0F766E]/15"
                  : "text-[#718096] hover:text-[#00695C]",
              ].join(" ")}
            >
              {range} Hari
            </button>
          ))}
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="h-[240px] w-full flex items-end justify-between px-4 pb-10 relative">
        {/* Target Reference Line (Clean dotted line with NO text overlay) */}
        <div className="absolute top-[30%] left-0 w-full border-t border-dashed border-[#c6c6cd] z-0"></div>

        {!hasData ? (
          /* Clean Empty State Overlay */
          <div className="w-full h-[180px] flex items-center justify-center z-10">
            <div className="bg-[#F8F9FA] border border-[#E2E8F0] p-6 rounded-2xl text-center max-w-sm">
              <span className="material-symbols-outlined text-[#718096] text-3xl mb-2">restaurant</span>
              <p className="font-semibold text-sm text-[#4A5568]">Belum Ada Catatan Asupan Kalori</p>
              <p className="text-xs text-[#718096] mt-1">Catatan riwayat asupan makanan pasien akan muncul di sini.</p>
            </div>
          </div>
        ) : (
          /* Grouped Bars */
          barData.map((bar, idx) => {
            const hasValueForDay = data.some((log: Record<string, unknown>) => new Date(log.logged_at).toDateString() === bar.day);
            return (
              <div
                key={bar.day}
                className="flex flex-col items-center gap-2 group z-10 w-14 relative"
                onMouseEnter={() => setHoveredCalorieIndex(idx)}
                onMouseLeave={() => setHoveredCalorieIndex(null)}
              >
                {/* Dynamic Tooltip Popover absolute-positioned above the hovered column */}
                {hoveredCalorieIndex === idx && hasValueForDay && (
                  <div className="absolute bottom-[170px] left-1/2 -translate-x-1/2 bg-[#1A202C] text-white text-[9px] font-bold py-1.5 px-2.5 rounded-full shadow-lg whitespace-nowrap z-30 flex flex-col items-center">
                    <span>{bar.hoverVal}</span>
                    <div className="w-2 h-2 bg-[#1A202C] rotate-45 -mt-1.5"></div>
                  </div>
                )}

                <div className="flex gap-2 items-end h-[160px] w-full justify-center cursor-pointer">
                  {/* Target bar (Gray background) */}
                  <div
                    className="w-4 bg-[#edeef0] rounded-t-sm transition-all duration-200 group-hover:bg-[#E2E8F0]"
                    style={{ height: bar.targetHeight }}
                  />
                  {/* Actual bar (Teal color) */}
                  {hasValueForDay && (
                    <div
                      className="w-4 bg-[#00695C] rounded-t-sm transition-all duration-200 group-hover:bg-[#0F766E]"
                      style={{ height: bar.actualHeight }}
                    />
                  )}
                </div>
                <span className="text-[10px] font-bold text-[#718096]">
                  {bar.day}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Metrics Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E2E8F0]/50 text-center md:text-left">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-1">
            Target Harian
          </p>
          <p className="font-semibold text-sm text-[#1A202C]">
            {targetCalorie.toLocaleString("id-ID")} kkal
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-1">
            Rata-rata
          </p>
          <p className="font-semibold text-sm text-[#1A202C]">
            {avgCalorie !== null ? `${avgCalorie.toLocaleString("id-ID")} kkal` : <span className="text-[#A0AEC0]">-</span>}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-1">
            Total Hari
          </p>
          <p className="font-semibold text-sm text-[#1A202C]">
            {limitDays} Hari
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-1">
            Tercapai
          </p>
          <p className="font-bold text-sm text-[#00695C]">
            {compliancePercent !== null ? `${compliancePercent}%` : <span className="text-[#A0AEC0]">-</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
