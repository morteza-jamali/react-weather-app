import { createContext, type Dispatch, type SetStateAction } from 'react';

export const RTLDirectionContext = createContext<
  (boolean | Dispatch<SetStateAction<boolean>>)[]
>([]);

export default RTLDirectionContext;
