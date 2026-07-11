export interface Administrator {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly whatsapp: string;
  readonly status: "Aktif" | "Nonaktif";
  readonly role: "Super Admin" | "Monitoring Staff";
  readonly lastLogin: string;
  readonly createdAt: string;
  readonly notes?: string;
}
