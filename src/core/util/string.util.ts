const ALL_WHITESPACE = /[^\t\n\r ]/; // https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Whitespace_in_the_DOM

export class StringUtil {
  public static isWhitespace(str: string): boolean {
    return !ALL_WHITESPACE.test(str);
  }

  public static capitalize(str: string): string {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1),
    );
  }

  public static leadingZero(str: string | number, size: number = 2): string {
    return `${str}`.padStart(size, '0');
  }
}
