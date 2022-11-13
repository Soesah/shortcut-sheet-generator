import { StringUtil } from './string.util';
import { MINUTES_IN_HOUR, HOURS_IN_DAY } from './date.util';

export class TimeUtil {
  public static format(str: string): string {
    const minutes = this.getMinutes(str);
    const hours = this.getHours(str);

    return `${hours}:${StringUtil.leadingZero(minutes)}`;
  }

  public static getHours(time: string): number {
    if (!this.isValidTime(time)) {
      throw new Error('Invalid time string: ' + time);
    }
    return parseInt(time.substr(0, time.indexOf(':')), 10);
  }

  public static getMinutes(time: string): number {
    if (!this.isValidTime(time)) {
      throw new Error('Invalid time string: ' + time);
    }
    return parseInt(time.substr(time.indexOf(':') + 1), 10);
  }

  public static isValidTime(time: string) {
    return /^([\d]?[\d]?[\d]|2[0-3]):?[0-5][\d]$/g.test(time);
  }

  public static diff(start: string, end: string) {
    let minDiff = this.getMinutes(end) - this.getMinutes(start);
    let hourDiff = this.getHours(end) - this.getHours(start);

    if (minDiff < 0) {
      minDiff = MINUTES_IN_HOUR + minDiff;
      hourDiff = hourDiff - 1;
    }
    if (hourDiff < 0) {
      hourDiff = HOURS_IN_DAY + hourDiff;
    }
    return this.format(`${hourDiff}:${StringUtil.leadingZero(minDiff)}`);
  }

  public static minutesToTime(minutes: number): string {
    return this.format(
      `${Math.floor(minutes / MINUTES_IN_HOUR)}:${StringUtil.leadingZero(
        minutes % MINUTES_IN_HOUR,
      )}`,
    );
  }

  public static minutesToTimeSimple(minutes: number): string {
    return `${Math.floor(minutes / MINUTES_IN_HOUR)}:${StringUtil.leadingZero(
      minutes % MINUTES_IN_HOUR,
    )}`;
  }

  public static timeToMinutes(time: string): number {
    const minutes = this.getMinutes(time);
    const hours = this.getHours(time);

    return hours * MINUTES_IN_HOUR + minutes;
  }

  public static timeToDecimal(time: string): number {
    const [hours, minutes] = time.split(':');
    const hoursNr = parseInt(hours, 10);
    const minutesNr = ((parseInt(minutes, 10) / 60) * 100) / 100;

    return Math.round((hoursNr + minutesNr) * 100) / 100;
  }

  public static decimalToMinutes(dec: number): number {
    return Math.ceil(dec * 60);
  }

  public static decimalToTime(dec: number): string {
    const minutes = this.decimalToMinutes(dec);
    return this.minutesToTime(minutes);
  }
}
