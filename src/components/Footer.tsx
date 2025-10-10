import type React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { sxWithFaFont, useDate } from '../utils';
import { useEffect, useState } from 'react';

const RootStack = styled(Stack)(({ theme }) => [
  {
    height: '106px',
    padding: '0 28px',
    marginTop: '50px',
    background:
      'linear-gradient(90deg, var(--light-bg) 0%, rgba(204, 221, 221, 0.619608) 51%, var(--light-bg) 100%)',
  },
  theme.applyStyles('dark', {
    background:
      'linear-gradient(90deg, var(--bg-color-1) 0%, var(--bg-color-4) 50.5%, var(--dark-bg) 98%)',
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
    '& span': textStyles.light,
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
  const { t, i18n } = useTranslation();
  const getDate = () => useDate(new Date(), i18n.language as any, 'long');
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
      direction="row"
      alignItems="center"
      justifyContent="space-between"
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
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing="40px"
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
