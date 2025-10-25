import { Fragment, use } from 'react';
import type { CurrentWeaklyDataType } from '../types';
import { CurrentWeaklyWeatherContext } from '../contexts/CurrentWeaklyWeatherContext';
import CurrentWeather from './CurrentWeather';
import WeaklyWeather from './WeaklyWeather';

export const CurrentAndWeaklyLazyLoad: React.FC<{
  requestPromise: Promise<{ data: CurrentWeaklyDataType }>;
}> = ({ requestPromise }) => {
  const data = use(requestPromise).data;

  return (
    <Fragment>
      <CurrentWeaklyWeatherContext value={data}>
        <CurrentWeather />
        <WeaklyWeather />
      </CurrentWeaklyWeatherContext>
    </Fragment>
  );
};

export default CurrentAndWeaklyLazyLoad;
