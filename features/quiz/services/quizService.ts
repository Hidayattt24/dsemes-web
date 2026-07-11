import type { Quiz, QuizStats, QuizParticipant, ParticipantQuizDetail, ParticipantQuestionAnalysis } from "../types/quiz";

let MOCK_QUIZZES: Quiz[] = [
  {
    id: "1",
    title: "Pre-test Diabetes Dasar",
    linkedArticleId: "1",
    linkedArticleTitle: "Pengenalan Diabetes Mellitus",
    difficulty: "Sedang",
    passingScore: 80,
    status: "Terbit",
    participantCount: 3,
    averageScore: 78,
    createdBy: "Dr. Ahmad Faisal",
    createdAt: "24 Okt 2023",
    updatedAt: "25 Okt 2023",
    questions: [
      {
        id: "q1_1",
        questionText: "Manakah di bawah ini yang merupakan pengertian paling tepat mengenai Diabetes Melitus?",
        options: {
          A: "Penyakit menular yang disebabkan oleh konsumsi gula berlebih",
          B: "Gangguan metabolik kronis yang ditandai dengan tingginya kadar gula darah",
          C: "Kondisi sementara akibat kelelahan fisik dan stres pikiran",
          D: "Penyakit jantung koroner yang memicu penyumbatan darah"
        },
        correctOption: "B",
        explanation: "Diabetes Melitus adalah gangguan metabolik kronis yang ditandai oleh peningkatan kadar glukosa darah (hiperglikemia) akibat gangguan sekresi insulin, kerja insulin, atau keduanya."
      },
      {
        id: "q1_2",
        questionText: "Pola pengelolaan makan bagi penderita diabetes melitus dikenal dengan prinsip 3J. Apa saja kepanjangannya?",
        options: {
          A: "Jantung, Jasmani, Jiwa",
          B: "Jumlah, Jenis, Jadwal",
          C: "Jam, Jarak, Jenuh",
          D: "Jernih, Jujur, Jenjang"
        },
        correctOption: "B",
        explanation: "Prinsip 3J dalam manajemen diet diabetes melitus mengacu pada Jumlah kalori yang dikonsumsi, Jenis bahan makanan yang dipilih, dan Jadwal makan yang teratur."
      },
      {
        id: "q1_3",
        questionText: "Berapakah kadar gula darah puasa yang menjadi salah satu kriteria diagnosis Diabetes Melitus?",
        options: {
          A: "< 100 mg/dL",
          B: "100 - 125 mg/dL",
          C: ">= 126 mg/dL",
          D: "140 - 199 mg/dL"
        },
        correctOption: "C",
        explanation: "Berdasarkan pedoman klinis, kadar gula darah puasa >= 126 mg/dL setelah berpuasa minimal 8 jam merupakan salah satu kriteria diagnosis Diabetes Melitus."
      }
    ]
  },
  {
    id: "2",
    title: "Evaluasi Gizi Harian",
    linkedArticleId: "5",
    linkedArticleTitle: "Panduan Nutrisi Harian",
    difficulty: "Mudah",
    passingScore: 75,
    status: "Terbit",
    participantCount: 2,
    averageScore: 82,
    createdBy: "Dr. Ahmad Faisal",
    createdAt: "12 Apr 2023",
    updatedAt: "15 Apr 2023",
    questions: [
      {
        id: "q2_1",
        questionText: "Mengapa karbohidrat kompleks lebih disukai dibanding karbohidrat sederhana untuk penderita diabetes?",
        options: {
          A: "Karbohidrat kompleks dicerna lebih lambat sehingga mencegah lonjakan gula darah mendadak",
          B: "Karbohidrat kompleks rasanya jauh lebih manis sehingga disukai",
          C: "Karbohidrat kompleks langsung diubah menjadi lemak tubuh tanpa glukosa",
          D: "Karbohidrat kompleks tidak mengandung kalori sama sekali"
        },
        correctOption: "A",
        explanation: "Karbohidrat kompleks memiliki indeks glikemik yang lebih rendah dan dicerna lambat oleh tubuh, sehingga melepaskan glukosa secara bertahap dan menjaga gula darah tetap stabil."
      },
      {
        id: "q2_2",
        questionText: "Manakah contoh bahan makanan sumber karbohidrat kompleks dengan indeks glikemik rendah?",
        options: {
          A: "Roti putih dan sirup manis",
          B: "Beras merah, gandum utuh, dan sayuran berserat",
          C: "Kue kering dan minuman bersoda",
          D: "Jus buah instan kemasan manis"
        },
        correctOption: "B",
        explanation: "Beras merah, gandum utuh, dan sayur-sayuran segar kaya akan serat larut yang membantu menghambat penyerapan glukosa di usus."
      }
    ]
  },
  {
    id: "3",
    title: "Kuesioner Aktivitas Fisik",
    linkedArticleId: "2",
    linkedArticleTitle: "Olahraga Aman untuk Diabetisi",
    difficulty: "Sulit",
    passingScore: 80,
    status: "Draft",
    participantCount: 0,
    averageScore: null,
    createdBy: "Dr. Sarah Amanda",
    createdAt: "10 Mar 2023",
    updatedAt: "10 Mar 2023",
    questions: [
      {
        id: "q3_1",
        questionText: "Berapa durasi latihan fisik aerobik intensitas sedang yang disarankan bagi penderita diabetes tipe 2 per minggu?",
        options: {
          A: "Minimal 60 menit per minggu",
          B: "Minimal 150 menit per minggu, dibagi dalam 3-5 hari",
          C: "Minimal 300 menit per minggu tanpa jeda",
          D: "Hanya disarankan 15 menit saja per minggu"
        },
        correctOption: "B",
        explanation: "Rekomendasi global menyarankan penderita diabetes tipe 2 melakukan olahraga aerobik intensitas sedang (seperti jalan cepat) minimal 150 menit per minggu untuk membantu sensitivitas insulin."
      }
    ]
  }
];

const MOCK_PARTICIPANTS: Record<string, QuizParticipant[]> = {
  "1": [
    {
      id: "part_1_1",
      patientId: "1",
      patientName: "Siti Aminah",
      patientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhU-Hk4J7-QwG_TgPPscW97PKMfOmlGhJXO-dOqkzp2jJ9aWwYOM1rXPsgUkcIYNo5rof32MqUsTekD7rrupTDWloq1aOYVP-dleSPZl-1BuAf4Prl5F00nKJCC22biA_O_nBXDtnBMKt-BO871B3BvtBlf4eAT0RJHk54Wceci-JqbMoGBpddQ5HGHtNpVEqQlWJmb7-ZGaPw2Ss2XNUbwCsDcuDusTjFrPfb2ay8SLCj54EtrIlAWMcHPm6KokYQuPqFRpyDXybM",
      puskesmas: "Puskesmas Kuta Alam",
      completionDate: "29 Jun 2026",
      score: 67, // 2/3 correct
      passed: false, // passing score is 80
      duration: "4m 12s",
    },
    {
      id: "part_1_2",
      patientId: "2",
      patientName: "Budi Santoso",
      puskesmas: "Puskesmas Meuraxa",
      completionDate: "28 Jun 2026",
      score: 33, // 1/3 correct
      passed: false,
      duration: "6m 45s",
    },
    {
      id: "part_1_3",
      patientId: "3",
      patientName: "Cut Nyak Meutia",
      puskesmas: "Puskesmas Syiah Kuala",
      completionDate: "25 Jun 2026",
      score: 100, // 3/3 correct
      passed: true,
      duration: "3m 30s",
    }
  ],
  "2": [
    {
      id: "part_2_1",
      patientId: "1",
      patientName: "Siti Aminah",
      patientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhU-Hk4J7-QwG_TgPPscW97PKMfOmlGhJXO-dOqkzp2jJ9aWwYOM1rXPsgUkcIYNo5rof32MqUsTekD7rrupTDWloq1aOYVP-dleSPZl-1BuAf4Prl5F00nKJCC22biA_O_nBXDtnBMKt-BO871B3BvtBlf4eAT0RJHk54Wceci-JqbMoGBpddQ5HGHtNpVEqQlWJmb7-ZGaPw2Ss2XNUbwCsDcuDusTjFrPfb2ay8SLCj54EtrIlAWMcHPm6KokYQuPqFRpyDXybM",
      puskesmas: "Puskesmas Kuta Alam",
      completionDate: "29 Jun 2026",
      score: 100, // 2/2 correct
      passed: true, // passing score is 75
      duration: "3m 15s",
    },
    {
      id: "part_2_2",
      patientId: "2",
      patientName: "Budi Santoso",
      puskesmas: "Puskesmas Meuraxa",
      completionDate: "28 Jun 2026",
      score: 50, // 1/2 correct
      passed: false,
      duration: "5m 10s",
    }
  ],
  "3": []
};

const MOCK_QUESTION_ANALYSIS: Record<string, Record<string, ParticipantQuestionAnalysis[]>> = {
  "1": {
    "1": [
      {
        id: "qa_1_1_1",
        questionNumber: 1,
        questionText: "Manakah di bawah ini yang merupakan pengertian paling tepat mengenai Diabetes Melitus?",
        patientAnswer: "B. Gangguan metabolik kronis yang ditandai dengan tingginya kadar gula darah",
        correctAnswer: "B. Gangguan metabolik kronis yang ditandai dengan tingginya kadar gula darah",
        isCorrect: true,
        explanation: "Diabetes Melitus adalah gangguan metabolik kronis yang ditandai oleh peningkatan kadar glukosa darah (hiperglikemia)."
      },
      {
        id: "qa_1_1_2",
        questionNumber: 2,
        questionText: "Pola pengelolaan makan bagi penderita diabetes melitus dikenal dengan prinsip 3J. Apa saja kepanjangannya?",
        patientAnswer: "A. Jantung, Jasmani, Jiwa",
        correctAnswer: "B. Jumlah, Jenis, Jadwal",
        isCorrect: false,
        explanation: "Prinsip 3J dalam manajemen diet diabetes melitus mengacu pada Jumlah kalori, Jenis bahan makanan, dan Jadwal makan teratur."
      },
      {
        id: "qa_1_1_3",
        questionNumber: 3,
        questionText: "Berapakah kadar gula darah puasa yang menjadi salah satu kriteria diagnosis Diabetes Melitus?",
        patientAnswer: "C. >= 126 mg/dL",
        correctAnswer: "C. >= 126 mg/dL",
        isCorrect: true,
        explanation: "Kadar gula darah puasa >= 126 mg/dL setelah berpuasa minimal 8 jam merupakan kriteria diagnosis Diabetes Melitus."
      }
    ],
    "2": [
      {
        id: "qa_1_2_1",
        questionNumber: 1,
        questionText: "Manakah di bawah ini yang merupakan pengertian paling tepat mengenai Diabetes Melitus?",
        patientAnswer: "A. Penyakit menular yang disebabkan oleh konsumsi gula berlebih",
        correctAnswer: "B. Gangguan metabolik kronis yang ditandai dengan tingginya kadar gula darah",
        isCorrect: false,
        explanation: "Diabetes Melitus adalah gangguan metabolik kronis yang ditandai oleh peningkatan kadar glukosa darah (hiperglikemia)."
      },
      {
        id: "qa_1_2_2",
        questionNumber: 2,
        questionText: "Pola pengelolaan makan bagi penderita diabetes melitus dikenal dengan prinsip 3J. Apa saja kepanjangannya?",
        patientAnswer: "A. Jantung, Jasmani, Jiwa",
        correctAnswer: "B. Jumlah, Jenis, Jadwal",
        isCorrect: false,
        explanation: "Prinsip 3J dalam manajemen diet diabetes melitus mengacu pada Jumlah kalori, Jenis bahan makanan, dan Jadwal makan teratur."
      },
      {
        id: "qa_1_2_3",
        questionNumber: 3,
        questionText: "Berapakah kadar gula darah puasa yang menjadi salah satu kriteria diagnosis Diabetes Melitus?",
        patientAnswer: "C. >= 126 mg/dL",
        correctAnswer: "C. >= 126 mg/dL",
        isCorrect: true,
        explanation: "Kadar gula darah puasa >= 126 mg/dL setelah berpuasa minimal 8 jam merupakan kriteria diagnosis Diabetes Melitus."
      }
    ],
    "3": [
      {
        id: "qa_1_3_1",
        questionNumber: 1,
        questionText: "Manakah di bawah ini yang merupakan pengertian paling tepat mengenai Diabetes Melitus?",
        patientAnswer: "B. Gangguan metabolik kronis yang ditandai dengan tingginya kadar gula darah",
        correctAnswer: "B. Gangguan metabolik kronis yang ditandai dengan tingginya kadar gula darah",
        isCorrect: true,
        explanation: "Diabetes Melitus adalah gangguan metabolik kronis yang ditandai oleh peningkatan kadar glukosa darah (hiperglikemia)."
      },
      {
        id: "qa_1_3_2",
        questionNumber: 2,
        questionText: "Pola pengelolaan makan bagi penderita diabetes melitus dikenal dengan prinsip 3J. Apa saja kepanjangannya?",
        patientAnswer: "B. Jumlah, Jenis, Jadwal",
        correctAnswer: "B. Jumlah, Jenis, Jadwal",
        isCorrect: true,
        explanation: "Prinsip 3J dalam manajemen diet diabetes melitus mengacu pada Jumlah kalori, Jenis bahan makanan, dan Jadwal makan teratur."
      },
      {
        id: "qa_1_3_3",
        questionNumber: 3,
        questionText: "Berapakah kadar gula darah puasa yang menjadi salah satu kriteria diagnosis Diabetes Melitus?",
        patientAnswer: "C. >= 126 mg/dL",
        correctAnswer: "C. >= 126 mg/dL",
        isCorrect: true,
        explanation: "Kadar gula darah puasa >= 126 mg/dL setelah berpuasa minimal 8 jam merupakan kriteria diagnosis Diabetes Melitus."
      }
    ]
  },
  "2": {
    "1": [
      {
        id: "qa_2_1_1",
        questionNumber: 1,
        questionText: "Mengapa karbohidrat kompleks lebih disukai dibanding karbohidrat sederhana untuk penderita diabetes?",
        patientAnswer: "A. Karbohidrat kompleks dicerna lebih lambat sehingga mencegah lonjakan gula darah mendadak",
        correctAnswer: "A. Karbohidrat kompleks dicerna lebih lambat sehingga mencegah lonjakan gula darah mendadak",
        isCorrect: true,
        explanation: "Karbohidrat kompleks dicerna lambat oleh tubuh sehingga melepaskan glukosa secara bertahap."
      },
      {
        id: "qa_2_1_2",
        questionNumber: 2,
        questionText: "Manakah contoh bahan makanan sumber karbohidrat kompleks dengan indeks glikemik rendah?",
        patientAnswer: "B. Beras merah, gandum utuh, dan sayuran berserat",
        correctAnswer: "B. Beras merah, gandum utuh, dan sayuran berserat",
        isCorrect: true,
        explanation: "Beras merah dan sayuran mengandung indeks glikemik rendah."
      }
    ],
    "2": [
      {
        id: "qa_2_2_1",
        questionNumber: 1,
        questionText: "Mengapa karbohidrat kompleks lebih disukai dibanding karbohidrat sederhana untuk penderita diabetes?",
        patientAnswer: "A. Karbohidrat kompleks dicerna lebih lambat sehingga mencegah lonjakan gula darah mendadak",
        correctAnswer: "A. Karbohidrat kompleks dicerna lebih lambat sehingga mencegah lonjakan gula darah mendadak",
        isCorrect: true,
        explanation: "Karbohidrat kompleks dicerna lambat oleh tubuh sehingga melepaskan glukosa secara bertahap."
      },
      {
        id: "qa_2_2_2",
        questionNumber: 2,
        questionText: "Manakah contoh bahan makanan sumber karbohidrat kompleks dengan indeks glikemik rendah?",
        patientAnswer: "A. Roti putih dan sirup manis",
        correctAnswer: "B. Beras merah, gandum utuh, dan sayuran berserat",
        isCorrect: false,
        explanation: "Beras merah dan sayuran mengandung indeks glikemik rendah."
      }
    ]
  }
};

export const quizService = {
  /** Get all quizzes */
  async getQuizzes(): Promise<Quiz[]> {
    await new Promise((r) => setTimeout(r, 200));
    return [...MOCK_QUIZZES];
  },

  /** Get single quiz by ID */
  async getQuizById(id: string): Promise<Quiz | null> {
    await new Promise((r) => setTimeout(r, 150));
    const quiz = MOCK_QUIZZES.find((q) => q.id === id);
    return quiz ?? null;
  },

  /** Save (Create or Update) */
  async saveQuiz(quiz: Partial<Quiz> & { id?: string }): Promise<Quiz> {
    await new Promise((r) => setTimeout(r, 300));
    if (quiz.id) {
      // Update
      const idx = MOCK_QUIZZES.findIndex((q) => q.id === quiz.id);
      if (idx !== -1) {
        const existing = MOCK_QUIZZES[idx];
        const updated: Quiz = {
          ...existing,
          ...quiz,
          id: existing.id,
          updatedAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
        } as Quiz;
        MOCK_QUIZZES[idx] = updated;
        return updated;
      }
    }
    // Create new
    const newId = (MOCK_QUIZZES.length + 1).toString();
    const newQuiz: Quiz = {
      id: newId,
      title: quiz.title ?? "",
      linkedArticleId: quiz.linkedArticleId ?? "1",
      linkedArticleTitle: quiz.linkedArticleTitle ?? "Pengenalan Diabetes Mellitus",
      difficulty: quiz.difficulty ?? "Sedang",
      passingScore: quiz.passingScore ?? 80,
      status: quiz.status ?? "Draft",
      questions: quiz.questions ?? [],
      participantCount: 0,
      averageScore: null,
      createdBy: "Dr. Ahmad Faisal",
      createdAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
      updatedAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    };
    MOCK_QUIZZES.push(newQuiz);
    return newQuiz;
  },

  /** Delete quiz */
  async deleteQuiz(id: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 150));
    const initialLength = MOCK_QUIZZES.length;
    MOCK_QUIZZES = MOCK_QUIZZES.filter((q) => q.id !== id);
    return MOCK_QUIZZES.length < initialLength;
  },

  /** Get statistics summary */
  async getStats(): Promise<QuizStats> {
    await new Promise((r) => setTimeout(r, 200));
    const total = MOCK_QUIZZES.length;
    const published = MOCK_QUIZZES.filter((q) => q.status === "Terbit").length;
    const draft = total - published;
    
    // Sum attempts and calculate average of average scores
    const totalAttempts = MOCK_QUIZZES.reduce((acc, curr) => acc + curr.participantCount, 0);
    const activeAverageScores = MOCK_QUIZZES.filter((q) => q.averageScore !== null);
    const averageScore = activeAverageScores.length > 0
      ? Math.round(activeAverageScores.reduce((acc, curr) => acc + (curr.averageScore ?? 0), 0) / activeAverageScores.length)
      : 84;

    return {
      totalQuizzes: total,
      publishedQuizzes: published,
      draftQuizzes: draft,
      totalAttempts,
      averageScore,
    };
  },

  /** Get participants for a specific quiz */
  async getParticipantsByQuizId(quizId: string): Promise<QuizParticipant[]> {
    await new Promise((r) => setTimeout(r, 200));
    return MOCK_PARTICIPANTS[quizId] || [];
  },

  /** Get participant quiz detail */
  async getParticipantDetail(quizId: string, participantId: string): Promise<ParticipantQuizDetail | null> {
    await new Promise((r) => setTimeout(r, 200));
    const list = MOCK_PARTICIPANTS[quizId] || [];
    const participant = list.find((p) => p.patientId === participantId);
    if (!participant) return null;

    const quiz = MOCK_QUIZZES.find((q) => q.id === quizId);
    const quizTitle = quiz?.title ?? "Kuesioner";

    const analysis = (MOCK_QUESTION_ANALYSIS[quizId] && MOCK_QUESTION_ANALYSIS[quizId][participantId]) || [];

    return {
      participant,
      quizTitle,
      questionAnalysis: analysis,
    };
  }
} as const;
