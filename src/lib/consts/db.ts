/// This file is saving the const firebase db
/// Example: save the endpoints of collections, docs , env

// envs
const productionKey = 'production';
const devKey = 'dev';
const shiloDevKey = 'shilo_dev';
const envKey = `enviroments/${productionKey}`;

// fireStore collections
const usersCollection = "Users";
const notLogedInUsersCollection = "NotLogedInUsers";

const bookingsObjectsCollection = "BookingsObjects";

const notifcationsCollection = "Notifications";
const errorsCollection = "Errors";
const helpersCollection = "Helpers";
const waitingListCollection = "WaitingLists";
const dataCollection = "PublicData";
const workersCollection = "Workers";
const invoicesCollection = "Invoices";
const paymentRequestColletion = "PaymentRequests";
const paymentsCollection = "Payments";
const bookingsCollection = "Bookings";
const onlinePaymentsCollection = "OnlinePayments";
const phonesCollection = "Phones";
const phoneDataCollections = "collections";

const secretsCollection = "Secrets";
const bookingsCyollection = "Bookings";
const buisnessCollection = "Businesses";
const paymentsRequestsPreviewsCollection = "PaymentsRequestsPreviews";

const hypBusinessesCollection = "HypBusinesses";

const reportsCollection = "Reports";

// fireStore docs
const customersDataDoc = 'customersData';
const publicCustomersDataDoc = 'publicCustomersData';
const invoicesDataDoc = "invoicesData";

const clientsByPhoneDoc = "clients";
const dataDoc = "publicData";
const scheduleNotificationDoc = "scheduleNotifications";
const recurrenceEventsDoc = "recurrenceEvents";
const recurrenceBookingsDoc = "recurrenceBookings";
const multiEventsTimesDoc = "multiEventsTimes";
const hypSecretsDoc = "hyp";
const writeOnlyDoc = "writeOnly";
const bookingsEventsDoc = "bookingsEvents";
const bookingsEventsCollection = "BookingsEvents";
const generalSettingsCollection = "generalSettings";
const englishPurchasesDoc = "englishPurchases";
const hebrewPurchasesDoc = "hebrewPurchases";
const previewDoc = "preview";
const pendingDoc = "pending";

// realTime db endpoints
const likesCollection = "LikesCollection";
const businessDataCollection = "BusinessData";
const countersCollection = "Counters";

//encryption
const passwordOnPhoneCollection = "sasimple";
const addedKeyOnPhoneHash = "phone";

// storage endpoints
const profilePhotosPath = "images/profiles";
const changingImagesPath = "images/changingImages";
const storyImagesPath = "images/stories";
const productsImagesPath = "images/productsImages";
const shopeIconsPath = "images/logos";
const illegalFildsForDbFieldName = ['~*/[].'];
const strToReplaceSlash = '^&8@^';
const strToReplaceAsterisk = '^&9@^';

//--------------------------- db commands -------------------------------
enum ArrayCommands {
  add,
  remove,
}

enum NumericCommands { increment, decrement }

enum QueryCommands {
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
