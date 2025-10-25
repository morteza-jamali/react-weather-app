import { createContext, type Dispatch, type SetStateAction } from 'react';

export const LoadingPageContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export default LoadingPageContext;
