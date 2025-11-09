import React from "react";
import { AppLayout } from "../components/layouts/AppLayout"
import { DashboardCard } from "../components/charts/DashboardCard";
import { ChartByCategory } from "../components/charts/ChartByCategory";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategory";
import type { ProductDTO } from "../types/productDTO";
import { formatCurrency } from "../lib/utils";


export const Dashboard: React.FC = () => {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  const totalValue = products.reduce((s, p) => s + p.price * p.amountInStock, 0);
  const lowStock = products.filter((p) => p.amountInStock < 10);

  return (
    <AppLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-3 gap-6">
          <DashboardCard title="Total products amount" value={products.length} />
          <DashboardCard title="Total stock value" value={formatCurrency(totalValue)} />
          <DashboardCard title="Products with low stock" value={lowStock.length} />
        </div>

        <div className="col-span-8 card">
          <h3 className="font-semibold mb-3">Products</h3>
          <ChartByCategory products={products} categories={categories} />
        </div> 

        <div className="col-span-4 card">
          <h3 className="font-semibold mb-3">Products with low stock</h3>
          <ul className="space-y-2">
            {lowStock.map((p: ProductDTO) => (
              <li key={p.id} className="flex justify-between">
                <div>{p.name}</div>
                <div className="text-red-600">{p.amountInStock}</div>
              </li>
            ))}
            {lowStock.length === 0 && <li className="text-slate-500">No low stock product</li>}
          </ul>
        </div>

        <div className="col-span-12">
          <div className="card">
            <h3 className="font-semibold mb-3">Products by category</h3>
            <ChartByCategory products={products} categories={categories} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
