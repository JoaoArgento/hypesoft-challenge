import React from "react";
import { AppLayout } from "../components/layouts/AppLayout"
import { DashboardCard } from "../components/charts/DashboardCard";
import { ChartByCategory } from "../components/charts/ChartByCategory";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategory";
import type { ProductDTO } from "../types/productDTO";


export const Dashboard: React.FC = () => {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  const totalValue = products.reduce((s, p) => s + p.price * p.amountInStock, 0);
  const lowStock = products.filter((p) => p.amountInStock < 10);

  return (
    <AppLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-3 gap-6">
          <DashboardCard title="Total de produtos" value={products.length} />
          {/* <DashboardCard title="Valor total do estoque" value={formatCurrency(totalValue)} /> */}
          <DashboardCard title="Produtos com estoque baixo" value={lowStock.length} />
        </div>

        <div className="col-span-8 card">
          <h3 className="font-semibold mb-3">Sales Insight</h3>
          {/* small placeholder chart - reuse ChartByCategory but you can use a multiline chart */}
          <ChartByCategory products={products} categories={categories} />
        </div>

        <div className="col-span-4 card">
          <h3 className="font-semibold mb-3">Produtos com estoque baixo</h3>
          <ul className="space-y-2">
            {lowStock.map((p: ProductDTO) => (
              <li key={p.id} className="flex justify-between">
                <div>{p.name}</div>
                <div className="text-red-600">{p.amountInStock}</div>
              </li>
            ))}
            {lowStock.length === 0 && <li className="text-slate-500">Nenhum produto com estoque baixo</li>}
          </ul>
        </div>

        <div className="col-span-12">
          <div className="card">
            <h3 className="font-semibold mb-3">Produtos por categoria</h3>
            <ChartByCategory products={products} categories={categories} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
