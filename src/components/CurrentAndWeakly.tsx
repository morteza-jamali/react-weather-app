import type React from 'react';
import { Fragment, Suspense as ReactSuspense, use, useContext } from 'react';
import WeatherSkeleten from './WeatherSkeleten';
import CurrentWeather from './CurrentWeather';
import { CurrentWeaklyWeatherContext, LocationContext } from '../contexts';
import axios from 'axios';
import WeaklyWeather from './WeaklyWeather';
import ErrorBoundary from './ErrorBoundary';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { sxWithFaFont } from '../utils';

export interface WmoCodesType {
  [key: number]: {
    name: string;
    image:
      | string
      | {
          day: string;
          night: string;
        };
  };
}

export interface CurrentWeaklyDataType {
  current: {
    apparent_temperature: number;
    temperature_2m: number;
    is_day: 0 | 1;
    time: string;
    weather_code: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_mean: number[];
    temperature_2m_min: number[];
    time: string[];
    weather_code: number[];
  };
}

const LazyLoad: React.FC<{ requestPromise: Promise<any> }> = ({
  requestPromise,
}) => {
  const data = use(requestPromise).data as CurrentWeaklyDataType;

  return (
    <Fragment>
      <CurrentWeaklyWeatherContext value={data}>
        <CurrentWeather />
        <WeaklyWeather />
      </CurrentWeaklyWeatherContext>
    </Fragment>
  );
};

const Loading: React.FC = () => {
  return (
    <Fragment>
      <WeatherSkeleten
        variant="rounded"
        animation="wave"
        sx={{
          gridArea: 'currentWeather',
          width: '607px',
          '@media (max-width: 1100px)': {
            width: 'auto',
          },
        }}
        height={234}
      />
      <WeatherSkeleten
        variant="rounded"
        animation="wave"
        sx={{ gridArea: '2weaksForecast', gridColumn: '1 / 2 span' }}
        height={381}
      />
    </Fragment>
  );
};

export const ErrorFallbackRoot = styled(Stack)(({ theme }) => [
  {
    backgroundColor: 'var(--bg-color-2)',
    boxShadow: 'var(--box-shadow-1)',
    borderRadius: '24px',
  },
  theme.applyStyles('dark', {
    backgroundColor: 'var(--bg-color-1)',
  }),
]);

const ErrorFallback: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <Fragment>
      <ErrorFallbackRoot
        sx={{
          gridArea: 'currentWeather',
          width: '607px',
          '@media (max-width: 1100px)': {
            width: 'auto',
          },
        }}
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
      <ErrorFallbackRoot
        sx={{ gridArea: '2weaksForecast', gridColumn: '1 / 2 span' }}
        height={381}
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
    </Fragment>
  );
};

const Suspense: React.FC = () => {
  const [location, _] = useContext(LocationContext);

  if (!location) {
    return null;
  }

  const requestPromise = axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_mean,temperature_2m_max,temperature_2m_min,weather_code&current=is_day,temperature_2m,apparent_temperature,weather_code&timezone=auto&forecast_days=14`,
  );

  return (
    <ReactSuspense fallback={<Loading />}>
      <LazyLoad {...{ requestPromise }} />
    </ReactSuspense>
  );
};

export const CurrentAndWeakly: React.FC = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense />
    </ErrorBoundary>
  );
};

export default CurrentAndWeakly;
