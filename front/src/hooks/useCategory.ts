import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { CategoryService } from "../services/CategoryService";
import type { CategoryCreateDTO } from "../types/CategoryDTO";

const CATEGORY_KEY = ["categories"]

export const useCategories = () =>
{
    return useQuery({
        queryKey: CATEGORY_KEY,
        queryFn: CategoryService.categoryList
    })
}

export const useCategory = (id:number) =>
{
    return useQuery({
        queryKey: [...CATEGORY_KEY, id],
        queryFn: () => CategoryService.getById(id!),
        enabled: !!id,
    })
}

export const useCreateCategory = () =>
{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CategoryCreateDTO) => CategoryService.create(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: CATEGORY_KEY})
    })
}

export const useUpdateCategory = () => 
{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, payload} : {id: number, payload: Partial<CategoryCreateDTO>} ) => CategoryService.update(id, payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: CATEGORY_KEY})
    })
}

export const usaDeleteCategory = () =>
{   
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => CategoryService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: CATEGORY_KEY})
    })
}