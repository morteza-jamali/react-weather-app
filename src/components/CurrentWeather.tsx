import { Stack } from '@mui/material';
import type React from 'react';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { CurrentWeaklyWeatherContext, LocationContext } from '../contexts';

const LocationRoot = styled(Stack)({
  width: '173px',
  height: '40px',
  borderRadius: '50px',
  backgroundColor: '#CDD9E0',
  '& span': {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: 'var(--text-color-1)',
  },
});

const Location: React.FC = () => {
  const [location, _] = useContext(LocationContext);

  return (
    <LocationRoot
      direction="row"
      spacing="13px"
      justifyContent="center"
      alignItems="center"
    >
      <img src="/location_dark.svg" alt="location" width="15px" />
      <span>{location?.name}</span>
    </LocationRoot>
  );
};

const TodayName = styled('span')({
  color: 'var(--text-color-2)',
  fontWeight: 500,
  fontSize: '32px',
  lineHeight: '38px',
});

const DateTime = styled('span')({
  color: 'var(--text-color-2)',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '16px',
});

const Date: React.FC = () => {
  return (
    <Stack spacing="4px">
      <TodayName>Monday</TodayName>
      <Stack direction="row" spacing="20px">
        <DateTime>24 Dec, 2023</DateTime>
        <DateTime>11:45 AM</DateTime>
      </Stack>
    </Stack>
  );
};

const TemperatureText = styled('span')({
  color: 'var(--text-color-2)',
  fontWeight: 500,
  fontSize: '40px',
  lineHeight: '47px',
});

const HighLow = styled(DateTime)({});

const Temperature: React.FC = () => {
  return (
    <Stack spacing="4px">
      <Stack direction="row" spacing="5px">
        <TemperatureText>26</TemperatureText>
        <img
          src="/circle_dark.svg"
          width="16px"
          style={{ marginInlineEnd: '5px', alignSelf: 'start' }}
        />
        <TemperatureText>C</TemperatureText>
      </Stack>
      <HighLow>High: 27 Low: 10</HighLow>
    </Stack>
  );
};

const Card = styled(Stack)({
  backgroundColor: 'var(--bg-color-1)',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  borderRadius: '24px',
  padding: '20px 24px',
});

const StatusText = styled('span')({
  fontWeight: 400,
  fontSize: '32px',
  lineHeight: '39px',
  color: 'var(--text-color-2)',
});

const FeelsLikeText = styled('span')({
  color: 'var(--text-color-2)',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
});

export const CurrentWeather: React.FC = () => {
  const data = useContext(CurrentWeaklyWeatherContext);
  console.log(data);

  return (
    <Card direction="row" justifyContent="space-between" alignItems="center">
      <Stack spacing="16px">
        <Location />
        <Date />
        <Temperature />
      </Stack>
      <Stack alignItems="end" justifyContent="center" spacing="10px">
        <img src="/some_cloud.png" alt="weather image" width="155px" />
        <Stack justifyContent="start" alignItems="center" spacing="8px">
          <StatusText>Cloudy</StatusText>
          <FeelsLikeText>Feels Like 26</FeelsLikeText>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CurrentWeather;
