import { LinearProgress, Stack } from '@mui/material';

export const LoadingFallback: React.FC = () => (
  <Stack
    justifyContent="center"
    alignItems="center"
    sx={{ position: 'fixed', inset: 0 }}
  >
    <Stack gap="20px">
      <img src="/logo.svg" width="200px" alt="logo" />
      <LinearProgress />
    </Stack>
  </Stack>
);

export default LoadingFallback;
