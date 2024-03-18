import { logger } from "$lib/consts/application_general";
import { BookingStatuses, payemntProcessDuration } from "$lib/consts/booking";
import {
  NumericCommands,
  bookingsCollection,
  bookingsEventsCollection,
  bookingsObjectsCollection,
  buisnessCollection,
  customersDataDoc,
  dataCollection,
  dataDoc,
  recurrenceBookingsDoc,
  recurrenceEventsDoc,
  usersCollection,
  workersCollection,
} from "$lib/consts/db";
import { EventFilterType } from "$lib/consts/worker_schedule";
import type BookingInvoiceData from "$lib/models/booking/booking_invoice_data";
import Booking from "$lib/models/booking/booking_model";
import type BookingTransactionModel from "$lib/models/booking/booking_transaction";
import type CustomerData from "$lib/models/general/customer_data";
import WorkerModel from "$lib/models/worker/worker_model";
import { Errors } from "$lib/services/errors/messages";
import { isOptionalTimeForBooking } from "$lib/utils/available_times_utils/is_optional_time_for_booking";
import { addDuration } from "$lib/utils/duration_utils";
import { sendMessage } from "$lib/utils/notifications_utils";
import {
  dateIsoStr,
  dateToDateStr,
  dateToDayStr,
  dateToMonthStr,
  dateToTimeStr,
  dateToUtc,
  setTo1970,
} from "$lib/utils/times_utils";
import { Timestamp, increment, type Transaction } from "firebase/firestore";
import AppErrorsHelper from "../app_errors";
import DbPathesHelper from "../db_paths_helper";
import GeneralRepo from "../general/general_repo";
import { GeneralData } from "../general_data";
import type { BookingApi } from "./booking_api";

export class BookingRepo extends GeneralRepo implements BookingApi {
  async getUpdatedBookingDate({
    transaction,
    bookingToUpdate,
    dateForRecurrenceChild,
    checkForUpdate = false,
  }: {
    transaction: Transaction;
    bookingToUpdate: Booking;
    dateForRecurrenceChild?: Date;
    checkForUpdate?: boolean;
  }): Promise<Booking | undefined> {
    let updatedBooking: Booking | undefined;

    await super
      .transactionGet(
        transaction,
        `${usersCollection}/${bookingToUpdate.customerId}/${dataCollection}/${dataDoc}/${bookingsCollection}`,
        bookingToUpdate.recurrenceEvent != null
          ? recurrenceBookingsDoc
          : dateToMonthStr(bookingToUpdate.bookingDate)
      )
      .then((json) => {
        if (json.exists() && json.data() != null) {
          const bookingJson = json.data()![bookingToUpdate.bookingId];
          if (bookingJson != null) {
            updatedBooking = Booking.fromJson(
              bookingJson,
              bookingToUpdate.bookingId
            );
          }
        }
      });

    if (updatedBooking != null) {
      const validResp = this.checkBookingDateValidity({
        updatedBooking: updatedBooking!,
        dateForRecurrenceChild,
        checkForUpdate,
        bookingToUpdate,
      });
      return validResp ? updatedBooking : undefined;
    } else {
      AppErrorsHelper.GI().details = "";
      AppErrorsHelper.GI().error = Errors.workerDeleteTheBookingMeanwhile;
      return undefined;
    }
  }

  public checkBookingDateValidity({
    updatedBooking,
    dateForRecurrenceChild,
    checkForUpdate,
    bookingToUpdate,
  }: {
    updatedBooking: Booking;
    dateForRecurrenceChild?: Date;
    checkForUpdate: boolean;
    bookingToUpdate: Booking;
  }): boolean {
    if (updatedBooking.recurrenceEvent != null) {
      if (
        dateForRecurrenceChild != null &&
        updatedBooking.recurrenceEvent!.exceptionDates.has(
          dateToDateStr(dateForRecurrenceChild)
        )
      ) {
        AppErrorsHelper.GI().details = "";
        AppErrorsHelper.GI().error = Errors.workerUpdatedTheBookingMeanwhile;
        return false;
      }
    } else {
      if (
        !checkForUpdate &&
        updatedBooking.bookingDate.getTime() !=
          bookingToUpdate.bookingDate.getTime()
      ) {
        AppErrorsHelper.GI().details = "";
        AppErrorsHelper.GI().error = Errors.workerUpdatedTheBookingMeanwhile;
        return false;
      }
    }
    return true;
  }

  public async addBooking({
    booking,
    worker,
    needPayInAdvance,
    afterPayment,
    customerData,
  }: {
    booking: Booking;
    worker: WorkerModel;
    needPayInAdvance: boolean;
    afterPayment: boolean;
    customerData: CustomerData;
  }): Promise<Booking | undefined> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const strBookingDate = dateToDateStr(booking.bookingDate);
    const strBookingDay = dateToDayStr(booking.bookingDate);
    const strBookingMonth = dateToMonthStr(booking.bookingDate);
    const timesData: Record<string, any> = {};

    if (booking.recurrenceEvent == null) {
      booking.bookingWorkTimes.forEach((duration, time) => {
        if (needPayInAdvance) {
          timesData[`duringPaymentBookingsTime.${strBookingDate}.${time}`] = [
            Timestamp.fromDate(
              addDuration(dateToUtc(new Date()), payemntProcessDuration)
            ),
            duration,
          ];
        } else {
          timesData[`bookingsTimes.${strBookingDate}.${time}`] = duration;
          if (afterPayment) {
            timesData[`duringPaymentBookingsTime.${strBookingDate}.${time}`] =
              null;
          }
        }
      });
    } else {
      booking.bookingsEventsAsJson.forEach((event, time) => {
        timesData[strBookingDate] ??= {};
        timesData[strBookingDate][time] = event;
      });
    }

    const bookingsEventsData: Record<string, Record<string, any>> = {};
    booking.bookingsEventsAsJson.forEach((event, time) => {
      bookingsEventsData[strBookingDay] ??= {};
      bookingsEventsData[strBookingDay][time] = event;
    });

    const customerDataJson = customerData.toJson();
    let bookingsAmount = 1;

    if (booking.recurrenceEvent != null) {
      bookingsAmount = booking.recurrenceEvent.accurances ?? 10000;
    }

    customerDataJson.amoutOfBookings = increment(bookingsAmount);

    const transacionCommands = async (transaction: Transaction) => {
      booking.notificationType = sendMessage({
        booking: booking,
        worker: worker,
      });

      let firestoreDataBaseWorker: WorkerModel | undefined;
      let allowedTime = false;

      if (!afterPayment) {
        firestoreDataBaseWorker = await this.getWorkerFromTransactionRepo({
          transaction: transaction,
          workerId: booking.workerId,
        });

        if (firestoreDataBaseWorker == null) {
          return false;
        }
        console.log(
          "444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444"
        );
        console.log(firestoreDataBaseWorker.workerPublicData.bookingsTimes);
        console.log(firestoreDataBaseWorker.recurrence.recurrenceEvents);

        allowedTime = isOptionalTimeForBooking({
          worker: firestoreDataBaseWorker,
          booking: booking,
          timeToOrderOn1970Format: setTo1970(booking.bookingDate),
        });
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        console.log(allowedTime);

        if (!allowedTime) {
          if (AppErrorsHelper.GI().error === Errors.currentlyOrderingForTime) {
            logger.error(
              "Cant order the booking to this time currently someone pay for it"
            );
          } else {
            AppErrorsHelper.GI().error = Errors.takenBooking;
            logger.error("Cant order the booking to this time already taken");
          }

          return false;
        }
      }

      if (booking.addToClientAt) {
        this.transactionSetAsMap({
          transaction: transaction,
          path: `${usersCollection}/${booking.customerId}/${dataCollection}`,
          docId: dataDoc,
          data: {
            clientAt: {
              [booking.buisnessId]: { [booking.workerId]: "" },
            },
          },
        });
      }

      if (booking.recurrenceEvent === undefined) {
        this.transactionUpdateMultipleFieldsAsMap({
          transaction: transaction,
          path: `${path}/${worker.id}/${dataCollection}`,
          docId: dataDoc,
          data: timesData,
        });
      }

      if (needPayInAdvance) {
        return true;
      }

      if (booking.recurrenceEvent === undefined) {
        this.transactionSetAsMap({
          transaction: transaction,
          path: `${path}/${worker.id}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
          docId: strBookingMonth,
          data: bookingsEventsData,
        });
      }

      this.transactionSetAsMap({
        transaction: transaction,
        path: `${path}/${worker.id}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: strBookingDate,
        data: { [booking.bookingId]: booking.toJson() },
      });

      this.updateUserBooking({
        transaction: transaction,
        booking: booking,
        isSetMerge: true,
        command: NumericCommands.increment,
        data: { [booking.bookingId]: booking.toJson() },
      });

      this.transactionSetAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${booking.buisnessId}/${workersCollection}/${booking.workerId}/${dataCollection}`,
        docId: customersDataDoc,
        data: {
          data: { [customerData.customerUuid]: customerDataJson },
        },
      });
      console.log("rr");
      return true;
    };

    return await this.runTransaction(transacionCommands).then((value) => {
      if (!value) {
        return undefined;
      } else if (booking.recurrenceEvent == null && !needPayInAdvance) {
        this.realTimeEventsCounterHandler({
          workerId: booking.workerId,
          businessId: booking.buisnessId,
          increment: true,
          types: booking.typesOfEvents,
        });
      }

      return booking;
    });
  }

  async deleteBooking({
    booking,
    deleteAllBooking,
    customerData,
    cancelDate,
    deleteFromWorker,
    deleteFromUser,
  }: {
    booking: Booking;

    deleteAllBooking: boolean;
    customerData: CustomerData;
    cancelDate: Date;
    deleteFromWorker: boolean;
    deleteFromUser: boolean;
  }): Promise<Booking[] | null> {
    const strBookingDate = dateToDateStr(booking.bookingDate);
    const strBookingDay = dateToDayStr(booking.bookingDate);
    const strBookingMonth = dateToMonthStr(booking.bookingDate);
    const path: string = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const bookingsTimesData: Record<string, any> = {};
    booking.bookingWorkTimes.forEach((duration, time) => {
      bookingsTimesData[`bookingsTimes.${strBookingDate}.${time}`] = null;
    });
    const bookingsEventsData: Record<string, any> = {};
    booking.bookingsEventsAsEvents.forEach((_, time) => {
      bookingsEventsData[`${strBookingDay}.${time}`] = null;
    });
    const formatedCustomrsData: Record<string, any> =
      this.toFormatedCustomerData({
        customerData: customerData,
        amountOfBookingsCommand: increment(-1),
      });
    const transacionCommands: (transaction: any) => Promise<any> = async (
      transaction
    ) => {
      const updatedBooking = await this.getUpdatedBookingDate({
        transaction: transaction,
        bookingToUpdate: booking,
      });
      if (updatedBooking == null) {
        return false;
      } else {
        booking.bookingDate = booking.bookingDate;
        booking.isUserExist = booking.isUserExist;
      }
      if (!booking.userDeleted) {
        this.transactionUpdateMultipleFieldsAsMap({
          transaction: transaction,
          path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}/${booking.workerId}/${dataCollection}`,
          docId: customersDataDoc,
          data: formatedCustomrsData,
        });
      }
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${path}/${booking.workerId}/${dataCollection}`,
        docId: dataDoc,
        data: bookingsTimesData,
      });

      if (deleteFromWorker) {
        this.transactionUpdateMultipleFieldsAsMap({
          transaction: transaction,
          path: `${path}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
          docId: strBookingMonth,
          data: bookingsEventsData,
        });

        if (deleteAllBooking) {
          this.transactionUpdateAsMap({
            transaction: transaction,
            path: `${path}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
            docId: strBookingDate,
            fieldName: booking.bookingId,
          });
        } else {
          this.transactionUpdateAsMap({
            transaction: transaction,
            path: `${path}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
            docId: strBookingDate,
            fieldName: `${booking.bookingId}.cancelDate`,
            value: dateIsoStr(cancelDate),
          });
        }
      }
      this.updateUserBooking({
        booking: booking,
        transaction: transaction,
        command: deleteFromUser ? NumericCommands.decrement : undefined,
        data: deleteFromUser
          ? { [booking.bookingId]: null }
          : { [`${booking.bookingId}.workerDeleted`]: true },
      });
      return true;
    };
    return await this.runTransaction(transacionCommands).then((value) => {
      if (value) {
        this.realTimeEventsCounterHandler({
          workerId: booking.workerId,
          businessId: booking.buisnessId,
          increment: false,
          types: booking.typesOfEvents,
        });
        return [booking];
      }
      return null;
    });
  }

  async deleteBookingOnlyFromUser({
    booking,
  }: {
    booking: Booking;
  }): Promise<boolean> {
    const transacionCommands = async (
      transaction: Transaction
    ): Promise<boolean> => {
      const updatedBooking = await this.getUpdatedBookingDate({
        transaction,
        bookingToUpdate: booking,
      });

      if (updatedBooking == null) {
        return false;
      } else {
        booking.bookingDate = booking.bookingDate;
        booking.isUserExist = booking.isUserExist;
      }

      await this.updateUserBooking({
        booking,
        transaction,
        command: NumericCommands.decrement,
        data: { [booking.bookingId]: null },
      });

      return true;
    };

    return await this.runTransaction(transacionCommands);
  }

  async updateBooking({
    oldBooking,
    newBooking,
    oldBookingDateForReccurence,
    newBookingCustomerData,
    oldBookingCustomerData,
  }: {
    oldBooking: Booking;
    newBooking: Booking;
    oldBookingDateForReccurence?: Date;
    newBookingCustomerData?: CustomerData;
    oldBookingCustomerData?: CustomerData;
  }): Promise<boolean> {
    const oldBookingDateStr = dateToDateStr(oldBooking.bookingDate);
    const newBookingDateStr = dateToDateStr(newBooking.bookingDate);

    const transacionCommands = async (transaction: any): Promise<any> => {
      const updatedBooking = await this.getUpdatedBookingDate({
        transaction: transaction,
        bookingToUpdate: oldBooking,
        dateForRecurrenceChild: oldBookingDateForReccurence,
      });
      if (updatedBooking == null) {
        return false;
      } else {
        oldBooking.bookingDate = oldBooking.bookingDate;
        oldBooking.isUserExist = oldBooking.isUserExist;
      }

      const firestoreDataBaseWorker = await this.getWorkerFromTransactionRepo({
        transaction: transaction,
        workerId: newBooking.workerId,
      });

      const isTreatmentsUpdate =
        oldBooking.bookingDate.getTime() === newBooking.bookingDate.getTime() &&
        oldBooking.treatmentLength > newBooking.treatmentLength;

      const allowedTime = isOptionalTimeForBooking({
        worker: firestoreDataBaseWorker,
        booking: newBooking,
        timeToOrderOn1970Format: setTo1970(newBooking.bookingDate),
        oldBooking: oldBooking,
        recurrenceSkipDate: oldBookingDateForReccurence,
        isUpdate: oldBooking.workerId === newBooking.workerId,
        allowAllDay: isTreatmentsUpdate,
      });

      if (!allowedTime) {
        if (AppErrorsHelper.GI().error === Errors.currentlyOrderingForTime) {
          logger.debug(
            "Cant order the booking to this time currently someone pay for it"
          );
        } else {
          AppErrorsHelper.GI().error = Errors.takenBooking;

          logger.debug("Cant order the booking to this time already taken");
        }
        return false;
      }

      this.updateBookingsEvents(
        transaction,
        oldBooking,
        newBooking,
        oldBookingDateForReccurence
      );

      this.updateBookingsTimes(
        transaction,
        oldBooking,
        newBooking,
        newBookingDateStr,
        oldBookingDateStr,
        oldBookingDateForReccurence
      );

      if (newBookingCustomerData && oldBookingCustomerData) {
        this.updateWorkerCustomerData({
          transaction,
          oldBooking,
          newBooking,
          newBookingCustomerData,
          oldBookingCustomerData,
        });
      }

      this.updateWorkerBookingsObjects(
        transaction,
        oldBooking,
        newBooking,
        newBookingDateStr,
        oldBookingDateStr,
        oldBookingDateForReccurence
      );

      this.updateUserBookingsObject({
        oldBooking: oldBooking,
        transaction: transaction,
        newBooking: newBooking,
        oldBookingDateForReccurence: oldBookingDateForReccurence,
      });

      return true;
    };

    return this.runTransaction(transacionCommands).then((value) => {
      if (value) {
        if (oldBooking.workerId !== newBooking.workerId) {
          this.realTimeEventsCounterHandler({
            workerId: oldBooking.workerId,
            businessId: oldBooking.buisnessId,
            increment: false,
            types: oldBooking.typesOfEvents,
          });

          this.realTimeEventsCounterHandler({
            workerId: newBooking.workerId,
            businessId: newBooking.buisnessId,
            increment: true,
            types: newBooking.typesOfEvents,
          });
        } else {
          const types: Map<EventFilterType, number> = new Map();
          if (oldBooking.needCancel && !newBooking.needCancel) {
            types.set(EventFilterType.needCancel, 1);
          }
          if (
            oldBooking.status === BookingStatuses.waiting &&
            newBooking.status !== BookingStatuses.waiting
          ) {
            types.set(EventFilterType.onHold, 1);
          }
          if (
            oldBooking.status !== BookingStatuses.waiting &&
            newBooking.status === BookingStatuses.waiting
          ) {
            types.set(EventFilterType.onHold, -1);
          }
          if (Object.keys(types).length > 0) {
            this.realTimeEventsCounterHandler({
              workerId: newBooking.workerId,
              businessId: newBooking.buisnessId,
              increment: false,
              types: types,
            });
          }
        }
      }
      return value;
    });
  }

  updateWorkerCustomerData({
    transaction,
    oldBooking,

    newBooking,
    newBookingCustomerData,
    oldBookingCustomerData,
  }: {
    transaction: Transaction;
    oldBooking: Booking;

    newBooking: Booking;
    newBookingCustomerData: CustomerData;
    oldBookingCustomerData: CustomerData;
  }): void {
    if (newBooking.workerId !== oldBooking.workerId) {
      const formatedNewCustomrsData: Record<string, any> =
        this.toFormatedCustomerData({
          customerData: newBookingCustomerData,
          amountOfBookingsCommand: increment(1),
          useUserFirstBookingsDate: true,
          saveExtraData: true,
        });
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}/${newBooking.workerId}/${dataCollection}`,
        docId: customersDataDoc,
        data: formatedNewCustomrsData,
      });
      const formatedOldCustomrsData: Record<string, any> =
        this.toFormatedCustomerData({
          customerData: oldBookingCustomerData,
          amountOfBookingsCommand: increment(-1),
        });
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}/${oldBooking.workerId}/${dataCollection}`,
        docId: customersDataDoc,
        data: formatedOldCustomrsData,
      });
      return;
    }
    const formatedNewCustomrsData: { [key: string]: any } = {};
    if (newBookingCustomerData.lastBookingsDate != null) {
      formatedNewCustomrsData[
        `data.${newBookingCustomerData.customerUuid}.lastBookingsDate`
      ] = dateIsoStr(newBookingCustomerData.lastBookingsDate);
    }
    if (newBookingCustomerData.firstBookingsDate != null) {
      formatedNewCustomrsData[
        `data.${newBookingCustomerData.customerUuid}.firstBookingsDate`
      ] = dateIsoStr(newBookingCustomerData.firstBookingsDate);
    }
    if (newBookingCustomerData.userFirstBookingsDate != null) {
      formatedNewCustomrsData[
        `data.${newBookingCustomerData.customerUuid}.userFirstBookingsDate`
      ] = dateIsoStr(newBookingCustomerData.userFirstBookingsDate);
    }
    console.log(formatedNewCustomrsData);
    this.transactionUpdateMultipleFieldsAsMap({
      transaction: transaction,
      path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}/${newBooking.workerId}/${dataCollection}`,
      docId: customersDataDoc,
      data: formatedNewCustomrsData,
    });
  }

  updateBookingsEvents(
    transaction: Transaction,
    oldBooking: Booking,
    newBooking: Booking,
    oldBookingDateForReccurence?: Date
  ): void {
    const path = `${buisnessCollection}/${newBooking.buisnessId}/${workersCollection}`;
    const newBookingDay = dateToDayStr(newBooking.bookingDate);
    const newBookingMonth = dateToMonthStr(newBooking.bookingDate);
    const oldBookingDay = dateToDayStr(oldBooking.bookingDate);
    const oldBookingMonth = dateToMonthStr(oldBooking.bookingDate);
    const newBookingsEventsData: { [key: string]: any } = {};
    if (
      oldBooking.recurrenceEvent != null &&
      oldBookingDateForReccurence != null
    ) {
      const recurrenceData: { [key: string]: any } = {};
      oldBooking.bookingsEventsAsJson.forEach((timeId, _) => {
        recurrenceData[
          `${dateToDateStr(
            oldBooking.bookingDate
          )}.${timeId}.RE.EDA.${dateToDateStr(oldBookingDateForReccurence)}`
        ] = "";
      });
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${path}/${oldBooking.workerId}/${dataCollection}`,
        docId: recurrenceEventsDoc,
        data: recurrenceData,
      });
      newBooking.bookingsEventsAsJson.forEach((event, time) => {
        if (!newBookingsEventsData[newBookingDay]) {
          newBookingsEventsData[newBookingDay] = {};
        }
        newBookingsEventsData[newBookingDay][time] = event;
      });
      this.transactionSetAsMap({
        transaction: transaction,
        path: `${path}/${newBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: newBookingMonth,
        data: newBookingsEventsData,
      });
      return;
    }
    let oldBookingsEventsData: Record<string, any> = {};
    oldBooking.bookingsEventsAsJson.forEach((_, time) => {
      oldBookingsEventsData[`${oldBookingDay}.${time}`] = null;
    });
    if (
      oldBooking.workerId !== newBooking.workerId ||
      oldBookingMonth !== newBookingMonth
    ) {
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${path}/${oldBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: oldBookingMonth,
        data: oldBookingsEventsData,
      });
      newBooking.bookingsEventsAsJson.forEach((event, time) => {
        if (newBookingsEventsData[newBookingDay]) {
          newBookingsEventsData[newBookingDay][time] = event;
        } else {
          newBookingsEventsData[newBookingDay] = { [time]: event };
        }
      });
      this.transactionSetAsMap({
        transaction: transaction,
        path: `${path}/${newBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: newBookingMonth,
        data: newBookingsEventsData,
      });
    } else {
      newBooking.bookingsEventsAsJson.forEach((event, time) => {
        newBookingsEventsData[`${newBookingDay}.${time}`] = event;
      });
      oldBookingsEventsData = {
        ...oldBookingsEventsData,
        ...newBookingsEventsData,
      };
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${path}/${oldBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: oldBookingMonth,
        data: oldBookingsEventsData,
      });
    }
  }

  updateBookingsTimes(
    transaction: Transaction,
    oldBooking: Booking,
    newBooking: Booking,
    newBookingDateStr: string,
    oldBookingDateStr: string,
    oldBookingDateForReccurence?: Date //incase we deaiking with reccurence booking we cant trust the old booking date
  ): void {
    //add the new data
    const newTreatmentsData: { [key: string]: any } = {};
    newBooking.bookingWorkTimes.forEach((duration, time) => {
      newTreatmentsData[`bookingsTimes.${newBookingDateStr}.${time}`] =
        duration;
    });
    if (
      oldBooking.recurrenceEvent != null &&
      oldBookingDateForReccurence != null
    ) {
      //add the new booking to the boookings times regular
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${newBooking.buisnessId}/${workersCollection}/${newBooking.workerId}/${dataCollection}`,
        docId: dataDoc,
        data: newTreatmentsData,
      });
      //no need to proceed
      return;
    }
    //delete the old data
    let oldTreatmentsData: { [key: string]: any } = {};
    oldBooking.bookingWorkTimes.forEach((_, time) => {
      oldTreatmentsData[`bookingsTimes.${oldBookingDateStr}.${time}`] = null;
    });
    //case that the new and the old are not in the same doc
    if (oldBooking.workerId != newBooking.workerId) {
      //delete the old bookingsTImes
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${oldBooking.buisnessId}/${workersCollection}/${oldBooking.workerId}/${dataCollection}`,
        docId: dataDoc,
        data: oldTreatmentsData,
      });
      //add the new bookingsTimes
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${newBooking.buisnessId}/${workersCollection}/${newBooking.workerId}/${dataCollection}`,
        docId: dataDoc,
        data: newTreatmentsData,
      });
    } else {
      //case that the new and the old are in the same doc
      oldTreatmentsData = Object.assign(oldTreatmentsData, newTreatmentsData);
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${newBooking.buisnessId}/${workersCollection}/${newBooking.workerId}/${dataCollection}`,
        docId: dataDoc,
        data: oldTreatmentsData,
      });
    }
  }
  updateWorkerBookingsObjects(
    transaction: Transaction,
    oldBooking: Booking,
    newBooking: Booking,
    newBookingDateStr: string, //dd-MM-yyyy
    oldBookingDateStr: string, //dd-MM-yyyy
    oldBookingDateForReccurence?: Date //incase we dealing with reccurence booking we cant trust the old booking date
  ): void {
    if (oldBookingDateStr != newBookingDateStr) {
      //in case the update is not in the same file
      if (
        oldBooking.recurrenceEvent != null &&
        oldBookingDateForReccurence != null
      ) {
        this.transactionUpdateAsMap({
          transaction: transaction,
          path: `${buisnessCollection}/${oldBooking.buisnessId}/${workersCollection}/${oldBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: oldBookingDateStr,
          fieldName: `${oldBooking.bookingId}.RE.EDA.${dateToDateStr(
            oldBookingDateForReccurence
          )}`,
          value: "",
        });
      } else {
        this.transactionUpdateAsMap({
          transaction: transaction,
          path: `${buisnessCollection}/${oldBooking.buisnessId}/${workersCollection}/${oldBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: oldBookingDateStr,
          fieldName: oldBooking.bookingId,
        });
      }
      //not sure if the doc exist so do the update with set
      this.transactionSetAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${newBooking.buisnessId}/${workersCollection}/${newBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: newBookingDateStr,
        data: { [newBooking.bookingId]: newBooking.toJson() },
      });
    }
    ///cant have a recurrenceEvent because user cannot update recurrenceEvent
    else if (oldBooking.workerId != newBooking.workerId) {
      ///delet in the old worker
      this.transactionUpdateAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${oldBooking.buisnessId}/${workersCollection}/${oldBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: oldBookingDateStr,
        fieldName: oldBooking.bookingId,
      });
      //not sure if the doc exist so do the update with set
      this.transactionSetAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${newBooking.buisnessId}/${workersCollection}/${newBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: newBookingDateStr,
        data: { [newBooking.bookingId]: newBooking.toJson() },
      });
    } else {
      if (
        oldBooking.recurrenceEvent != null &&
        oldBookingDateForReccurence != null
      ) {
        this.transactionUpdateAsMap({
          transaction: transaction,
          path: `${buisnessCollection}/${oldBooking.buisnessId}/${workersCollection}/${oldBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: oldBookingDateStr,
          fieldName: `${oldBooking.bookingId}.RE.EDA.${dateToDateStr(
            oldBookingDateForReccurence
          )}`,
          value: "",
        });
      }
      //in case the update is in the same file
      this.transactionUpdateAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${newBooking.buisnessId}/${workersCollection}/${newBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: newBookingDateStr,
        fieldName: newBooking.bookingId,
        value: newBooking.toJson(),
      });
    }
  }
  updateUserBookingsObject({
    oldBooking,
    newBooking,
    transaction,
    oldBookingDateForReccurence,
  }: {
    oldBooking: Booking;
    newBooking: Booking;
    transaction: Transaction;
    oldBookingDateForReccurence?: Date;
  }): void {
    if (oldBooking.recurrenceEvent != null) {
      if (oldBookingDateForReccurence != null) {
        // put the old booking date as exception date
        this.updateUserBooking({
          transaction: transaction,
          booking: oldBooking,
          data: {
            [`${oldBooking.bookingId}.RE.EDA.${dateToDateStr(
              oldBookingDateForReccurence
            )}`]: "",
          },
        });
        this.updateUserBooking({
          transaction: transaction,
          booking: newBooking,
          command: NumericCommands.increment,
          data: {
            [newBooking.bookingId]: newBooking.toJson(),
          },
        });
      }
    } else if (
      oldBooking.customerId !== newBooking.customerId ||
      oldBooking.monthStr !== newBooking.monthStr
    ) {
      if (oldBooking.recurrenceEvent == null) {
        this.updateUserBooking({
          transaction: transaction,
          booking: oldBooking,
          command: NumericCommands.decrement,
          data: {
            [oldBooking.bookingId]: null,
          },
        });
      }
      this.updateUserBooking({
        transaction: transaction,
        booking: newBooking,
        command: NumericCommands.increment,
        data: {
          [newBooking.bookingId]: newBooking.toJson(),
        },
        isSetMerge: true,
      });
    } else {
      this.updateUserBooking({
        transaction: transaction,
        booking: newBooking,
        data: {
          [newBooking.bookingId]: newBooking.toJson(),
        },
      });
    }
  }

  async saveBookingTransaction({
    booking,
    bookingInvoice,
    bookingTransaction,
  }: {
    booking: Booking;
    bookingInvoice: BookingInvoiceData | undefined;
    bookingTransaction: BookingTransactionModel;
  }) {
    const transacionCommands = async (transaction: Transaction) => {
      const updateResp = await this.getUpdatedBookingDate({
        transaction,
        bookingToUpdate: booking,
        checkForUpdate: true,
      });

      if (!updateResp) {
        return false;
      } else {
        booking.bookingDate = updateResp.bookingDate;
        booking.isUserExist = updateResp.isUserExist;
      }

      const bookingDay = dateToDayStr(booking.bookingDate);
      let eventsData: Record<string, any> = {};

      if (booking.invoicesCoverPrice) {
        Object.entries(booking.bookingsEventsAsEvents).forEach(
          ([time, event]) => {
            if (booking.isMultiRef) {
              eventsData[`${bookingDay}.${time}.ICC`] = increment(1);
              eventsData[`${bookingDay}.${time}.TC`] = increment(1);
              if (Object.keys(booking.transactions).length === 1) {
                eventsData[`${bookingDay}.${time}.TPU`] = increment(1);
              }
            } else {
              eventsData[`${bookingDay}.${time}.Hi`] = true;
              eventsData[`${bookingDay}.${time}.TC`] = increment(1);
            }
          }
        );
      } else {
        Object.keys(booking.bookingsEventsAsEvents).forEach((time) => {
          if (booking.isMultiRef) {
            eventsData[`${bookingDay}.${time}.TC`] = increment(1);
            if (Object.keys(booking.transactions).length === 1) {
              eventsData[`${bookingDay}.${time}.TPU`] = increment(1);
            }
          } else {
            eventsData[`${bookingDay}.${time}.TC`] = increment(1);
          }
        });
      }

      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${buisnessCollection}/${booking.buisnessId}/${workersCollection}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: dateToMonthStr(booking.bookingDate),
        data: eventsData,
      });

      this.updateUserBooking({
        transaction,
        booking,
        data: bookingInvoice
          ? {
              [`${booking.bookingId}.transactions.${bookingTransaction.id}`]:
                bookingTransaction,
              [`${booking.bookingId}.invoices.${bookingInvoice.invoiceId}`]:
                bookingInvoice,
            }
          : {
              [`${booking.bookingId}.transactions.${bookingTransaction.id}`]:
                bookingTransaction,
            },
      });

      return true;
    };

    return await this.runTransaction(transacionCommands);
  }

  async updateFieldsInBooking({
    booking,
    data,
    eventValue,
    updateUser = true,
    changeInEvents = false,
    incrementCounters = true,
    counterType,
    eventFieldName,
  }: {
    booking: Booking;
    data: Record<string, any>; // ex: {"needCancel":true,"wasWaiting":true}
    eventValue?: any;
    updateUser?: boolean;
    changeInEvents?: boolean;
    incrementCounters?: boolean;
    counterType?: EventFilterType;
    eventFieldName?: string;
  }): Promise<boolean> {
    const transacionCommands: (transaction: any) => Promise<boolean> = async (
      transaction
    ) => {
      const updateResp = await this.getUpdatedBookingDate({
        transaction,
        bookingToUpdate: booking,
      });

      if (updateResp == null) {
        return false;
      } else {
        booking.bookingDate = updateResp.bookingDate;
        booking.isUserExist = updateResp.isUserExist;
      }

      const path = `${buisnessCollection}/${booking.buisnessId}/${workersCollection}`;

      if (changeInEvents && eventFieldName != null) {
        const bookingDay = dateToDayStr(booking.bookingDate);
        const bookingMonth = dateToMonthStr(booking.bookingDate);

        const bookingsEventsData: Record<string, any> = {};
        booking.bookingsEventsAsJson.forEach((_, time) => {
          bookingsEventsData[`${bookingDay}.${time}.${eventFieldName}`] =
            eventValue;
        });
        console.log(
          `${path}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`
        );
        console.log(bookingsEventsData);
        // Put the booking event in the doc and create one if it doesn't exist
        this.transactionUpdateMultipleFieldsAsMap({
          transaction,
          path: `${path}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
          docId: bookingMonth,
          data: bookingsEventsData,
        });
      }

      //update the worker booking
      const dataForWorker: Record<string, any> = {};
      Object.entries(data).forEach(([fieldName, value]) => {
        dataForWorker[
          booking.isMultiRef
            ? `${dateToTimeStr(booking.bookingDate)}.users.${
                booking.bookingId
              }.${fieldName}`
            : `${booking.bookingId}.${fieldName}`
        ] = value;
      });
      console.log(
        `${path}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`
      );
      console.log(dataForWorker);

      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${path}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: dateToDateStr(booking.bookingDate),
        data: dataForWorker,
      });

      //update the user booking
      if (updateUser) {
        const dataForUser: Record<string, any> = {};
        Object.entries(data).forEach(([fieldName, value]) => {
          dataForUser[`${booking.bookingId}.${fieldName}`] = value;
        });

        this.updateUserBooking({
          transaction: transaction,
          booking,
          data: dataForUser,
        });
      }

      return true;
    };

    return await this.runTransaction(transacionCommands).then(async (value) => {
      if (value) {
        if (counterType != null) {
          // Increment the eventsCounters
          await this.realTimeEventsCounterHandler({
            workerId: booking.workerId,
            businessId: booking.buisnessId,
            increment: incrementCounters,
            types: new Map([[counterType, 1]]),
          });
        }
      }
      return value;
    });
  }

  async makeNewBookingFromReccurence({
    reccurenceBooking,
    newBooking,
    workerAction,
  }: {
    reccurenceBooking: Booking;
    newBooking: Booking;
    workerAction: boolean;
  }): Promise<boolean> {
    const reccurenceFatherDateStr = dateToDateStr(
      reccurenceBooking.bookingDate
    );
    const newBookingDateStr = dateToDateStr(newBooking.bookingDate);
    const newBookingMonthStr = dateToMonthStr(newBooking.bookingDate);
    const newBookingDayStr = dateToDayStr(newBooking.bookingDate);
    const path = `${buisnessCollection}/${newBooking.buisnessId}/${workersCollection}`;

    //times
    // add the newBooking times to bookingsTimes
    // and put newBooking date as an exception date on the reccurenceTime
    const newTimesData: Record<string, unknown> = {};
    for (const [time, duration] of Object.entries(
      newBooking.bookingWorkTimes
    )) {
      newTimesData[`bookingsTimes.${newBookingDateStr}.${time}`] = duration;
    }

    const transacionCommands: (transaction: any) => Promise<boolean> = async (
      transaction
    ) => {
      const updateResp = await this.getUpdatedBookingDate({
        transaction,
        bookingToUpdate: reccurenceBooking,
        dateForRecurrenceChild: newBooking.bookingDate,
      });

      if (updateResp == null) {
        return false;
      } else {
        reccurenceBooking.bookingDate = updateResp.bookingDate;
        reccurenceBooking.isUserExist = updateResp.isUserExist;
      }

      // the bookings on the different docs update it separately
      // add the new booking to the bookingsTimes regular
      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${path}/${newBooking.workerId}/${dataCollection}`,
        docId: dataDoc,
        data: newTimesData,
      });

      // events
      // add the newBooking event and put newBooking date as an exception date
      const newBookingsEventsData: Record<string, any> = {
        [newBookingDayStr]: {},
      };
      newBooking.bookingsEventsAsJson.forEach((event, time) => {
        newBookingsEventsData[newBookingDayStr][time] = event;
      });

      // the doc can no be existed, so we create new one if it doesn't
      this.transactionSetAsMap({
        transaction,
        path: `${path}/${reccurenceBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: newBookingMonthStr,
        data: newBookingsEventsData,
      });

      const reccurenceEventsData: Record<string, unknown> = {};
      reccurenceBooking.bookingsEventsAsJson.forEach((event, time) => {
        newBookingsEventsData[newBookingDayStr][time] = event;
      });
      reccurenceBooking.bookingsEventsAsJson.forEach((event, timeId) => {
        if (event["RE"] != null) {
          reccurenceEventsData[
            `${reccurenceFatherDateStr}.${timeId}.RE.EDA.${newBookingDateStr}`
          ] = "";
        }
      });
      // update the old booking reccurence data
      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${path}/${newBooking.workerId}/${dataCollection}`,
        docId: recurrenceEventsDoc,
        data: reccurenceEventsData,
      });

      // workersObjects
      // add the newBooking and put newBooking date as an exception date
      if (newBookingDateStr === reccurenceFatherDateStr) {
        // the bookings on the same doc update it together
        this.transactionUpdateMultipleFieldsAsMap({
          transaction,
          path: `${path}/${reccurenceBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: reccurenceFatherDateStr,
          data: {
            [newBooking.bookingId]: newBooking.toJson(),
            [`${reccurenceBooking.bookingId}.RE.EDA.${newBookingDateStr}`]: "",
          },
        });
      } else {
        // the bookings on the different docs update it separately
        this.transactionSetAsMap({
          transaction,
          path: `${path}/${newBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: newBookingDateStr,
          data: { [newBooking.bookingId]: newBooking.toJson() },
        });

        this.transactionUpdateAsMap({
          transaction,
          path: `${path}/${reccurenceBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: reccurenceFatherDateStr,
          fieldName: `${reccurenceBooking.bookingId}.RE.EDA.${newBookingDateStr}`,
          value: "",
        });
      }

      this.updateUserBooking({
        transaction,
        booking: newBooking,
        isSetMerge: true,
        command: NumericCommands.increment,
        data: { [newBooking.bookingId]: newBooking.toJson() },
      });

      this.updateUserBooking({
        transaction,
        booking: reccurenceBooking,
        data: {
          [`${reccurenceBooking.bookingId}.RE.EDA.${newBookingDateStr}`]: "",
        },
      });

      return true;
    };

    return await this.runTransaction(transacionCommands).then(async (value) => {
      if (value) {
        // increment the eventsCounters
        await this.realTimeEventsCounterHandler({
          workerId: newBooking.workerId,
          businessId: newBooking.buisnessId,
          increment: true,
          types: newBooking.typesOfEvents,
        });
      }
      return value;
    });
  }

  async updateUserBooking({
    booking,
    data,
    command,
    isSetMerge = false,
    transaction,
  }: {
    booking: Booking;
    data: Record<string, unknown>;
    command?: NumericCommands;
    isSetMerge?: boolean;
    transaction?: Transaction;
  }): Promise<boolean> {
    if (booking.userDeleted) {
      return false;
    }

    const docId = booking.recurrenceEvent
      ? recurrenceBookingsDoc
      : dateToMonthStr(booking.bookingDate);

    const previewData: Record<string, unknown> = {};

    if (command !== undefined) {
      previewData[`bookingsPreviews.${docId}.bookingCount`] = command;
    }
    previewData[`bookingsPreviews.${docId}.lastUpdateTime`] = dateIsoStr(
      new Date()
    );

    let path = DbPathesHelper.GI().userBookingsPathByBooking(booking);

    if (transaction != undefined) {
      console.log(data);
      if (isSetMerge) {
        console.log("isSetMerge", path, docId);
        this.transactionSetAsMap({
          transaction: transaction,
          path: path,
          docId: docId,
          data: data,
        });
      } else {
        console.log("eeeeeeee", path, docId);
        this.transactionUpdateMultipleFieldsAsMap({
          transaction: transaction,
          path: path,
          docId: docId,
          data: data,
        });
      }
      console.log(`${usersCollection}/${booking.customerId}/${dataCollection}`);
      console.log(previewData);
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${usersCollection}/${booking.customerId}/${dataCollection}`,
        docId: dataDoc,
        data: previewData,
      });

      return true;
    }

    return isSetMerge
      ? await this.setAsMapWithMergeRepo({
          path: path,
          docId: docId,
          valueAsJson: data,
        })
      : await this.updateMultipleFieldsInsideDocAsMapRepo({
          path: path,
          docId: docId,
          data: data,
        });
  }

  async addExceptionDateToRecurrenceBooking({
    recurrenceBooking,
    exceptionDate,
    workerAction,
    customerData,
    canceledBooking,
  }: {
    recurrenceBooking: Booking;
    exceptionDate: Date;
    workerAction: boolean;
    customerData: CustomerData | undefined;
    canceledBooking?: Booking;
  }): Promise<boolean> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const bookingDateStr = dateToDateStr(recurrenceBooking.bookingDate);

    const transacionCommands: (transaction: any) => Promise<boolean> = async (
      transaction
    ) => {
      const updateResp = await this.getUpdatedBookingDate({
        transaction,
        bookingToUpdate: recurrenceBooking,
        dateForRecurrenceChild: exceptionDate,
      });

      if (!updateResp) {
        return false;
      } else {
        recurrenceBooking.bookingDate = updateResp.bookingDate;
        recurrenceBooking.isUserExist = updateResp.isUserExist;
      }

      if (!workerAction && canceledBooking) {
        // Add the new booking as a canceled booking
        this.transactionSetAsMap({
          transaction,
          path: `${buisnessCollection}/${recurrenceBooking.buisnessId}/${workersCollection}/${recurrenceBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: dateToDateStr(canceledBooking.bookingDate),
          data: { [canceledBooking.bookingId]: canceledBooking.toJson() },
        });
      }
      if (customerData) {
        const formatedCustomrsData = this.toFormatedCustomerData({
          customerData,
          amountOfBookingsCommand: increment(-1),
        });
        // Delete all the booking times
        this.transactionUpdateMultipleFieldsAsMap({
          transaction,
          path: `${buisnessCollection}/${recurrenceBooking.buisnessId}/${workersCollection}/${recurrenceBooking.workerId}/${dataCollection}`,
          docId: customersDataDoc,
          data: formatedCustomrsData,
        });
      }
      console.log("111111111111111");
      const reccurenceEventsData: Record<string, any> = {};
      console.log(recurrenceBooking.bookingsEventsAsJson);

      recurrenceBooking.bookingsEventsAsJson.forEach((event, time) => {
        reccurenceEventsData[
          `${bookingDateStr}.${time}.RE.EDA.${dateToDateStr(exceptionDate)}`
        ] = "";
      });
      console.log("222222222222222222222");
      console.log(`${path}/${recurrenceBooking.workerId}/${dataCollection}`);
      console.log(reccurenceEventsData);
      console.log(recurrenceEventsDoc);
      // Put the booking event in the doc and create one if doesn't exist
      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${path}/${recurrenceBooking.workerId}/${dataCollection}`,
        docId: recurrenceEventsDoc,
        data: reccurenceEventsData,
      });
      console.log("2222223333333333333333333333333333333333x");
      console.log(
        `${path}/${recurrenceBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`
      );
      console.log(dateToDateStr(recurrenceBooking.bookingDate));
      console.log(
        `${recurrenceBooking.bookingId}.RE.EDA.${dateToDateStr(exceptionDate)}`
      );
      // Update the worker booking
      this.transactionUpdateAsMap({
        transaction,
        path: `${path}/${recurrenceBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: dateToDateStr(recurrenceBooking.bookingDate),
        fieldName: `${recurrenceBooking.bookingId}.RE.EDA.${dateToDateStr(
          exceptionDate
        )}`,
        value: "",
      });

      this.updateUserBooking({
        transaction,
        booking: recurrenceBooking,
        data: {
          [`${recurrenceBooking.bookingId}.RE.EDA.${dateToDateStr(
            exceptionDate
          )}`]: "",
        },
      });

      return true;
    };

    return await this.runTransaction(transacionCommands);
  }
}
