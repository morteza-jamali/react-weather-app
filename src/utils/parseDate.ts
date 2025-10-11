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
  const monthday = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
  }).format(object);
  const month = new Intl.DateTimeFormat(locale, { month: monthLong }).format(
    object,
  );
  const monthNumber = new Intl.DateTimeFormat(locale, {
    month: 'numeric',
  }).format(object);
  const year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(
    object,
  );
  const hours = object.getHours();
  const time = `${hours}:${object.getMinutes()}`;
  let timeName;

  if (lang === 'en') {
    timeName = hours >= 12 ? 'PM' : 'AM';
  }

  if (lang === 'fa') {
    // TODO: Improve this line
    timeName = hours >= 12 ? 'بعد از ظهر' : 'قبل از ظهر';
  }

  return { weekday, monthday, month, year, time, timeName, monthNumber };
};

export default parseDate;
