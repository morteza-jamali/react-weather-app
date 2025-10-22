import { ThemeProvider, type Direction } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createTheme from '../theme';
import { RTLDirectionContext } from '../contexts/RTLDirectionContext';
import React, { useEffect, useState } from 'react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { Outlet } from 'react-router';
import { CssBaseline } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GlobalStyles from './GlobalStyles';
import LoadingPageContext from '../contexts/LoadingPageContext';
import LoadingPage from './LoadingPage';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: 'mui',
});

export const AppLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const direction: Direction = i18n.language === 'en' ? 'ltr' : 'rtl';
  const theme = createTheme({ direction });
  const [rtlDirection, setRtlDirection] = useState<boolean>(
    direction !== 'ltr',
  );
  const pageLoadingState = useState<boolean>(false);

  useEffect(() => {
    setRtlDirection(i18n.dir() === 'rtl');
    document.documentElement.setAttribute('dir', i18n.dir());
  }, [i18n.language]);

  return (
    <CacheProvider value={rtlDirection ? rtlCache : ltrCache}>
      <ThemeProvider theme={theme} noSsr defaultMode="dark">
        <CssBaseline />
        <GlobalStyles />
        <LoadingPageContext value={pageLoadingState}>
          <RTLDirectionContext value={[rtlDirection, setRtlDirection]}>
            <LoadingPage />
            <Outlet />
          </RTLDirectionContext>
        </LoadingPageContext>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AppLayout;
