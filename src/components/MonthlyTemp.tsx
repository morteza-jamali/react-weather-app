import type React from 'react';
import WeatherSkeleten from './WeatherSkeleten';
import { lazy, Suspense as ReactSuspense, useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';
import { ErrorFallbackRoot } from './CurrentAndWeakly';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import getCacheRequest from '../utils/getCacheRequest';
import sxWithFaFont from '../utils/sxWithFaFont';

const LazyLoad = lazy(() => import('./MonthlyTempLazyLoad'));

const Loading: React.FC = () => (
  <WeatherSkeleten
    animation="wave"
    variant="rounded"
    sx={{ gridArea: 'monthlyTemp' }}
    height={234}
  />
);

const Suspense: React.FC = () => {
  const [location] = useContext(LocationContext);

  if (!location) {
    return null;
  }

  const oneMonthBefore = new Date();
  oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
  const lastDayOfMonth = new Date(
    oneMonthBefore.getFullYear(),
    oneMonthBefore.getMonth() + 1,
    0,
  ).getDate();
  const month = oneMonthBefore.getMonth() + 1;
  const endDate = `${oneMonthBefore.getFullYear()}-${month < 10 ? `0${month}` : month}-${lastDayOfMonth < 10 ? `0${lastDayOfMonth}` : lastDayOfMonth}`;

  const elevenMonthBefore = new Date(endDate);
  elevenMonthBefore.setMonth(elevenMonthBefore.getMonth() - 11);
  const _month = elevenMonthBefore.getMonth() + 1;
  const startDate = `${elevenMonthBefore.getFullYear()}-${_month < 10 ? `0${_month}` : _month}-01`;
  const requestUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${location.latitude}&longitude=${location.longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean&timezone=auto`;
  const requestPromise = new Promise((resolve) => {
    getCacheRequest(requestUrl).then(resolve);
  });

  return (
    <ReactSuspense fallback={<Loading />}>
      <LazyLoad {...{ requestPromise }} />
    </ReactSuspense>
  );
};

const ErrorFallback: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <ErrorFallbackRoot
      sx={{ gridArea: 'monthlyTemp' }}
      height={234}
      justifyContent="center"
      alignItems="center"
      direction="row"
      spacing="10px"
    >
      <ErrorOutlineOutlinedIcon />
      <Typography sx={sxWithFaFont(i18n.language)}>
        {t('There is a problem')}
      </Typography>
    </ErrorFallbackRoot>
  );
};

// FIXME: Data of X axis doesn't appear in small screens
export const MonthlyTemp: React.FC = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense />
    </ErrorBoundary>
  );
};

export default MonthlyTemp;
