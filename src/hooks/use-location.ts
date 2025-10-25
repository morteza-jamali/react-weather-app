import { useMemo } from 'react';
import type { PlaceType } from '../types';

const Key = 'location';

export const useLocation = () => {
  const location: PlaceType | null = useMemo(() => {
    const value = localStorage.getItem(Key);

    if (value) {
      return JSON.parse(value);
    }

    return value;
  }, []);

  const saveLocation = (value: PlaceType) =>
    localStorage.setItem(Key, JSON.stringify(value));

  return { location, saveLocation };
};

export default useLocation;
