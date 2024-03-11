import { Duration } from "$lib/models/core/duration";

// Enum for BookingStatuses
export enum BookingStatuses {
  waiting = "waiting",
  approved = "approved",
}

// Map for BookingStatuses
export const bookingsMassage: { [key in BookingStatuses]: string } = {
  [BookingStatuses.waiting]: "waiting",
  [BookingStatuses.approved]: "approved",
};

// Map for BookingStatuses keys
export const bookingsMassageKeys: { [key: string]: BookingStatuses } = {
  ["waiting"]: BookingStatuses.waiting,
  ["approved"]: BookingStatuses.approved,
};

// Enum for OrderingOptions
export enum OrderingOptions {
  app = "app",
  web = "web",
  byWorker = "byWorker",
}

// Map for OrderingOptions to string
export const orderingOptionsToStr: { [key in OrderingOptions]: string } = {
  [OrderingOptions.app]: "app",
  [OrderingOptions.web]: "web",
  [OrderingOptions.byWorker]: "byWorker",
};

// Map for string to OrderingOptions
export const orderingOptionsFromStr: { [key: string]: OrderingOptions } = {
  app: OrderingOptions.app,
  web: OrderingOptions.web,
  byWorker: OrderingOptions.byWorker,
};

// Map for OrderingOptions colors
export const orderingOptionsColors: { [key in OrderingOptions]: string } = {
  [OrderingOptions.app]: "blue",
  [OrderingOptions.web]: "orange",
  [OrderingOptions.byWorker]: "green",
};

// Constant for confirmation reminder message ID key
export const confirmationReminderMessgaeIdKey = "__CAR";

// Enum for BookingReminderType
export enum BookingReminderType {
  regular = "regular",
  confirmArrival = "confirmArrival",
}

// Map for BookingReminderType to string
export const bookingReminderTypeToStr: {
  [key in BookingReminderType]: string;
} = {
  [BookingReminderType.regular]: "regular",
  [BookingReminderType.confirmArrival]: "confirmArrival",
};

// Map for string to BookingReminderType
export const bookingReminderTypeFromStr: {
  [key: string]: BookingReminderType;
} = {
  regular: BookingReminderType.regular,
  confirmArrival: BookingReminderType.confirmArrival,
};

// Map for BookingReminderType to icon
export const bookingReminderTypeToIcon: {
  [key in BookingReminderType]: string;
} = {
  [BookingReminderType.regular]: "notification_important_rounded",
  [BookingReminderType.confirmArrival]: "check_circle_rounded",
};

// Enum for NotificationType
export enum NotificationType {
  message,
  push,
  none,
  whatsapp,
}

// Map for NotificationType to string
export const notificationTypeToStr: { [key in NotificationType]: string } = {
  [NotificationType.message]: "message",
  [NotificationType.push]: "push",
  [NotificationType.none]: "none",
  [NotificationType.whatsapp]: "whatsapp",
};

// Map for string to NotificationType
export const notificationTypeFromStr: { [key: string]: NotificationType } = {
  ["message"]: NotificationType.message,
  ["push"]: NotificationType.push,
  ["whatsapp"]: NotificationType.whatsapp,
  ["none"]: NotificationType.none,
};

// Constants
export const needToRemindAnyWayDuration = new Duration({ hours: 3 });

export const durationToUpdateBooking = new Duration({ days: 7 });

// Example Booking
export const exampleBooking = {
  debts: {},
  userFcms: {},
  bookingId: "bookingExample",
  workerGender: "male",
  workerId: "workerExample",
  workerName: "workerExample",
  buisnessId: "businessExample",
  businessName: "businessExample",
  bookingDate: new Date(), // replace with your date
  treatments: { "0": "treatmentExample" },
};

export const payemntProcessDuration = new Duration({ minutes: 5 });

export enum DeleteOption {
  deleteAllEvents,
  deleteCurrentAndFuture,
  deleteSpesific,
  needConfirmation,
  deleteOnlyThisTreatment,
}
