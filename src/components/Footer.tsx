import type React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useEffect, useState } from 'react';
import parseDate from '../utils/parseDate';
import sxWithFaFont from '../utils/sxWithFaFont';

// NOTE: Doe to a bug of stylis-plugin-rtl we should use /* @noflip */ with gradients to work on RTL direction
// NOTE: https://github.com/styled-components/stylis-plugin-rtl/issues/36
const RootStack = styled(Stack)(({ theme }) => [
  {
    height: '106px',
    padding: '0 28px',
    marginTop: '50px',
    background:
      'linear-gradient(90deg, var(--light-bg) 0%, rgba(204, 221, 221, 0.619608) 51%, var(--light-bg) 100%) /* @noflip */',
    '@media (max-width: 554px)': {
      height: 'auto',
      paddingTop: '28px',
      paddingBottom: '28px',
    },
    '@media (min-height: 935px)': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      top: 'auto',
    },
  },
  theme.applyStyles('dark', {
    background:
      'linear-gradient(90deg, var(--bg-color-1) 0%, var(--bg-color-4) 50.5%, var(--dark-bg) 98%) /* @noflip */',
  }),
]);

const textStyles = {
  light: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '24px',
    color: 'var(--text-color-3)',
  },
  dark: {
    color: 'var(--text-color-2)',
  },
};

const Info = styled(Stack)(({ theme }) => [
  {
    color: 'var(--text-color-3)',
    '& span': { ...textStyles.light, textWrap: 'nowrap' },
  },
  theme.applyStyles('dark', {
    color: textStyles.dark.color,
    '& span': textStyles.dark,
  }),
]);

const CopyRight = styled(Typography)(({ theme }) => [
  textStyles.light,
  theme.applyStyles('dark', textStyles.dark),
]);

export const Footer: React.FC = () => {
  const mQ870Match = useMediaQuery('(max-width: 870px)');
  const mQ554Match = useMediaQuery('(max-width: 554px)');
  const { t, i18n } = useTranslation();
  const getDate = () => parseDate(new Date(), i18n.language as Langs, 'long');
  const [{ time, weekday, monthday, month, year }, setDate] =
    useState(getDate());

  useEffect(() => {
    const interval = setInterval(() => setDate(getDate()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <RootStack
      direction={mQ554Match ? 'column' : 'row'}
      alignItems="center"
      justifyContent={mQ554Match ? 'center' : 'space-between'}
      spacing="50px"
    >
      <Stack
        spacing="12px"
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <img src="/nadin.svg" alt="nadinsoft logo" height="50px" width="auto" />
        <CopyRight sx={sxWithFaFont(i18n.language)}>{t('copyright')}</CopyRight>
      </Stack>
      <Stack
        direction={mQ870Match ? 'column' : 'row'}
        alignItems={mQ870Match ? 'start' : 'center'}
        justifyContent="center"
        spacing={mQ870Match ? '10px' : '40px'}
      >
        <Info
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing="4px"
        >
          <EmailOutlinedIcon />
          <span>{t('contact us')} : info@nadin.ir</span>
        </Info>
        <Info
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing="4px"
        >
          <CalendarMonthOutlinedIcon />
          <span>
            {time} {weekday} {monthday} {month} {year}
          </span>
        </Info>
      </Stack>
    </RootStack>
  );
};

export default Footer;
