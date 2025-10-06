import {
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  Box,
  Typography,
  OutlinedInput,
  Button,
  useMediaQuery,
} from '@mui/material';
import { styled, useColorScheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { sxWithFaFont } from '../utils';

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
    overflowY: 'auto',
    padding: '50px',
    '@media (max-width: 380px)': {
      padding: '20px',
    },
  },
  theme.applyStyles('dark', {
    backgroundColor: '#151D32',
  }),
]);

const CloudsImg = styled('img')({
  borderTopRightRadius: '12px',
  borderBottomRightRadius: '12px',
  userSelect: 'none',
  '@media (max-width: 1066px)': { width: '100%', objectFit: 'cover' },
  '@media (max-width: 606px)': {
    borderBottomRightRadius: 0,
    borderTopLeftRadius: '12px',
  },
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
  const { t, i18n } = useTranslation();
  const { mode } = useColorScheme();
  const mQ1066Match = useMediaQuery('(max-width: 1066px)');
  const mQ606Match = useMediaQuery('(max-width: 606px)');
  const mQ380Match = useMediaQuery('(max-width: 380px)');
  const mQ260Match = useMediaQuery('(max-width: 260px)');

  return (
    <Root sx={mQ606Match ? { display: 'block' } : null}>
      <Stack
        alignItems="center"
        spacing="40px"
        sx={mQ1066Match ? { width: '100%' } : null}
      >
        <LoginCard
          direction={mQ606Match ? 'column-reverse' : 'row'}
          sx={mQ1066Match ? { width: '100%' } : null}
        >
          <Box
            flexGrow={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: mQ380Match ? '20px' : '60px',
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
                  <LoginTitle variant="h5" sx={sxWithFaFont(i18n.language)}>
                    {t('login')}
                  </LoginTitle>
                  <OutlinedInput
                    sx={sxWithFaFont(i18n.language, {
                      width: '100%',
                    })}
                    placeholder={t('loginInputPlaceholder')}
                  />
                </Stack>
                <LoginButton
                  variant="contained"
                  sx={sxWithFaFont(i18n.language)}
                >
                  {t('login')}
                </LoginButton>
              </Stack>
            </FormControl>
          </Box>
          <CloudsImg
            src={`/${mode === 'light' ? 'login_clouds.png' : 'login_clouds_dark.png'}`}
            alt="login clouds"
            draggable={false}
          />
        </LoginCard>
        <FormControl sx={{ width: mQ260Match ? '100%' : '220px' }}>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            sx={sxWithFaFont(i18n.language)}
          >
            {t('language')}
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            sx={sxWithFaFont(i18n.language)}
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
