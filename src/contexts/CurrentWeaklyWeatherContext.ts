import { createContext } from 'react';
import type { CurrentWeaklyDataType } from '../components/CurrentAndWeakly';

export const CurrentWeaklyWeatherContext =
  createContext<CurrentWeaklyDataType | null>(null);

export default CurrentWeaklyWeatherContext;
