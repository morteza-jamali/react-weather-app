import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { PlaceType } from '../types';

export const LocationContext = createContext<
  [PlaceType | null, Dispatch<SetStateAction<PlaceType | null>>]
>([null, () => {}]);

export default LocationContext;
