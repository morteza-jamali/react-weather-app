import { Stack, useMediaQuery } from '@mui/material';
import type React from 'react';
import { styled, useColorScheme } from '@mui/material/styles';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import WmoCodes from '../wmo-codes.json';
import type { WmoCodesType } from './CurrentAndWeakly';
import checkTextDir from '../utils/checkTextDir';
import parseDate from '../utils/parseDate';
import LocationContext from '../contexts/LocationContext';
import CurrentWeaklyWeatherContext from '../contexts/CurrentWeaklyWeatherContext';

const LocationRoot = styled(Stack)({
  borderRadius: '50px',
  backgroundColor: 'var(--bg-color-3)',
  padding: '10px 13px',
  '& span': {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: 'var(--text-color-1)',
  },
});

const Location: React.FC = () => {
  const [location] = useContext(LocationContext);
  const textDirection = checkTextDir(location!.name!);
  const mQ550Match = useMediaQuery('(max-width: 550px)');

  return (
    <LocationRoot
      direction="row"
      spacing="13px"
      justifyContent="start"
      alignItems="center"
      alignSelf={mQ550Match ? 'center' : 'start'}
    >
      <img src="/location_dark.svg" alt="location" height="20px" width="auto" />
      <span style={textDirection ? { fontFamily: 'IRANYekanX VF' } : {}}>
        {location?.name}
      </span>
    </LocationRoot>
  );
};

const TodayName = styled('span')(({ theme }) => [
  {
    color: 'var(--text-color-3)',
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '38px',
  },
  theme.applyStyles('dark', {
    color: 'var(--text-color-2)',
  }),
]);

const DateTime = styled('span')(({ theme }) => [
  {
    color: 'var(--text-color-3)',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
  },
  theme.applyStyles('dark', {
    color: 'var(--text-color-2)',
  }),
]);

const CurrentDate: React.FC = () => {
  const mQ550Match = useMediaQuery('(max-width: 550px)');
  const data = useContext(CurrentWeaklyWeatherContext);
  const { i18n } = useTranslation();
  const { weekday, year, month, monthday, time, timeName } = parseDate(
    data!.current.time!,
    i18n.language as Langs,
  );

  return (
    <Stack
      spacing="4px"
      justifyContent="center"
      alignItems={mQ550Match ? 'center' : 'start'}
    >
      <TodayName>{weekday}</TodayName>
      <Stack direction="row" spacing="20px">
        {i18n.language === 'en' ? (
          <>
            <DateTime>
              {monthday} {month}, {year}
            </DateTime>
            <DateTime>
              {time} {timeName}
            </DateTime>
          </>
        ) : (
          <>
            <DateTime>
              {time} {timeName}
            </DateTime>
            <DateTime>
              {monthday} {month}, {year}
            </DateTime>
          </>
        )}
      </Stack>
    </Stack>
  );
};

const TemperatureText = styled('span')(({ theme }) => [
  {
    color: 'var(--text-color-3)',
    fontWeight: 500,
    fontSize: '40px',
    lineHeight: '47px',
  },
  theme.applyStyles('dark', {
    color: 'var(--text-color-2)',
  }),
]);

const HighLow = styled(DateTime)({});

const Temperature: React.FC = () => {
  const mQ550Match = useMediaQuery('(max-width: 550px)');
  const data = useContext(CurrentWeaklyWeatherContext);
  const { t } = useTranslation();
  const { mode } = useColorScheme();

  return (
    <Stack
      spacing="4px"
      justifyContent="center"
      alignItems={mQ550Match ? 'center' : 'start'}
    >
      <Stack direction="row" sx={{ gap: '5px' }} dir="ltr">
        <TemperatureText>{data?.current.temperature_2m}</TemperatureText>
        <img
          src={`/circle${mode === 'dark' ? '_dark' : ''}.svg`}
          width="16px"
          style={{ marginInlineEnd: '5px', alignSelf: 'start' }}
        />
        <TemperatureText>C</TemperatureText>
      </Stack>
      <Stack direction="row" spacing="15px" alignItems="center">
        <HighLow>
          {t('High')}: {data?.daily.temperature_2m_max[0]}
        </HighLow>
        <HighLow>
          {t('Low')}: {data?.daily.temperature_2m_min[0]}
        </HighLow>
      </Stack>
    </Stack>
  );
};

const Card = styled(Stack)(({ theme }) => [
  {
    backgroundColor: 'var(--bg-color-2)',
    boxShadow: 'var(--box-shadow-1)',
    borderRadius: '24px',
    padding: '20px 24px',
    width: '607px',
    gridArea: 'currentWeather',
    '@media (max-width: 1298px)': {
      width: 'auto',
    },
  },
  theme.applyStyles('dark', {
    backgroundColor: 'var(--bg-color-1)',
  }),
]);

const StatusText = styled('span')(({ theme }) => [
  {
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '39px',
    color: 'var(--text-color-3)',
    textAlign: 'center',
  },
  theme.applyStyles('dark', {
    color: 'var(--text-color-2)',
  }),
]);

const FeelsLikeText = styled('span')(({ theme }) => [
  {
    color: 'var(--text-color-3)',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
  },
  theme.applyStyles('dark', {
    color: 'var(--text-color-2)',
  }),
]);

export const CurrentWeather: React.FC = () => {
  const mQ550Match = useMediaQuery('(max-width: 550px)');
  const { t, i18n } = useTranslation();
  const data = useContext(CurrentWeaklyWeatherContext);
  const weatherCodeData = (WmoCodes as WmoCodesType)[
    data!.current.weather_code!
  ];
  const is_dayOrNight = data?.current.is_day === 0 ? 'night' : 'day';
  const weatherStatusImg =
    typeof weatherCodeData.image === 'string'
      ? weatherCodeData.image
      : weatherCodeData.image[is_dayOrNight];

  return (
    <Card
      direction={mQ550Match ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: mQ550Match ? 'auto' : '234px',
        gap: mQ550Match ? '50px' : '20px',
      }}
    >
      <Stack
        spacing="16px"
        justifyContent="center"
        {...(mQ550Match ? { alignItems: 'center' } : {})}
      >
        <Location />
        <CurrentDate />
        <Temperature />
      </Stack>
      <Stack
        alignItems={mQ550Match ? 'center' : 'end'}
        justifyContent="center"
        spacing="10px"
      >
        <img
          src={`/wmo_images/${weatherStatusImg}`}
          alt="weather image"
          height="115px"
          width="auto"
        />
        <Stack
          justifyContent="center"
          alignItems={mQ550Match ? 'center' : 'start'}
          spacing="8px"
        >
          <StatusText>{t(weatherCodeData.name)}</StatusText>
          {i18n.language === 'en' ? (
            <FeelsLikeText>
              {t('Feels Like')} {data?.current.apparent_temperature}
            </FeelsLikeText>
          ) : (
            <FeelsLikeText>
              {data?.current.apparent_temperature} {t('Feels Like')}
            </FeelsLikeText>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default CurrentWeather;
