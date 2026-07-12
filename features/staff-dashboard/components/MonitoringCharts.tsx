import type { ActivityDataPoint, FoodIntakeItem, AdherenceItem } from "../hooks/useStaffDashboard";

interface MonitoringChartsProps {
  readonly physicalActivity: readonly ActivityDataPoint[];
  readonly foodIntake: readonly FoodIntakeItem[];
  readonly medicationAdherence: readonly AdherenceItem[];
}

export function MonitoringCharts({
  physicalActivity,
  foodIntake,
  medicationAdherence,
}: MonitoringChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 1. Global Food Intake (Doughnut Chart of Meal Log Distribution) */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col font-[family-name:var(--font-poppins)]">
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#1A202C]">Distribusi Asupan Makanan</h3>
          <p className="text-xs text-[#718096] mt-0.5">Distribusi pencatatan makanan harian (Sarapan, Siang, Malam, Cemilan)</p>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* SVG Doughnut */}
          <div className="relative w-36 h-36 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="70" fill="transparent" stroke="#F8FAFC" strokeWidth="20" />
              
              {/* Makan Siang: 38% -> length = 439.8 * 0.38 = 167.1. Offset = 0 */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="20"
                strokeDasharray="167.1 439.8"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              
              {/* Sarapan: 32% -> length = 439.8 * 0.32 = 140.7. Offset = -167.1 */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="transparent"
                stroke="#00695C"
                strokeWidth="20"
                strokeDasharray="140.7 439.8"
                strokeDashoffset="-167.1"
                strokeLinecap="round"
              />
              
              {/* Makan Malam: 22% -> length = 439.8 * 0.22 = 96.8. Offset = -307.8 */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="transparent"
                stroke="#F59E0B"
                strokeWidth="20"
                strokeDasharray="96.8 439.8"
                strokeDashoffset="-307.8"
                strokeLinecap="round"
              />
              
              {/* Cemilan: 8% -> length = 439.8 * 0.08 = 35.2. Offset = -404.6 */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="transparent"
                stroke="#EF4444"
                strokeWidth="20"
                strokeDasharray="35.2 439.8"
                strokeDashoffset="-404.6"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-extrabold text-[#1A202C]">1.500</span>
              <span className="text-[9px] text-[#718096] uppercase tracking-wider font-bold">Total Log</span>
            </div>
          </div>

          {/* Details list */}
          <div className="w-full space-y-2">
            {foodIntake.map((item) => (
              <div key={item.category} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[#4A5568] font-semibold">{item.category}</span>
                </div>
                <span className="font-bold text-[#1A202C]">
                  {item.percentage}% <span className="text-[#718096] font-medium text-[10px]">({item.count})</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Physical Activity Distribution (Vertical Bar Chart) */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col font-[family-name:var(--font-poppins)]">
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#1A202C]">Distribusi Aktivitas Fisik</h3>
          <p className="text-xs text-[#718096] mt-0.5">Persentase tingkat intensitas aktivitas fisik populasi pasien</p>
        </div>

        <div className="flex-1 flex gap-4 items-end justify-around h-36 border-b border-[#E2E8F0] pb-2">
          {physicalActivity.map((point) => (
            <div key={point.day} className="flex flex-col items-center w-12 group relative">
              {/* Tooltip value */}
              <div className="absolute -top-10 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-md">
                {point.value}% Pasien
              </div>

              {/* Vertical Bar */}
              <div className="w-full bg-[#F1F5F9] rounded-t-lg h-28 flex items-end overflow-hidden">
                <div
                  className="w-full bg-gradient-to-t from-[#00695C] to-[#10B981] rounded-t-lg hover:opacity-90 transition-all cursor-default"
                  style={{ height: `${point.heightPercent}%` }}
                />
              </div>

              {/* Label */}
              <span className="text-xs font-bold text-[#4A5568] mt-2">{point.day}</span>
              <span className="text-[10px] font-extrabold text-[#00695C] mt-0.5">{point.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Medication Adherence (Horizontal Progress bars) */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col font-[family-name:var(--font-poppins)]">
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#1A202C]">Kepatuhan Minum Obat</h3>
          <p className="text-xs text-[#718096] mt-0.5">Tingkat kepatuhan konsumsi obat/insulin pasien terdaftar</p>
        </div>

        <div className="flex-1 justify-center flex flex-col space-y-4">
          {medicationAdherence.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#4A5568]">{item.label}</span>
                <span className="font-extrabold text-[#1A202C]">
                  {item.percentage}% <span className="text-[#718096] font-medium text-[10px]">({item.count})</span>
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
