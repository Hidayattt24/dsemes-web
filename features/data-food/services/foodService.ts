import { axiosInstance } from "@/lib/axios";
import type {
  FoodMaster,
  CreateFoodDTO,
  UpdateFoodDTO,
  FoodListParams,
  ExcelImportPreviewResponse,
  ExcelImportConfirmResponse,
  FoodStats,
} from "@/features/data-food/types/food";

export const foodService = {
  getFoods: async (params?: FoodListParams) => {
    const res = await axiosInstance.get("/admin/foods", { params });
    const meta = res.data.meta || res.data.pagination || {};
    return {
      data: (res.data.data as FoodMaster[]) || [],
      pagination: {
        total_items: meta.total ?? meta.total_items ?? res.data.data?.length ?? 0,
        current_page: meta.page ?? meta.current_page ?? params?.page ?? 1,
        per_page: meta.per_page ?? params?.limit ?? 20,
        total_pages: meta.total_pages ?? 1,
      },
    };
  },

  getFoodById: async (id: string): Promise<FoodMaster> => {
    const res = await axiosInstance.get(`/admin/foods/${id}`);
    return res.data.data;
  },

  createFood: async (data: CreateFoodDTO): Promise<FoodMaster> => {
    const res = await axiosInstance.post("/admin/foods", data);
    return res.data.data;
  },

  updateFood: async (id: string, data: UpdateFoodDTO): Promise<FoodMaster> => {
    const res = await axiosInstance.put(`/admin/foods/${id}`, data);
    return res.data.data;
  },

  deleteFood: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/admin/foods/${id}`);
  },

  previewImport: async (file: File): Promise<ExcelImportPreviewResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post("/admin/foods/import/preview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },

  confirmImport: async (items: CreateFoodDTO[]): Promise<ExcelImportConfirmResponse> => {
    const res = await axiosInstance.post("/admin/foods/import/confirm", { items });
    return res.data.data;
  },

  exportFoods: async (params?: FoodListParams, format: "xlsx" | "csv" = "xlsx") => {
    const res = await axiosInstance.get("/admin/foods/export", {
      params: { ...params, format },
      responseType: "blob",
    });
    return res.data;
  },

  getStats: async (): Promise<FoodStats> => {
    const res = await axiosInstance.get("/admin/foods/stats");
    return res.data.data;
  },
};
