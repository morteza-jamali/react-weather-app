import { GlobalStyles as MuiGlobalStyles, useColorScheme } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';

export const GlobalStyles: React.FC = () => {
  const { mode } = useColorScheme();
  const { i18n } = useTranslation();

  return (
    <MuiGlobalStyles
      styles={{
        body: {
          fontFamily:
            i18n.language === 'fa'
              ? 'IRANYekanX VF'
              : '"Roboto","Helvetica","Arial",sans-serif',
          backgroundColor:
            mode === 'dark' ? 'var(--dark-bg)' : 'var(--light-bg)',
        },
      }}
    />
  );
};

export default GlobalStyles;
