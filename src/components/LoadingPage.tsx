import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import LoadingPageContext from '../contexts/LoadingPageContext';
import { blue } from '@mui/material/colors';

export const LoadingPage: React.FC = () => {
  const [pageLoading] = useContext(LoadingPageContext);

  return (
    <Backdrop sx={{ zIndex: 99 }} open={pageLoading}>
      <CircularProgress
        sx={[
          () => ({ color: blue[900] }),
          (theme) => theme.applyStyles('dark', { color: blue[500] }),
        ]}
      />
    </Backdrop>
  );
};

export default LoadingPage;
