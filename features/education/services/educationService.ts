import type { EducationArticle, EducationStats } from "../types/education";

let MOCK_ARTICLES: EducationArticle[] = [
  {
    id: "1",
    title: "Manajemen Diet Diabetes Melitus",
    category: "Nutrisi & Makanan",
    shortDescription: "Panduan praktis mengatur pola makan dan porsi karbohidrat harian bagi penderita diabetes.",
    content: "Mengatur pola makan adalah kunci utama dalam mengelola diabetes melitus. Penderita disarankan untuk menerapkan metode 3J (Jumlah, Jenis, dan Jadwal). Kurangi karbohidrat sederhana seperti gula pasir dan nasi putih berlebih, serta tingkatkan konsumsi karbohidrat kompleks seperti nasi merah, gandum, dan serat tinggi dari sayuran segar.",
    duration: 8,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBonHLOi4DDR8Fl6O72N8wIWCIp9Ym2wPa1_3ST_Z2K8fJvYa2863-5Y0LRfVmavV-p0Fy0LS2-oH461IazfxZAiYY0BcqzJt-7gpWA0dTtpkAPKJ53BIDfL_TYSca0G0KHXKr97AfLSZ_RW1Q6GG5U6nKnAMo-NEVKQwqllgbhO0cgm80p2sM0RyTeBI6KTWOyMGI6zXUJokQOJlsBSxGG9FEtglu-HJ8fRF0thI6vI48rloIsrpsyQ2urYhat0TddrT4iOpvIpLYD",
    status: "Diterbitkan",
    createdBy: "Dr. Ahmad Faisal",
    createdAt: "12 Jan 2023",
    updatedAt: "15 Jan 2023",
    readCount: 1420,
  },
  {
    id: "2",
    title: "Pentingnya Olahraga dan Aktivitas Fisik",
    category: "Aktivitas Fisik",
    shortDescription: "Rekomendasi jenis latihan fisik ringan yang aman dilakukan secara rutin setiap hari.",
    content: "Aktivitas fisik membantu meningkatkan sensitivitas insulin sehingga sel-sel tubuh dapat menggunakan glukosa dengan lebih efektif. Lakukan olahraga intensitas sedang seperti jalan cepat, bersepeda santai, atau berenang selama 30 menit per hari, minimal 5 kali seminggu. Pastikan untuk selalu memantau kadar gula darah sebelum dan setelah latihan fisik.",
    duration: 5,
    youtubeLink: "",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBonHLOi4DDR8Fl6O72N8wIWCIp9Ym2wPa1_3ST_Z2K8fJvYa2863-5Y0LRfVmavV-p0Fy0LS2-oH461IazfxZAiYY0BcqzJt-7gpWA0dTtpkAPKJ53BIDfL_TYSca0G0KHXKr97AfLSZ_RW1Q6GG5U6nKnAMo-NEVKQwqllgbhO0cgm80p2sM0RyTeBI6KTWOyMGI6zXUJokQOJlsBSxGG9FEtglu-HJ8fRF0thI6vI48rloIsrpsyQ2urYhat0TddrT4iOpvIpLYD",
    status: "Diterbitkan",
    createdBy: "Dr. Ahmad Faisal",
    createdAt: "14 Jan 2023",
    updatedAt: "14 Jan 2023",
    readCount: 980,
  },
  {
    id: "3",
    title: "Cara Mengukur Gula Darah Mandiri di Rumah",
    category: "Kepatuhan Medis",
    shortDescription: "Langkah demi langkah menggunakan glukometer secara higienis dan pencatatan berkala.",
    content: "Pemantauan Gula Darah Mandiri (PGDM) sangat penting untuk mengevaluasi efektivitas terapi medis. Cucilah tangan dengan air mengalir dan sabun, siapkan alat lancing device dan strip glukometer. Tusuk jari secara perlahan di bagian samping ujung jari (kurang sensitif terhadap nyeri), teteskan darah pada strip, dan catat hasilnya pada logbook digital Anda.",
    duration: 6,
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBonHLOi4DDR8Fl6O72N8wIWCIp9Ym2wPa1_3ST_Z2K8fJvYa2863-5Y0LRfVmavV-p0Fy0LS2-oH461IazfxZAiYY0BcqzJt-7gpWA0dTtpkAPKJ53BIDfL_TYSca0G0KHXKr97AfLSZ_RW1Q6GG5U6nKnAMo-NEVKQwqllgbhO0cgm80p2sM0RyTeBI6KTWOyMGI6zXUJokQOJlsBSxGG9FEtglu-HJ8fRF0thI6vI48rloIsrpsyQ2urYhat0TddrT4iOpvIpLYD",
    status: "Diterbitkan",
    createdBy: "Dr. Sarah Amanda",
    createdAt: "20 Feb 2023",
    updatedAt: "22 Feb 2023",
    readCount: 1120,
  },
  {
    id: "4",
    title: "Mengelola Stres untuk Menjaga Stabilitas Gula Darah",
    category: "Kesehatan Mental",
    shortDescription: "Mempelajari pengaruh hormon stres terhadap kadar glukosa dan latihan relaksasi pikiran.",
    content: "Stres psikologis memicu pelepasan hormon kortisol dan adrenalin yang memicu peningkatan kadar glukosa darah (glukogenesis). Latihan pernapasan dalam (deep breathing), meditasi terpandu, serta tidur yang cukup selama 7-8 jam semalam terbukti klinis membantu menjaga kestabilan kadar glukosa harian pada penderita diabetes tipe 2.",
    duration: 7,
    youtubeLink: "",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBonHLOi4DDR8Fl6O72N8wIWCIp9Ym2wPa1_3ST_Z2K8fJvYa2863-5Y0LRfVmavV-p0Fy0LS2-oH461IazfxZAiYY0BcqzJt-7gpWA0dTtpkAPKJ53BIDfL_TYSca0G0KHXKr97AfLSZ_RW1Q6GG5U6nKnAMo-NEVKQwqllgbhO0cgm80p2sM0RyTeBI6KTWOyMGI6zXUJokQOJlsBSxGG9FEtglu-HJ8fRF0thI6vI48rloIsrpsyQ2urYhat0TddrT4iOpvIpLYD",
    status: "Draf",
    createdBy: "Dr. Ahmad Faisal",
    createdAt: "10 Mar 2023",
    updatedAt: "10 Mar 2023",
    readCount: 0,
  },
  {
    id: "5",
    title: "Mengenal Karbohidrat Kompleks untuk Penderita Diabetes",
    category: "Nutrisi & Makanan",
    shortDescription: "Perbedaan karbohidrat sederhana vs kompleks serta dampaknya bagi indeks glikemik.",
    content: "Indeks Glikemik (IG) mengukur seberapa cepat makanan meningkatkan kadar gula darah. Makanan dengan IG tinggi (seperti roti putih atau sirup) diserap sangat cepat, sedangkan karbohidrat kompleks (IG rendah) dicerna lambat, melepaskan energi secara bertahap sehingga mencegah lonjakan gula darah ekstrem pasca-makan.",
    duration: 10,
    youtubeLink: "",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBonHLOi4DDR8Fl6O72N8wIWCIp9Ym2wPa1_3ST_Z2K8fJvYa2863-5Y0LRfVmavV-p0Fy0LS2-oH461IazfxZAiYY0BcqzJt-7gpWA0dTtpkAPKJ53BIDfL_TYSca0G0KHXKr97AfLSZ_RW1Q6GG5U6nKnAMo-NEVKQwqllgbhO0cgm80p2sM0RyTeBI6KTWOyMGI6zXUJokQOJlsBSxGG9FEtglu-HJ8fRF0thI6vI48rloIsrpsyQ2urYhat0TddrT4iOpvIpLYD",
    status: "Diterbitkan",
    createdBy: "Dr. Sarah Amanda",
    createdAt: "12 Apr 2023",
    updatedAt: "15 Apr 2023",
    readCount: 1300,
  },
];

export const educationService = {
  /** Get all articles */
  async getArticles(): Promise<EducationArticle[]> {
    await new Promise((r) => setTimeout(r, 300));
    return [...MOCK_ARTICLES];
  },

  /** Get single article by ID */
  async getArticleById(id: string): Promise<EducationArticle | null> {
    await new Promise((r) => setTimeout(r, 200));
    const article = MOCK_ARTICLES.find((a) => a.id === id);
    return article ?? null;
  },

  /** Save (Create or Update) */
  async saveArticle(article: Partial<EducationArticle> & { id?: string }): Promise<EducationArticle> {
    await new Promise((r) => setTimeout(r, 400));
    if (article.id) {
      // Update
      const idx = MOCK_ARTICLES.findIndex((a) => a.id === article.id);
      if (idx !== -1) {
        const existing = MOCK_ARTICLES[idx];
        const updated: EducationArticle = {
          ...existing,
          ...article,
          id: existing.id,
          updatedAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
        } as EducationArticle;
        MOCK_ARTICLES[idx] = updated;
        return updated;
      }
    }
    // Create new
    const newId = (MOCK_ARTICLES.length + 1).toString();
    const newArt: EducationArticle = {
      id: newId,
      title: article.title ?? "",
      category: article.category ?? "Lainnya",
      shortDescription: article.shortDescription ?? "",
      content: article.content ?? "",
      duration: article.duration ?? 5,
      youtubeLink: article.youtubeLink ?? "",
      thumbnail: article.thumbnail || "https://lh3.googleusercontent.com/aida-public/AB6AXuBonHLOi4DDR8Fl6O72N8wIWCIp9Ym2wPa1_3ST_Z2K8fJvYa2863-5Y0LRfVmavV-p0Fy0LS2-oH461IazfxZAiYY0BcqzJt-7gpWA0dTtpkAPKJ53BIDfL_TYSca0G0KHXKr97AfLSZ_RW1Q6GG5U6nKnAMo-NEVKQwqllgbhO0cgm80p2sM0RyTeBI6KTWOyMGI6zXUJokQOJlsBSxGG9FEtglu-HJ8fRF0thI6vI48rloIsrpsyQ2urYhat0TddrT4iOpvIpLYD",
      status: article.status ?? "Draf",
      createdBy: "Dr. Ahmad Faisal",
      createdAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
      updatedAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
      readCount: 0,
    };
    MOCK_ARTICLES.push(newArt);
    return newArt;
  },

  /** Delete article */
  async deleteArticle(id: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 200));
    const initialLength = MOCK_ARTICLES.length;
    MOCK_ARTICLES = MOCK_ARTICLES.filter((a) => a.id !== id);
    return MOCK_ARTICLES.length < initialLength;
  },

  /** Get statistics counts */
  async getStats(): Promise<EducationStats> {
    await new Promise((r) => setTimeout(r, 300));
    const categories = new Set(MOCK_ARTICLES.map((a) => a.category));
    const published = MOCK_ARTICLES.filter((a) => a.status === "Diterbitkan");
    const totalReads = MOCK_ARTICLES.reduce((acc, curr) => acc + curr.readCount, 0);

    return {
      totalEducation: MOCK_ARTICLES.length,
      totalCategories: categories.size,
      publishedArticles: published.length,
      totalReads: totalReads,
    };
  },
} as const;
