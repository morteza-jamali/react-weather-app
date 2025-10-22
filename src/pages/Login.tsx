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
  Skeleton,
} from '@mui/material';
import { styled, useColorScheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { sxWithFaFont } from '../utils/sxWithFaFont';
import { useActionState, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageTitle } from '../components/PageTitle';
import useUserInfo from '../hooks/use-user-info';
import useLanguage from '../hooks/use-language';
import LoadImage from '../components/LoadImage';
import useWindowResize from '../hooks/use-window-resize';
import LoadingPageContext from '../contexts/LoadingPageContext';

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

const CloudsImg = styled(LoadImage)(({ theme }) => [
  {
    width: '452.817px',
    '@media (max-width: 1066px)': { width: 'auto', flexGrow: 1 },
    '@media (max-width: 606px)': { width: '100%' },
    '& .fallback__root': {
      backgroundColor: '#FFFFFF',
    },
    '& .MuiSkeleton-root': {
      width: '100%',
    },
    '& img': {
      '@media (max-width: 1066px)': {
        objectFit: 'cover',
        width: '100%',
      },
    },
    '& img, & .MuiSkeleton-root, & .fallback__root': {
      height: '100%',
      margin: 0,
      borderTopRightRadius: '12px',
      borderBottomRightRadius: '12px',
      '@media (max-width: 606px)': {
        borderBottomRightRadius: 0,
        borderTopLeftRadius: '12px',
      },
    },
  },
  theme.applyStyles('dark', {
    '& .fallback__root': {
      backgroundColor: 'var(--bg-color-1)',
    },
  }),
]);

const LoginCard = styled(Stack)(({ theme }) => [
  {
    borderRadius: '12px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#FFFFFF',
    height: '560px',
    '@media (max-width: 606px)': {
      height: 'auto',
    },
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

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const { t, i18n } = useTranslation();
  const { mode } = useColorScheme();
  const [nameValue, setNameValue] = useState('');
  const { changeLang } = useLanguage();
  const [nameValidation, setNameValidation] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useContext(LoadingPageContext);
  const [error, formAction] = useActionState((_: any, queryData: FormData) => {
    const newName = (queryData.get('name') as string).trim();

    if (newName.length === 0) {
      setNameValidation(true);
      return 'loginNameError';
    }

    setPageLoading(true);
    userInfo.setName(newName);
    navigate('/');
  }, ' ');
  const mQ1066Match = useMediaQuery('(max-width: 1066px)');
  const mQ606Match = useMediaQuery('(max-width: 606px)');
  const mQ380Match = useMediaQuery('(max-width: 380px)');
  const mQ260Match = useMediaQuery('(max-width: 260px)');
  const [imageHeight, setImageHeight] = useState<number | false>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardSize = useWindowResize('(max-width: 606px)', cardRef);

  useEffect(() => {
    if (cardSize) {
      setImageHeight(cardSize.width * (559 / 452));
    } else {
      setImageHeight(false);
    }
  }, [cardSize]);

  useEffect(() => {
    pageLoading && setPageLoading(false);
  }, []);

  return (
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
          ref={cardRef}
        >
          <Box
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
                height: mQ606Match ? '355px' : '100%',
              }}
            >
              <form action={formAction} style={{ flexGrow: 1 }}>
                <Stack justifyContent="space-between" sx={{ height: '100%' }}>
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
                      value={nameValue}
                      onChange={(event) => {
                        setNameValue(event.target.value);
                        setNameValidation(false);
                      }}
                      error={nameValidation && typeof error === 'string'}
                      helperText={
                        nameValidation && typeof error === 'string'
                          ? t(error)
                          : ' '
                      }
                      name="name"
                    />
                  </Stack>
                  <LoginButton
                    variant="contained"
                    sx={sxWithFaFont(i18n.language)}
                    type="submit"
                  >
                    {t('login')}
                  </LoginButton>
                </Stack>
              </form>
            </FormControl>
          </Box>
          <CloudsImg
            src={`/${mode === 'light' ? 'login_clouds.png' : 'login_clouds_dark.png'}`}
            alt="login clouds"
            fallback={<Skeleton variant="rectangular" animation="wave" />}
            {...(imageHeight ? { sx: { height: imageHeight } } : {})}
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
  );
};

export default Login;
