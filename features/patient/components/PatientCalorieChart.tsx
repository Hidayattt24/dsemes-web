"use client";

import { useState } from "react";

interface CaloriePoint {
  readonly day: string;
  readonly targetHeight: string;
  readonly actualHeight: string;
  readonly hoverVal: string;
}

export function PatientCalorieChart() {
  const [selectedRange, setSelectedRange] = useState<"7" | "30">("7");
  const [hoveredCalorieIndex, setHoveredCalorieIndex] = useState<number | null>(null);

  // Define bar heights and hover values
  const barData: readonly CaloriePoint[] = [
    { day: "Sen", targetHeight: "90%", actualHeight: "85%", hoverVal: "Senin: 1.700 kcal" },
    { day: "Sel", targetHeight: "90%", actualHeight: "95%", hoverVal: "Selasa: 1.950 kcal" },
    { day: "Rab", targetHeight: "90%", actualHeight: "80%", hoverVal: "Rabu: 1.620 kcal" },
    { day: "Kam", targetHeight: "90%", actualHeight: "105%", hoverVal: "Kamis: 2.100 kcal" },
    { day: "Jum", targetHeight: "90%", actualHeight: "88%", hoverVal: "Jumat: 1.780 kcal" },
    { day: "Sab", targetHeight: "90%", actualHeight: "70%", hoverVal: "Sabtu: 1.400 kcal" },
    { day: "Min", targetHeight: "90%", actualHeight: "92%", hoverVal: "Minggu: 1.860 kcal" },
  ];

  return (
    <div className="premium-card p-8 flex flex-col justify-between h-full">
      {/* Header with isolated target threshold label */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-3">
          <h4 className="font-semibold text-lg text-[#1A202C] font-[family-name:var(--font-poppins)]">
            Asupan Kalori
          </h4>
          <span className="text-xs font-semibold text-[#718096] bg-[#F4F6F8] px-2.5 py-1 rounded-full border border-[#E2E8F0]/30 font-[family-name:var(--font-poppins)]">
            Target: 1.800 kkal
          </span>
        </div>

        {/* Range Selector */}
        <div className="flex bg-[#F4F6F8] p-1 rounded-full border border-[#E2E8F0]/30">
          {(["7", "30"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={[
                "px-4 py-1.5 text-[10px] font-bold rounded-full transition-all duration-200 cursor-pointer font-[family-name:var(--font-poppins)]",
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

        {/* Grouped Bars */}
        {barData.map((bar, idx) => (
          <div
            key={bar.day}
            className="flex flex-col items-center gap-2 group z-10 w-14 relative"
            onMouseEnter={() => setHoveredCalorieIndex(idx)}
            onMouseLeave={() => setHoveredCalorieIndex(null)}
          >
            {/* Dynamic Tooltip Popover absolute-positioned above the hovered column */}
            {hoveredCalorieIndex === idx && (
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
              <div
                className="w-4 bg-[#00695C] rounded-t-sm transition-all duration-200 group-hover:bg-[#0F766E]"
                style={{ height: bar.actualHeight }}
              />
            </div>
            <span className="text-[10px] font-bold text-[#718096] font-[family-name:var(--font-poppins)]">
              {bar.day}
            </span>
          </div>
        ))}
      </div>

      {/* Metrics Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E2E8F0]/50 text-center md:text-left">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-1 font-[family-name:var(--font-poppins)]">
            Target Harian
          </p>
          <p className="font-semibold text-sm text-[#1A202C] font-[family-name:var(--font-poppins)]">
            1,800 kkal
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-1 font-[family-name:var(--font-poppins)]">
            Rata-rata
          </p>
          <p className="font-semibold text-sm text-[#1A202C] font-[family-name:var(--font-poppins)]">
            1,778 kkal
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-1 font-[family-name:var(--font-poppins)]">
            Total Hari
          </p>
          <p className="font-semibold text-sm text-[#1A202C] font-[family-name:var(--font-poppins)]">
            28 Hari
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-1 font-[family-name:var(--font-poppins)]">
            Tercapai
          </p>
          <p className="font-bold text-sm text-[#00695C] font-[family-name:var(--font-poppins)]">
            92%
          </p>
        </div>
      </div>
    </div>
  );
}
