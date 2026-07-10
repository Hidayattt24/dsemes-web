import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Kuisioner | Digital DSMES Admin",
  description: "Halaman untuk mengelola kuisioner pasien DSMES.",
};

export default function ManajemenKuisionerPage() {
  return (
    <section className="space-y-8 max-w-[1600px] mx-auto w-full">
      <div>
        <h2 className="text-2xl font-bold text-[#1A202C] tracking-tight font-[family-name:var(--font-poppins)]">
          Manajemen Kuisioner
        </h2>
        <p className="text-sm text-[#718096] mt-1 font-[family-name:var(--font-poppins)]">
          Kelola kuisioner dan kuesioner evaluasi pasien DSMES Aceh.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-lg font-semibold text-[#1A202C] font-[family-name:var(--font-poppins)]">
            Coming Soon
          </p>
          <p className="text-sm text-[#718096] mt-1 font-[family-name:var(--font-poppins)]">
            Halaman ini sedang dalam pengembangan.
          </p>
        </div>
      </div>
    </section>
  );
}
