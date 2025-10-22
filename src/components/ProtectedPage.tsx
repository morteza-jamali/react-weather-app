import { lazy } from 'react';
import { useLoaderData } from 'react-router';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));

export const ProtectedPage: React.FC = () => {
  const { page } = useLoaderData();

  return page === 'dashboard' ? <Dashboard /> : <Login />;
};

export default ProtectedPage;
