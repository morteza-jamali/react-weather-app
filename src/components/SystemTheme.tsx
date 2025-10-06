import { useEffect } from 'react';
import { useSystemTheme } from '../hooks';
import { useColorScheme } from '@mui/material/styles';

export const SystemTheme: React.FC = () => {
  const systemTheme = useSystemTheme();
  const { setMode } = useColorScheme();

  useEffect(() => setMode(systemTheme), [systemTheme]);

  return null;
};

export default SystemTheme;
