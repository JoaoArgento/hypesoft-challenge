import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#eef2ff]">
      <Sidebar />
      <div className="ml-72">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
