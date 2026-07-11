"use client";

import type { MedicationLog } from "../types/record";

interface MedicationComplianceCardProps {
  readonly logs: MedicationLog[];
}

export function MedicationComplianceCard({ logs }: MedicationComplianceCardProps) {
  // Group logs by dateGroup
  const groupedLogs = logs.reduce<Record<string, MedicationLog[]>>((acc, log) => {
    if (!acc[log.dateGroup]) {
      acc[log.dateGroup] = [];
    }
    acc[log.dateGroup].push(log);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col h-[520px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-[#1A202C] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00695C]">medication</span>
          Kepatuhan Obat
        </h3>
        <button className="text-[#00695C] hover:text-[#004d43] text-xs font-bold hover:underline transition-colors cursor-pointer">
          Lihat Kalender
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="space-y-6">
          {Object.entries(groupedLogs).map(([dateGroup, items]) => (
            <div key={dateGroup}>
              <p className="text-xs font-bold text-[#718096] bg-[#F4F6F8] px-3 py-1.5 rounded-lg inline-block mb-3">
                {dateGroup}
              </p>
              
              <div className="space-y-3">
                {items.map((item) => {
                  const isDiminum = item.status === "Diminum";
                  const isTerlewat = item.status === "Terlewat";
                  const isMendatang = item.status === "Mendatang";

                  return (
                    <div
                      key={item.id}
                      className={[
                        "border rounded-xl p-4 flex justify-between items-center transition-all hover:shadow-sm",
                        isTerlewat
                          ? "border-[#FEB2B2] bg-[#FFF5F5]/30"
                          : "border-[#E2E8F0] bg-white",
                        isMendatang ? "opacity-60" : ""
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-4">
                        <div className={[
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          isDiminum
                            ? "bg-[#F0F9F8] text-[#00695C]"
                            : isTerlewat
                            ? "bg-[#FFF5F5] text-[#C53030]"
                            : "bg-[#F4F6F8] text-[#718096]"
                        ].join(" ")}>
                          <span className="material-symbols-outlined text-[20px]">pill</span>
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isTerlewat ? "text-[#C53030]" : "text-[#1A202C]"}`}>
                            {item.name}
                          </p>
                          <p className="text-xs text-[#718096] mt-0.5">
                            {item.dosage} • {item.time}
                          </p>
                        </div>
                      </div>

                      <span>
                        {isDiminum && (
                          <span className="bg-[#F0FDF4] text-[#166534] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Diminum
                          </span>
                        )}
                        {isTerlewat && (
                          <span className="bg-[#FFF5F5] text-[#C53030] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">cancel</span>
                            Terlewat
                          </span>
                        )}
                        {isMendatang && (
                          <span className="bg-[#F4F6F8] text-[#718096] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            Mendatang
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
