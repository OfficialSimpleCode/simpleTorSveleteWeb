/// This file is saving the export const firebase db
/// Example: save the endpoints of collections, docs , env

// envs
export const productionKey = "production";
export const devKey = "dev";
export const shiloDevKey = "shilo_dev";
export const envKey = `enviroments/${productionKey}`;

// fireStore collections
export const usersCollection = "Users";
export const notLogedInUsersCollection = "NotLogedInUsers";

export const bookingsObjectsCollection = "BookingsObjects";

export const notifcationsCollection = "Notifications";
export const errorsCollection = "Errors";
export const helpersCollection = "Helpers";
export const waitingListCollection = "WaitingLists";
export const dataCollection = "PublicData";
export const workersCollection = "Workers";
export const invoicesCollection = "Invoices";
export const paymentRequestColletion = "PaymentRequests";
export const paymentsCollection = "Payments";
export const bookingsCollection = "Bookings";
export const onlinePaymentsCollection = "OnlinePayments";
export const phonesCollection = "PhonesMap";
export const phoneDataCollections = "collections";

export const secretsCollection = "Secrets";
export const bookingsCyollection = "Bookings";
export const buisnessCollection = "Businesses";
export const paymentsRequestsPreviewsCollection = "PaymentsRequestsPreviews";

export const hypBusinessesCollection = "HypBusinesses";

export const reportsCollection = "Reports";

// fireStore docs
export const customersDataDoc = "customersData";
export const publicCustomersDataDoc = "publicCustomers";
export const invoicesDataDoc = "invoicesData";

export const clientsByPhoneDoc = "clients";
export const dataDoc = "publicData";
export const scheduleNotificationDoc = "scheduleNotifications";
export const recurrenceEventsDoc = "recurrenceEvents";
export const recurrenceBookingsDoc = "recurrenceBookings";
export const multiEventsTimesDoc = "multiEventsTimes";
export const hypSecretsDoc = "hyp";
export const writeOnlyDoc = "writeOnly";
export const bookingsEventsDoc = "bookingsEvents";
export const bookingsEventsCollection = "BookingsEvents";
export const generalSettingsCollection = "generalSettings";
export const englishPurchasesDoc = "englishPurchases";
export const hebrewPurchasesDoc = "hebrewPurchases";
export const previewDoc = "preview";
export const pendingDoc = "pending";

// realTime db endpoints
export const likesCollection = "LikesCollection";
export const businessDataCollection = "BusinessData";
export const countersCollection = "Counters";

//encryption
export const passwordOnPhoneCollection = "sasimple";
export const addedKeyOnPhoneHash = "phone";

// storage endpoints
export const profilePhotosPath = "images/profiles";
export const changingImagesPath = "images/changingImages";
export const storyImagesPath = "images/stories";
export const productsImagesPath = "images/productsImages";
export const shopeIconsPath = "images/logos";
export const illegalFildsForDbFieldName = ["~*/[]."];
export const strToReplaceSlash = "^&8@^";
export const strToReplaceAsterisk = "^&9@^";

//--------------------------- db commands -------------------------------
export enum ArrayCommands {
  add,
  remove,
}

export enum NumericCommands {
  increment,
  decrement,
}

export enum QueryCommands {
  isEqualTo,
  isNotEqualTo,
  isLessThan,
  isLessThanOrEqualTo,
  isGreaterThan,
  isGreaterThanOrEqualTo,
  arrayContains,
  arrayContainsAny,
  whereIn,
  whereNotIn,
  isNull,
}
