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

export function BloodSugarHistoryCard({ logs = [] }: BloodSugarHistoryCardProps) {
  const [period, setPeriod] = useState("7");

  const limitDays = parseInt(period);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - limitDays);

  // Filter logs by date
  const filtered = logs.filter((log: any) => {
    const logDate = log.rawDate ? new Date(log.rawDate) : new Date();
    return logDate >= cutoffDate;
  });

  const hasData = filtered.length > 0;

  // Chart data: sort chronological (ascending) and take last 7 points
  const chartLogs = [...filtered]
    .sort((a: any, b: any) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime())
    .slice(-7);

  const getBeforeY = (val: number) => {
    const clamped = Math.max(50, Math.min(250, val));
    return 110 - ((clamped - 70) / 180) * 80;
  };

  const getAfterY = (val: number) => {
    const clamped = Math.max(50, Math.min(250, val));
    return 110 - ((clamped - 70) / 180) * 80;
  };

  const N = chartLogs.length;
  const beforePoints = N > 0 
    ? chartLogs.map((p, idx) => `${20 + (idx / Math.max(1, N - 1)) * 300},${getBeforeY(p.before)}`).join(" ")
    : "";
  const afterPoints = N > 0 
    ? chartLogs.map((p, idx) => `${20 + (idx / Math.max(1, N - 1)) * 300},${getAfterY(p.after)}`).join(" ")
    : "";

  const beforeCircles = chartLogs.map((p, idx) => ({
    cx: 20 + (idx / Math.max(1, N - 1)) * 300,
    cy: getBeforeY(p.before),
    val: p.before,
  }));

  const afterCircles = chartLogs.map((p, idx) => ({
    cx: 20 + (idx / Math.max(1, N - 1)) * 300,
    cy: getAfterY(p.after),
    val: p.after,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col h-[520px] font-[family-name:var(--font-poppins)]">
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
        {!hasData ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <span className="material-symbols-outlined text-[#718096] text-3xl mb-2">water_drop</span>
            <p className="font-semibold text-sm text-[#4A5568]">Belum Ada Catatan Gula Darah</p>
            <p className="text-xs text-[#718096] mt-1">Data grafik riwayat gula darah pasien akan muncul di sini.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 relative w-full h-40">
              <svg className="w-full h-full" viewBox="0 0 340 140" preserveAspectRatio="none">
                {/* Gridlines */}
                <line x1="0" y1="20" x2="340" y2="20" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3" />
                <line x1="0" y1="60" x2="340" y2="60" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3" />
                <line x1="0" y1="100" x2="340" y2="100" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3" />
                
                {/* Before Meal Line (Teal) */}
                {beforePoints && (
                  <polyline
                    fill="none"
                    stroke="#00695C"
                    strokeWidth="2.5"
                    points={beforePoints}
                  />
                )}

                {/* After Meal Line (Red) */}
                {afterPoints && (
                  <polyline
                    fill="none"
                    stroke="#C53030"
                    strokeWidth="2.5"
                    points={afterPoints}
                  />
                )}

                {/* Points on Before Meal */}
                {beforeCircles.map((pt, i) => (
                  <circle key={`bef-${i}`} cx={pt.cx} cy={pt.cy} r="4" fill="#FFFFFF" stroke="#00695C" strokeWidth="2" title={`Sebelum: ${pt.val} mg/dL`} />
                ))}

                {/* Points on After Meal */}
                {afterCircles.map((pt, i) => (
                  <circle key={`aft-${i}`} cx={pt.cx} cy={pt.cy} r="4" fill="#FFFFFF" stroke="#C53030" strokeWidth="2" title={`Sesudah: ${pt.val} mg/dL`} />
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
          </>
        )}
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
            {!hasData ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-xs text-[#718096]">
                  Tidak ada catatan riwayat.
                </td>
              </tr>
            ) : (
              logs.slice(0, 4).map((log) => (
                <tr key={log.id} className="border-b border-[#E2E8F0]/40 hover:bg-[#F4F6F8]/30 transition-colors">
                  <td className="py-3 px-2 text-[#1A202C]">{log.date}</td>
                  <td className="py-3 px-2 text-[#1A202C]">{log.before} mg/dL</td>
                  <td className={`py-3 px-2 ${log.after > 140 ? "text-[#C53030] font-bold" : "text-[#1A202C]"}`}>
                    {log.after} mg/dL
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
