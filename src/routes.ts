import { createBrowserRouter } from 'react-router';
import LoadingFallback from './components/LoadingFallback';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: {
      Component: async () => {
        return (await import('./components/AppLayout')).AppLayout;
      },
    },
    HydrateFallback: LoadingFallback,
    children: [
      {
        index: true,
        lazy: {
          Component: async () => {
            return (await import('./pages/Dashboard')).Dashboard;
          },
        },
      },
      {
        path: 'login',
        lazy: {
          Component: async () => {
            return (await import('./pages/Login')).Login;
          },
        },
      },
    ],
  },
]);

export default router;
