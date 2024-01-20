export class Duration {
  static readonly microsecondsPerMillisecond: number = 1000;
  static readonly millisecondsPerSecond: number = 1000;
  static readonly secondsPerMinute: number = 60;
  static readonly minutesPerHour: number = 60;
  static readonly hoursPerDay: number = 24;
  static readonly microsecondsPerSecond: number =
    Duration.microsecondsPerMillisecond * Duration.millisecondsPerSecond;
  static readonly microsecondsPerMinute: number =
    Duration.microsecondsPerSecond * Duration.secondsPerMinute;
  static readonly microsecondsPerHour: number =
    Duration.microsecondsPerMinute * Duration.minutesPerHour;
  static readonly microsecondsPerDay: number =
    Duration.microsecondsPerHour * Duration.hoursPerDay;
  static readonly millisecondsPerMinute: number =
    Duration.millisecondsPerSecond * Duration.secondsPerMinute;
  static readonly millisecondsPerHour: number =
    Duration.millisecondsPerMinute * Duration.minutesPerHour;
  static readonly millisecondsPerDay: number =
    Duration.millisecondsPerHour * Duration.hoursPerDay;
  static readonly secondsPerHour: number =
    Duration.secondsPerMinute * Duration.minutesPerHour;
  static readonly secondsPerDay: number =
    Duration.secondsPerHour * Duration.hoursPerDay;
  static readonly minutesPerDay: number =
    Duration.minutesPerHour * Duration.hoursPerDay;
  static readonly zero: Duration = new Duration({ seconds: 0 });
  private readonly _duration: number;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  milliseconds: number = 0;
  microseconds: number = 0;

  constructor({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    microseconds = 0,
  }: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    microseconds?: number;
  }) {
    this._duration =
      microseconds +
      Duration.microsecondsPerMillisecond * milliseconds +
      Duration.microsecondsPerSecond * seconds +
      Duration.microsecondsPerMinute * minutes +
      Duration.microsecondsPerHour * hours +
      Duration.microsecondsPerDay * days;
  }

  private static _microseconds(duration: number): Duration {
    return new Duration({ microseconds: duration });
  }

  public add(other: Duration): Duration {
    return Duration._microseconds(this._duration + other._duration);
  }

  public subtract(other: Duration): Duration {
    return Duration._microseconds(this._duration - other._duration);
  }

  public multiply(factor: number): Duration {
    return Duration._microseconds(Math.round(this._duration * factor));
  }

  public divide(quotient: number): Duration {
    if (quotient === 0) throw new Error("IntegerDivisionByZeroException");
    return Duration._microseconds(Math.floor(this._duration / quotient));
  }

  public lessThan(other: Duration): boolean {
    return this._duration < other._duration;
  }

  public greaterThan(other: Duration): boolean {
    return this._duration > other._duration;
  }

  public lessThanOrEqual(other: Duration): boolean {
    return this._duration <= other._duration;
  }

  public greaterThanOrEqual(other: Duration): boolean {
    return this._duration >= other._duration;
  }

  public get inDays(): number {
    return Math.floor(this._duration / Duration.microsecondsPerDay);
  }

  public get inHours(): number {
    return Math.floor(this._duration / Duration.microsecondsPerHour);
  }

  public get inMinutes(): number {
    return Math.floor(this._duration / Duration.microsecondsPerMinute);
  }

  public get inSeconds(): number {
    return Math.floor(this._duration / Duration.microsecondsPerSecond);
  }

  public get inMilliseconds(): number {
    return Math.floor(this._duration);
  }

  public get inMicroseconds(): number {
    return this._duration;
  }

  public equals(other: any): boolean {
    return other instanceof Duration && this._duration === other.inMicroseconds;
  }

  public compareTo(other: Duration): number {
    return this._duration - other._duration;
  }
}
