import { Skeleton, Stack, useMediaQuery } from '@mui/material';
import type React from 'react';
import { styled, useColorScheme } from '@mui/material/styles';
import { useContext, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import WmoCodes from '../wmo-codes.json';
import type { WmoCodesType } from './CurrentAndWeakly';
import checkTextDir from '../utils/checkTextDir';
import parseDate from '../utils/parseDate';
import LocationContext from '../contexts/LocationContext';
import CurrentWeaklyWeatherContext from '../contexts/CurrentWeaklyWeatherContext';
import LoadImage from './LoadImage';

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

const LocationIcon: React.FC = () => (
  <svg
    width="15"
    height="20"
    viewBox="0 0 15 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 5.625C6.46437 5.625 5.625 6.46437 5.625 7.5C5.625 8.53562 6.46437 9.375 7.5 9.375C8.53562 9.375 9.375 8.53562 9.375 7.5C9.375 6.46437 8.53562 5.625 7.5 5.625ZM7.5 10.625C5.77437 10.625 4.375 9.22625 4.375 7.5C4.375 5.77375 5.77437 4.375 7.5 4.375C9.22562 4.375 10.625 5.77375 10.625 7.5C10.625 9.22625 9.22562 10.625 7.5 10.625ZM7.5 0C3.35812 0 0 3.35812 0 7.5C0 10.6362 6.25312 20.0069 7.5 20C8.7275 20.0069 15 10.5937 15 7.5C15 3.35812 11.6419 0 7.5 0Z"
      fill="#3D4852"
    />
  </svg>
);

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
      <LocationIcon />
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

interface CircleIconProps {
  style?: CSSProperties;
}

const CircleIcon: React.FC<CircleIconProps> = (props) => (
  <svg
    {...props}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="6.5" stroke="#003464" strokeWidth="3" />
  </svg>
);

const CircleDarkIcon: React.FC<CircleIconProps> = (props) => (
  <svg
    {...props}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="6.5" stroke="#F3F4F7" strokeWidth="3" />
  </svg>
);

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
        {mode === 'dark' ? (
          <CircleDarkIcon
            style={{ marginInlineEnd: '5px', alignSelf: 'start' }}
          />
        ) : (
          <CircleIcon style={{ marginInlineEnd: '5px', alignSelf: 'start' }} />
        )}
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

const StatusImage = styled(LoadImage)(({ theme }) => [
  {
    '& .fallback__root': {
      backgroundColor: 'var(--bg-color-2)',
      alignItems: 'end',
    },
    '& img': {
      margin: '0 0 0 auto',
    },
  },
  theme.applyStyles('dark', {
    '& .fallback__root': {
      backgroundColor: 'var(--bg-color-1)',
    },
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
        <StatusImage
          src={`/wmo_images/${weatherStatusImg}`}
          alt="weather image"
          height="115px"
          width="auto"
          fallback={
            <Skeleton
              variant="circular"
              width="115px"
              height="115px"
              animation="wave"
            />
          }
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
