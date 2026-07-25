"use client";

import { useEducationProgress } from "../hooks/useEducationProgress";
import { BackButton } from "@/components/common/BackButton";
import { ROUTES } from "@/constants/routes";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/common/ErrorState";

interface StatCard {
  label: string;
  value: number;
  icon: string;
  color: string;
  bg: string;
}

function AnalyticsCard({ label, value, icon, color, bg }: StatCard) {
  return (
    <div className="premium-card p-5 flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: bg, color }}>
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold text-[#718096] uppercase tracking-widest mb-0.5 font-[family-name:var(--font-poppins)]">
          {label}
        </p>
        <p className="text-2xl font-bold text-[#1A202C] font-[family-name:var(--font-poppins)]">
          {value.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

interface EducationProgressFeatureProps {
  readonly articleId: string;
}

export function EducationProgressFeature({ articleId }: EducationProgressFeatureProps) {
  const { progress, analytics, isLoading, error, refetch } = useEducationProgress(articleId);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1600px] mx-auto w-full">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  const statsCards: StatCard[] = [
    { label: "Total Pasien", value: analytics?.total_patients ?? 0, icon: "group", color: "#00695C", bg: "#F0F9F8" },
    { label: "Selesai", value: analytics?.completed_count ?? 0, icon: "check_circle", color: "#166534", bg: "#F0FDF4" },
    { label: "Baca Artikel", value: analytics?.read_article_count ?? 0, icon: "menu_book", color: "#2B6CB0", bg: "#EBF8FF" },
    { label: "Tonton Video", value: analytics?.watched_video_count ?? 0, icon: "play_circle", color: "#B45309", bg: "#FFFBEB" },
    { label: "Baca + Video", value: analytics?.read_and_video_count ?? 0, icon: "done_all", color: "#6B21A8", bg: "#FAF5FF" },
    { label: "Belum Mulai", value: analytics?.not_started_count ?? 0, icon: "radio_button_unchecked", color: "#9CA3AF", bg: "#F9FAFB" },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)]">
      {/* Header */}
      <div className="mb-2">
        <BackButton href={ROUTES.MANAJEMEN_EDUKASI} label="Manajemen Edukasi" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[#1A202C] tracking-tight">Progress Peserta</h2>
        <p className="text-sm text-[#718096] mt-1">Pantau perkembangan belajar peserta untuk setiap materi edukasi.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsCards.map((card) => (
          <AnalyticsCard key={card.label} {...card} />
        ))}
      </div>

      {/* Progress Table */}
      <div className="premium-card overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-base font-bold text-[#1A202C]">Daftar Peserta</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FAFC]">
              <tr className="text-[#718096] text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6 border-b border-[#E2E8F0]">Nama Pasien</th>
                <th className="py-3.5 px-6 border-b border-[#E2E8F0]">Puskesmas</th>
                <th className="py-3.5 px-6 border-b border-[#E2E8F0] text-center">Baca Artikel</th>
                <th className="py-3.5 px-6 border-b border-[#E2E8F0] text-center">Tonton Video</th>
                <th className="py-3.5 px-6 border-b border-[#E2E8F0] text-center">Status</th>
                <th className="py-3.5 px-6 border-b border-[#E2E8F0]">Aktivitas Terakhir</th>
                <th className="py-3.5 px-6 border-b border-[#E2E8F0]">Tanggal Selesai</th>
              </tr>
            </thead>
            <tbody className="text-xs font-medium divide-y divide-[#E2E8F0]/40 bg-white">
              {progress.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-[#718096]">
                    Belum ada peserta yang berinteraksi dengan materi ini.
                  </td>
                </tr>
              ) : (
                progress.map((item) => (
                  <tr key={item.patient_id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-[#1A202C]">{item.patient_name || "-"}</td>
                    <td className="py-3.5 px-6 text-[#718096]">{item.puskesmas || "-"}</td>
                    <td className="py-3.5 px-6 text-center">
                      {item.article_read ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F0FDF4] text-[#166534]">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F9FAFB] text-[#D1D5DB]">
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      {item.youtube_watched ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F0FDF4] text-[#166534]">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F9FAFB] text-[#D1D5DB]">
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      {item.completed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F0FDF4] text-[#166534] border border-[#DCFCE7]">
                          <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFF5F5] text-[#C53030] border border-[#FED7D7]">
                          <span className="material-symbols-outlined text-[12px]">cancel</span>
                          Not Completed
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-[#718096]">{item.last_activity_at ? formatDate(item.last_activity_at) : "-"}</td>
                    <td className="py-3.5 px-6 text-[#718096]">{item.completed_at ? formatDate(item.completed_at) : "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}
