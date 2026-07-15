"use client";

import { useState } from "react";

interface SugarPoint {
  readonly day: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly val: string;
}

interface PatientBloodSugarChartProps {
  readonly data?: any[];
}

export function PatientBloodSugarChart({ data = [] }: PatientBloodSugarChartProps) {
  const [selectedRange, setSelectedRange] = useState<"7" | "30" | "90">("7");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Map the past 7 days based on the logs
  const daysIndo = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const fullDaysIndo = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const xCoords = [71, 214, 357, 500, 643, 785, 928];

  // Filter logs for stats based on the selected range
  const limitDays = parseInt(selectedRange);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - limitDays);

  const filteredLogs = data.filter((log: any) => {
    return new Date(log.measured_at) >= cutoffDate;
  });

  const hasData = filteredLogs.length > 0;

  // Calculate statistics from filteredLogs
  const totalCount = filteredLogs.length;
  const glucoseValues = filteredLogs.map((log: any) => log.glucose_value);
  const avgBloodSugar = totalCount > 0 ? Math.round(glucoseValues.reduce((a, b) => a + b, 0) / totalCount) : null;
  const maxBloodSugar = totalCount > 0 ? Math.max(...glucoseValues) : null;
  const minBloodSugar = totalCount > 0 ? Math.min(...glucoseValues) : null;

  // Generate 7 data points representing the last 7 calendar days
  const sugarData: SugarPoint[] = Array.from({ length: 7 }).map((_, idx) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - (6 - idx));
    const dayName = daysIndo[targetDate.getDay()];
    const label = fullDaysIndo[targetDate.getDay()];

    const dateStr = targetDate.toDateString();
    const dayLogs = data.filter((log: any) => new Date(log.measured_at).toDateString() === dateStr);
    
    let value = 120; // default/fallback
    if (dayLogs.length > 0) {
      value = Math.round(dayLogs.reduce((sum, log) => sum + log.glucose_value, 0) / dayLogs.length);
    } else {
      value = 0;
    }

    const clamped = Math.max(70, Math.min(220, value));
    const y = 250 - ((clamped - 70) / 150) * 180;

    return {
      day: dayName,
      label,
      x: xCoords[idx],
      y,
      val: `${value} mg/dL`,
    };
  });

  // Generate SVG path for the line (only if data exists)
  const linePath = hasData ? `M ${sugarData.filter(p => p.y !== 250).map(p => `${p.x},${p.y}`).join(" L ")}` : "";
  // Generate SVG path for the gradient area under the line
  const areaPath = hasData && sugarData.filter(p => p.y !== 250).length > 0
    ? `M ${sugarData.filter(p => p.y !== 250)[0].x},300 L ${sugarData.filter(p => p.y !== 250).map(p => `${p.x},${p.y}`).join(" L ")} L ${sugarData.filter(p => p.y !== 250)[sugarData.filter(p => p.y !== 250).length - 1].x},300 Z`
    : "";

  return (
    <div className="premium-card p-8">
      {/* Chart Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h4 className="font-semibold text-lg text-[#1A202C] font-[family-name:var(--font-poppins)]">
            Tren Gula Darah
          </h4>
          <p className="text-xs text-[#718096] font-[family-name:var(--font-poppins)]">
            Monitoring kadar glukosa dalam rentang waktu terpilih
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex bg-[#F4F6F8] p-1 rounded-full border border-[#E2E8F0]/30 self-start md:self-auto">
          {(["7", "30", "90"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={[
                "px-6 py-2 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer font-[family-name:var(--font-poppins)]",
                selectedRange === range
                  ? "bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/15"
                  : "text-[#718096] hover:text-[#00695C]",
              ].join(" ")}
            >
              {range} Hari
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart Container with preserved aspect ratio */}
      <div className="w-full relative mb-10">
        <svg
          className="w-full h-auto aspect-[1000/300] px-4"
          viewBox="0 0 1000 300"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00695C" stopOpacity={0.15}></stop>
              <stop offset="100%" stopColor="#00695C" stopOpacity={0}></stop>
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          <line stroke="#E5E7EB" strokeDasharray="4,4" x1="0" x2="1000" y1="75" y2="75"></line>
          <line stroke="#E5E7EB" strokeDasharray="4,4" x1="0" x2="1000" y1="150" y2="150"></line>
          <line stroke="#E5E7EB" strokeDasharray="4,4" x1="0" x2="1000" y1="225" y2="225"></line>

          {!hasData ? (
            /* Modern Empty State Text Overlay inside SVG */
            <g>
              <rect x="250" y="90" width="500" height="120" rx="16" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="1" />
              <text
                x="500"
                y="140"
                fill="#4A5568"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="Poppins, sans-serif"
              >
                Belum Ada Catatan Gula Darah
              </text>
              <text
                x="500"
                y="165"
                fill="#718096"
                fontSize="11"
                textAnchor="middle"
                fontFamily="Poppins, sans-serif"
              >
                Catatan riwayat gula darah pasien akan muncul di sini setelah diinput.
              </text>
            </g>
          ) : (
            <>
              {/* Gradient Area */}
              {areaPath && <path d={areaPath} fill="url(#areaGradient)" />}

              {/* Main Smooth Path Line */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#00695C"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              )}

              {/* Render circles only for days that have data */}
              {sugarData.map((pt, idx) => {
                const dayLogsExist = data.some((log: any) => new Date(log.measured_at).toDateString() === pt.day);
                if (!dayLogsExist) return null;
                return (
                  <circle
                    key={pt.day}
                    cx={pt.x}
                    cy={pt.y}
                    fill="#ffffff"
                    r={hoveredIndex === idx ? 4.5 : 5}
                    stroke={hoveredIndex === idx ? "#0F766E" : "#00695C"}
                    strokeWidth={hoveredIndex === idx ? 1.5 : 2.5}
                  />
                );
              })}

              {/* Hover State: Render dashed line and interactive popover tooltip */}
              {hoveredIndex !== null && (() => {
                const active = sugarData[hoveredIndex];
                const dayLogsExist = data.some((log: any) => new Date(log.measured_at).toDateString() === active.day);
                if (!dayLogsExist) return null;
                const ry = active.y - 45;
                return (
                  <g>
                    {/* Vertical Hover Guide Line */}
                    <line
                      x1={active.x}
                      y1="75"
                      x2={active.x}
                      y2="225"
                      stroke="#0F766E"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />

                    {/* Outer Ring Circle Indicator */}
                    <circle cx={active.x} cy={active.y} r="8" fill="#0F766E" fillOpacity="0.2" />
                    <circle cx={active.x} cy={active.y} r="4.5" fill="#0F766E" stroke="#ffffff" strokeWidth="1.5" />

                    {/* Tooltip Capsule floating above the node */}
                    <g>
                      {/* Capsule Body */}
                      <rect
                        x={active.x - 60}
                        y={ry}
                        width="120"
                        height="28"
                        rx="14"
                        fill="#1A202C"
                      />
                      {/* Capsule Pointer */}
                      <polygon
                        points={`${active.x - 5},${ry + 28} ${active.x + 5},${ry + 28} ${active.x},${ry + 33}`}
                        fill="#1A202C"
                      />
                      {/* Tooltip Content */}
                      <text
                        x={active.x}
                        y={ry + 17}
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="Poppins, sans-serif"
                      >
                        {active.label}: {active.val}
                      </text>
                    </g>
                  </g>
                );
              })()}

              {/* Invisible larger hover target circles for easier interactivity */}
              {sugarData.map((pt, idx) => {
                const dayLogsExist = data.some((log: any) => new Date(log.measured_at).toDateString() === pt.day);
                if (!dayLogsExist) return null;
                return (
                  <circle
                    key={`target-${pt.day}`}
                    cx={pt.x}
                    cy={pt.y}
                    r="20"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              })}
            </>
          )}
        </svg>

        {/* Days Legend perfectly aligned with points */}
        <div className="grid grid-cols-7 text-center text-[10px] uppercase font-bold text-[#718096]/70 tracking-widest mt-4 font-[family-name:var(--font-poppins)]">
          {sugarData.map(p => (
            <span key={p.day}>{p.day}</span>
          ))}
        </div>
      </div>

      {/* Metrics Row centered and spaced evenly */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#E2E8F0]/50 w-full text-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-2 font-[family-name:var(--font-poppins)]">
            Rata-rata Gula Darah
          </p>
          <p className="font-semibold text-2xl text-[#1A202C] font-[family-name:var(--font-poppins)]">
            {avgBloodSugar !== null ? (
              <>
                {avgBloodSugar}{" "}
                <span className="text-sm font-medium text-[#718096]">mg/dL</span>
              </>
            ) : (
              <span className="text-[#A0AEC0]">-</span>
            )}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-2 font-[family-name:var(--font-poppins)]">
            Nilai Tertinggi
          </p>
          <p className="font-semibold text-2xl text-[#1A202C] font-[family-name:var(--font-poppins)]">
            {maxBloodSugar !== null ? (
              <>
                {maxBloodSugar}{" "}
                <span className="text-sm font-medium text-[#718096]">mg/dL</span>
              </>
            ) : (
              <span className="text-[#A0AEC0]">-</span>
            )}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-2 font-[family-name:var(--font-poppins)]">
            Nilai Terendah
          </p>
          <p className="font-semibold text-2xl text-[#1A202C] font-[family-name:var(--font-poppins)]">
            {minBloodSugar !== null ? (
              <>
                {minBloodSugar}{" "}
                <span className="text-sm font-medium text-[#718096]">mg/dL</span>
              </>
            ) : (
              <span className="text-[#A0AEC0]">-</span>
            )}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-2 font-[family-name:var(--font-poppins)]">
            Total Pencatatan
          </p>
          <p className="font-semibold text-2xl text-[#1A202C] font-[family-name:var(--font-poppins)]">
            {totalCount}{" "}
            <span className="text-sm font-medium text-[#718096]">Kali</span>
          </p>
        </div>
      </div>
    </div>
  );
}
