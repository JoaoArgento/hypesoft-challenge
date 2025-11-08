import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    "px-4 py-2 rounded-lg " + (isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-100");

  return (
    <aside className="w-72 fixed left-0 top-0 bottom-0 p-6 bg-white shadow-md">
      <div className="mb-8">
        <div className="text-2xl font-bold text-indigo-600">ShopSense</div>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={linkClass} end>Dashboard</NavLink>
        <NavLink to="/products" className={linkClass}>Products</NavLink>
        <NavLink to="/categories" className={linkClass}>Categories</NavLink>
      </nav>
    </aside>
  );
};
