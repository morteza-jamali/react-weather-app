import { useMemo } from 'react';

const Key = 'location';

export interface PlaceType {
  country: string;
  latitude: number;
  longitude: number;
  name: string;
  admin1: string;
  admin2?: string;
}

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
