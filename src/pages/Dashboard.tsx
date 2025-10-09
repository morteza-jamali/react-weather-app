import { useNavigate } from 'react-router';
import { useLocation, useUserInfo, type PlaceType } from '../hooks';
import { Fragment, useEffect, useState } from 'react';
import {
  CurrentAndWeakly,
  MonthlyTemp,
  PageTitle,
  SearchLocation,
  SettingsMenu,
} from '../components';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';
import { sxWithFaFont } from '../utils';
import { LocationContext } from '../contexts';

const Header = styled(Stack)(({ theme }) => [
  {
    height: '80px',
    padding: '12px 24px',
    boxShadow: 'var(--box-shadow-1)',
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
    color: 'var(--text-color-1)',
  },
});

const AppTitle = styled(Typography)(({ theme }) => [
  theme.applyStyles('dark', { color: 'var(--text-color-2) !important' }),
]);

const Main = styled(Box)({
  padding: '28px',
  display: 'grid',
  gap: '28px',
  gridTemplateColumns: '607px 1fr',
  gridTemplateAreas: `
    'currentWeather monthlyTemp'
    '2weaksForecast 2weaksForecast'
  `,
});

export const Dashboard = () => {
  const { isLogedIn } = useUserInfo();
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLogedIn) {
      navigate('/login');
    }
  }, [isLogedIn]);

  const { t, i18n } = useTranslation();
  const { location } = useLocation();
  const locationState = useState<PlaceType | null>(location);

  return isLogedIn ? (
    <Fragment>
      <LocationContext value={locationState}>
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
          <Stack
            direction="row"
            spacing="20px"
            alignItems="center"
            sx={sxWithFaFont(i18n.language, null, {
              '& .MuiAutocomplete-popper *': {
                fontFamily: 'IRANYekanX VF',
              },
            })}
          >
            <SearchLocation />
            <SettingsMenu />
          </Stack>
        </Header>
        <Main>
          <MonthlyTemp />
          <CurrentAndWeakly />
        </Main>
      </LocationContext>
    </Fragment>
  ) : null;
};

export default Dashboard;
