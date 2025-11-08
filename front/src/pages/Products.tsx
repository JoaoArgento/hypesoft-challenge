import React, { useState } from "react";
import { AppLayout } from "../components/layouts/AppLayout";
import { ProductForm } from "../components/forms/ProductForm";
import { ProductTable } from "../components/tables/ProductTable";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from  "../hooks/useProducts";
import { useCategories } from "../hooks/useCategory";
import type { ProductDTO } from "../types/productDTO";

export const Products: React.FC = () => 
{
  const { data: products = []} = useProducts();
  const { data: categories = [] } = useCategories();
  const addProduct = useCreateProduct();
  const removeProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    .filter((product) => (categoryFilter ? product.category === categoryFilter : true));

  const handleAdd = (p: ProductDTO) => addProduct.mutate(p);
  const handleUpdate = (p: ProductDTO) => updateProduct.mutate({ id: p.id, data: p });
  const handleDelete = (id: number) => 
  {
    removeProduct.mutate(id)
    setEditingProduct(null);
  };

  const handleAdjustStock = (id: number, delta: number) => 
  {
    const product = products.find((x) => x.id === id);
    if (!product) return;
    const newProduct = { ...product, amountInStock: Math.max(0, product.amountInStock + delta) };
    if (newProduct.amountInStock > 0)
    {
      updateProduct.mutate({ id, data: newProduct });
    }
    else
    {
      removeProduct.mutate(newProduct.id);
    }
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          {/* <h2 className="text-xl font-semibold mb-3">{editingProduct ? `Editing - ${editingProduct.name}` : "New product"}</h2> */}
          <ProductForm
            categories={categories}
            defaultValues={{name: "", price: 0, category:""}}
            onSubmit={(p) => {
                const product : ProductDTO = {
                    id: editingProduct?.id?? 0,
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
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <ProductTable
            products={filteredProducts}
            onEdit={(p) => setEditingProduct(p)}
            onDelete={handleDelete}
            onAdjustStock={handleAdjustStock}
          />
        </div>
      </div>
    </AppLayout>
  );
};
