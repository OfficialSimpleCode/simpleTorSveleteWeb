import { Duration } from "$lib/models/core/duration";

export function durationStrikings(
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

export function addDuration(date: Date, duration: Duration): Date {
  return new Date(date.getTime() + duration.inMilliseconds);
}

export function subDuration(date: Date, duration: Duration): Date {
  return new Date(date.getTime() - duration.inMilliseconds);
}

export function diffDuration(date1: Date, date2: Date): Duration {
  return new Duration({
    milliseconds: new Date(date1.getTime() - date2.getTime()).getTime(),
  });
}
