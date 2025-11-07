import React from "react";
import {useForm} from "react-hook-form";
import zod from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import type { ProductCreateDTO } from "../../types/product";
import { productFormSchema, type ProductFormData } from "@/types/product.dto";


const schema = zod.object({
    name: zod.string().min(1, "Name is required"),
    description: zod.string().optional(),
    price: zod.number().nonnegative("Invalid price"),
    category: zod.number().nullable().optional(),
    amountInStock: zod.number().int().nonnegative("Invalid stock amount"),
});

type FormData = zod.infer<typeof schema>;

export const ProductForm : React.FC<{defaultValues: Partial<FormData>; onSubmit: (v: FormData) => void; submitLabel: string}>
= ({defaultValues, onSubmit, submitLabel = "Save"}) =>
{
    const {register, handleSubmit, formState} = useForm<FormData>({resolver: zodResolver(schema), defaultValues});



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder = "name"/>
            {formState.errors.name && <p>{formState.errors.name.message}</p>}
            <textarea {...register("description")}placeholder="description"></textarea>
            <input type = "number" step = "0.01" {...register("price"), {valueAsNumber: true}} placeholder="Preço"/>
            <input type = "number" {...register("amountInStock"), { valueAsNumber: true }}></input>
            {formState.errors.amountInStock && <p>{formState.errors.amountInStock.message}</p>}
            <button type = "submit">{submitLabel}</button>
        </form>
    );
};

