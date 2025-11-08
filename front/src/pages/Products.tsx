import React, { useState } from "react";
import { AppLayout } from "../components/layouts/AppLayout";
import { ProductForm } from "../components/forms/ProductForm";
// import { ProductTable } from "@/components/products/ProductTable";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from  "../hooks/useProducts";
import { useCategories } from "../hooks/useCategory";
import type { ProductDTO } from "../types/productDTO";

export const Products: React.FC = () => {
  const { data: products = []} = useProducts();
  const add = useCreateProduct();
  const remove = useDeleteProduct();
  const update = useUpdateProduct();

  const { data: categories = [] } = useCategories();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (categoryFilter ? p.category === categoryFilter : true));

  const handleAdd = (p: ProductDTO) => add.mutate(p);
  const handleUpdate = (p: ProductDTO) => update.mutate({ id: p.id, data: p });
  const handleDelete = (id: number) => remove.mutate(id);

  const handleAdjustStock = (id: number, delta: number) => {
    const prod = products.find((x) => x.id === id);
    if (!prod) return;
    const newP = { ...prod, amountInStock: Math.max(0, prod.amountInStock + delta) };
    update.mutate({ id, data: newP });
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <h2 className="text-xl font-semibold mb-3">{editingProduct ? "Edit product" : "new product"}</h2>
          <ProductForm
            defaultValues={{name: "", price: 0, category:""}}
            onSubmit={(p) => {
                const product : ProductDTO = {
                    id: editingProduct?.id??0,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    category: p.category,
                    amountInStock: p.amountInStock
                }
                if (editingProduct) 
                {
                    handleUpdate(product);
                    setEditingProduct(null);
                }
                else 
                {
                    handleAdd(product)
                }    
            }}
            submitLabel={editingProduct ? "Update" : "Create"}
          />
        </div>

        <div className="col-span-8">
          <div className="flex gap-2 mb-4">
            <input
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <select
              className="border p-2 rounded"
              value={categoryFilter ?? ""}
              onChange={(e) => setCategoryFilter(e.target.value || null)}
            >
              <option value="">Todas categorias</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* <ProductTable
            products={filtered}
            categories={categories}
            onEdit={(p) => setEditing(p)}
            onDelete={handleDelete}
            onAdjustStock={handleAdjustStock}
          /> */}
        </div>
      </div>
    </AppLayout>
  );
};
