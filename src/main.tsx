import * as React from 'react';
import {createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import HelmetTags from './components/common/HelmetTags';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HelmetTags />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
