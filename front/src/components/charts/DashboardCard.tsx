import React from "react";

export const DashboardCard: React.FC<{ title: string; value: React.ReactNode; subtitle?: string }> = ({
  title,
  value,
  subtitle,
}) => (
  <div className="card">
    <div className="text-sm text-slate-500">{title}</div>
    <div className="text-2xl font-semibold mt-2">{value}</div>
    {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
  </div>
);
