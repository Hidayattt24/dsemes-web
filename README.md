# DSMES Web Admin & Staff Portal

Portal Web Admin dan Puskesmas untuk sistem **DSMES Aceh** (Diabetes Self-Management Education and Support).

## 🚀 Tech Stack

- **Framework**: **Next.js 16.2.10** (App Router Architecture)
- **UI Library & Language**: **React 19.2.4**, **TypeScript 5**
- **Styling**: **Tailwind CSS v4** & PostCSS
- **State Management**: **Zustand 5.0.0**
- **Form & Validation**: **React Hook Form** (`v7.56`) & **Zod** (`v3.25`)
- **HTTP Client**: **Axios** (`v1.7.9`)
- **Proxy/Routing**: Next.js Middleware & `proxy.ts`

## 🏗️ Struktur Proyek

```text
dsmes-web/
├── app/          # Next.js App Router (Layouts & Pages)
├── components/   # Reusable UI Components (Tables, Modals, Cards)
├── features/     # Business Features
│   ├── auth/              # Login Staff/Admin & Reset Password
│   ├── dashboard/         # Analytics & Ringkasan Pasien Puskesmas
│   ├── patient/           # Manajemen & Detail Rekam Medis Pasien
│   ├── record-monitoring/ # Pemantauan Harian Gula Darah Pasien
│   ├── education/         # Content Management Artikel & Video
│   ├── quiz/              # Manajemen Bank Soal & Assessment
│   └── administrator/     # Pengaturan Akun Staff Puskesmas
├── services/     # API Integration Service Layer
└── types/        # TypeScript Interfaces & Types
```

## 🛠️ Menjalankan Web Admin

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build production
npm run build
```
