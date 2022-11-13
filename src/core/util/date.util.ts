export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;

export class DateUtil {
  public static isValid(str: string): boolean {
    return /\d{3}-[0-1]\d-[0-3]\d/g.test(str);
  }

  public static format(date: Date): string {
    const day = `${date.getDate()}`;
    const month = `${date.getMonth() + 1}`;

    return `${date.getFullYear()}-${month.padStart(2, '0')}-${day.padStart(
      2,
      '0',
    )}`;
  }

  public static humanDay(locale: string, date: string): string {
    return new Date(date).toLocaleString(locale, {
      month: 'long',
      day: 'numeric',
    });
  }
}

const months_nl = [
  'januari',
  'februari',
  'maart',
  'april',
  'mei',
  'juni',
  'juli',
  'augustus',
  'september',
  'oktober',
  'november',
  'december',
];

const months_en = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getMonthName = (month: number, language: 'en' | 'nl'): string => {
  if (language === 'nl') {
    return months_nl[month];
  }
  return months_en[month];
};
