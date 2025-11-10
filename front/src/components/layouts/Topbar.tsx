import { useKeycloak } from "@react-keycloak/web";

import React from "react";

export const Topbar: React.FC = () => 
{
  const {keycloak} = useKeycloak();

   const username =
    keycloak?.tokenParsed?.preferred_username || 
    keycloak?.tokenParsed?.name ||               
    "Usuário";

  return (
    <header className="h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">SS</div>
        <div className="rounded-full bg-white px-3 py-2 shadow-sm">Search (⌘S)</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm">{username}</div>
      </div>
    </header>
  );
};
