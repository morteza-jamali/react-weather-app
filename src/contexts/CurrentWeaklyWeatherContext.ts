import { createContext } from 'react';
import type { CurrentWeaklyDataType } from '../types';

export const CurrentWeaklyWeatherContext =
  createContext<CurrentWeaklyDataType | null>(null);

export default CurrentWeaklyWeatherContext;
