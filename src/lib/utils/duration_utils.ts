import { Duration } from "$lib/models/core/duration";

function durationStrikings(
  start: Date,
  end: Date,
  startTime: Date,
  endTime: Date
): string {
  /* get time in 1970 format
   time should be either before or after - not in between */
  const bothBefore = startTime < start && !(endTime > start);
  const bothAfter = !(startTime < end) && endTime > end;
  if (bothBefore) return "BEFORE";
  if (bothAfter) return "AFTER";
  return "STRIKE";
}

function durationInClockFormat(
  duration: Duration,
  includeHours: boolean = true,
  includeSeconds: boolean = true
): string {
  const twoDigits = (n: number) => n.toString().padStart(2, "0");
  const twoDigitMinutes = twoDigits(duration.minutes % 60);
  const twoDigitSeconds = twoDigits(duration.seconds % 60);
  let time = `${twoDigitMinutes}:${twoDigitSeconds}`;
  if (!includeSeconds) {
    time = twoDigitMinutes;
  }
  if (includeHours) {
    time = `${twoDigits(Math.floor(duration.hours))}:${time}`;
  }
  return time;
}

export function addDuration(date: Date, duration: Duration): Date {
  return new Date(date.getTime() + duration.inMilliseconds);
}
