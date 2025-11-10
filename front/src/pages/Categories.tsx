import React from "react";
import { AppLayout } from "../components/layouts/AppLayout";
import { CategoryForm } from "../components/forms/CategoryForm"
import { useCategories, useCreateCategory, usaDeleteCategory } from "../hooks/useCategory";
import type { CategoryCreateDTO } from "../types/CategoryDTO";

export const Categories: React.FC = () => 
{
  const { data: categories = []} = useCategories();
  const add = useCreateCategory();
  const remove = usaDeleteCategory()

  return (
    <AppLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <h2 className="text-xl font-semibold mb-3">New Category</h2>
          <CategoryForm onSubmit={(c: CategoryCreateDTO) => add.mutate(c)} />
        </div>

        <div className="col-span-8">
          <div className="card">
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul>
              {categories.map((c) => (
                <li key={c.id} className="flex justify-between items-center py-2 border-t">
                  <div>{c.name}</div>
                  <button onClick={() => remove.mutate(c.id)} className="text-red-600">
                    Remove
                  </button>
                </li>
              ))}
              {categories.length === 0 && <li className="text-slate-500">Empty</li>}
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
