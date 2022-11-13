export class KeyUtil {
  /* eslint-disable no-unused-vars */
  // control
  public static TabKey = 9;
  public static EnterKey = 13;
  public static SpaceKey = 32;
  public static BackspaceKey = 8;
  public static DeleteKey = 46;
  public static EscapeKey = 27;

  public static ShiftKey = 16;
  public static CtrlKey = 17;
  public static AltKey = 18;
  public static CommandKey = 91;

  // arrow
  public static LeftKey = 37;
  public static UpKey = 38;
  public static RightKey = 39;
  public static DownKey = 40;

  // punctuation
  public static ColonKey = 186;
  public static CommaKey = 188;
  public static DotKey = 190;

  // number
  public static ZeroKey = 48;
  public static OneKey = 49;
  public static TwoKey = 50;
  public static ThreeKey = 51;
  public static FourKey = 52;
  public static FiveKey = 53;
  public static SixKey = 54;
  public static SevenKey = 55;
  public static EightKey = 56;
  public static NineKey = 57;

  public static ControlKeys = [
    KeyUtil.TabKey,
    KeyUtil.EnterKey,
    KeyUtil.EscapeKey,
    KeyUtil.ShiftKey,
    KeyUtil.CtrlKey,
    KeyUtil.AltKey,
    KeyUtil.CommandKey,
  ];

  public static ArrowKeys = Array.from(Array(4), (v, i) => i + 37);

  public static NumberKeys = Array.from(Array(10), (v, i) => i + 48);

  // uppercase and lowercase
  public static LetterKeys = Array.from(Array(26), (v, i) => i + 65).concat(
    Array.from(Array(26), (v, i) => i + 97),
  );

  public static isArrowKey(keyCode: number): boolean {
    return KeyUtil.ArrowKeys.includes(keyCode);
  }

  public static isNumberKey(keyCode: number): boolean {
    return KeyUtil.NumberKeys.includes(keyCode);
  }

  public static isLetterKey(keyCode: number): boolean {
    return KeyUtil.LetterKeys.includes(keyCode);
  }

  public static isAlphaNumericKey(keyCode: number): boolean {
    return (
      KeyUtil.ControlKeys.includes(keyCode) &&
      KeyUtil.ArrowKeys.includes(keyCode)
    );
  }

  public static isAllowedHoursKey(keyCode: number): boolean {
    return (
      KeyUtil.NumberKeys.includes(keyCode) ||
      KeyUtil.ArrowKeys.includes(keyCode) ||
      keyCode === KeyUtil.ColonKey ||
      keyCode === KeyUtil.DotKey ||
      keyCode === KeyUtil.EnterKey ||
      keyCode === KeyUtil.DeleteKey ||
      keyCode === KeyUtil.BackspaceKey ||
      keyCode === KeyUtil.TabKey
    );
  }
}
