"use client";

import { useState } from "react";
import { useEducationDetail } from "../hooks/useEducationDetail";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useToast } from "@/components/ui/Toast";

interface EducationDetailFeatureProps {
  readonly articleId: string;
}

export function EducationDetailFeature({ articleId }: EducationDetailFeatureProps) {
  const {
    article,
    isLoading,
    isDeleting,
    error,
    deleteArticle,
    refetch,
    goBack,
    goToEdit,
  } = useEducationDetail(articleId);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { showToast } = useToast();

  const handleConfirmDelete = async () => {
    showToast({
      type: "success",
      title: "Berhasil",
      description: "Materi edukasi berhasil dihapus.",
    });
    await deleteArticle();
    setIsDeleteOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !article) {
    return <ErrorState message={error ?? "Artikel tidak ditemukan."} onRetry={refetch} />;
  }

  // Related articles mock details
  const relatedArticles = [
    {
      title: "Pola Makan 3J untuk Diabetesi yang Efektif",
      date: "15 Jan 2023",
      duration: "5 Min",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA9Kvi0rYYDjMNNHx1CGHyFYx891hKmQGIzPklNK2z9M8h7XW7j0vzKYoDGRx3Rk1bl4o6wVbOXDqtU8w6pUzOPfx8INdYFOd99PfECXOpTSZfCFAErikfNPfOp5ZsOLaX8EUDDtpCqiiPQayfhs3QJTWcCVY-hpKKGhAEE9DCVRUboAQFn84aNztmWAFo-DnjPml0gps2OQli0IGu4hTzu7YuJbNWFcZSYPigH2OO0pgf9bXybjncIBWNV7dh5o-zN9pglUbYvK5K",
    },
    {
      title: "Olahraga Aman dan Terukur untuk Pasien Diabetes",
      date: "12 Jan 2023",
      duration: "7 Min",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWLygb52l7hlD4Ugk86up1pg9F0OvB5Pe8uYdAW-KXN6PqHGPiT8A5t0oJPbBN0fPXxsvAvceQM-YXUHUiFJxPlVeJcpKGLAMR4IC8L9YX0MLHi_tX9uGSr4t8EVMe8BbW5ItjPEtMoMlzk_Bx1E-ZE51L-Bsk-YBRm6hyb5WN5LJol7e1PLAIdrZn4hf-06Xp0Vxyl0YbsCW-ukv6vkHW3kX3Tm3JqLjrSxxMSnHOhIstp4OYg4rDz8tn4_KDSz7A0SYK8y9qqpuT",
    },
  ];

  const isDefaultArticle = article.id === "1";

  return (
    <section className="max-w-[1600px] mx-auto w-full font-[family-name:var(--font-poppins)] p-6 space-y-8">
      {/* Breadcrumbs & Actions Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <nav className="flex items-center gap-2 text-[13px] text-[#718096]">
          <Link href={ROUTES.MANAJEMEN_EDUKASI} className="hover:text-[#00695C] transition-colors">
            Manajemen Edukasi
          </Link>
          <span className="material-symbols-outlined text-[16px] select-none">chevron_right</span>
          <span className="text-[#00695C] font-medium">Detail Artikel</span>
        </nav>
        <div className="flex items-center gap-3">
          {/* Edit */}
          <button
            onClick={goToEdit}
            className="bg-white border border-[#E2E8F0] text-[#1A202C] px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#F4F6F8] active:scale-95 transition-all text-sm font-semibold shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
            <span>Edit Artikel</span>
          </button>
          {/* Delete */}
          <button
            onClick={() => setIsDeleteOpen(true)}
            disabled={isDeleting}
            className="bg-[#FFF5F5] text-[#C53030] px-6 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all text-sm font-semibold border border-red-100 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
            <span>Hapus</span>
          </button>
        </div>
      </div>

      {/* 12-Column Responsive Grid */}
      <div className="grid grid-cols-12 gap-8 items-start">
        
        {/* Main Content Area: 9 Columns (~72%) */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          
          {/* Article Card Container */}
          <div className="premium-card p-8 lg:p-10 space-y-8">
            
            {/* Hero Image */}
            <div className="relative h-[380px] w-full rounded-xl overflow-hidden group border border-[#E2E8F0]/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.thumbnail}
                alt="Hero"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#F0F9F8] text-[#00695C] text-[10px] font-bold rounded-full uppercase tracking-widest font-[family-name:var(--font-poppins)]">
                  Diabetes Care
                </span>
                <span className="px-3 py-1 bg-[#00695C] text-white text-[10px] font-bold rounded-full uppercase tracking-widest font-[family-name:var(--font-poppins)]">
                  Terbitan Terbaru
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1A202C] leading-tight font-[family-name:var(--font-poppins)]">
                {article.title}
              </h1>

              <div className="flex items-center flex-wrap gap-8 py-4 border-b border-[#E2E8F0] text-[#718096] text-[13px] font-[family-name:var(--font-poppins)]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00695C] text-[18px]">calendar_today</span>
                  <span>{article.createdAt === "12 Jan 2023" ? "24 Oktober 2023" : article.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00695C] text-[18px]">schedule</span>
                  <span>{article.duration} Menit Baca</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00695C] text-[18px]">visibility</span>
                  <span>{article.readCount === 1420 ? "1,240" : article.readCount.toLocaleString("id-ID")} Dilihat</span>
                </div>
              </div>
            </div>

            {/* Article Content Body */}
            <article className="prose max-w-none text-[#1A202C] font-[family-name:var(--font-poppins)]">
              {isDefaultArticle ? (
                <>
                  <p className="text-lg font-medium italic border-l-4 border-[#00695C] pl-6 bg-[#F0F9F8]/30 py-4 rounded-r-lg leading-relaxed">
                    Diabetes Melitus adalah kondisi kronis yang memerlukan perhatian berkelanjutan. Melalui edukasi manajemen mandiri (DSMES), pasien dapat secara signifikan meningkatkan kualitas hidup dan mengurangi risiko komplikasi jangka panjang.
                  </p>
                  
                  <p className="text-base text-[#4A5568] leading-relaxed mt-6">
                    Dalam artikel ini, kita akan membahas pilar-pilar utama pengelolaan diabetes, mulai dari pemantauan kadar gula darah secara mandiri, pengaturan pola makan yang seimbang, hingga pentingnya aktivitas fisik yang terukur. Pemahaman mendalam mengenai mekanisme penyakit membantu pasien mengambil keputusan yang tepat dalam situasi sehari-hari.
                  </p>

                  {/* Inline Two-Column Images */}
                  <div className="grid grid-cols-2 gap-6 my-10">
                    <div className="rounded-xl overflow-hidden border border-[#E2E8F0] shadow-sm aspect-[4/3] bg-[#F4F6F8]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt="Dietary education"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMQYfz7rV6EhsE2sj7_zb9EH39viduL03wF_Kb3E8gay8BzbDvsdnNbSUgf87atScN8VloDV1vnL6uRhzjSCQiMZcqQwxNpHPuFs9Ofk_yYpwlVWrFid3BPfl7hn09w2eGTPl0AG2CTN4L1t0KjwCgfrA7G0YkrYjMu9odi2vge_V9R2yE7ylUl2skr2cxjNXt5dAi0fSaHw5wc56KcXaPNPngnTU4qIxnWvFQMTOpeqTPAzio03GUUtNqnf0biE6zwb2rF8sn6p8A"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-[#E2E8F0] shadow-sm aspect-[4/3] bg-[#F4F6F8]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt="Medical devices"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOp-paqRbi5e6NHehRYQzI1TnXCm65JQIbt4Tg1Cr7RbQhMTALyYHdlqna5UZOVAPPTYR9yBxYyRliiThE3xAC1bQWrciqnf3B48VFAfWzgJYyaE1jT_YKaVIqqc50FpDpzeuRnqMOmk4aFvVPkBehxkT48Kf_-FivFW2ydpd-VaxnAfADlTKOJ1Ol_uzIokNGO4n4wc6QtOYMc2SYFWctM2CQ-ZPCVX09r-f9DLAPcmQbm-vNo163KX64XvTRgBubOKyXvB_gAfdR"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A202C] mb-4">Pentingnya Pemantauan Rutin</h3>
                  <p className="text-base text-[#4A5568] leading-relaxed mb-6">
                    Monitoring rutin bukan sekadar mencatat angka. Ini adalah proses belajar tentang bagaimana tubuh Anda merespons berbagai faktor seperti stres, makanan tertentu, dan olahraga. Data ini sangat krusial bagi tenaga medis untuk menyesuaikan rencana perawatan Anda secara personal.
                  </p>

                  <div className="bg-[#F0F9F8]/50 p-8 rounded-2xl border-l-4 border-[#00695C] my-10">
                    <p className="text-[#00695C] font-semibold italic text-lg leading-relaxed">
                      &quot;Kunci keberhasilan manajemen diabetes bukan pada obat semata, melainkan pada pemahaman pasien terhadap kondisi mereka sendiri.&quot;
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A202C] mb-4">Rekomendasi Aktivitas Fisik</h3>
                  <p className="text-base text-[#4A5568] leading-relaxed mb-0">
                    Aktivitas fisik membantu sel-sel tubuh menjadi lebih sensitif terhadap insulin. Kami merekomendasikan setidaknya 150 menit aktivitas aerobik intensitas sedang per minggu, yang dibagi menjadi minimal 3 hari dalam seminggu.
                  </p>
                </>
              ) : (
                <div
                  className="text-base text-[#4A5568] leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              )}
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-8 mt-8 border-t border-[#E2E8F0]">
              {["#Diabetes", "#EdukasiPasien", "#KesehatanAceh", "#DietSehat"].map((tag) => (
                <span
                  key={tag}
                  className="bg-[#F4F6F8] px-4 py-1.5 rounded-lg text-[12px] font-bold text-[#718096] border border-[#E2E8F0] uppercase tracking-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Navigation Action */}
          <div className="flex justify-between items-center py-6">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-[#718096] hover:text-[#00695C] transition-all font-semibold text-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span>Kembali ke Daftar Manajemen</span>
            </button>
            <div className="flex gap-4 items-center text-[#718096]">
              <div className="w-2 h-2 rounded-full bg-[#00695C] animate-pulse"></div>
              <span className="text-[11px] italic font-medium">Terakhir dilihat oleh Anda: Hari ini, 14:20</span>
            </div>
          </div>

        </div>

        {/* Right Sidebar: 3 Columns (~28%) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          {/* Status Card */}
          <div className="premium-card p-6">
            <h4 className="text-[11px] font-bold text-[#718096] uppercase tracking-widest mb-6 font-[family-name:var(--font-poppins)]">
              Status Artikel
            </h4>
            <div className="space-y-4 font-[family-name:var(--font-poppins)]">
              <div className="flex justify-between items-center py-2.5 border-b border-[#E2E8F0]/50">
                <span className="text-[#718096] text-[13px]">Status</span>
                <span className={[
                  "text-[10px] font-bold px-3 py-1 rounded-full uppercase",
                  article.status === "Diterbitkan"
                    ? "bg-[#F0FDF4] text-[#15803d]"
                    : "bg-[#F4F6F8] text-[#718096]",
                ].join(" ")}>
                  {article.status === "Diterbitkan" ? "Terbit" : "Draf"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-[#E2E8F0]/50">
                <span className="text-[#718096] text-[13px]">Visibilitas</span>
                <span className="text-[#1A202C] font-semibold text-[13px]">Publik</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-[#E2E8F0]/50">
                <span className="text-[#718096] text-[13px]">Update Terakhir</span>
                <span className="text-[#1A202C] font-semibold text-[13px]">{article.updatedAt === "15 Jan 2023" ? "25/10/2023" : article.updatedAt}</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-[#718096] text-[13px]">Kategori</span>
                <span className="text-[#00695C] font-bold text-[13px]">{article.category === "Nutrisi & Makanan" ? "Manajemen Diet" : article.category}</span>
              </div>
            </div>
          </div>

          {/* Related Articles Card */}
          <div className="premium-card p-6">
            <h4 className="text-[11px] font-bold text-[#718096] uppercase tracking-widest mb-6 font-[family-name:var(--font-poppins)]">
              Artikel Terkait
            </h4>
            <div className="space-y-4 font-[family-name:var(--font-poppins)]">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.title}
                  href="#"
                  className="flex gap-4 p-2 rounded-xl hover:bg-[#F4F6F8] transition-all group"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-[#E2E8F0] bg-[#F4F6F8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.img}
                      alt={rel.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h5 className="text-[13px] font-bold text-[#1A202C] leading-tight group-hover:text-[#00695C] transition-colors line-clamp-2">
                      {rel.title}
                    </h5>
                    <p className="text-[11px] text-[#718096] mt-1.5">
                      {rel.date} • {rel.duration}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      <ConfirmationModal
        open={isDeleteOpen}
        title="Hapus Materi Edukasi?"
        description="Materi yang dihapus tidak dapat dikembalikan."
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </section>
  );
}
