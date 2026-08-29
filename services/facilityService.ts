import { axiosInstance } from "@/lib/axios";
import type { HealthFacility } from "@/types/facility";

interface ListParams {
  search?: string;
  page?: number;
  limit?: number;
}

interface ListResult {
  items: HealthFacility[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

function mapBackendToFrontend(item: Record<string, unknown>): HealthFacility {
  return {
    id: item.id as string,
    name: (item.name as string) ?? "",
    address: (item.address as string) ?? "",
    isActive: (item.is_active as boolean) ?? true,
    createdAt: item.created_at
      ? new Date(item.created_at as string).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
      : "",
  };
}

export const facilityService = {
  async list(params?: ListParams): Promise<ListResult> {
    const res = await axiosInstance.get("/admin/facilities", { params });
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

  async listAll(): Promise<HealthFacility[]> {
    const result = await facilityService.list({ limit: 100, page: 1 });
    return result.items;
  },

  async create(data: { name: string; address?: string }): Promise<HealthFacility> {
    const res = await axiosInstance.post("/admin/facilities", data);
    return mapBackendToFrontend(res.data?.data);
  },

  async update(id: string, data: { name: string; address?: string }): Promise<HealthFacility> {
    const res = await axiosInstance.put(`/admin/facilities/${id}`, data);
    return mapBackendToFrontend(res.data?.data);
  },

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/admin/facilities/${id}`);
  },
} as const;
