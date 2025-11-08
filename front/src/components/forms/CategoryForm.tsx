import React from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CategoryDTO } from "../../types/CategoryDTO";

const schema = zod.object(
{
    name: zod.string().min(1, "Nome obrigatório") 
});

type CategoryForm = zod.infer<typeof schema>;

export const CategoryForm: React.FC<{ onSubmit: (c: CategoryDTO) => void }> = ({ onSubmit }) => 
{
  const { register, handleSubmit, reset, formState } = useForm<CategoryForm>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((v) => {
        onSubmit({ id: -1,  name: v.name });
        reset();
      })}
      className="card flex flex-col gap-3"
    >
      <label>Nome</label>
      <input {...register("name")} className="border p-2 rounded" />
      {formState.errors.name && <div className="text-red-600 text-sm">{formState.errors.name.message}</div>}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-indigo-600 rounded text-white">Adicionar</button>
      </div>
    </form>
  );
};
