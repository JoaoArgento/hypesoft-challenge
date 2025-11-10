import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query';
import {queryClient} from "./lib/QueryClient";
import { Products } from './pages/Products';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Categories } from './pages/Categories';
import { Forbidden } from './pages/Forbidden';
import {authClient} from "./lib/KeyCloak";
import { ReactKeycloakProvider} from '@react-keycloak/web';
import Home from './pages/Home';

const keycloakInitOptions = {
  onLoad: "check-sso",
  pkceMethod: "S256",
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactKeycloakProvider authClient={authClient} initOptions={keycloakInitOptions}>
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <Routes> 
          <Route path = "/" element= {<Home/>}></Route>
          <Route path = "/products" element=
          {
            <Products/>
          }>
          </Route>
          <Route path = "/dashboard" element=
          {
            <Dashboard/>
          }>
          </Route>

          <Route path = "/categories" element=
          {
            <Categories/>
          }></Route>
          <Route path = "forbidden" element = {<Forbidden/>}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

    </ReactKeycloakProvider>
  </StrictMode>,
)
