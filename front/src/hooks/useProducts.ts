import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { ProductService } from "../services/ProductService";
import type { ProductDTO, ProductCreateDTO } from "../types/product";

export const useProducts = (params?: {search?:string; category?: number}) =>
{
    return useQuery({
        queryKey: ["products", params], 
        queryFn: () => ProductService.productList(params)}
    );
}

export const useProduct = (id?: string) =>
{
    return useQuery({
        queryKey: ["product", id],
        queryFn: () =>  ProductService.getById(id!),
        enabled: !!id
    });
};

export const useCreateProduct = () =>
{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (p: ProductCreateDTO) => ProductService.create(p), 
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["products"]})
    })
};

export const useUpdateProduct = () =>
{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data} : {id: string, data: Partial<ProductCreateDTO>}) => ProductService.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["products"]})
    });
}

export const useDeleteProduct = () =>
{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => ProductService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["products"]})
    })
};

export const useUpdateStock = () => 
{
    const queryClient = useQueryClient();
    return useMutation(
    {
        mutationFn: ({id, amount} : {id: string, amount: number}) => ProductService.updateStock(id, amount),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["products"]})

    });
};