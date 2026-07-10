"use client";

import { useState } from "react";

interface SugarPoint {
  readonly day: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly val: string;
}

export function PatientBloodSugarChart() {
  const [selectedRange, setSelectedRange] = useState<"7" | "30" | "90">("7");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sugarData: readonly SugarPoint[] = [
    { day: "Sen", label: "Senin", x: 71, y: 220, val: "110 mg/dL" },
    { day: "Sel", label: "Selasa", x: 214, y: 180, val: "130 mg/dL" },
    { day: "Rab", label: "Rabu", x: 357, y: 160, val: "140 mg/dL" },
    { day: "Kam", label: "Kamis", x: 500, y: 200, val: "120 mg/dL" },
    { day: "Jum", label: "Jumat", x: 643, y: 110, val: "145 mg/dL" },
    { day: "Sab", label: "Sabtu", x: 785, y: 190, val: "125 mg/dL" },
    { day: "Min", label: "Minggu", x: 928, y: 90, val: "150 mg/dL" },
  ];

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

          {/* Gradient Area */}
          <path
            d="M 71,220 C 142,200 142,180 214,180 C 285,180 285,160 357,160 C 428,160 428,200 500,200 C 571,200 571,110 643,110 C 714,110 714,190 785,190 C 856,190 856,90 928,90 L 928,300 L 71,300 Z"
            fill="url(#areaGradient)"
          />

          {/* Main Smooth Path Line */}
          <path
            d="M 71,220 C 142,200 142,180 214,180 C 285,180 285,160 357,160 C 428,160 428,200 500,200 C 571,200 571,110 643,110 C 714,110 714,190 785,190 C 856,190 856,90 928,90"
            fill="none"
            stroke="#00695C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          {/* Render static circles */}
          {sugarData.map((pt, idx) => (
            <circle
              key={pt.day}
              cx={pt.x}
              cy={pt.y}
              fill="#ffffff"
              r={hoveredIndex === idx ? "4.5" : "5"}
              stroke={hoveredIndex === idx ? "#0F766E" : "#00695C"}
              strokeWidth={hoveredIndex === idx ? "1.5" : "2.5"}
            />
          ))}

          {/* Hover State: Render dashed line and interactive popover tooltip */}
          {hoveredIndex !== null && (() => {
            const active = sugarData[hoveredIndex];
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
          {sugarData.map((pt, idx) => (
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
          ))}
        </svg>

        {/* Days Legend perfectly aligned with points */}
        <div className="grid grid-cols-7 text-center text-[10px] uppercase font-bold text-[#718096]/70 tracking-widest mt-4 font-[family-name:var(--font-poppins)]">
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span>Sab</span>
          <span>Min</span>
        </div>
      </div>

      {/* Metrics Row centered and spaced evenly */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#E2E8F0]/50 w-full text-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-2 font-[family-name:var(--font-poppins)]">
            Rata-rata Gula Darah
          </p>
          <p className="font-semibold text-2xl text-[#1A202C] font-[family-name:var(--font-poppins)]">
            126{" "}
            <span className="text-sm font-medium text-[#718096]">mg/dL</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-2 font-[family-name:var(--font-poppins)]">
            Nilai Tertinggi
          </p>
          <p className="font-semibold text-2xl text-[#1A202C] font-[family-name:var(--font-poppins)]">
            180{" "}
            <span className="text-sm font-medium text-[#718096]">mg/dL</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-2 font-[family-name:var(--font-poppins)]">
            Nilai Terendah
          </p>
          <p className="font-semibold text-2xl text-[#1A202C] font-[family-name:var(--font-poppins)]">
            95{" "}
            <span className="text-sm font-medium text-[#718096]">mg/dL</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-2 font-[family-name:var(--font-poppins)]">
            Total Pencatatan
          </p>
          <p className="font-semibold text-2xl text-[#1A202C] font-[family-name:var(--font-poppins)]">
            21{" "}
            <span className="text-sm font-medium text-[#718096]">Kali</span>
          </p>
        </div>
      </div>
    </div>
  );
}
