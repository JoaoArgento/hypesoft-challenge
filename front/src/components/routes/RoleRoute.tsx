import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

interface Props 
{
    role: string;
    children: JSX.Element;
}

export const RoleRoute: React.FC<Props> = ({role, children}) => 
{
    const {keycloak} = useKeycloak();

    if (!keycloak.authenticated)
    {
        keycloak.login();
        return null;
    }
    const hasRole = keycloak.hasRealmRole(role) || keycloak.hasResourceRole(role, "my-client");

    if (!hasRole)
    {
        return <Navigate to = "/forbidden" replace/>
    }
    return children;
}