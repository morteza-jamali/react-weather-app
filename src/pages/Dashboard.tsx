import { useNavigate } from 'react-router';
import { useUserInfo } from '../hooks';
import { useEffect } from 'react';
import { PageTitle } from '../components';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { name, isLogedIn } = useUserInfo();
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLogedIn) {
      navigate('/login');
    }
  }, [isLogedIn]);

  const { t } = useTranslation();

  return isLogedIn ? (
    <p>
      <PageTitle title={t('dashboard')} />
      My name is = {name} && isLogedIn = {isLogedIn.toString()}
    </p>
  ) : null;
};

export default Dashboard;
