enum BuisnessLimitations {
  bookingCount,
  changingPhotos,
  storyPhotos,
  products,
  workers,
  expiredDataDeleteHeighsetDays,
  expiredDataDeleteLowestDays,
  clientPerWorker,
  workerDataBackInDays,
  themes,
}

const limitationToStr: Record<BuisnessLimitations, string> = {
  [BuisnessLimitations.bookingCount]: "bookingCount",
  [BuisnessLimitations.changingPhotos]: "changingPhotos",
  [BuisnessLimitations.storyPhotos]: "storyPhotos",
  [BuisnessLimitations.products]: "products",
  [BuisnessLimitations.expiredDataDeleteHeighsetDays]:
    "expiredDataDeleteHeighsetDays",
  [BuisnessLimitations.expiredDataDeleteLowestDays]:
    "expiredDataDeleteLowestDays",
  [BuisnessLimitations.clientPerWorker]: "clientPerWorker",
  [BuisnessLimitations.workerDataBackInDays]: "workerDataBackInDays",
  [BuisnessLimitations.themes]: "themes",
};

const limitationFromStr: Record<string, BuisnessLimitations> = {
  expiredDataDeleteLowestDays: BuisnessLimitations.expiredDataDeleteLowestDays,
  expiredDataDeleteHeighsetDays:
    BuisnessLimitations.expiredDataDeleteHeighsetDays,
  bookingCount: BuisnessLimitations.bookingCount,
  changingPhotos: BuisnessLimitations.changingPhotos,
  storyPhotos: BuisnessLimitations.storyPhotos,
  products: BuisnessLimitations.products,
  clientPerWorker: BuisnessLimitations.clientPerWorker,
  workerDataBackInDays: BuisnessLimitations.workerDataBackInDays,
  themes: BuisnessLimitations.themes,
};

// changed by the remote config during runtime

type SubTypeLimits = Record<BuisnessLimitations, number>;

const appLimits: Record<SubType, SubTypeLimits> = {
  [SubType.basic]: {
    [BuisnessLimitations.changingPhotos]: 1,
    [BuisnessLimitations.products]: 0,
    [BuisnessLimitations.storyPhotos]: 3,
  },
  [SubType.landingPage]: {
    [BuisnessLimitations.changingPhotos]: 3,
    [BuisnessLimitations.products]: 3,
    [BuisnessLimitations.storyPhotos]: 4,
  },
  [SubType.advanced]: {
    [BuisnessLimitations.changingPhotos]: 3,
    [BuisnessLimitations.products]: 4,
    [BuisnessLimitations.storyPhotos]: 5,
  },
  [SubType.trial]: {
    [BuisnessLimitations.changingPhotos]: 2,
    [BuisnessLimitations.products]: 1,
    [BuisnessLimitations.storyPhotos]: 2,
  },
  [SubType.golden]: {
    [BuisnessLimitations.changingPhotos]: 3,
    [BuisnessLimitations.products]: 4,
    [BuisnessLimitations.storyPhotos]: 5,
  },
};

// features advanced business get and basic not
const advanceOrHigherSettings: string[] = [
  "upcomingOrder",
  "notifyOnNewCustomer",
  "updates",
  "clientsNotifications",
  "getNotifyOnWaitingList",
  "upcomingCancel",
  "clientMessageoOnOrder",
  "clientMessageoOnCancel",
  "notifyOnOrderNearDeadline",
  "notifyOnCancelNearDeadline",
];

// features landing page cannot access
const landingPageSubRestrictions: string[] = [
  "availability",
  "work",
  "acceptPayments",
  "myWorkers",
  "acceptPayments",
  "blockUsers",
  "upcomingCancel",
  "getNotifyWhenBooking",
  "getNotifyOnWaitingList",
  "notifyOnOrderNearDeadline",
  "notifyOnCancelNearDeadline",
];

enum SubType {
  basic,
  advanced,
  trial,
  landingPage,
  golden,
}

const subTypeToStr: Record<SubType, string> = {
  [SubType.basic]: "Basic",
  [SubType.advanced]: "Premium",
  [SubType.trial]: "Trial",
  [SubType.landingPage]: "Landing Page",
  [SubType.golden]: "Golden",
};

const subTypeFromStr: Record<string, SubType> = {
  ["Basic"]: SubType.basic,
  ["Premium"]: SubType.advanced,
  ["Trial"]: SubType.trial,
  ["Landing Page"]: SubType.landingPage,
  ["Golden"]: SubType.golden,
};

// optional levels of the business
const subsLevels: Record<SubType, number> = {
  [SubType.golden]: 5,
  [SubType.advanced]: 4,
  [SubType.basic]: 3,
  [SubType.landingPage]: 2,
  [SubType.trial]: 1,
};
