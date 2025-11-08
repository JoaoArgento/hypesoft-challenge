import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query';
import {queryClient} from "./lib/QueryClient";
import { Products } from './pages/Products';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Categories } from './pages/Categories';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <Routes> 
          <Route path = "/" element={<Dashboard/>}></Route>
          <Route path = "/products" element={<Products/>}></Route>
          <Route path = "/categories" element = {<Categories/>}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
