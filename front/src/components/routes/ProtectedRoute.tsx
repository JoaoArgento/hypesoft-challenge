import React, { type JSX } from "react";
import {useKeycloak} from "@react-keycloak/web"


interface Props
{
    children: JSX.Element;
} 

export const ProtectedRoute : React.FC<Props> = ({children}) =>
{
    const {keycloak} = useKeycloak();

    if (!keycloak.authenticated)
    {
        keycloak.login()
        return null;
    }
    return children;
};