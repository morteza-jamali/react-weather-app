import { Fragment, use } from 'react';
import type { CurrentWeaklyDataType } from './CurrentAndWeakly';
import { CurrentWeaklyWeatherContext } from '../contexts/CurrentWeaklyWeatherContext';
import CurrentWeather from './CurrentWeather';
import WeaklyWeather from './WeaklyWeather';

export const CurrentAndWeaklyLazyLoad: React.FC<{
  requestPromise: Promise<any>;
}> = ({ requestPromise }) => {
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

export default CurrentAndWeaklyLazyLoad;
