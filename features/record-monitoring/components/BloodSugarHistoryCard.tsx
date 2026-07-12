"use client";

import type { BloodSugarLog } from "../types/record";
import { useState } from "react";
import { Select } from "@/components/ui/Select";

interface BloodSugarHistoryCardProps {
  readonly logs: BloodSugarLog[];
}

const periodOptions = [
  { value: "7", label: "7 Hari Terakhir" },
  { value: "30", label: "30 Hari Terakhir" },
] as const;

export function BloodSugarHistoryCard({ logs }: BloodSugarHistoryCardProps) {
  const [period, setPeriod] = useState("7");
  // Let's create an SVG line chart to wow the user.
  // We'll plot the 'after' meal values (130 to 165) and 'before' meal values (99 to 120).
  const beforePoints = "20,95 70,105 120,75 170,115 220,85 270,99 320,105";
  const afterPoints = "20,40 70,60 120,45 170,75 220,50 270,65 320,30";

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col h-[520px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-[#1A202C] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00695C]">water_drop</span>
          Riwayat Gula Darah
        </h3>
        <div className="w-44">
          <Select value={period} onChange={setPeriod} options={periodOptions} />
        </div>
      </div>

      {/* Styled Premium SVG Line Chart */}
      <div className="flex-1 w-full bg-[#F8FAFC] rounded-xl mb-4 p-4 border border-[#E2E8F0] flex flex-col justify-between">
        <div className="flex-1 relative w-full h-40">
          <svg className="w-full h-full" viewBox="0 0 340 140" preserveAspectRatio="none">
            {/* Gridlines */}
            <line x1="0" y1="20" x2="340" y2="20" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3" />
            <line x1="0" y1="60" x2="340" y2="60" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3" />
            <line x1="0" y1="100" x2="340" y2="100" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3" />
            
            {/* Before Meal Line (Teal) */}
            <polyline
              fill="none"
              stroke="#00695C"
              strokeWidth="2.5"
              points={beforePoints}
            />

            {/* After Meal Line (Red) */}
            <polyline
              fill="none"
              stroke="#C53030"
              strokeWidth="2.5"
              points={afterPoints}
            />

            {/* Points on Before Meal */}
            {[
              { cx: 20, cy: 95 }, { cx: 70, cy: 105 }, { cx: 120, cy: 75 },
              { cx: 170, cy: 115 }, { cx: 220, cy: 85 }, { cx: 270, cy: 99 },
              { cx: 320, cy: 105 }
            ].map((pt, i) => (
              <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#FFFFFF" stroke="#00695C" strokeWidth="2" />
            ))}

            {/* Points on After Meal */}
            {[
              { cx: 20, cy: 40 }, { cx: 70, cy: 60 }, { cx: 120, cy: 45 },
              { cx: 170, cy: 75 }, { cx: 220, cy: 50 }, { cx: 270, cy: 65 },
              { cx: 320, cy: 30 }
            ].map((pt, i) => (
              <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#FFFFFF" stroke="#C53030" strokeWidth="2" />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold justify-center pt-2">
          <span className="flex items-center gap-1.5 text-[#00695C]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00695C]"></span>
            Sebelum Makan
          </span>
          <span className="flex items-center gap-1.5 text-[#C53030]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C53030]"></span>
            Sesudah Makan
          </span>
        </div>
      </div>

      {/* Small Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-[#718096] text-xs font-bold uppercase tracking-wider">
              <th className="py-2 px-2 font-semibold">Tanggal</th>
              <th className="py-2 px-2 font-semibold">Sebelum (mg/dL)</th>
              <th className="py-2 px-2 font-semibold">Sesudah (mg/dL)</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {logs.slice(0, 2).map((log) => (
              <tr key={log.id} className="border-b border-[#E2E8F0]/40 hover:bg-[#F4F6F8]/30 transition-colors">
                <td className="py-3 px-2 text-[#1A202C]">{log.date}</td>
                <td className="py-3 px-2 text-[#1A202C]">{log.before}</td>
                <td className={`py-3 px-2 ${log.after > 140 ? "text-[#C53030] font-bold" : "text-[#1A202C]"}`}>
                  {log.after}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
