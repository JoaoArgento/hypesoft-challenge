import { API } from "./APIClient";
import type { ProductCreateDTO, ProductDTO } from "../types/product";

export const ProductService = {
    productList: async(params?: {search?:string; category?: string}) =>
    {
        const response = await API.get<ProductDTO[]>("/products", {params});
        return response.data;
    },

    getById: async(id: string) =>
    {
        const response = await API.get<ProductDTO>(`/products/${id}`);
        return response.data;
    },

    create: async(payload: ProductDTO) =>
    {
        const response = API.post<ProductDTO>("/products", payload);
        return response;
    },

    update: async(id: string, payload: Partial<ProductCreateDTO>) =>
    {
        const response = await API.put<ProductDTO>(`/products/${id}`,payload);
        return response.data;
    },

    delete: async(id: string) => 
    {
        const response = await API.delete(`/products/${id}`);
        return response.data;
    },

    updateStock: async (id: string, amount: number) =>
    {
        const response = await API.patch<ProductDTO>(`/products/${id}/stock`, {amount});
        return response.data;
    },
} 