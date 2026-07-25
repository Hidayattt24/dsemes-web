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
  const filtered = logs.filter((log) => {
    const logDate = log.rawDate ? new Date(log.rawDate) : new Date();
    return logDate >= cutoffDate;
  });

  const hasData = filtered.length > 0;

  // Chart data: sort chronological (ascending) and take last 10 points
  const chartLogs = [...filtered]
    .sort((a, b) => (a.rawDate?.getTime() ?? 0) - (b.rawDate?.getTime() ?? 0))
    .slice(-10);

  const getY = (val: number) => {
    const clamped = Math.max(50, Math.min(250, val));
    return 110 - ((clamped - 70) / 180) * 80;
  };

  const N = chartLogs.length;
  const linePoints = N > 0 
    ? chartLogs.map((p, idx) => `${20 + (idx / Math.max(1, N - 1)) * 300},${getY(p.glucoseValue)}`).join(" ")
    : "";

  const circles = chartLogs.map((p, idx) => {
    let strokeColor = "#00695C";
    if (p.measurementTimeType === "sesudah_makan") {
      strokeColor = "#C53030";
    } else if (p.measurementTimeType === "sewaktu") {
      strokeColor = "#2B6CB0";
    }

    return {
      cx: 20 + (idx / Math.max(1, N - 1)) * 300,
      cy: getY(p.glucoseValue),
      val: p.glucoseValue,
      label: p.measurementTimeLabel,
      strokeColor,
    };
  });

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
                
                {/* Glucose Value Line */}
                {linePoints && (
                  <polyline
                    fill="none"
                    stroke="#00695C"
                    strokeWidth="2.5"
                    points={linePoints}
                  />
                )}

                {/* Points */}
                {circles.map((pt, i) => (
                  <circle key={`pt-${i}`} cx={pt.cx} cy={pt.cy} r="4" fill="#FFFFFF" stroke={pt.strokeColor} strokeWidth="2.5">
                    <title>{`${pt.label}: ${pt.val} mg/dL`}</title>
                  </circle>
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
              <span className="flex items-center gap-1.5 text-[#2B6CB0]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2B6CB0]"></span>
                Sewaktu Makan
              </span>
            </div>
          </>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-y-auto max-h-[160px] pr-1">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white shadow-sm z-10">
            <tr className="border-b border-[#E2E8F0] text-[#718096] text-[11px] font-bold uppercase tracking-wider">
              <th className="py-2 px-2.5 font-semibold">Tanggal</th>
              <th className="py-2 px-2.5 font-semibold">Jam</th>
              <th className="py-2 px-2.5 font-semibold">Catat Gula Darah</th>
              <th className="py-2 px-2.5 font-semibold">Keterangan</th>
            </tr>
          </thead>
          <tbody className="text-xs font-medium divide-y divide-[#E2E8F0]/40">
            {!hasData ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-xs text-[#718096]">
                  Tidak ada catatan riwayat gula darah.
                </td>
              </tr>
            ) : (
              logs.map((log, idx) => (
                <tr key={log.id || `bs-${idx}`} className="hover:bg-[#F4F6F8]/50 transition-colors">
                  <td className="py-2.5 px-2.5 text-[#1A202C] font-semibold">{log.date}</td>
                  <td className="py-2.5 px-2.5 text-[#718096]">{log.time}</td>
                  <td className="py-2.5 px-2.5 font-bold text-[#1A202C]">
                    {log.glucoseValue} mg/dL
                  </td>
                  <td className="py-2.5 px-2.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      log.measurementTimeType === "sebelum_makan"
                        ? "bg-[#F0FDF4] text-[#166534]"
                        : log.measurementTimeType === "sesudah_makan"
                        ? "bg-[#FFF5F5] text-[#C53030]"
                        : "bg-[#EBF8FF] text-[#2B6CB0]"
                    }`}>
                      {log.measurementTimeLabel}
                    </span>
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
