import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import LoadingFallback from './components/LoadingFallback';
import './i18n';

import './global.css';

const AppLayout = lazy(() => import('./components/AppLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
