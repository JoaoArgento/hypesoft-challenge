import React from "react";
import {useForm} from "react-hook-form";
import zod from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


const schema = zod.object({
    name: zod.string().min(1, "Name is required"),
    description: zod.string().optional(),
    price: zod.number().positive("Invalid price"),
    category: zod.string().min(1, "Category is required"),
    amountInStock: zod.number().int().nonnegative("Invalid stock amount"),
});

type FormData = zod.infer<typeof schema>;

export const ProductForm : React.FC<{defaultValues: Partial<FormData>; onSubmit: (v: FormData) => void; submitLabel: string}>
= ({defaultValues, onSubmit, submitLabel = "Create"}) =>
{
    const {register, handleSubmit, formState} = useForm<FormData>({resolver: zodResolver(schema), defaultValues});


    return (
        <form onSubmit = {handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder = "name"/>
            {formState.errors.name && <p>{formState.errors.name.message}</p>}
            <textarea {...register("description")} placeholder="description"></textarea>
            <input {...register("category")} placeholder = "category"/>

            <input type = "number" step = "0.01" {...register("price", {valueAsNumber: true})} placeholder="Price"/>
            <input type = "number" {...register("amountInStock", {valueAsNumber: true}) } placeholder="Amount in stock"></input>
            {formState.errors.amountInStock && <p>{formState.errors.amountInStock.message}</p>}
            <button type = "submit">{submitLabel}</button>
        </form>
    );
};

