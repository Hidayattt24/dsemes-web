"use client";

interface PatientEducationActivityProps {
  readonly data?: any[];
}

export function PatientEducationActivity({ data = [] }: PatientEducationActivityProps) {
  // Filter for completed logs
  const completedLogs = data.filter((log: any) => log.status === "Completed");

  return (
    <div className="premium-card p-8 flex flex-col justify-between h-full font-[family-name:var(--font-poppins)]">
      <h4 className="font-semibold text-lg text-[#1A202C] mb-8">
        Aktivitas Edukasi
      </h4>

      {/* Stats Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#00695C]/5 p-4 rounded-xl border border-[#00695C]/10 text-center">
          <p className="text-[10px] uppercase font-bold text-[#00695C] tracking-widest mb-1">
            Modul Selesai
          </p>
          <p className="text-2xl font-bold text-[#00695C]">
            0 <span className="text-xs font-normal text-[#718096]">/ 10</span>
          </p>
        </div>
        <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#E2E8F0]/40 text-center">
          <p className="text-[10px] uppercase font-bold text-[#718096] tracking-widest mb-1">
            Artikel Dibaca
          </p>
          <p className="text-2xl font-bold text-[#1A202C]">
            0
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-6">
          Aktivitas Terakhir
        </p>

        {/* Vertical Timeline container with absolute line and flex rows */}
        <div className="relative ml-2">
          {completedLogs.length > 0 ? (
            <div className="relative space-y-8">
              {/* Vertical line placed absolute in background */}
              <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-[#00695C]/20 z-0"></div>

              {completedLogs.slice(0, 3).map((log: any, idx: number) => {
                const logDate = log.logged_at ? new Date(log.logged_at) : new Date();
                const dateStr = logDate.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' });
                return (
                  <div key={log.id || idx} className="relative flex items-start gap-6 z-10">
                    <div className="w-5 h-5 rounded-full bg-[#00695C] border-4 border-white shadow-sm flex-shrink-0 mt-0.5"></div>
                    <div>
                      <p className="font-semibold text-sm text-[#1A202C]">
                        {log.descriptive_name || log.routine_type}
                      </p>
                      <p className="text-[11px] text-[#718096] font-medium">
                        Selesai • {dateStr} • {log.scheduled_time || "06:00"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Modern Empty State Timeline */
            <div className="bg-[#F8F9FA] border border-[#E2E8F0] p-6 rounded-2xl text-center max-w-sm -ml-2">
              <span className="material-symbols-outlined text-[#718096] text-3xl mb-2">school</span>
              <p className="font-semibold text-sm text-[#4A5568]">Belum Ada Aktivitas Edukasi</p>
              <p className="text-xs text-[#718096] mt-1">Riwayat aktivitas membaca artikel dan menyelesaikan modul akan muncul di sini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
