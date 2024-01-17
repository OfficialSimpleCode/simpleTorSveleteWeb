interface TimeSegment {
  start: Date;
  duration: Duration;
}

interface TreatmentTimeData {
  breakMinutes: number;
  workMinutes: number;
}

interface TimeData {
  start: Date;
  duration: { minutes: number };
}

interface TimeSegmentsMap {
  [key: string]: TimeData;
}
