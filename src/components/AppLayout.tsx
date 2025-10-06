import { ThemeProvider, type Direction } from '@mui/material/styles';
import { useSystemTheme } from '../hooks';
import { CacheProvider } from '@emotion/react';
import createTheme from '../theme';
import { RTLDirectionContext } from '../contexts';
import React, { useState } from 'react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { Outlet } from 'react-router';
import { CssBaseline } from '@mui/material';
import SystemTheme from './SystemTheme';

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
  const systemTheme = useSystemTheme();
  const theme = createTheme({ direction });
  const [rtlDirection, setRtlDirection] = useState<boolean>(
    direction !== 'ltr',
  );

  return (
    <CacheProvider value={rtlDirection ? rtlCache : ltrCache}>
      <ThemeProvider theme={theme} defaultMode={systemTheme} noSsr>
        <CssBaseline />
        <SystemTheme />
        <RTLDirectionContext value={[rtlDirection, setRtlDirection]}>
          <Outlet />
        </RTLDirectionContext>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AppLayout;
