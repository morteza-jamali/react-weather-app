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
import Image from '../components/Image';

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
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAABmJLR0QA/wD/AP+gvaeTAAAM80lEQVRo3s2ae4xU1RnAN7Gtre1ftU0spY9oihWltSBSmmhrkzZtLQVMY0tjWjS1tImJrxitjQmv4qIiLIqIy+6yKw+H17IgBXmUhxUIry4iC/LY3dn37uzOzsw99zVL8vX7zj3n3nPPvTM7i1Rd8uVe7syde373O+d7nrKyq/wHAJ/JZrOTGGNPGoZRaeRyB1mONTPDSJuM5W3Tdl0nn3ady82OM3TQcS5X4vHJfD4/ie4t+zT+4cA+Z1nWdMswNxs5/GcYoArLBYKA4Np5cN0hRfLgOC4ds/j/Ta7rTqPf/MTBcPBfRZmP2upHAYuZoMPpgCZ+x4ORYI4iLuTzdN0F27b7TdOcl8vlvvJJaOxLqLFynHL0B1JKAfS16HhaCwM6CJjnQuf4DBKGsAvwmV/8WODwrU5DaaOHkzY8QUCD8XMWB2gwfp2/CA7JUENOBI6EtKcBSkniZ1P/n1r7PD6kAuGAxOIiIAlOCMGEAHOGgBeaNpiYqowPHLUzLCB9Rwp+Xodjue6qwuFDRqM0ygdySKk9Bc7TIIvVIE1feZ/UKH9RGiQB6nA6PMpJvHXUVYHDH74JNXVRmy7eYFXNkVbEwKXm0EB4GkQhQD5gy+b3MqlZAanCKNoKiVyfQlrxqzd/JDg3534X4fr4AExFaLBCeyELqWqP4LJCxGc0rR0BQedci4xFNCmPMVCaDPXi98Zc6bT8OsK02KaiOQXOUqanCqmvPwmoalFOOX8mKID6lOSQbmHIoaGhdrz3G1diUBp9KHE0xVqy9LWnQBoqpJii0lV4WgyvKwmpak9qjgOiteVSRJuu45zAMV9bMiA+ZEVozZnxULqE4cLaY5oWpcaEU/c1q6+7EKQT1aZ8KXj/q6VOzem6QSkFTmrRhywCGOcaQnBOMHBHTFsah4RU4VUXgvdMGW5qXoc/1BIBLAEushZzuVhAMiqqEVGFIhvbQmjL5UIWV46BQIvBCUkWjXgo/IrAKYCsBDAfULOgqsS5ABq8XO8S0IMkYJtrL6+swzhAsZ7nx8Khz7oev2CEfF1MlKLGnmxYuECD6u84MYA0QPpN0poK6FBIF2Nk1LWrCl5jsQE6kv9TvkHumwppi8WIEQVUj/Jevv4sBU6sQT4V8dkeoBMGFJCqcYnAmZGQbk4kn0N/12+LhxRdZ6w0yMD5G9CdNuBIWxoauzJgcA0FQs+U59yF8HMnsJx2OMtQ4Wxlbaqf4/dToXwSv3wfd+gUXYgBF4UsBKpNx650Dp471AkzdnXAT+uT8O2V52BC3TmoaewRUFYU1g7WXOAenJBvjI10CMy2fW3ijPxNEG+a1mb6cVMBHBZU5H+m9l0vEGCQyhjwx72dMOvdFDxxuB+m7+iEG6vPw01V52Bc9WnYfTABVuNycM6sAqfvTAhKAqtOPvCJYl0qVtifmjQDTEuGg+v9GoptmtkQoMzhmGY5mRLJMBYSft0M/ObLJ3vhd3t74KH9ffC3/6Tg7i3tcFPtRZhauwsurZ8B+V2PwNDhhTB0fCm4O+8H58QL4FqmprnAwlKZw5HXHDdkOX2NOkFQjlofRLZraHr+0BLkPqBcQzqkaYYAg0yeQQdOx7qmfljU2A8bPuyHqTu7YPqubpixtxfu39MDY9a2wPi6Rmiv+zm4G++D/Pa/QH7fM5A/VA75zT+By5smg3O6Ml5rAirwl8UDcm68cAbkTfMOAnySvwWxBk3dYMhMXAD6wbHIB+mzfa1pmLS5HW7b2A7j8XhnQwfcta0TfrGjG361owu+j9dv29AGzybqIFs1EZzV94C76beQ/9cscOt/DUPrfwRDiYmQr78HHDMTBSwgsXGpWIsiSnqc3MNKqUGZoUcsomGEklqZuBJkD661yfVtcMv6di63IsgPEHJSQydMrO+AcRva4Ze7e+FPRwdhJsqjhy5A07oHwHnzx+CungzumjvxeDvk146HoXUT4PD7h6ErwyKGZcSQpGXTXlGGWnvXd5IistcBIwbGDCDrLwzAWAEnZSyXNpiwpRPuerubg808FsizB49Ba93PIL1qIrg1Y8FdNQ7yb34P8mtuh3uWb4fRS0/BvANJUX0Lu4DCMhRYWXI5XuVgfxmetFhKVu1pkRUHFAaHIKvOpEJwEnDagRT8+XgYTJe/HumE44kHwa2+BSFvhc7au+HG5Y3wreUfwA0Vp+BAy4CvyVJA/VpOkLM2E+CAZwEVK2gF67GQH5SAB9CBhwHbYPK27oJQD3LJ+P+fhZBLdjdApmY8PFNVAd9BXznqNQR85X147VhXNPkdRpN++uQBpspwWrpqlh6CtALLqmpOWlc6N/CeB/Z0cDAJeefWrli4h1AejtPq0TTM2rAdxlR/CN984yyMfr0JRi07DQdbB3DA9hVBCiU5UUANMmQ59esiGO8ezMHTh3pg5r+74eH9dOyC2afSsPBsBspRFgpZdC4L5U14rUkehZxB+N3t8IftrTBjWwv8fmszLDrSEYLTswaeHxYBFJAccMDWai06ZFz+pmTS0eiHF5ccqE/mYND07l3XPIjaZpBDWXspzb+XyhpQ35oRzzGFeOd+UoxH6Y7U349NuaKgKSpPtNgiDpRwPOQRJQRR2OGimmBVdEBavx1ZE5JZbyBJNPvJDM0CBpcwIGgd9HzrJQzCOzImxOWgUlu+X2aei1JffMESRwDYTHXPdyWghKQjRQ4STAfUp4tf4BWA9HLe6chCDwJSRFGfzEJG+M8EapK+k0XZkswUhNPTNsbCoaKfHMdAKuPbT4CVoUCVQhxFa4Ug5UKmB4cq2GL6yDJDkAqZkSnGIaygbKiud1NYcb3878e+wibETVUllHudAJ/wkk4vVSkExkXLyWgQHhwmtsxrjfF8znb8KrbM83wtCDhqvkSAFGGKm2JqFCVEVvqK2Qj87LEy6qxK01sMTjrZ1EAaGt7Zh4OwYE39dg5Ys6GBP3TBq1VQndgCm3fu9adb1bp6GBzMQHpwEFas3gRPLVgCb6zZDO2dXZDYtsuHSWzdyc/nLqnk93jPMOGlFbVQ/VY91K5vCFUGZLCvFrFUSGE/JvB0CQGyRTWnQS5euRpaku3w+JyXIJPJwstv1PE3StezVKoQnaOeVAqW4DV6Edyy4kMrqtf68HSexQFn8J7ltQnUlAmL8LcG0xnIYrmDXlpF1VoOtbhyNU5V0bRR2na8iKVUyxVAL12iPxz8plIAJWRi6w54rfYtON10ARYuq4KTp5vAsi0EXgSrN70Nuw+8x9/u4so61NJOeHT2i1xLNIAlOGBpIOZXVEJNogFqUDsVK9fwl/DIc+VQhzNiz8FDfPBPzV8ML71eC6/UrPMbOzKKUoP+GC0m/Iz+8uXL00uFo5sH0oPw9/KlfACPznnRt1r/eGEZ7H3vKBw63gj9/Wl4/tVquNiShPeO/Rc2bt+FUDZqdI0YHIOlqEGa6gS/lDSFx6efr8Bs/zAcOXmKgxA4wzVevqyaT3W1KyX7lKbW8xAanBIqOiFAf6mA9GN9qX4OSLAeoAUXm1vhg7Pn4fylZhjAtUrfkUagu7ePD6a7t5fDmfy8z7ekPb0pfv3cxWb44NwFfDFtHKS7u5c/h34rjc/y0zctN9V6Hn3I9NlQZQ0B5pUC6DdMhNmW5QNL9PzUZoucOkpRtrjI5qhW54mt3MlpqgQnigZnx5Xtr0cIoxig70SVTpPMv8wYONVpDwuotuNYsfIkC0GGoi9PgwxZ4ndmIMSCUqanGvEQnPpQwwianXFRSkHAUsqSMXVYtaVney90btHmC4K0FJuesuPDK9ExhV7plPW0qxic9GdXATI57HYT2qqhdE8j09NRyu3+movJ/m0lYC4GGAIptYoeAyk2OdxbUo8Q4ZYXKuT4YZC2J0YFlD2IYQFlaUQJ1P11ViqggDQNc+mIWti0VaMQpCXWjL/Bxwhv1ZKAaps6broyrfYzHJShv4hAjo2ohS26TaNoPeqAvosIrRfD3+kk/ZKtbTZQK3eFqnfFICN7b4LPmvG3vnale2RuRrBetWJcqBBlaY7X16DILBytq1QQMGfE7ncrIL3YCxzzUTcC3YhwF7iRMa2CzRhLyen8PqDtlRxkf112jrjfZPHN01IBUXMtCHfz1dqANwpBTxRrqalNSJnA+gmvaIFxoyOmalx32NC3oRQQBDt2xdOyiOG5FgdVYcb4LFPJ5NXNPNJn6uU8fyvXyKckyYoRG5QRanMKTo9WHTRup5IusqDMjBFDcWOCW6XvLfs4/ijiod0M6HsMHVBPPFXtmQU2zA4jtEV6Lj7zCx/7zl/amYE9+LkImCpUGwngWDHtxF3vQ5mNWvvyp2JTOvXEqW1MpQK1xE5hni2MSnQfaeD3xLU0SgJf3JRIPvcp2oF/DYJNpOYjygqU/TjoSwgxgOLiOckAv2awfWQ08Ppj+ILu8GsoV/HvfzspZT1iPGKMAAAAAElFTkSuQmCC"
              alt="logo"
            />
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
