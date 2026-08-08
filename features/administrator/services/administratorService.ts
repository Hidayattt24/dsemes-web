import { axiosInstance } from "@/lib/axios";
import type { Administrator } from "../types/administrator";

interface ListParams {
  search?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}

interface ListResult {
  items: Administrator[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

function mapBackendToFrontend(item: Record<string, unknown>): Administrator {
  return {
    id: item.id,
    fullName: (item.full_name as string) ?? "",
    username: (item.username as string) ?? "",
    email: (item.email as string) ?? "",
    whatsappNumber: (item.whatsapp_number as string) ?? "",
    status: item.status === "nonaktif" ? "Nonaktif" : "Aktif",
    role: item.role === "staff" ? "staff" : "admin",
    positionTitle: (item.position_title as string) ?? "",
    shortBio: (item.short_bio as string) ?? "",
    profilePhotoUrl: (item.profile_photo_url as string) ?? "",
    createdAt: item.created_at
      ? new Date(item.created_at as string).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
      : "",
  };
}

export const administratorService = {
  async list(params?: ListParams): Promise<ListResult> {
    const res = await axiosInstance.get("/admin/staff", { params });
    const data = res.data?.data ?? [];
    const meta = res.data?.meta;
    return {
      items: data.map(mapBackendToFrontend),
      total: meta?.total ?? data.length,
      page: meta?.page ?? 1,
      perPage: meta?.per_page ?? params?.limit ?? 10,
      totalPages: meta?.total_pages ?? 1,
    };
  },

  async getById(id: string): Promise<Administrator | null> {
    try {
      const res = await axiosInstance.get(`/admin/staff/${id}`);
      if (res.data?.success && res.data?.data) {
        return mapBackendToFrontend(res.data.data);
      }
      return null;
    } catch {
      return null;
    }
  },

  async create(data: {
    full_name: string;
    username: string;
    email: string;
    password: string;
    whatsapp_number: string;
    role: string;
    position_title?: string;
    short_bio?: string;
    profile_photo_url?: string;
  }): Promise<Administrator> {
    const res = await axiosInstance.post("/admin/staff", data);
    return mapBackendToFrontend(res.data?.data);
  },

  async update(
    id: string,
    data: {
      full_name: string;
      username: string;
      email: string;
      whatsapp_number: string;
      position_title?: string;
      short_bio?: string;
      profile_photo_url?: string;
    }
  ): Promise<Administrator> {
    const res = await axiosInstance.put(`/admin/staff/${id}`, data);
    return mapBackendToFrontend(res.data?.data);
  },

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/admin/staff/${id}`);
  },

  async toggleStatus(id: string): Promise<Administrator> {
    const res = await axiosInstance.patch(`/admin/staff/${id}/status`);
    return mapBackendToFrontend(res.data?.data);
  },
} as const;
