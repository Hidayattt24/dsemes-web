export interface Administrator {
  readonly id: string;
  readonly fullName: string;
  readonly username: string;
  readonly email: string;
  readonly whatsappNumber: string;
  readonly status: "Aktif" | "Nonaktif";
  readonly role: "admin" | "staff";
  readonly positionTitle: string;
  readonly shortBio: string;
  readonly profilePhotoUrl: string;
  readonly createdAt: string;
}
