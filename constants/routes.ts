/**
 * Application route constants.
 * Never use raw path strings — always import from here.
 */
export const ROUTES = {
  HOME: "/",
  // Auth
  LOGIN: "/login",
  LUPA_PASSWORD: "/lupa-password",
  VERIFIKASI_KODE: "/verifikasi-kode",
  ATUR_ULANG_KATA_SANDI: "/atur-ulang-kata-sandi",
  BERHASIL_RESET: "/berhasil-reset",
  // Admin pages
  DASHBOARD: "/admin/dashboard",
  DATA_PASIEN: "/admin/data-pasien",
  MANAJEMEN_EDUKASI: "/admin/manajemen-edukasi",
  ADMINISTRATOR: "/admin/administrator",
  PENGATURAN: "/admin/pengaturan",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
