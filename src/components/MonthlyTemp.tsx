import type React from 'react';
import WeatherSkeleten from './WeatherSkeleten';

export const MonthlyTemp: React.FC = () => {
  return (
    <WeatherSkeleten
      animation="wave"
      variant="rounded"
      sx={{ gridArea: 'monthlyTemp' }}
      height={234}
    />
  );
};

export default MonthlyTemp;
