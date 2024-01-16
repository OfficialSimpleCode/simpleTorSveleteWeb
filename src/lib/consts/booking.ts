// Enum for BookingStatuses
enum BookingStatuses {
    waiting = "waiting",
    approved = "approved",
  }
  
  // Map for BookingStatuses
  const bookingsMassage: { [key in BookingStatuses]: string } = {
    [BookingStatuses.waiting]: "waiting",
    [BookingStatuses.approved]: "approved",
  };
  
  // Map for BookingStatuses keys
  const bookingsMassageKeys: { [key: string]: BookingStatuses } = {
    "waiting": BookingStatuses.waiting,
    "approved": BookingStatuses.approved,
  };
  
  // Enum for OrderingOptions
  enum OrderingOptions {
    app = "app",
    web = "web",
    byWorker = "byWorker",
  }
  
  // Map for OrderingOptions to string
  const orderingOptionsToStr: { [key in OrderingOptions]: string } = {
    [OrderingOptions.app]: "app",
    [OrderingOptions.web]: "web",
    [OrderingOptions.byWorker]: "byWorker",
  };
  
  // Map for string to OrderingOptions
  const orderingOptionsFromStr: { [key: string]: OrderingOptions } = {
    "app": OrderingOptions.app,
    "web": OrderingOptions.web,
    "byWorker": OrderingOptions.byWorker,
  };
  
  // Map for OrderingOptions colors
  const orderingOptionsColors: { [key in OrderingOptions]: string } = {
    [OrderingOptions.app]: "blue",
    [OrderingOptions.web]: "orange",
    [OrderingOptions.byWorker]: "green",
  };
  
  // Constant for confirmation reminder message ID key
  const confirmationReminderMessgaeIdKey = "__CAR";
  
  // Enum for BookingReminderType
  enum BookingReminderType {
    regular = "regular",
    confirmArrival = "confirmArrival",
  }
  
  // Map for BookingReminderType to string
  const bookingReminderTypeToStr: { [key in BookingReminderType]: string } = {
    [BookingReminderType.regular]: "regular",
    [BookingReminderType.confirmArrival]: "confirmArrival",
  };
  
  // Map for string to BookingReminderType
  const bookingReminderTypeFromStr: { [key: string]: BookingReminderType } = {
    "regular": BookingReminderType.regular,
    "confirmArrival": BookingReminderType.confirmArrival,
  };
  
  // Map for BookingReminderType to icon
  const bookingReminderTypeToIcon: { [key in BookingReminderType]: string } = {
    [BookingReminderType.regular]: "notification_important_rounded",
    [BookingReminderType.confirmArrival]: "check_circle_rounded",
  };
  
  // Enum for NotificationType
  enum NotificationType {
    message = "message",
    push = "push",
    none = "none",
    whatsapp = "whatsapp",
  }
  
  // Map for NotificationType to string
  const notificationTypeToStr: { [key in NotificationType]: string } = {
    [NotificationType.message]: "message",
    [NotificationType.push]: "push",
    [NotificationType.none]: "none",
    [NotificationType.whatsapp]: "whatsapp",
  };
  
  // Map for string to NotificationType
  const notificationTypeFromStr: { [key: string]: NotificationType } = {
    "message": NotificationType.message,
    "push": NotificationType.push,
    "whatsapp": NotificationType.whatsapp,
    "none": NotificationType.none,
  };
  
  // Constants
  const needToRemindAnyWayDuration = { hours: 3 };
  
  const durationToUpdateBooking = { days: 7 };
  
  // Example Booking
  const exampleBooking = {
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
  