import { ThemeProvider, type Direction } from '@mui/material/styles';
import { useSystemTheme } from '../hooks';
import { CacheProvider } from '@emotion/react';
import createTheme from '../theme';
import { RTLDirectionContext } from '../contexts';
import React, { useEffect, useState } from 'react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { Outlet } from 'react-router';
import { CssBaseline } from '@mui/material';
import SystemTheme from './SystemTheme';
import { useTranslation } from 'react-i18next';
import GlobalStyles from './GlobalStyles';

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

const direction: Direction = 'ltr';

export const AppLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const systemTheme = useSystemTheme();
  const theme = createTheme({ direction });
  const [rtlDirection, setRtlDirection] = useState<boolean>(
    direction !== 'ltr',
  );

  useEffect(() => {
    setRtlDirection(i18n.dir() === 'rtl');
    document.documentElement.setAttribute('dir', i18n.dir());
  }, [i18n.language]);

  return (
    <CacheProvider value={rtlDirection ? rtlCache : ltrCache}>
      <ThemeProvider theme={theme} defaultMode={systemTheme} noSsr>
        <CssBaseline />
        <GlobalStyles />
        <SystemTheme />
        <RTLDirectionContext value={[rtlDirection, setRtlDirection]}>
          <Outlet />
        </RTLDirectionContext>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AppLayout;
