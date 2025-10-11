import { useNavigate } from 'react-router';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';
import { sxWithFaFont } from '../utils/sxWithFaFont';
import { LocationContext } from '../contexts/LocationContext';
import useUserInfo from '../hooks/use-user-info';
import useLocation, { type PlaceType } from '../hooks/use-location';
import PageTitle from '../components/PageTitle';
import SearchLocation from '../components/SearchLocation';
import SettingsMenu from '../components/SettingsMenu';
import MonthlyTemp from '../components/MonthlyTemp';
import CurrentAndWeakly from '../components/CurrentAndWeakly';
import Footer from '../components/Footer';

const Header = styled(Stack)(({ theme }) => [
  {
    height: '80px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '12px 24px',
    boxShadow: 'var(--box-shadow-1)',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      justifyContent: 'center',
      height: 'auto',
      gap: '30px',
      padding: '20px',
    },
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
  '@media (max-width: 1298px)': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@media (max-width: 970px)': {
    gridTemplateColumns: '1fr',
    columnGap: 0,
    gridTemplateAreas: `
    'currentWeather'
    'monthlyTemp'
    '2weaksForecast'
  `,
  },
});

export const Dashboard = () => {
  const { isLogedIn } = useUserInfo();
  const navigate = useNavigate();

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
        <Header alignItems="center">
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
            sx={sxWithFaFont(
              i18n.language,
              {
                '@media (max-width: 420px)': {
                  alignSelf: 'stretch',
                },
              },
              {
                '& .MuiAutocomplete-popper *': {
                  fontFamily: 'IRANYekanX VF',
                },
              },
            )}
          >
            <SearchLocation />
            <SettingsMenu />
          </Stack>
        </Header>
        <Main>
          <MonthlyTemp />
          <CurrentAndWeakly />
        </Main>
        <Footer />
      </LocationContext>
    </Fragment>
  ) : null;
};

export default Dashboard;
