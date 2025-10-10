import type React from 'react';
import WeatherSkeleten from './WeatherSkeleten';
import { calMonthlyMeanTemp, type MonthlyMeanTempType } from '../utils';
import axios from 'axios';
import { Suspense, use, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { LocationContext } from '../contexts';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTranslation } from 'react-i18next';
import { chartsGridClasses, ChartsText } from '@mui/x-charts';
import { Stack } from '@mui/material';

interface DataType {
  daily: MonthlyMeanTempType;
}

const ChartLineGradient: React.FC = () => {
  return (
    <>
      <defs>
        <linearGradient id="area_gradient" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4CDFE8" stopOpacity="0.05" />
          <stop offset="1" stopColor="#7947F7" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <defs>
        <linearGradient id="line_gradient" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4CDFE8" stopOpacity="100" />
          <stop offset="1" stopColor="#7947F7" stopOpacity="100" />
        </linearGradient>
      </defs>
    </>
  );
};

const Card = styled(Stack)(({ theme }) => [
  {
    backgroundColor: 'var(--bg-color-2)',
    boxShadow: 'var(--box-shadow-1)',
    borderRadius: '24px',
    padding: '20px 16px 0 16px',
    gridArea: 'monthlyTemp',
  },
  theme.applyStyles('dark', {
    backgroundColor: 'var(--bg-color-1)',
  }),
]);

const Title = styled('span')(({ theme }) => [
  {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '23px',
    color: '#1B2767',
  },
  theme.applyStyles('dark', {
    color: 'var(--text-color-2)',
  }),
]);

const LazyLoad: React.FC<{ requestPromise: Promise<any> }> = ({
  requestPromise,
}) => {
  const data = use(requestPromise).data as DataType;
  const { t, i18n } = useTranslation();
  const { enMonths, faMonths, monthsTemp } = calMonthlyMeanTemp(data.daily);
  const gap = 0;

  return (
    <Card height="234px" justifyContent="center" spacing={`${gap}px`}>
      <Title>{t('Average Monthly Temprature')}</Title>
      <LineChart
        xAxis={[
          {
            scaleType: 'point',
            data: i18n.language === 'en' ? enMonths : faMonths,
          },
        ]}
        yAxis={[
          {
            tickMaxStep: 10,
            position: i18n.language === 'fa' ? 'right' : 'left',
          },
        ]}
        series={[
          {
            data: monthsTemp,
            showMark: false,
            curve: 'linear',
            area: true,
          },
        ]}
        grid={{ horizontal: true }}
        sx={[
          () => ({
            [`& .${chartsGridClasses.line}`]: {
              strokeDasharray: '5 3',
              strokeWidth: 1,
              stroke: '#AFBCC4',
            },
            '.MuiAreaElement-root': {
              fill: 'url(#area_gradient)',
            },
            '.MuiLineElement-root': {
              stroke: 'url(#line_gradient)',
            },
            '.MuiChartsAxis-tickLabel': {
              fontWeight: '500 !important',
              fontSize: '10px !important',
              lineHeight: '16px !important',
              fill: '#000000 !important',
              ...(i18n.language === 'fa'
                ? { fontFamily: '"IRANYekanX VF" !important' }
                : {}),
            },
            '.MuiChartsAxis-directionX': {
              transform: `translateY(calc(125px - ${gap}px))`,
            },
            '& > svg': {
              height: `calc(80% - ${gap}px)`,
            },
          }),
          (theme) =>
            theme.applyStyles('dark', {
              '.MuiChartsAxis-tickLabel': {
                fill: 'var(--text-color-2) !important',
              },
            }),
        ]}
        slots={{
          axisLine: () => null,
          axisTick: () => null,
          axisTickLabel: ({ text, ...props }) => (
            <ChartsText
              {...props}
              text={isNaN(parseFloat(text)) ? text : `${text}°C`}
            />
          ),
        }}
      >
        <ChartLineGradient />
      </LineChart>
    </Card>
  );
};

const Loading: React.FC = () => (
  <WeatherSkeleten
    animation="wave"
    variant="rounded"
    sx={{ gridArea: 'monthlyTemp' }}
    height={234}
  />
);

export const MonthlyTemp: React.FC = () => {
  const [location, _] = useContext(LocationContext);

  if (!location) {
    return null;
  }

  const oneMonthBefore = new Date();
  oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
  const lastDayOfMonth = new Date(
    oneMonthBefore.getFullYear(),
    oneMonthBefore.getMonth() + 1,
    0,
  ).getDate();
  const month = oneMonthBefore.getMonth() + 1;
  const endDate = `${oneMonthBefore.getFullYear()}-${month < 10 ? `0${month}` : month}-${lastDayOfMonth < 10 ? `0${lastDayOfMonth}` : lastDayOfMonth}`;

  const elevenMonthBefore = new Date(endDate);
  elevenMonthBefore.setMonth(elevenMonthBefore.getMonth() - 11);
  const _month = elevenMonthBefore.getMonth() + 1;
  const startDate = `${elevenMonthBefore.getFullYear()}-${_month < 10 ? `0${_month}` : _month}-01`;

  const requestPromise = axios.get(
    `https://archive-api.open-meteo.com/v1/archive?latitude=${location.latitude}&longitude=${location.longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean&timezone=auto`,
  );

  return (
    <Suspense fallback={<Loading />}>
      <LazyLoad {...{ requestPromise }} />
    </Suspense>
  );
};

export default MonthlyTemp;
