import {
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  Box,
  Typography,
  OutlinedInput,
  Button,
} from '@mui/material';
import { styled, useColorScheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const locales = [
  {
    code: 'en',
    name: 'english',
  },
  {
    code: 'fa',
    name: 'persian',
  },
];

const LoginButton = styled(Button)(({ theme }) => [
  {
    textTransform: 'uppercase',
    padding: '8px 22px',
    backgroundColor: '#2196F3',
    boxShadow:
      '0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '26px',
    letterSpacing: '0.46px',
    '&:hover': {
      backgroundColor: 'var(--variant-containedBg)',
    },
  },
  theme.applyStyles('dark', { color: '#fff' }),
]);

const Root = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    inset: 0,
    backgroundColor: '#F3FAFE',
  },
  theme.applyStyles('dark', {
    backgroundColor: '#151D32',
  }),
]);

const CloudsImg = styled('img')({
  borderTopRightRadius: '12px',
  borderBottomRightRadius: '12px',
  userSelect: 'none',
});

const LoginCard = styled(Stack)(({ theme }) => [
  {
    borderRadius: '12px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#FFFFFF',
  },
  theme.applyStyles('dark', {
    backgroundColor: '#292F45',
  }),
]);

const LoginTitle = styled(Typography)(({ theme }) => [
  {
    fontWeight: 700,
    fontSize: '25.63px',
    lineHeight: '30px',
    color: '#050F24',
  },
  theme.applyStyles('dark', {
    color: '#F3F4F7',
  }),
]);

export const Login = () => {
  const { t } = useTranslation();
  const { mode } = useColorScheme();

  return (
    <Root>
      <Stack alignItems="center" spacing="40px">
        <LoginCard direction="row">
          <Box
            flexGrow={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 60px',
            }}
          >
            <FormControl
              sx={{
                width: '386px',
                height: '355px',
              }}
            >
              <Stack spacing="200px">
                <Stack spacing="32px" alignItems="center">
                  <LoginTitle variant="h5">{t('login')}</LoginTitle>
                  <OutlinedInput
                    sx={{ width: '100%' }}
                    placeholder={t('loginInputPlaceholder')}
                  />
                </Stack>
                <LoginButton variant="contained">{t('login')}</LoginButton>
              </Stack>
            </FormControl>
          </Box>
          <CloudsImg
            src={`/${mode === 'light' ? 'login_clouds.png' : 'login_clouds_dark.png'}`}
            alt="login clouds"
            draggable={false}
          />
        </LoginCard>
        <FormControl sx={{ width: '220px' }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {t('language')}
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: 'language',
              id: 'uncontrolled-native',
            }}
          >
            {locales.map(({ code, name }, index) => (
              <option key={`locale-${index}`} value={code}>
                {t(name)}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Stack>
    </Root>
  );
};

export default Login;
