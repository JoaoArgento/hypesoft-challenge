import { API } from "./APIClient";
import type { CategoryDTO, CategoryCreateDTO } from "../types/CategoryDTO";

export const CategoryService = 
{
    categoryList: async() =>
    {
        const response = await API.get<CategoryDTO[]>("/categories");
        return response.data ?? [];
    },
    getById: async(id: number) =>
    {
        const response = await API.get<CategoryDTO>(`/categories/${id}`);
        return response.data;
    },

    create: async(payload:CategoryCreateDTO) =>
    {
        const response = await API.post<CategoryDTO>("categories", payload);
        return response.data;
    },

    update: async (id: number, payload: Partial<CategoryCreateDTO>) =>
    {
        const response = await API.put<CategoryDTO>(`/categories/${id}`, payload);
        return response.data;
    },
    delete: async (id: number) =>
    {
        const response = await API.delete(`/categories/${id}`);
        return response.data;
    },
};
