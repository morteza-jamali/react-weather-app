import useDate from './useDate';

export interface MonthlyMeanTempType {
  time: string[];
  temperature_2m_mean: number[];
}

export const calMonthlyMeanTemp = (data: MonthlyMeanTempType) => {
  const monthsData: { [key: number]: number[] | number } = {};
  const months: string[] = [];
  const monthsTemp: number[] = [];

  data.time.forEach((t, index) => {
    const month = new Date(t).getMonth() + 1;

    !months.includes(month.toString()) && months.push(month.toString());
    !(month in monthsData) && (monthsData[month] = []);

    (monthsData[month] as number[]).push(data.temperature_2m_mean[index]);
  });

  for (const month in monthsData) {
    monthsData[month] = parseFloat(
      (
        (monthsData[month] as number[]).reduce((a, b) => a + b) /
        (monthsData[month] as number[]).length
      ).toFixed(1),
    );
  }

  months.forEach((month) =>
    monthsTemp.push(monthsData[parseInt(month)] as number),
  );

  const faMonths: string[] = [];
  months.forEach((month, index) => {
    months[index] = useDate(`2025-${month}-01`).month;
    faMonths.push(useDate(`2025-${month}-01`, 'fa').month);
  });

  return { faMonths, enMonths: months, monthsTemp };
};

export default calMonthlyMeanTemp;
