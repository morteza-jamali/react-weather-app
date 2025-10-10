import type React from 'react';
import { Fragment, Suspense, use, useContext } from 'react';
import WeatherSkeleten from './WeatherSkeleten';
import CurrentWeather from './CurrentWeather';
import { CurrentWeaklyWeatherContext, LocationContext } from '../contexts';
import axios from 'axios';
import WeaklyWeather from './WeaklyWeather';

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
        sx={{ gridArea: 'currentWeather' }}
        width={607}
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

export const CurrentAndWeakly: React.FC = () => {
  const [location, _] = useContext(LocationContext);

  if (!location) {
    return null;
  }

  const requestPromise = axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_mean,temperature_2m_max,temperature_2m_min,weather_code&current=is_day,temperature_2m,apparent_temperature,weather_code&timezone=auto&forecast_days=14`,
  );

  return (
    <Suspense fallback={<Loading />}>
      <LazyLoad {...{ requestPromise }} />
    </Suspense>
  );
};

export default CurrentAndWeakly;
