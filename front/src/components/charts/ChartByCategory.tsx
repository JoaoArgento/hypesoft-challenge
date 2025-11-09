import React from "react";
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid} from "recharts";
import type { ProductDTO } from "../../types/productDTO";
import type { CategoryDTO } from "../../types/CategoryDTO";

export const ChartByCategory: React.FC<{products: ProductDTO[]; categories: CategoryDTO[]}> =
({products, categories}) =>
{
    const categoryData = categories.map((category) =>
    {
        return { 
        name: category.name,
        count: products.filter((product) => product.category == category.name).length,
        }
    });

    return (
       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 h-64 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Products By Category
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={categoryData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
          <YAxis tick={{ fill: "#9ca3af" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "0.5rem",
              color: "#f9fafb",
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40} fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    )
};