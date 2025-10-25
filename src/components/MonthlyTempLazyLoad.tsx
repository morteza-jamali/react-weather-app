import { use } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { chartsGridClasses, ChartsText, LineChart } from '@mui/x-charts';
import { calMonthlyMeanTemp } from '../utils/calMonthlyMeanTemp';
import type { MonthlyMeanTempType } from '../types';

type DataType = Readonly<
  {
    daily: MonthlyMeanTempType;
  } & Record<'latitude' | 'longitude', number>
>;

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

export const MonthlyTempLazyLoad: React.FC<{
  requestPromise: Promise<any>;
}> = ({ requestPromise }) => {
  const { data } = use(requestPromise) as {
    data: DataType;
    isFromCache: boolean;
  };
  const { t, i18n } = useTranslation();
  let calculatedData: ReturnType<typeof calMonthlyMeanTemp> | null = null;
  const cacheKey = `${data.latitude}${data.longitude}`;
  const cacheData = localStorage.getItem(cacheKey);

  if (cacheData) {
    calculatedData = JSON.parse(cacheData);
  } else {
    calculatedData = calMonthlyMeanTemp(data.daily);
    localStorage.setItem(cacheKey, JSON.stringify(calculatedData));
  }

  const { enMonths, faMonths, monthsTemp } = calculatedData!;
  const mQMatch1 = useMediaQuery('(max-width: 1300px) and (min-width: 971px)');
  const mQMatch2 = useMediaQuery('(max-width: 660px)');
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
          axisTickLabel: ({ text, ...props }) => {
            const isXAxis = isNaN(parseFloat(text));

            return (
              <ChartsText
                {...props}
                text={isXAxis ? text : `${text}°C`}
                {...((mQMatch1 || mQMatch2) && isXAxis
                  ? {
                      style: {
                        transform: `rotate(${i18n.language === 'fa' ? '-' : ''}90deg)`,
                      },
                    }
                  : {})}
              />
            );
          },
        }}
      >
        <ChartLineGradient />
      </LineChart>
    </Card>
  );
};

export default MonthlyTempLazyLoad;
