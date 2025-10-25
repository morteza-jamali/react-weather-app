export type Langs = 'fa' | 'en';

export type WmoCodesType = Readonly<
  Record<
    number,
    Readonly<{
      name: string;
      image: string | Record<'day' | 'night', string>;
    }>
  >
>;

export type CurrentWeaklyDataType = Readonly<{
  current: Readonly<{
    is_day: 0 | 1;
    time: string;
  }> &
    Record<'apparent_temperature' | 'temperature_2m' | 'weather_code', number>;
  daily: Readonly<Record<'time', string[]>> &
    Record<
      | 'weather_code'
      | 'temperature_2m_max'
      | 'temperature_2m_mean'
      | 'temperature_2m_min',
      number[]
    >;
}>;

export type MonthlyMeanTempType = Readonly<{
  time: string[];
  temperature_2m_mean: number[];
}>;

export type PlaceType = Readonly<
  Record<'admin1' | 'country' | 'name', string> &
    Record<'latitude' | 'longitude', number> & {
      admin2?: string;
    }
>;
