import type { Langs } from '../types';

export const parseDate = (
  date: string | Date,
  lang: Langs = 'en',
  monthLong: 'short' | 'long' = 'short',
) => {
  const object = typeof date === 'string' ? new Date(date) : date;
  const locale = lang === 'en' ? 'en-US' : 'fa-IR-u-nu-latn';
  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
  }).format(object);
  const monthday = parseInt(
    new Intl.DateTimeFormat(locale, {
      day: 'numeric',
    }).format(object),
  );
  const month = new Intl.DateTimeFormat(locale, { month: monthLong }).format(
    object,
  );
  const monthNumber = parseInt(
    new Intl.DateTimeFormat(locale, {
      month: 'numeric',
    }).format(object),
  );
  const year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(
    object,
  );
  const hours = object.getHours();
  const minutes = object.getMinutes();
  const time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  let timeName;

  if (lang === 'en') {
    timeName = hours >= 12 ? 'PM' : 'AM';
  }

  if (lang === 'fa') {
    // TODO: Improve this line
    timeName = hours >= 12 ? 'بعد از ظهر' : 'قبل از ظهر';
  }

  return {
    weekday,
    monthday: monthday < 10 ? `0${monthday}` : monthday.toString(),
    month,
    year,
    time,
    timeName,
    monthNumber: monthNumber < 10 ? `0${monthNumber}` : monthNumber.toString(),
  };
};

export default parseDate;
