import {
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
} from '@mui/material';
import { styled, useColorScheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { sxWithFaFont } from '../utils/sxWithFaFont';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageTitle } from '../components/PageTitle';
import useUserInfo from '../hooks/use-user-info';
import useLanguage from '../hooks/use-language';

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
    backgroundColor: 'var(--light-bg)',
    overflowY: 'auto',
    padding: '50px',
    '@media (max-width: 380px)': {
      padding: '20px',
    },
  },
  theme.applyStyles('dark', {
    backgroundColor: 'var(--dark-bg)',
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
    backgroundColor: 'var(--bg-color-1)',
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
    color: 'var(--text-color-2)',
  }),
]);

export const Login = () => {
  const navigate = useNavigate();
  const userInfo = useUserInfo();

  useEffect(() => {
    if (userInfo.isLogedIn) {
      navigate('/');
    }
  }, [userInfo.isLogedIn]);

  const { t, i18n } = useTranslation();
  const { mode } = useColorScheme();
  const [name, setName] = useState('');
  const { changeLang } = useLanguage();
  const [nameValidation, setNameValidation] = useState<string | null>(null);
  const mQ1066Match = useMediaQuery('(max-width: 1066px)');
  const mQ606Match = useMediaQuery('(max-width: 606px)');
  const mQ380Match = useMediaQuery('(max-width: 380px)');
  const mQ260Match = useMediaQuery('(max-width: 260px)');

  const loginHandler = () => {
    const newName = name.trim();

    setNameValidation(null);

    if (newName.length === 0) {
      setNameValidation(t('loginNameError'));
      return;
    }

    userInfo.setName(newName);
    navigate('/');
  };

  return !userInfo.isLogedIn ? (
    <Root sx={mQ606Match ? { display: 'block' } : null}>
      <PageTitle title={t('login')} />
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
                  <TextField
                    variant="outlined"
                    sx={sxWithFaFont(
                      i18n.language,
                      {
                        width: '100%',
                      },
                      {
                        '& .MuiFormHelperText-root, & .MuiInputBase-root': {
                          fontFamily: 'IRANYekanX VF',
                        },
                      },
                    )}
                    placeholder={t('loginInputPlaceholder')}
                    onChange={(event) => setName(event.target.value)}
                    error={nameValidation !== null}
                    helperText={nameValidation}
                  />
                </Stack>
                <LoginButton
                  variant="contained"
                  sx={sxWithFaFont(i18n.language)}
                  onClick={loginHandler}
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
            value={i18n.language}
            sx={sxWithFaFont(i18n.language)}
            onChange={(event) => changeLang(event.target.value)}
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
  ) : null;
};

export default Login;
