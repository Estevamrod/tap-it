import * as React from 'react';
import {createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import HelmetTags from './components/common/HelmetTags';
import App from './App';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
      <HelmetTags />
      <App />
  </BrowserRouter>
);
