import { API } from "./APIClient";
import type { ProductCreateDTO, ProductDTO } from "../types/product";

export const ProductService = {
    productList: async(params?: {search?:string; category?: string}) =>
    {
        const response = await API.get<ProductDTO[]>("/products", {params});
        return response.data ?? [];
    },

    getById: async(id: number) =>
    {
        const response = await API.get<ProductDTO>(`/products/${id}`);
        return response.data;
    },

    create: async(payload: ProductCreateDTO) =>
    {
        const response = await API.post<ProductDTO>("/products", payload);
        return response.data;
    },

    update: async(id: number, payload: Partial<ProductCreateDTO>) =>
    {
        const response = await API.put<ProductDTO>(`/products/${id}`,payload);
        return response.data;
    },

    delete: async(id: number) => 
    {
        const response = await API.delete(`/products/${id}`);
        return response.data;
    },

    updateStock: async (id: number, amount: number) =>
    {
        const response = await API.patch<ProductDTO>(`/products/${id}/stock`, {amount});
        return response.data;
    },
} 