import type { Administrator } from "../types/administrator";

let MOCK_ADMINISTRATORS: Administrator[] = [
  {
    id: "1",
    name: "Ahmad Hidayat",
    username: "ahmad_h",
    email: "ahmad.h@aceh.go.id",
    whatsapp: "+62 812 3456 7890",
    status: "Aktif",
    role: "Monitoring Staff",
    lastLogin: "Hari ini, 08:34",
    createdAt: "12 Okt 2023",
  },
  {
    id: "2",
    name: "Siti Pertiwi",
    username: "siti_p",
    email: "siti.p@dinkes.aceh.go.id",
    whatsapp: "+62 812 9876 5432",
    status: "Aktif",
    role: "Monitoring Staff",
    lastLogin: "Kemarin, 14:15",
    createdAt: "15 Okt 2023",
  },
  {
    id: "3",
    name: "Dr. Ahmad Faisal",
    username: "ahmad_faisal",
    email: "ahmad.faisal@dsmes.go.id",
    whatsapp: "+62 811 9988 7766",
    status: "Aktif",
    role: "Monitoring Staff",
    lastLogin: "Hari ini, 09:12",
    createdAt: "01 Jun 2023",
  },
  {
    id: "4",
    name: "Budi Santoso",
    username: "budi_s",
    email: "budi.s@aceh.go.id",
    whatsapp: "+62 813 1122 3344",
    status: "Aktif",
    role: "Monitoring Staff",
    lastLogin: "08 Nov 2023, 10:20",
    createdAt: "18 Okt 2023",
  },
  {
    id: "5",
    name: "Dewi Lestari",
    username: "dewi_l",
    email: "dewi.l@dinkes.aceh.go.id",
    whatsapp: "+62 812 5566 7788",
    status: "Nonaktif",
    role: "Monitoring Staff",
    lastLogin: "01 Nov 2023, 16:45",
    createdAt: "20 Okt 2023",
  },
];

export const administratorService = {
  async getAdministrators(): Promise<Administrator[]> {
    await new Promise((r) => setTimeout(r, 200));
    return [...MOCK_ADMINISTRATORS];
  },

  async saveAdministrator(admin: Partial<Administrator> & { id?: string }): Promise<Administrator> {
    await new Promise((r) => setTimeout(r, 300));
    if (admin.id) {
      // Update
      const idx = MOCK_ADMINISTRATORS.findIndex((a) => a.id === admin.id);
      if (idx !== -1) {
        const existing = MOCK_ADMINISTRATORS[idx];
        const updated: Administrator = {
          ...existing,
          ...admin,
          id: existing.id,
        } as Administrator;
        MOCK_ADMINISTRATORS[idx] = updated;
        return updated;
      }
    }
    // Create new
    const newId = (MOCK_ADMINISTRATORS.length + 1).toString();
    const newAdmin: Administrator = {
      id: newId,
      name: admin.name ?? "",
      username: admin.username ?? "",
      email: admin.email ?? "",
      whatsapp: admin.whatsapp ?? "",
      status: admin.status ?? "Aktif",
      role: admin.role ?? "Monitoring Staff",
      lastLogin: "-",
      createdAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    };
    MOCK_ADMINISTRATORS.push(newAdmin);
    return newAdmin;
  },

  async deleteAdministrator(id: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 150));
    const initialLength = MOCK_ADMINISTRATORS.length;
    MOCK_ADMINISTRATORS = MOCK_ADMINISTRATORS.filter((a) => a.id !== id);
    return MOCK_ADMINISTRATORS.length < initialLength;
  },
} as const;
