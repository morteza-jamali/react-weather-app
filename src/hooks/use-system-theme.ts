import { useEffect, useState } from 'react';

export const useSystemTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  const mqListener = (event: { matches: boolean }) => {
    setIsDarkTheme(event.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addEventListener('change', mqListener);

    return () => darkThemeMq.removeEventListener('change', mqListener);
  }, []);

  return isDarkTheme ? 'dark' : 'light';
};

export default useSystemTheme;
