import { createContext } from 'react';

export const LoadingPageContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export default LoadingPageContext;
