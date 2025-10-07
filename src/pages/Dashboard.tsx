import { useNavigate } from 'react-router';
import { useUserInfo } from '../hooks';
import { Fragment, useEffect } from 'react';
import { PageTitle, SettingsMenu } from '../components';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { sxWithFaFont } from '../utils';

const Header = styled(Stack)(({ theme }) => [
  {
    height: '80px',
    padding: '12px 24px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  },
  theme.applyStyles('dark', {
    boxShadow: '0px 4px 10px rgba(166, 165, 165, 0.15)',
  }),
]);

const HeaderLogo = styled(Stack)({
  '& img': {
    width: '56px',
    height: '56px',
  },
  '& h6': {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '150%',
    letterSpacing: '0.15px',
    color: '#3D4852',
  },
});

const LocationForm = styled(FormControl)(({ theme }) => [
  {
    width: '295px',
  },
  theme.applyStyles('dark', {
    '& fieldset': {
      borderColor: '#757575',
    },
    '& label': {
      color: '#B3B3B3',
    },
    '& .MuiSelect-iconOutlined': {
      color: '#757575',
    },
  }),
]);

const AppTitle = styled(Typography)(({ theme }) => [
  theme.applyStyles('dark', { color: '#F3F4F7 !important' }),
]);

export const Dashboard = () => {
  const { name, isLogedIn } = useUserInfo();
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLogedIn) {
      navigate('/login');
    }
  }, [isLogedIn]);

  const { t, i18n } = useTranslation();

  return isLogedIn ? (
    <Fragment>
      <PageTitle title={t('dashboard')} />
      <Header
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <HeaderLogo direction="row" alignItems="center" spacing="8px">
          <img src="/favicon.png" alt="logo" draggable={false} />
          <AppTitle variant="h6" sx={sxWithFaFont(i18n.language)}>
            {t('appTitle')}
          </AppTitle>
        </HeaderLogo>
        <Stack direction="row" spacing="20px" alignItems="center">
          <LocationForm>
            <InputLabel
              id="location-select-label"
              sx={sxWithFaFont(i18n.language)}
            >
              {t('locationSearchSelect')}
            </InputLabel>
            <Select
              sx={sxWithFaFont(i18n.language, { height: '40px' })}
              labelId="location-select-label"
              id="location-select"
              value={10}
              label={t('locationSearchSelect')}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </LocationForm>
          <SettingsMenu />
        </Stack>
      </Header>
      My name is = {name} && isLogedIn = {isLogedIn.toString()}
    </Fragment>
  ) : null;
};

export default Dashboard;
