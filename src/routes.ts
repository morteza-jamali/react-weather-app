import { createBrowserRouter, redirect } from 'react-router';
import LoadingFallback from './components/LoadingFallback';
import useUserInfo from './hooks/use-user-info';

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
        loader: async () => {
          const { isLogedIn } = useUserInfo();

          if (!isLogedIn()) {
            throw redirect('/login');
          }

          return null;
        },
      },
      {
        path: 'login',
        lazy: {
          Component: async () => {
            return (await import('./pages/Login')).Login;
          },
        },
        loader: async () => {
          const { isLogedIn } = useUserInfo();

          if (isLogedIn()) {
            throw redirect('/');
          }

          return null;
        },
      },
    ],
  },
]);

export default router;
