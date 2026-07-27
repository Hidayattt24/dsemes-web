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

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds === 0) return "-";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}d`;
  return s > 0 ? `${m}m ${s}d` : `${m}m`;
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

  // Compute preferred media stats
  const articleOnlyCount = progress.filter((p) => p.completion_source === "ARTICLE").length;
  const videoOnlyCount = progress.filter((p) => p.completion_source === "VIDEO").length;
  const bothCount = progress.filter((p) => p.article_read && p.youtube_watched).length;

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

      {/* Preferred Media Analytics */}
      <div className="premium-card p-6">
        <h3 className="text-base font-bold text-[#1A202C] mb-1">Preferensi Media Pembelajaran</h3>
        <p className="text-xs text-[#718096] mb-4">Media yang paling sering digunakan pasien untuk menyelesaikan materi ini.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Article preferred */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#EBF8FF] border border-[#BEE3F8]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-[#2B6CB0]">menu_book</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#2B6CB0] mb-0.5">Selesai via Artikel</p>
              <p className="text-xl font-bold text-[#1A202C]">{articleOnlyCount}</p>
              <p className="text-[11px] text-[#718096]">pasien</p>
            </div>
          </div>
          {/* Video preferred */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-[#B45309]">play_circle</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#B45309] mb-0.5">Selesai via Video</p>
              <p className="text-xl font-bold text-[#1A202C]">{videoOnlyCount}</p>
              <p className="text-[11px] text-[#718096]">pasien</p>
            </div>
          </div>
          {/* Both */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF5FF] border border-[#DDD6FE]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-[#6B21A8]">done_all</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B21A8] mb-0.5">Baca + Tonton Video</p>
              <p className="text-xl font-bold text-[#1A202C]">{bothCount}</p>
              <p className="text-[11px] text-[#718096]">pasien</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Table */}
      <div className="premium-card overflow-hidden">
        <div className="p-6 pb-0 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1A202C]">Detail Per Pasien</h3>
            <p className="text-xs text-[#718096] mt-0.5">Status baca artikel, tonton video, dan sumber penyelesaian materi.</p>
          </div>
          <span className="text-xs text-[#718096] font-medium">{progress.length} peserta</span>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FAFC]">
              <tr className="text-[#718096] text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5 border-b border-[#E2E8F0]">Nama Pasien</th>
                <th className="py-3.5 px-5 border-b border-[#E2E8F0] text-center">Baca Artikel</th>
                <th className="py-3.5 px-5 border-b border-[#E2E8F0] text-center">Tonton Video</th>
                <th className="py-3.5 px-5 border-b border-[#E2E8F0] text-center">Status</th>
                <th className="py-3.5 px-5 border-b border-[#E2E8F0] text-center">Media Selesai</th>
                <th className="py-3.5 px-5 border-b border-[#E2E8F0]">Aktivitas Terakhir</th>
              </tr>
            </thead>
            <tbody className="text-xs font-medium divide-y divide-[#E2E8F0]/40 bg-white">
              {progress.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-[#718096]">
                    Belum ada peserta yang berinteraksi dengan materi ini.
                  </td>
                </tr>
              ) : (
                progress.map((item) => (
                  <tr key={item.patient_id} className="hover:bg-[#F8FAFC] transition-colors">
                    {/* Name */}
                    <td className="py-3.5 px-5 font-semibold text-[#1A202C] whitespace-nowrap">{item.patient_name || "-"}</td>

                    {/* Article Read */}
                    <td className="py-3.5 px-5 text-center">
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

                    {/* YouTube Watched */}
                    <td className="py-3.5 px-5 text-center">
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

                    {/* Completion Status */}
                    <td className="py-3.5 px-5 text-center">
                      {item.completed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F0FDF4] text-[#166534] border border-[#DCFCE7]">
                          <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          Selesai
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFF5F5] text-[#C53030] border border-[#FED7D7]">
                          <span className="material-symbols-outlined text-[12px]">cancel</span>
                          Belum
                        </span>
                      )}
                    </td>

                    {/* Completion Source */}
                    <td className="py-3.5 px-5 text-center">
                      {item.completion_source === "ARTICLE" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EBF8FF] text-[#2B6CB0] border border-[#BEE3F8]">
                          <span className="material-symbols-outlined text-[12px]">menu_book</span>
                          Artikel
                        </span>
                      ) : item.completion_source === "VIDEO" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                          <span className="material-symbols-outlined text-[12px]">play_circle</span>
                          Video
                        </span>
                      ) : (
                        <span className="text-[#9CA3AF]">-</span>
                      )}
                    </td>

                    {/* Last Activity */}
                    <td className="py-3.5 px-5 text-[#718096] whitespace-nowrap">
                      {item.last_activity_at ? formatDate(item.last_activity_at) : "-"}
                    </td>
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
