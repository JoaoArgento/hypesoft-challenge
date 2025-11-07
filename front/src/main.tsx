import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query';
import Products from "./pages/Products";
import {queryClient} from "./lib/QueryClient";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <Products/>
    </QueryClientProvider>
  </StrictMode>,
)
