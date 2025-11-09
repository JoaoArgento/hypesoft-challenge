import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query';
import {queryClient} from "./lib/QueryClient";
import { Products } from './pages/Products';
import { Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Categories } from './pages/Categories';
import { Forbidden } from './pages/Forbidden';
import {authClient} from "./lib/KeyCloak";
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';

const keycloakInitOptions = 
{
  onload: "login-required",
  pkceMethod: "S256",
  flow: "standard"
} 
const AuthHandler = () => {
  const {initialized } = useKeycloak();
  const navigate = useNavigate();

  if (!initialized) return <div>Carregando...</div>;
  navigate("/dashboard");
  return null;
};
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactKeycloakProvider authClient={authClient} initOptions={keycloakInitOptions}>
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <Routes> 
          <Route path = "/" element= {<AuthHandler/>}></Route>
          <Route path = "/products" element=
          {
            <ProtectedRoute><Products/></ProtectedRoute>
          }>
          </Route>
          <Route path = "/dashboard" element=
          {
            <ProtectedRoute><Dashboard/></ProtectedRoute>
          }>
          </Route>

          <Route path = "/categories" element=
          {
            <ProtectedRoute><Categories/></ProtectedRoute>
          }></Route>
          <Route path = "forbidden" element = {<Forbidden/>}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

    </ReactKeycloakProvider>
  </StrictMode>,
)
