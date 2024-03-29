/// This file is saving the export const of the app limitations
/// Example: save the time before re-send opt message, max business updates

import { Duration } from "$lib/models/core/duration";

export const daysForBookingsDoc = 20;
export const limitForShopNotifications = 4;
export const limitForSubNotifications = 4;
export const lastVisitedBuisnessesLimit = 10;
export const resendOptTime = 30;
export const maxSearchItems = 7;
// export const durationToCleanUserData =   new Duration(90);
// export const durationToCleanWorkerExpiredData =   new Duration(20);
export const adressCharsLimit = 40;
export const instagramCharsLimit = 60;
export const payemntRequestSummaryCharsLimit = 150;
export const storyTitleCharsLimit = 20;
export const productsTitleCharsLimit = 20;
export const shopNameCharsLimit = 60;
export const updateContentCharsLimit = 500;
export const updateTitleCharsLimit = 50;
export const vacationTitleCharsLimit = 70;
export const themeNameMaxChars = 30;
export const treatmentNameCharsLimit = 30;
export const shopNotificationCharsLimit = 200;
export const treatmentNoteCharsLimit = 70;
export const breakNameCharsLimit = 20;
export const productNameCharsLimit = 40;
export const expiredBookingAmountLimit = 50;
export const productDescriptionCharsLimit = 400;
export const treatmentSubjectNameCharsLimit = 20;
export const workerAboutCharsLimit = 600;
export const debtDescription = 40;
export const charsLimitItemInformation = 60;
export const noteCharLimit = 60;
export const contactAsMessageCharsLimit = 700;
export const contactAsSubjectCharsLimit = 150;
export const treatmentDurationCharsLimit = 3;
export const updatesLimit = 6;
export const contactUsLimitPerSession = 5;
export const treatmentLimit = 20;
export const treatmentSectionLimit = 10;
export const successDialogMiliseconds = 1400;
export const successDialogMilisecondsWeb = 700;
export const charsForDeleteNeerDedlineBookingMessage = 100;
export const charsForOrderNeerDedlineBookingMessage = 100;
export const trialDays = 30;
export const maxExceptionDatesAuto = 35;
export const recurrenceScheduleNotificationUpdateRangeDays = 50;
export const recurrenceScheduleNotificationSaftyRange = 7;
export const participantsInMultiBooking = 200;
export const maxTicketForUser = 20;
export const maxDeivceToUser = 4;
// export const updateDeivceJoinDateAfter = Duration(days: 40);
// export const deleteDeivceAfter = Duration(days: 60);
// export const notifyOnDebtLimit = Duration(days: 1);
export const debtOnOneBookingLimit = 8;
export const termMaxChars = 1000;

export const titleReportLimit = 50;
export const descriptionReportLimit = 200;
export const communicationReportLimit = 40;
// export const maxTimeBetweenLogInAndDelete = Duration(minutes: 5);
export const minimumAuthProvidersForBusinessOwner = 2;
export const paymentRequsetForNewBusiness = 15;
export const messagesForNewBusiness = 20;
export const treatmentPriceChangeNoteCharsLimit = 60;

export const maxTimeBetweenLogInAndDelete = new Duration({ minutes: 5 });
