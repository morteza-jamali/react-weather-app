import type React from 'react';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import { CurrentWeaklyWeatherContext } from '../contexts';
import WmoCodes from '../wmo-codes.json';
import type { WmoCodesType } from './CurrentAndWeakly';
import { useTranslation } from 'react-i18next';
import { useDate } from '../utils';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const Card = styled(Stack)(({ theme }) => [
  {
    backgroundColor: 'var(--bg-color-2)',
    boxShadow: 'var(--box-shadow-1)',
    borderRadius: '24px',
    gridArea: '2weaksForecast',
    gridColumn: '1 / 2 span',
    paddingInlineStart: '25px',
  },
  theme.applyStyles('dark', {
    backgroundColor: 'var(--bg-color-1)',
  }),
]);

const Title = styled('span')(({ theme }) => [
  {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    color: 'var(--text-color-3)',
  },
  theme.applyStyles('dark', {
    color: 'var(--text-color-2)',
  }),
]);

const DayCardRoot = styled(Stack)(({ theme }) => [
  {
    width: '104px',
    height: '266px',
    backgroundColor: 'var(--bg-color-3)',
    borderRadius: '24px',
  },
  theme.applyStyles('dark', {
    backgroundColor: 'var(--bg-color-4)',
  }),
]);

const Slide = styled(SwiperSlide)({
  width: '104px !important',
});

const DayName = styled('span')(({ theme }) => [
  {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    color: 'var(--text-color-3)',
  },
  theme.applyStyles('dark', {
    color: 'var(--text-color-2)',
  }),
]);

const Temperature = styled('span')(({ theme }) => [
  {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: 'var(--text-color-3)',
  },
  theme.applyStyles('dark', {
    color: 'var(--text-color-2)',
  }),
]);

interface DayCardProps {
  temperature_2m_mean: number;
  time: string;
  weather_code: number;
  index: number;
}

const DayCard: React.FC<DayCardProps> = ({
  temperature_2m_mean,
  time,
  weather_code,
  index,
}) => {
  const { i18n, t } = useTranslation();
  const date = useDate(time, i18n.language as any);
  const weatherCodeData = (WmoCodes as WmoCodesType)[weather_code];
  const weatherStatusImg =
    typeof weatherCodeData.image === 'string'
      ? weatherCodeData.image
      : weatherCodeData.image['day'];

  return (
    <DayCardRoot justifyContent="center" alignItems="center" spacing="24px">
      <Stack alignItems="center" justifyContent="center" spacing="12px">
        <DayName>{index === 0 ? t('Today') : date.weekday}</DayName>
        <img src="/line.svg" />
      </Stack>
      <img src={`/wmo_images/${weatherStatusImg}`} height="51px" width="auto" />
      <Temperature>{temperature_2m_mean}°C</Temperature>
    </DayCardRoot>
  );
};

export const WeaklyWeather: React.FC = () => {
  const data = useContext(CurrentWeaklyWeatherContext);
  const { t } = useTranslation();

  return (
    <Card height={381} spacing="30px" justifyContent="center">
      <Title>{t('2 weeks Forecast')}</Title>
      <Stack direction="row" spacing="18px">
        <Swiper
          slidesPerView={11}
          spaceBetween="18px"
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
        >
          {data?.daily.time.map((t, index) => (
            <Slide key={`daycard-${index}`}>
              <DayCard
                time={t}
                temperature_2m_mean={data.daily.temperature_2m_mean[index]}
                weather_code={data.daily.weather_code[index]}
                {...{ index }}
              />
            </Slide>
          ))}
        </Swiper>
      </Stack>
    </Card>
  );
};

export default WeaklyWeather;
