import React from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

const schema = zod.object({
  name: zod.string().min(1, "O nome é obrigatório"),
  description: zod.string().optional(),
  price: zod.number().positive("Preço inválido"),
  category: zod.string().min(1, "Categoria é obrigatória"),
  amountInStock: zod.number().int().nonnegative("Quantidade inválida"),
});

type FormData = zod.infer<typeof schema>;

export const ProductForm: React.FC<{
  defaultValues: Partial<FormData>;
  onSubmit: (v: FormData) => void;
  submitLabel: string;
}> = ({ defaultValues, onSubmit, submitLabel = "Create" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Card className="w-full max-w-lg mx-auto border border-border bg-background shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {submitLabel === "Create" ? "Novo Produto" : "Editar Produto"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Digite o nome do produto"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Digite a descrição do produto"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register("category")}
              placeholder="Digite a categoria"
            />
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="amountInStock">Amount in stock</Label>
              <Input
                id="amountInStock"
                type="number"
                {...register("amountInStock", { valueAsNumber: true })}
                placeholder="0"
              />
              {errors.amountInStock && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.amountInStock.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-medium mt-2"
          >
            {isSubmitting
              ? "Saving"
              : submitLabel === "Create"
              ? "Create product"
              : "Update product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
