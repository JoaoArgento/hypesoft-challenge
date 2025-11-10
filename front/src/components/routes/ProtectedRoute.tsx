import React, { type JSX } from "react";


interface Props
{
    children: JSX.Element;
} 

export const ProtectedRoute : React.FC<Props> = ({children}) =>
{

    if (localStorage.getItem("access_token"))
    {
        return children;
    }
    return <div>Sem acesso</div>
    
};