import type { SystemSettings } from "../types/settings";

const MOCK_SETTINGS: SystemSettings = {
  name: "Super Admin DSMES",
  username: "admin_dsmes",
  email: "admin@dsmes.aceh.go.id",
  whatsapp: "+62 812 3456 7890",
  jabatan: "Koordinator Sistem Informasi",
  bio: "Pengelola data edukasi diabetes untuk wilayah Provinsi Aceh.",
  profilePhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgXQXLVFGk1Nrd-ADH3h_MNcdMj_qPog-L4rHBMCV-Vsm_ZdGgHkT9DALy4_bkKhZalkTAm_8ofXGwPTB_RWBmX45Qb5VoWXN-HBG2QODw_C-IfJXyIEtO0WWNvuFGdfhEGTdb-Ti_seazXi-IIFL91t2nV6yiAIxci7JvsBtGPYN1DENDbnjslIuujTvgaRbKHyReJPrEVDPMBC7xn2cm52cdiZVwJ8RoPvoZt_bckjEkzeGtZtbGV5G4HT3053vPLTNI2G1hkPRx",
};

export const settingsService = {
  async getSettings(): Promise<SystemSettings> {
    await new Promise((r) => setTimeout(r, 200));
    return { ...MOCK_SETTINGS };
  },

  async saveSettings(settings: SystemSettings): Promise<SystemSettings> {
    await new Promise((r) => setTimeout(r, 300));
    Object.assign(MOCK_SETTINGS, settings);
    return { ...MOCK_SETTINGS };
  },
} as const;
