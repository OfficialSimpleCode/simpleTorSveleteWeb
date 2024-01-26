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
  paymentsRequestsPreviewsCollection,
  recurrenceBookingsDoc,
  recurrenceEventsDoc,
  usersCollection,
  workersCollection,
} from "$lib/consts/db";
import { EventFilterType } from "$lib/consts/worker_schedule";
import Booking from "$lib/models/booking/booking_model";
import type CustomerData from "$lib/models/general/customer_data";
import WorkerModel from "$lib/models/worker/worker_model";
import { Errors } from "$lib/services/errors/messages";
import { addDuration } from "$lib/utils/duration_utils";
import { sendMessage } from "$lib/utils/notifications_utils";
import {
  dateToDateStr,
  dateToDayStr,
  dateToMonthStr,
  dateToTimeStr,
  isOptionalTimeForBooking,
  setTo1970,
  setToMidNight,
} from "$lib/utils/times_utils/times_utils";
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
  }): Promise<Booking | null> {
    let updatedBooking: Booking | null = null;

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
      return validResp ? updatedBooking : null;
    } else {
      AppErrorsHelper.GI().details = "";
      AppErrorsHelper.GI().error = Errors.workerDeleteTheBookingMeanwhile;
      return null;
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
          setToMidNight(dateForRecurrenceChild)
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
  }): Promise<Booking | boolean> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const strBookingDate = dateToDateStr(booking.bookingDate);
    const strBookingDay = dateToDayStr(booking.bookingDate);
    const strBookingMonth = dateToMonthStr(booking.bookingDate);
    const timesData: Record<string, any> = {};

    if (booking.recurrenceEvent == null) {
      booking.bookingWorkTimes.forEach((duration, time) => {
        if (needPayInAdvance) {
          timesData[`duringPaymentBookingsTime.${strBookingDate}.${time}`] = [
            //TODO utc
            Timestamp.fromDate(addDuration(new Date(), payemntProcessDuration)),
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
    booking.bookingsEventsAsJson.forEach((time, event) => {
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
        firestoreDataBaseWorker = new WorkerModel({});

        // await this.getWorkerFromTransactionRepo({
        //   transaction: transaction,
        //   workerId: booking.workerId,
        // });

        if (firestoreDataBaseWorker === null) {
          return false;
        }

        allowedTime = isOptionalTimeForBooking({
          worker: firestoreDataBaseWorker,
          booking: booking,
          timeToOrderOn1970Format: setTo1970(booking.bookingDate),
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

      if (booking.recurrenceEvent == null) {
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

      if (booking.recurrenceEvent == null) {
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
        path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}/${booking.workerId}/${dataCollection}`,
        docId: customersDataDoc,
        data: {
          data: { [customerData.customerUuid]: customerDataJson },
        },
      });

      return true;
    };

    return await this.runTransaction(transacionCommands).then((value) => {
      if (!value) {
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
    const bookingsTimesData: { [key: string]: any } = {};
    Object.entries(booking.bookingWorkTimes).forEach(([time, duration]) => {
      bookingsTimesData[`bookingsTimes.${strBookingDate}.${time}`] = null;
    });
    const bookingsEventsData: { [key: string]: any } = {};
    Object.entries(booking.bookingsEventsAsEvents).forEach(([time, _]) => {
      bookingsEventsData[`${strBookingDay}.${time}`] = null;
    });
    const formatedCustomrsData: { [key: string]: any } =
      this.toFormatedCustomerData({
        // customerData: customerData,
        amountOfBookingsCommand: NumericCommands.decrement,
      });
    const transacionCommands: (transaction: any) => Promise<any> = async (
      transaction
    ) => {
      const updatedBooking = await this.getUpdatedBookingDate({
        transaction: transaction,
        bookingToUpdate: booking,
      });
      if (updatedBooking === null) {
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
            value: cancelDate.toString(),
          });
        }
        await this.updateUserBooking({
          booking: booking,
          transaction: transaction,
          command: deleteFromUser ? NumericCommands.decrement : undefined,
          data: deleteFromUser
            ? { [booking.bookingId]: null }
            : { [`${booking.bookingId}.workerDeleted`]: true },
        });
      }
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
    const bookingTime = dateToTimeStr(newBooking.bookingDate);

    const transacionCommands = async (transaction: any): Promise<any> => {
      const updatedBooking = await this.getUpdatedBookingDate({
        transaction: transaction,
        bookingToUpdate: oldBooking,
        dateForRecurrenceChild: oldBookingDateForReccurence,
      });
      if (updatedBooking === null) {
        return false;
      } else {
        oldBooking.bookingDate = oldBooking.bookingDate;
        oldBooking.isUserExist = oldBooking.isUserExist;
      }

      const firestoreDataBaseWorker = new WorkerModel({});

      // await this.getWorkerFromTransactionRepo({
      //   transaction: transaction,
      //   workerId: newBooking.workerId,
      // });

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

      this.updateBookingPaymentRequest(transaction, oldBooking, newBooking);

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
          //customerData: newBookingCustomerData,
          amountOfBookingsCommand: NumericCommands.increment,
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
          //customerData: oldBookingCustomerData,
          amountOfBookingsCommand: NumericCommands.decrement,
        });
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}/${oldBooking.workerId}/${dataCollection}`,
        docId: customersDataDoc,
        data: formatedOldCustomrsData,
      });
      return;
    }
    if (newBooking.customerId !== oldBooking.customerId) {
      const formatedNewCustomrsData: Record<string, any> =
        this.toFormatedCustomerData({
          //customerData: newBookingCustomerData,
          amountOfBookingsCommand: NumericCommands.increment,
        });
      let formatedOldCustomrsData: Record<string, any> =
        this.toFormatedCustomerData({
          //customerData: oldBookingCustomerData,
          amountOfBookingsCommand: NumericCommands.decrement,
        });
      formatedOldCustomrsData = {
        ...formatedOldCustomrsData,
        ...formatedNewCustomrsData,
      };
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}/${oldBooking.workerId}/${dataCollection}`,
        docId: customersDataDoc,
        data: formatedOldCustomrsData,
      });
      return;
    }
    const formatedNewCustomrsData: { [key: string]: any } = {};
    if (newBookingCustomerData.lastBookingsDate !== null) {
      formatedNewCustomrsData[
        `data.${newBookingCustomerData.customerUuid}.lastBookingsDate`
      ] = newBookingCustomerData.lastBookingsDate.toISOString();
    }
    if (newBookingCustomerData.firstBookingsDate !== null) {
      formatedNewCustomrsData[
        `data.${newBookingCustomerData.customerUuid}.firstBookingsDate`
      ] = newBookingCustomerData.firstBookingsDate.toISOString();
    }
    if (newBookingCustomerData.userFirstBookingsDate !== null) {
      formatedNewCustomrsData[
        `data.${newBookingCustomerData.customerUuid}.userFirstBookingsDate`
      ] = newBookingCustomerData.userFirstBookingsDate.toISOString();
    }
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
      oldBooking.recurrenceEvent != undefined &&
      oldBookingDateForReccurence != undefined
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
      newBooking.bookingsEventsAsJson.forEach((time, event) => {
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
    oldBooking.bookingsEventsAsJson.forEach((time, _) => {
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
      newBooking.bookingsEventsAsJson.forEach((time, event) => {
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
      newBooking.bookingsEventsAsJson.forEach((time, event) => {
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

  updateBookingPaymentRequest(
    transaction: Transaction,
    oldBooking: Booking,
    newBooking: Booking
  ): void {
    if (
      oldBooking.paymentRequest === undefined ||
      newBooking.paymentRequest === undefined
    ) {
      return;
    }
    this.transactionUpdateAsMap({
      transaction: transaction,
      path: paymentsRequestsPreviewsCollection,
      docId: newBooking.paymentRequest!.id,
      fieldName: "bookingReference",
      value: newBooking.toBookingReferencePaymentObj.toJson(),
    });
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
    Object.entries(newBooking.bookingWorkTimes).forEach(([time, duration]) => {
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
    const oldTreatmentsData: { [key: string]: any } = {};
    Object.entries(oldBooking.bookingWorkTimes).forEach(([time, duration]) => {
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
      Object.assign(oldTreatmentsData, newTreatmentsData);
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
    if (oldBooking.recurrenceEvent != undefined) {
      if (oldBookingDateForReccurence != undefined) {
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
      if (oldBooking.recurrenceEvent === null) {
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
    previewData[`bookingsPreviews.${docId}.lastUpdateTime`] =
      new Date().toString();

    let path = DbPathesHelper.GI().userBookingsPathByBooking(booking);

    if (transaction != undefined) {
      if (isSetMerge) {
        this.transactionSetAsMap({
          transaction: transaction,
          path: path,
          docId: docId,
          data: data,
        });
      } else {
        this.transactionUpdateMultipleFieldsAsMap({
          transaction: transaction,
          path: path,
          docId: docId,
          data: data,
        });
      }

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
}
