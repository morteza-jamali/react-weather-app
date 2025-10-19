import { LinearProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

export const LoadingFallback: React.FC = () => {
  useEffect(() => {
    document.getElementById('initial_style')?.remove();
  });

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ position: 'fixed', inset: 0 }}
    >
      <Stack gap="20px">
        <img src="/logo.png" width="200px" alt="logo" />
        <LinearProgress />
      </Stack>
    </Stack>
  );
};

export default LoadingFallback;
