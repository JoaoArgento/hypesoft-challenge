import React from "react";
import type { ProductDTO } from "../../types/productDTO" ;
import { formatCurrency } from "../../lib/utils";
export const ProductTable: React.FC<{

  products: ProductDTO[];
  onEdit: (p: ProductDTO) => void;
  onDelete: (id: number) => void;
  onAdjustStock: (id: number, delta: number) => void;
}> = ({ products, onEdit, onDelete, onAdjustStock }) => {

  return (
    <div className="card">
      <table className="w-full table-fixed">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="py-2">Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Amount in stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="py-3">{p.name}</td>
              <td className="text-center">{formatCurrency(p.price)}</td>
              <td className="text-center">{p.category}</td>
              <td className="text-center">
                <div className={p.amountInStock < 10 ? "text-red-600" : ""}>{p.amountInStock}</div>
              </td>
              <td className="text-right">
                <button onClick={() => onEdit(p)} className="mr-2 text-indigo-600">Edit</button>
                <button onClick={() => onDelete(p.id)} className="mr-2 text-red-600">Delete</button>
                <button onClick={() => onAdjustStock(p.id, 1)} className="mr-1 px-2 py-1 bg-slate-100 rounded">+1</button>
                <button onClick={() => onAdjustStock(p.id, -1)} className="px-2 py-1 bg-slate-100 rounded">-1</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
