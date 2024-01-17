export enum Religion {
  muslim,
  christian,
  jewish,
}

export const religionToStr: Record<Religion, string> = {
  [Religion.muslim]: "muslim",
  [Religion.christian]: "christian",
  [Religion.jewish]: "jewish",
};

export const religionFromStr: Record<string, Religion> = {
  muslim: Religion.muslim,
  christian: Religion.christian,
  jewish: Religion.jewish,
};

export const holidays: Record<Religion, Record<string, string>> = {
  [Religion.christian]: {
    "01-01-0000": "New Year's Day",
    "16-01-0000": "Martin Luther King Jr. Day",
    "20-02-0000": "Presidents' Day",
    "29-05-0000": "Memorial Day",
    "19-06-0000": "Juneteenth",
    "04-07-0000": "Independence Day",
    "04-09-0000": "Labor Day",
    "09-10-0000": "Columbus Day",
    "11-11-0000": "Veterans Day",
    "23-11-0000": "Thanksgiving Day",
    "25-12-0000": "Christmas Day",
  },
  [Religion.jewish]: {
    "06-04-2023": "Passover (Day 1)",
    "12-04-2023": "Passover (Day 7)",
    "26-04-2023": "Yom HaAtzmaut",
    "26-05-2023": "Shavuot",
    "16-09-2023": "Rosh Hashana",
    "17-09-2023": "Rosh Hashana (Day 2)",
    "25-09-2023": "Yom Kippur",
    "30-09-2023": "Sukkot",
    "07-10-2023": "Simchat Torah",
    "23-04-2024": "Passover (Day 1)",
    "29-04-2024": "Passover (Day 7)",
    "14-05-2024": "Yom HaAtzmaut",
    "12-06-2024": "Shavuot",
    "03-10-2024": "Rosh Hashana",
    "04-10-2024": "Rosh Hashana (Day 2)",
    "12-10-2024": "Yom Kippur",
    "17-10-2024": "Sukkot",
    "24-10-2024": "Simchat Torah",
    "13-04-2025": "Passover (Day 1)",
    "19-04-2025": "Passover (Day 7)",
    "01-05-2025": "Yom HaAtzmaut",
    "02-06-2025": "Shavuot",
    "23-09-2025": "Rosh Hashana",
    "24-09-2025": "Rosh Hashana (Day 2)",
    "02-10-2025": "Yom Kippur",
    "07-10-2025": "Sukkot",
    "14-10-2025": "Simchat Torah",
  },
};

export const sceduleColors = [
  "pink",
  "purple",
  "yellow",
  "brown",
  "blueGrey",
  "cyanAccent",
  "deepOrange",
  "lightGreen",
  "rgba(33, 150, 243, 1)",
];

export const weekDays = [
  "",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export enum EventTyps {
  block,
  freeTime,
}

export enum EventFilterType {
  onHold,
  needCancel,
  waitingList,
  withDebts,
  withOutRecipts,
  withOnlinePayment,
  withoutConfirmArrival,
}

export const eventFilterTypeToStr: Record<EventFilterType, string> = {
  [EventFilterType.onHold]: "waitingsForApproval",
  [EventFilterType.needCancel]: "waitingsForCancel",
  [EventFilterType.waitingList]: "waitingList",
  [EventFilterType.withOutRecipts]: "withOutRecipts",
  [EventFilterType.withDebts]: "withDebts",
  [EventFilterType.withOnlinePayment]: "withOnlinePayment",
  [EventFilterType.withoutConfirmArrival]: "withoutConfirmArrival",
};

export const eventFilterTypeToIcon: Record<EventFilterType, string> = {
  [EventFilterType.onHold]: "timelapse",
  [EventFilterType.needCancel]: "dangerous",
  [EventFilterType.waitingList]: "coffee",
  [EventFilterType.withOutRecipts]: "receipt",
  [EventFilterType.withDebts]: "attach_money",
  [EventFilterType.withOnlinePayment]: "payment",
  [EventFilterType.withoutConfirmArrival]: "check_circle",
};

export const eventFilterWithCountersTypeToStr: Record<EventFilterType, string> =
  {
    [EventFilterType.onHold]: "waitingsForApproval",
    [EventFilterType.needCancel]: "waitingsForCancel",
    [EventFilterType.waitingList]: "waitingList",
    [EventFilterType.withDebts]: "withDebts",
  };

export const typesNeedRecurrence = new Set([
  EventFilterType.withOutRecipts,
  EventFilterType.withoutConfirmArrival,
]);
