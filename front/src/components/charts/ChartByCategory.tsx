import React from "react";
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";
import type { ProductDTO } from "../../types/productDTO";
import type { CategoryDTO } from "../../types/CategoryDTO";

export const ChartByCategory: React.FC<{products: ProductDTO[]; categories: CategoryDTO[]}> =
({products, categories}) =>
{
    const categoryData = categories.map((category) =>
    {
        return { 
        name: category.name,
        count: products.filter((product) => product.category== category.name).length,
        }
    });

    return (
        <div className = "card h-64">
            <ResponsiveContainer width="100%" height = "100%">
                <BarChart data = {categoryData}>
                    <XAxis dataKey = "name"/>
                    <YAxis/>
                    <Tooltip/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
};