"use client";

export function PatientEducationActivity() {
  return (
    <div className="premium-card p-8 flex flex-col justify-between h-full">
      <h4 className="font-semibold text-lg text-[#1A202C] mb-8 font-[family-name:var(--font-poppins)]">
        Aktivitas Edukasi
      </h4>

      {/* Stats Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#00695C]/5 p-4 rounded-xl border border-[#00695C]/10 text-center">
          <p className="text-[10px] uppercase font-bold text-[#00695C] tracking-widest mb-1 font-[family-name:var(--font-poppins)]">
            Modul Selesai
          </p>
          <p className="text-2xl font-bold text-[#00695C] font-[family-name:var(--font-poppins)]">
            4 <span className="text-xs font-normal text-[#718096]">/ 10</span>
          </p>
        </div>
        <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#E2E8F0]/40 text-center">
          <p className="text-[10px] uppercase font-bold text-[#718096] tracking-widest mb-1 font-[family-name:var(--font-poppins)]">
            Artikel Dibaca
          </p>
          <p className="text-2xl font-bold text-[#1A202C] font-[family-name:var(--font-poppins)]">
            12
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-[#718096] mb-6 font-[family-name:var(--font-poppins)]">
          Aktivitas Terakhir
        </p>

        {/* Vertical Timeline container with absolute line and flex rows */}
        <div className="relative space-y-8 ml-2">
          {/* Vertical line placed absolute in background */}
          <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-[#00695C]/20 z-0"></div>

          {/* Item 1 - Flex row with 24px gap (gap-6) to push content text clean off bullet */}
          <div className="relative flex items-start gap-6 z-10">
            <div className="w-5 h-5 rounded-full bg-[#00695C] border-4 border-white shadow-sm flex-shrink-0 mt-0.5"></div>
            <div>
              <p className="font-semibold text-sm text-[#1A202C] font-[family-name:var(--font-poppins)]">
                Modul 2: Manajemen Diet
              </p>
              <p className="text-[11px] text-[#718096] font-medium font-[family-name:var(--font-poppins)]">
                Selesai • 15 Okt 2023 • 15 mnt
              </p>
            </div>
          </div>

          {/* Item 2 - Flex row with 24px gap (gap-6) */}
          <div className="relative flex items-start gap-6 z-10">
            <div className="w-5 h-5 rounded-full bg-[#00695C] border-4 border-white shadow-sm flex-shrink-0 mt-0.5"></div>
            <div>
              <p className="font-semibold text-sm text-[#1A202C] font-[family-name:var(--font-poppins)]">
                Artikel: Mengenal Karbohidrat
              </p>
              <p className="text-[11px] text-[#718096] font-medium font-[family-name:var(--font-poppins)]">
                Selesai • 14 Okt 2023 • 5 mnt
              </p>
            </div>
          </div>

          {/* Item 3 - Flex row with 24px gap (gap-6) */}
          <div className="relative flex items-start gap-6 z-10">
            <div className="w-5 h-5 rounded-full bg-[#E2E8F0] border-4 border-white flex-shrink-0 mt-0.5"></div>
            <div>
              <p className="font-semibold text-sm text-[#718096] font-[family-name:var(--font-poppins)]">
                Modul 3: Aktivitas Fisik
              </p>
              <p className="text-[11px] text-[#718096] font-medium font-[family-name:var(--font-poppins)]">
                Sedang Dibaca • 10 mnt tersisa
              </p>
              <div className="w-full bg-[#edeef0] h-1 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-[#00695C] h-full rounded-full" 
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
