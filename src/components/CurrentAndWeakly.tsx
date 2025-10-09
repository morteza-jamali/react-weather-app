import type React from 'react';
import { Fragment, Suspense, use } from 'react';
import WeatherSkeleten from './WeatherSkeleten';
import CurrentWeather from './CurrentWeather';
import { CurrentWeaklyWeatherContext } from '../contexts';
import axios from 'axios';

export interface CurrentWeaklyDataType {
  current: {
    apparent_temperature: number;
    temperature_2m: number;
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
  const requestPromise = axios.get(
    'https://api.open-meteo.com/v1/forecast?latitude=36.2133&longitude=58.7957&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,apparent_temperature,weather_code&timezone=auto&forecast_days=14&',
  );
  // TODO: Remove following lines
  const newPromise = new Promise((resolve) =>
    setTimeout(() => requestPromise.then((response) => resolve(response)), 0),
  );
  return (
    <Suspense fallback={<Loading />}>
      <LazyLoad requestPromise={newPromise} />
    </Suspense>
  );
};

export default CurrentAndWeakly;
