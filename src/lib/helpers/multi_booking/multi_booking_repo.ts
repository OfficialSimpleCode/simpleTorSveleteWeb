import { BookingStatuses } from "$lib/consts/booking";
import {
  NumericCommands,
  bookingsCollection,
  bookingsEventsCollection,
  bookingsObjectsCollection,
  buisnessCollection,
  customersDataDoc,
  dataCollection,
  dataDoc,
  multiEventsTimesDoc,
  phoneDataCollections,
  phonesCollection,
  recurrenceEventsDoc,
  usersCollection,
  workersCollection,
} from "$lib/consts/db";
import { EventFilterType } from "$lib/consts/worker_schedule";
import type BookingInvoiceData from "$lib/models/booking/booking_invoice_data";
import Booking from "$lib/models/booking/booking_model";
import type BusinessModel from "$lib/models/business/business_model";
import type CustomerData from "$lib/models/general/customer_data";
import MultiBooking from "$lib/models/multi_booking/multi_booking";
import type MultiBookingTime from "$lib/models/multi_booking/multi_booking_time";
import type MultiBookingUser from "$lib/models/multi_booking/multi_booking_user";
import type MultiBookingUsersPerCustomer from "$lib/models/multi_booking/multi_booking_users_per_customer";
import type RecurrenceEvent from "$lib/models/schedule/recurrence_event";
import type WorkerModel from "$lib/models/worker/worker_model";
import { Errors } from "$lib/services/errors/messages";
import { hasPlaceInMultiBooking } from "$lib/utils/available_times_utils/has_place_in_multi";
import { isNotEmpty, length } from "$lib/utils/core_utils";
import {
  dateIsoStr,
  dateToDateStr,
  dateToDayStr,
  dateToMonthStr,
  dateToTimeStr,
} from "$lib/utils/times_utils";
import { increment, type Transaction } from "firebase/firestore";
import AppErrorsHelper from "../app_errors";
import DbPathesHelper from "../db_paths_helper";
import GeneralRepo from "../general/general_repo";
import { GeneralData } from "../general_data";
import type { MultiBookingApi } from "./multi_booking_api";

export default class MultiBookingRepo
  extends GeneralRepo
  implements MultiBookingApi
{
  // async makeSureUsersExist({
  //   transaction,
  //   workerAction,
  //   worker,
  //   multiBooking,
  //   users,
  //   multiBookingsPerCustomer,
  //   isUpdate = false,
  // }: {
  //   transaction: Transaction;
  //   workerAction: boolean;
  //   worker: WorkerModel;
  //   multiBooking: MultiBooking;
  //   users: Record<string, MultiBookingUser>;
  //   multiBookingsPerCustomer: Record<string, MultiBookingUsersPerCustomer>;
  //   isUpdate?: boolean;
  // }): Promise<void> {
  //   if (!workerAction) {
  //     return;
  //   }
  //   const futures: Promise<void>[] = [];
  //   console.log("3333333333");
  //   Object.entries(multiBookingsPerCustomer).forEach(([_, customer]) => {
  //     futures.push(
  //       new Promise<void>(async () => {
  //         let isUserExist = customer.isVerifiedPhone || !customer.addedManually;
  //         if (
  //           customer.addedManually &&
  //           customer.customerUuid === customer.phoneNumber &&
  //           !customer.isVerifiedPhone
  //         ) {
  //           const userPhoneDoc = await this.transactionGet(
  //             transaction,
  //             phonesCollection,
  //             customer.customerHashPhone
  //           );
  //           const id = userPhoneDoc.data()?.userId;
  //           if (id == null) {
  //             Object.entries(customer.multiBookingUsers).forEach(
  //               ([bookingId, _]) => {
  //                 if (users[bookingId] != null) {
  //                   users[bookingId].isUserExist = false;
  //                 }
  //               }
  //             );
  //             isUserExist = false;
  //           } else {
  //             Object.entries(customer.multiBookingUsers).forEach(
  //               ([bookingId, _]) => {
  //                 if (users[bookingId] != null) {
  //                   users[bookingId].isUserExist = true;
  //                   users[bookingId].customerId = id;
  //                 }
  //               }
  //             );
  //             customer.customerUuid = id;
  //             isUserExist = true;
  //           }
  //         }
  //         console.log("1111111111111111111");
  //         if (isUserExist) {
  //           const user = await this.transactionGet(
  //             transaction,
  //             `${usersCollection}/${customer.customerUuid}/${dataCollection}`,
  //             dataDoc
  //           );
  //           if (user.exists() && user.data() !== null) {
  //             const publicDataUser = UserPublicData.fromJson(user.data());
  //             Object.entries(customer.multiBookingUsers).forEach(
  //               ([bookingId, _]) => {
  //                 if (users[bookingId] == null) {
  //                   return;
  //                 }
  //                 users[bookingId]!.userFcms = publicDataUser.fcmsTokens;
  //                 const clientAt = publicDataUser.clientAt;
  //                 users[bookingId]!.addToClientAt =
  //                   !clientAt.hasOwnProperty(multiBooking.buisnessId) ||
  //                   !clientAt
  //                     .get(multiBooking.buisnessId)!
  //                     .has(multiBooking.workerId);
  //                 users[bookingId]!.isVerifiedPhone =
  //                   publicDataUser.isVerifiedPhone;
  //                 users[bookingId]!.notificationType = sendMessageForMulti(
  //                   users[bookingId]!,
  //                   worker
  //                 );
  //               }
  //             );
  //           }
  //         }
  //       })
  //     );
  //   });
  //   console.log(futures);
  //   await Promise.all(futures);
  // }

  async getUpdatedMultiBookingDate({
    transaction,
    multiBookingToUpdate,
    workerAction,
    dateForRecurrenceChild,
    multiBookingUser,
    checkForUpdate = false,
  }: {
    transaction: Transaction;
    multiBookingToUpdate: MultiBooking;
    workerAction: boolean;
    dateForRecurrenceChild?: Date;
    multiBookingUser?: MultiBookingUser;
    checkForUpdate?: boolean;
  }): Promise<Booking | undefined> {
    let updatedBooking: Booking | undefined = undefined;
    if (multiBookingUser != null && (checkForUpdate || !workerAction)) {
      await super
        .transactionGet(
          transaction,
          `${usersCollection}/${multiBookingUser.customerId}/${dataCollection}/${dataDoc}/${bookingsCollection}`,
          dateToMonthStr(multiBookingToUpdate.bookingDate)
        )
        .then((json) => {
          if (json.exists() && json.data() != null) {
            const bookingJson = json.data()[multiBookingUser.userBookingId];
            if (bookingJson != null) {
              updatedBooking = Booking.fromJson(
                bookingJson,
                multiBookingUser.userBookingId
              );
            }
          }
        });
    }
    if (updatedBooking != null) {
      const validResp = this.checkBookingDateValidity(
        updatedBooking,
        dateForRecurrenceChild,
        checkForUpdate,
        multiBookingToUpdate
      );
      return validResp ? updatedBooking : undefined;
    } else {
      AppErrorsHelper.GI().details = "";
      AppErrorsHelper.GI().error = Errors.workerDeleteTheBookingMeanwhile;
      return undefined;
    }
  }

  checkMultiBookingDateValidity(
    updatedMultiBooking: MultiBooking,
    dateForRecurrenceChild: Date | undefined,
    checkForUpdate: boolean,
    multiBookingToUpdate: MultiBooking
  ): boolean {
    if (updatedMultiBooking.recurrenceEvent != null) {
      if (
        dateForRecurrenceChild != null &&
        updatedMultiBooking.recurrenceEvent.exceptionDates.has(
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
        updatedMultiBooking.bookingDate.getTime() !==
          multiBookingToUpdate.bookingDate.getTime()
      ) {
        AppErrorsHelper.GI().details = "";
        AppErrorsHelper.GI().error = Errors.workerUpdatedTheBookingMeanwhile;
        return false;
      }
    }
    return true;
  }

  checkBookingDateValidity(
    updatedBooking: Booking,
    dateForRecurrenceChild: Date | undefined,
    checkForUpdate: boolean,
    multiBookingToUpdate: MultiBooking
  ): boolean {
    if (updatedBooking.recurrenceEvent != null) {
      if (
        dateForRecurrenceChild != null &&
        updatedBooking.recurrenceEvent.exceptionDates.has(
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
        updatedBooking.bookingDate.getTime() !==
          multiBookingToUpdate.bookingDate.getTime()
      ) {
        AppErrorsHelper.GI().details = "";
        AppErrorsHelper.GI().error = Errors.workerUpdatedTheBookingMeanwhile;
        return false;
      }
    }
    return true;
  }

  async signUsersToRecurrenceMultiBooking({
    recurrenceMultiBooking,
    newMultiBooking,
    multiBookingsPerCustomer,
    workerAction,
    fromPayment,
    customersToSave,
    worker,
  }: {
    recurrenceMultiBooking: MultiBooking;
    newMultiBooking: MultiBooking;
    multiBookingsPerCustomer: Record<string, MultiBookingUsersPerCustomer>;
    workerAction: boolean;
    fromPayment: boolean;
    customersToSave: Record<string, CustomerData>;
    worker: WorkerModel;
  }): Promise<boolean> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const bookingDay = dateToDayStr(newMultiBooking.bookingDate);
    const bookingMonth = dateToMonthStr(newMultiBooking.bookingDate);
    const bookingDate = dateToDateStr(newMultiBooking.bookingDate);
    const eventsTimesData: Record<string, any> = {};
    const bookingsTimesData: Record<string, any> = {};
    //prepare the new booking times data
    eventsTimesData["eventsTimes"] = {};
    Object.entries(newMultiBooking.times).forEach(
      ([time, multiBookingTime]) => {
        eventsTimesData["eventsTimes"][bookingDate] ??= {};
        eventsTimesData["eventsTimes"][bookingDate][time] =
          multiBookingTime.toJson();
        bookingsTimesData[`bookingsTimes.${bookingDate}.${time}`] =
          multiBookingTime.minutes;
      }
    );
    //put the new booking as exception date
    const recurrenceData: Record<string, any> = {};
    recurrenceMultiBooking.bookingsEventsAsEvents.forEach((_, timeId) => {
      const dateString = dateToDateStr(recurrenceMultiBooking.bookingDate);
      recurrenceData[`${dateString}.${timeId}.RE.EDA.${bookingDate}`] = "";
    });
    //add the new booking to the events
    const bookingsEventsData: Record<string, any> = {};
    newMultiBooking.bookingsEventsAsJson.forEach((time, event) => {
      bookingsEventsData[bookingDay] ??= {};
      bookingsEventsData[bookingDay][time] = event;
    });
    const customersJson: Record<string, any> = {};
    Object.entries(customersToSave).forEach(([customerId, customer]) => {
      Object.entries(customer.toJson()).forEach(([key, value]) => {
        if (key === "amoutOfBookings" && typeof value === "number") {
          value = increment(value);
        }
        customersJson[`data.${customerId}.${key}`] = value;
      });
    });
    // create the commands for the transactions
    const transacionCommands: (
      transaction: Transaction
    ) => Promise<any> = async (transaction) => {
      await this.transactionGet(
        transaction,
        `${path}/${newMultiBooking.workerId}/${dataCollection}`,
        multiEventsTimesDoc
      ).then((json) => {
        if (!json.exists || json.data() == null) {
          return;
        }
        worker.multiEventsTimes.setData(json.data()!);
      });
      //Another user alresdy make the booking from the recurrence
      //no need create it again -
      if (
        worker.multiEventsTimes.times[
          dateToDateStr(newMultiBooking.bookingDate)
        ][dateToTimeStr(newMultiBooking.bookingDate)] != null
      ) {
        const allow = hasPlaceInMultiBooking({
          worker: worker,
          date: newMultiBooking.bookingDate,
          treatment: newMultiBooking.treatment,
        });
        if (!allow) {
          AppErrorsHelper.GI().error = Errors.takenMultiBooking;
          return false;
        }
        //no need to save the booking from the begin only need to add
        //users because the booking already created
        const signUsersCommands = await this.signUsersToMultiBooking({
          multiBooking: newMultiBooking,
          newOnHoldUsers: newMultiBooking.onHoldUsers,
          fromPayment: fromPayment,
          newUsers: newMultiBooking.users,
          workerAction: workerAction,

          customersToSave: customersToSave,
          invoiceCoverCounter: newMultiBooking.invoiceCoverCounter,
          needToCheckMultiEventsTimes: false,
          sendCommends: true,
          worker: worker,
        });
        //run the transaction we get from signUsersToMultiBooking
        if (typeof signUsersCommands === "function") {
          return await signUsersCommands(transaction);
        }
      }
      // //get the users public data docs if this is worker action
      // await this.makeSureUsersExist({
      //   transaction: transaction,
      //   workerAction: true,
      //   worker: worker,

      //   multiBooking: newMultiBooking,
      //   users: newMultiBooking.users,
      //   multiBookingsPerCustomer: multiBookingsPerCustomer,
      // });
      if (Object.keys(customersJson).length > 0) {
        //put the new customer data
        this.transactionUpdateMultipleFieldsAsMap({
          transaction: transaction,
          path: `${path}/${newMultiBooking.workerId}/${dataCollection}`,
          docId: customersDataDoc,
          data: customersJson,
        });
      }
      // put the boooking object in the worker collection
      this.transactionSetAsMap({
        transaction: transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: dateToDateStr(newMultiBooking.bookingDate),
        data: { [newMultiBooking.bookingId]: newMultiBooking.toJson() },
      });
      // add the new booking date as an exception date
      // the recurrence obj of the father boooking
      this.transactionUpdateAsMap({
        transaction: transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: dateToDateStr(recurrenceMultiBooking.bookingDate),
        fieldName: `${recurrenceMultiBooking.bookingId}.RE.EDA.${bookingDate}`,
        value: "",
      });
      //put in the multi events time doc
      this.transactionSetAsMap({
        transaction: transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}`,
        docId: multiEventsTimesDoc,
        data: eventsTimesData,
      });
      //put in the booking times doc
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}`,
        docId: dataDoc,
        data: bookingsTimesData,
      });
      // put the booking event in the doc and create one if doesnt exist
      this.transactionSetAsMap({
        transaction: transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: bookingMonth,
        data: bookingsEventsData,
      });
      //put the new booking as exception date
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}`,
        docId: recurrenceEventsDoc,
        data: recurrenceData,
      });
      if (fromPayment) {
        const timeObj =
          worker.multiEventsTimes.duringPaymentsTimes[
            dateToDateStr(newMultiBooking.bookingDate)
          ][dateToTimeStr(newMultiBooking.bookingDate)];
        if (timeObj != null) {
          timeObj.currentParticipants -= 1;
        }
        this.transactionUpdateAsMap({
          transaction: transaction,
          path: `${path}/${worker.id}/${dataCollection}`,
          docId: multiEventsTimesDoc,
          fieldName: `eventsTimeDuringPayment.${dateToDateStr(
            newMultiBooking.bookingDate
          )}.${dateToTimeStr(newMultiBooking.bookingDate)}`,
          value:
            (timeObj?.currentParticipants ?? 0) <= 0 ? null : timeObj!.toJson(),
        });
      }
      Object.entries(newMultiBooking.bookingsForUsers).forEach(
        ([_, booking]) => {
          this.updateUserAsRegularBooking({
            transaction: transaction,
            booking: booking,
            isSetMerge: true,
            command: NumericCommands.increment,
            data: { [booking.bookingId]: booking.toJson() },
          });
          //add the worker and the business ids to user clientAt
          if (booking.addToClientAt && !workerAction) {
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
        }
      );
      return true;
    };
    return await this.runTransaction(transacionCommands).then(async (value) => {
      // increment the eventsCounters
      await this.realTimeEventsCounterHandler({
        workerId: newMultiBooking.workerId,
        businessId: newMultiBooking.buisnessId,
        increment: true,
        types: newMultiBooking.typesOfEvents,
      });
      return value;
    });
  }

  async signUsersToMultiBooking({
    multiBooking,

    newOnHoldUsers,
    fromPayment,
    newUsers,
    workerAction,
    customersToSave,
    invoiceCoverCounter,
    worker,
    needToCheckMultiEventsTimes = true,
    sendCommends = false,
  }: {
    multiBooking: MultiBooking;

    newOnHoldUsers: number;
    fromPayment: boolean;
    newUsers: Record<string, MultiBookingUser>;
    workerAction: boolean;
    customersToSave: Record<string, CustomerData>;
    invoiceCoverCounter: number;
    worker: WorkerModel;
    needToCheckMultiEventsTimes?: boolean;
    sendCommends?: boolean;
  }): Promise<any> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const signingDay = dateToDayStr(multiBooking.bookingDate);
    const signingMonth = dateToMonthStr(multiBooking.bookingDate);
    const signingDate = dateToDateStr(multiBooking.bookingDate);
    const customersJson: { [key: string]: any } = {};
    Object.entries(customersToSave).forEach(([customerId, customer]) => {
      Object.entries(customer.toJson()).forEach(([key, value]) => {
        if (key === "amoutOfBookings" && typeof value === "number") {
          value = increment(value);
        }
        customersJson[`data.${customerId}.${key}`] = value;
      });
    });
    // create the commands for the transactions
    const transacionCommands = async (transaction: Transaction) => {
      console.log("eeeeeeeeeee");
      //if workeraction no need to chack for place
      if (!workerAction && !fromPayment && needToCheckMultiEventsTimes) {
        await this.transactionGet(
          transaction,
          `${path}/${worker.id}/${dataCollection}`,
          multiEventsTimesDoc
        ).then((multiTimeJson) => {
          if (multiTimeJson.exists() && multiTimeJson.data() != null) {
            worker.multiEventsTimes.setData(multiTimeJson.data());
          }
        });
        const time =
          worker.multiEventsTimes.times[signingDate][
            dateToTimeStr(multiBooking.bookingDate)
          ];
        if (time == null) {
          //the multi event dleted or updated
          AppErrorsHelper.GI().error = Errors.workerDeleteEventMeanwhile;
          return false;
        }
        const allow = hasPlaceInMultiBooking({
          worker: worker,
          date: multiBooking.bookingDate,
          treatment: multiBooking.treatment,
        });
        if (!allow) {
          AppErrorsHelper.GI().error = Errors.takenMultiBooking;
          return false;
        }
      }
      //check if the booking is still exist after the payment
      if (fromPayment) {
        console.log("wwwwwwwww");
        if (Object.entries(newUsers).length !== 1) {
          return false;
        }
        const updatedBooking = await this.getUpdatedMultiBookingDate({
          transaction: transaction,
          multiBookingToUpdate: multiBooking,
          multiBookingUser: Object.values(newUsers)[0],
          checkForUpdate: true,
          workerAction: workerAction,
        });
        if (updatedBooking == null) {
          AppErrorsHelper.GI().error = Errors.workerDeleteTheBookingMeanwhile;
          return false;
        } else {
          multiBooking.bookingDate = updatedBooking.bookingDate;
          multiBooking.bookingId = dateToTimeStr(updatedBooking.bookingDate);
          const firstKey = Object.keys(newUsers)[0];
          newUsers[firstKey].isUserExist = updatedBooking.isUserExist;
        }
      }

      console.log("wwwwwwwwww2222222222");
      // //get the users public data docs if this is worker action
      // await this.makeSureUsersExist({
      //   transaction: transaction,
      //   workerAction: true,
      //   worker: worker,
      //   users: newUsers,
      //   multiBooking: multiBooking,
      //   multiBookingsPerCustomer: multiBookingsPerCustomer,
      // });
      console.log("3333333333333");
      //remove the item in the multiEventTimeDoc that take
      //the place fo the order during the payment
      if (isNotEmpty(customersJson)) {
        this.transactionUpdateMultipleFieldsAsMap({
          transaction: transaction,
          path: `${path}/${multiBooking.workerId}/${dataCollection}`,
          docId: customersDataDoc,
          data: customersJson,
        });
      }
      console.log("3333334444444443333333");
      const workerData: Record<string, any> = {};
      Object.entries(newUsers).forEach(([bookingId, userToAdd]) => {
        workerData[`${multiBooking.bookingId}.users.${bookingId}`] =
          userToAdd.toJson();
      });
      console.log(workerData);
      // add the user object from the worker collection
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${path}/${worker.id}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: signingDate,
        data: workerData,
      });
      console.log("44444444");
      console.log(multiBooking.bookingsForUsers);
      Object.entries(multiBooking.bookingsForUsers).forEach(
        ([bookingId, booking]) => {
          //add the bookings only for the new clients
          if (!Object.keys(newUsers).includes(bookingId)) {
            return;
          }
          if (fromPayment) {
            booking.cancelDate = undefined;
            //update the multi booking that already in the user doc
            //cant be inside the phone collection.
            // "fromPayment" is only for user Action
            this.updateUserAsRegularBooking({
              transaction: transaction,
              booking: booking,
              data: { [bookingId]: booking.toJson() },
            });
          } else {
            this.updateUserAsRegularBooking({
              transaction: transaction,
              booking: booking,
              isSetMerge: true,
              command: NumericCommands.increment,
              data: { [booking.bookingId]: booking.toJson() },
            });
          }
          //add the worker and the business ids to user clientAt
          //worker doent need to add because every client that added to the
          //customers collection already sync with the clientAt
          if (booking.addToClientAt && !workerAction) {
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
        }
      );
      console.log("222222222222");
      const timeData: Record<string, any> = {};
      Object.entries(multiBooking.times).forEach(([time, _]) => {
        timeData[`eventsTimes.${signingDate}.${time}.CP`] = increment(
          length(newUsers)
        );
      });
      //increment the counter in the time doc
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${path}/${worker.id}/${dataCollection}`,
        docId: multiEventsTimesDoc,
        data: timeData,
      });
      console.log("33333333333333");
      const eventData: Record<string, any> = {};
      Object.entries(multiBooking.times).forEach(([time, _]) => {
        eventData[`${signingDay}.${time}.CP`] = increment(
          Object.entries(newUsers).length
        );
        if (newOnHoldUsers > 0) {
          eventData[`${signingDay}.${time}.OHC`] = increment(newOnHoldUsers);
        }
        if (invoiceCoverCounter > 0) {
          eventData[`${signingDay}.${time}.ICC`] =
            increment(invoiceCoverCounter);
        }
        if (fromPayment) {
          eventData[`${signingDay}.${time}.TPU`] = increment(1);
        }
        if (
          !workerAction &&
          length(newUsers) === 1 &&
          Object.values(newUsers)[0].confirmedArrival
        ) {
          eventData[`${signingDay}.${time}.CAA`] = increment(1);
        }
      });
      console.log("3333333333322sssssssssssssss");
      console.log(eventData);
      //increment the counter in the events doc
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: `${path}/${worker.id}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: signingMonth,
        data: eventData,
      });
      if (fromPayment) {
        const timeObj =
          worker.multiEventsTimes.duringPaymentsTimes[
            dateToDateStr(multiBooking.bookingDate)
          ][dateToTimeStr(multiBooking.bookingDate)];
        if (timeObj != null) {
          timeObj.currentParticipants -= 1;
        }
        this.transactionUpdateAsMap({
          transaction: transaction,
          path: `${path}/${worker.id}/${dataCollection}`,
          docId: multiEventsTimesDoc,
          fieldName: `eventsTimeDuringPayment.${dateToDateStr(
            multiBooking.bookingDate
          )}.${dateToTimeStr(multiBooking.bookingDate)}`,
          value:
            (timeObj?.currentParticipants ?? 0) <= 0
              ? undefined
              : timeObj!.toJson(),
        });
      }
      console.log("3333333333333");
      return true;
    };
    //return true if the given transaction is no null
    if (sendCommends) {
      console.log("22222222222222222");
      return transacionCommands;
    } else {
      console.log("2222221111111111111111111111122222222222");
      return await this.runTransaction(transacionCommands).then(
        async (value) => {
          if (value) {
            //make new multi booking with the new users
            const multiBookingCopy =
              MultiBooking.fromMultiBooking(multiBooking);
            multiBookingCopy.users = newUsers;
            await this.realTimeEventsCounterHandler({
              workerId: multiBookingCopy.workerId,
              businessId: multiBookingCopy.buisnessId,
              increment: true,
              types: multiBookingCopy.typesOfEvents,
            });
          } else {
            if (length(newUsers) !== 1 || !fromPayment) {
              return false;
            }
            await this.deleteUserFromTimeDuringPayment({
              multiBooking: multiBooking,
              worker: worker,
              multiBookingUser: Object.values(newUsers)[0],
            });
          }
          return value;
        }
      );
    }
  }

  async deleteUserFromTimeDuringPayment({
    multiBooking,
    multiBookingUser,
    worker,
  }: {
    multiBooking: MultiBooking;
    multiBookingUser: MultiBookingUser;
    worker: WorkerModel;
  }): Promise<boolean> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;

    // Create the commands for the transactions
    const transacionCommands = async (transaction: Transaction) => {
      await this.transactionGet(
        transaction,
        `${path}/${worker.id}/${dataCollection}`,
        multiEventsTimesDoc
      ).then((multiTimeJson) => {
        if (multiTimeJson.exists() && multiTimeJson.data() != null) {
          worker.multiEventsTimes.setData(multiTimeJson.data());
        }
      });

      const timeObj =
        worker.multiEventsTimes.duringPaymentsTimes[
          dateToDateStr(multiBooking.bookingDate)
        ][dateToTimeStr(multiBooking.bookingDate)];
      if (timeObj !== null && timeObj !== undefined) {
        timeObj.currentParticipants -= 1;
      }

      this.transactionUpdateAsMap({
        transaction,
        path: `${path}/${worker.id}/${dataCollection}`,
        docId: multiEventsTimesDoc,
        fieldName: `eventsTimeDuringPayment.${dateToDateStr(
          multiBooking.bookingDate
        )}.${dateToTimeStr(multiBooking.bookingDate)}`,
        value:
          (timeObj?.currentParticipants ?? 0) <= 0 ? null : timeObj!.toJson(),
      });

      // Delete the booking user from the worker collection
      this.transactionUpdateAsMap({
        transaction,
        path: `${path}/${multiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: dateToDateStr(multiBooking.bookingDate),
        fieldName: `${multiBooking.bookingId}.users.${multiBookingUser.userBookingId}`,
      });

      return true;
    };

    return await this.runTransaction(transacionCommands).then(async (value) => {
      if (value) {
        // Delete booking from the user doc outside the transaction
        await this.updateFieldInsideDocAsMapRepo({
          path: `${usersCollection}/${multiBookingUser.customerId}/${dataCollection}`,
          docId: dataDoc,
          fieldName: `${multiBookingUser.userBookingId}`,
        });
      }
      return value;
    });
  }

  async signOutUserFromMulti({
    userBooking,
    cancelBooking,
    customer,
    cancelDate,
    worker,
    deleteFromUser,
    workerAction,
  }: {
    userBooking: Booking;
    cancelBooking: boolean;
    customer: CustomerData;
    cancelDate: Date;
    worker: WorkerModel;
    deleteFromUser: boolean;
    workerAction: boolean;
  }): Promise<boolean> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const signingDay = dateToDayStr(userBooking.bookingDate);
    const signingMonth = dateToMonthStr(userBooking.bookingDate);
    const signingDate = dateToDateStr(userBooking.bookingDate);
    const signingTime = dateToTimeStr(userBooking.bookingDate);

    let customersJson: { [key: string]: any } = {};

    Object.entries(customer.toJson()).forEach(([key, value]) => {
      customersJson[`data.${customer.customerUuid}.${key}`] = value;
    });
    customersJson[`data.${customer.customerUuid}.amoutOfBookings`] =
      increment(-1);

    const transacionCommands = async (transaction: Transaction) => {
      const multiBooking = userBooking.toMultiBooking;
      const updateResp = await this.getUpdatedMultiBookingDate({
        transaction: transaction,
        multiBookingToUpdate: multiBooking,

        multiBookingUser:
          length(multiBooking.users) > 0
            ? Object.values(multiBooking.users)[0]
            : undefined,
        workerAction,
      });
      if (updateResp == null) {
        return false;
      } else {
        multiBooking.bookingDate = updateResp.bookingDate;
        if (length(multiBooking.users) > 0) {
          Object.values(multiBooking.users)[0].isUserExist =
            updateResp.isUserExist;
        }
      }
      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${path}/${userBooking.workerId}/${dataCollection}`,
        docId: customersDataDoc,
        data: customersJson,
      });

      if (cancelBooking) {
        // Delete the user object from the worker collection
        this.transactionUpdateAsMap({
          transaction,
          path: `${path}/${worker.id}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: signingDate,
          fieldName: `${signingTime}.users.${userBooking.bookingId}.cancelDate`,
          value: dateIsoStr(cancelDate),
        });
      } else {
        // Delete the user object from the worker collection
        this.transactionUpdateAsMap({
          transaction,
          path: `${path}/${worker.id}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: signingDate,
          fieldName: `${signingTime}.users.${userBooking.bookingId}`,
        });
      }

      let eventsDataMap: Record<string, any> = {};
      let timesDataMap: Record<string, any> = {};
      Object.entries(multiBooking.times).forEach(([time, _]) => {
        timesDataMap[`eventsTimes.${signingDate}.${time}.CP`] =
          NumericCommands.decrement;
        eventsDataMap[`${signingDay}.${time}.CP`] = NumericCommands.decrement;
        if (userBooking.status === BookingStatuses.waiting) {
          eventsDataMap[`${signingDay}.${time}.OHC`] =
            NumericCommands.decrement;
        }
        if (userBooking.needCancel) {
          eventsDataMap[`${signingDay}.${time}.WDC`] =
            NumericCommands.decrement;
        }
        if (userBooking.debts.size > 0) {
          eventsDataMap[`${signingDay}.${time}.DC`] = NumericCommands.decrement;
        }
        if (userBooking.invoicesCoverPrice) {
          eventsDataMap[`${signingDay}.${time}.ICC`] =
            NumericCommands.decrement;
        }
        if (userBooking.transactions.size > 0) {
          eventsDataMap[`${signingDay}.${time}.TC`] = increment(
            -1 * userBooking.transactions.size
          );
          eventsDataMap[`${signingDay}.${time}.TPU`] = increment(-1);
        }
        if (userBooking.confirmedArrival) {
          eventsDataMap[`${signingDay}.${time}.CAA`] =
            NumericCommands.decrement;
        }
      });

      // Decrement the counter in the time doc
      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${path}/${worker.id}/${dataCollection}`,
        docId: multiEventsTimesDoc,
        data: timesDataMap,
      });

      // Decrement the counter in the events doc
      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${path}/${worker.id}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: signingMonth,
        data: eventsDataMap,
      });

      this.updateUserAsRegularBooking({
        transaction,
        booking: userBooking,
        command: deleteFromUser ? NumericCommands.decrement : undefined,
        data: deleteFromUser
          ? { [`${userBooking.bookingId}`]: null }
          : { [`${userBooking.bookingId}.workerDeleted`]: true },
      });
      this.updateTransactionBookingReference({
        transaction,
        booking: userBooking,
        delete: true,
      });

      return true;
    };

    return await this.runTransaction(transacionCommands).then(async (value) => {
      if (value) {
        // Decrement the eventsCounters
        await this.realTimeEventsCounterHandler({
          workerId: userBooking.workerId,
          businessId: userBooking.buisnessId,
          increment: false,
          types: userBooking.typesOfEvents,
        });
      }
      return value;
    });
  }

  async saveInvoiceOnMultiBooking({
    bookingInvoiceData,
    multiBookingUser,
    multiBooking,
  }: {
    bookingInvoiceData: BookingInvoiceData;
    multiBookingUser: MultiBookingUser;
    multiBooking: MultiBooking;
  }): Promise<boolean> {
    const transacionCommands = async (transaction: Transaction) => {
      const updateBooking = await this.getUpdatedMultiBookingDate({
        transaction,
        multiBookingToUpdate: multiBooking,
        multiBookingUser,
        checkForUpdate: true,
        workerAction: true,
      });
      if (updateBooking == null) {
        return false;
      } else {
        multiBooking.bookingDate = updateBooking.bookingDate;
        multiBookingUser.isUserExist = updateBooking.isUserExist;
      }

      this.transactionUpdateAsMap({
        transaction,
        path: `${buisnessCollection}/${multiBooking.buisnessId}/${workersCollection}/${multiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: dateToDateStr(multiBooking.bookingDate),
        fieldName: `${multiBooking.bookingId}.users.${multiBookingUser.userBookingId}.invoices.${bookingInvoiceData.invoiceId}`,
        value: bookingInvoiceData.toJson(),
      });
      // In case the new invoice causes the booking to cover price
      if (
        multiBookingUser.invoicePriceAmount >=
          multiBooking.treatment.price!.amount &&
        !multiBookingUser.finishInvoices
      ) {
        this.transactionUpdateAsMap({
          transaction,
          path: `${buisnessCollection}/${multiBooking.buisnessId}/${workersCollection}/${multiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
          docId: dateToMonthStr(multiBooking.bookingDate),
          fieldName: `${dateToDayStr(multiBooking.bookingDate)}.${dateToTimeStr(
            multiBooking.bookingDate
          )}.ICC`,
          value: increment(1),
        });
      }
      await this.updateUserBooking({
        transaction: transaction,
        multiBookingUser,
        data: {
          [`${multiBookingUser.userBookingId}.invoices.${bookingInvoiceData.invoiceId}`]:
            bookingInvoiceData.toJson(),
        },
        bookingDate: multiBooking.bookingDate,
      });

      return true;
    };

    return await this.runTransaction(transacionCommands).then(async (value) => {
      if (value) {
      }
      return value;
    });
  }

  async saveUserTimeDuringPayment({
    multiBooking,
    worker,
    regularBookingToUser,
    multiBookingUser,
    businessModel,
    multiBookingTime,
    recurrenceTimeId,
    recurrenceFatherDate,
  }: {
    multiBooking: MultiBooking;
    worker: WorkerModel;
    regularBookingToUser: Booking;
    multiBookingUser: MultiBookingUser;
    businessModel: BusinessModel;
    multiBookingTime: MultiBookingTime;
    recurrenceTimeId: string | undefined;
    recurrenceFatherDate: Date | undefined;
  }): Promise<boolean> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const bookingDate = dateToDateStr(multiBooking.bookingDate);
    const bookingDay = dateToDayStr(multiBooking.bookingDate);

    const transacionCommands = async (transaction: Transaction) => {
      let saveAsRecurrence = true;
      await this.transactionGet(
        transaction,
        `${path}/${worker.id}/${dataCollection}`,
        multiEventsTimesDoc
      ).then((multiTimeJson) => {
        if (multiTimeJson.exists() && multiTimeJson.data() != null) {
          worker.multiEventsTimes.setData(multiTimeJson.data());
        }
      });
      const time =
        worker.multiEventsTimes.times[
          dateToDateStr(multiBooking.bookingDate)
        ]?.[dateToTimeStr(multiBooking.bookingDate)];

      let hasException: boolean | undefined;
      let recurrenceEvent: RecurrenceEvent | undefined;

      if (recurrenceTimeId != null && recurrenceFatherDate != null) {
        await this.transactionGet(
          transaction,
          `${path}/${worker.id}/${dataCollection}`,
          recurrenceEventsDoc
        ).then((recurrenceJson) => {
          if (recurrenceJson.exists() && recurrenceJson.data() != null) {
            worker.recurrence.setRecurrenceEvents(
              recurrenceJson.data(),
              worker.id,
              businessModel
            );
          }
        });

        recurrenceEvent =
          worker.recurrence.recurrenceEvents[
            dateToDateStr(recurrenceFatherDate)
          ]?.[recurrenceTimeId]?.recurrenceEvent;
        hasException = recurrenceEvent?.exceptionDates.has(
          dateToDateStr(multiBooking.bookingDate)
        );
      }

      if (
        (time === null || time.treatmentId === "") &&
        (recurrenceEvent === undefined || hasException !== false)
      ) {
        AppErrorsHelper.GI().error = Errors.workerDeleteEventMeanwhile;
        return false;
      }
      if (time !== null && time.treatmentId !== "") {
        saveAsRecurrence = false;
        const allow = hasPlaceInMultiBooking({
          worker,
          date: multiBooking.bookingDate,
          treatment: multiBooking.treatment,
        });

        if (!allow) {
          AppErrorsHelper.GI().error = Errors.takenMultiBooking;
          return false;
        }
      }

      const duringPaymentJson = multiBookingTime.toJson();
      duringPaymentJson["CP"] = increment(1);
      let eventTimesData: Record<string, any> = { eventsTimeDuringPayment: {} };
      eventTimesData["eventsTimeDuringPayment"]![
        dateToDateStr(multiBooking.bookingDate)
      ] ??= {};
      eventTimesData["eventsTimeDuringPayment"]![
        dateToDateStr(multiBooking.bookingDate)
      ]![dateToTimeStr(multiBooking.bookingDate)] = duringPaymentJson;

      if (saveAsRecurrence) {
        if (recurrenceFatherDate == null || recurrenceTimeId === null) {
          return false;
        }

        const bookingsEventsData: { [key: string]: any } = {};
        multiBooking.bookingsEventsAsJson.forEach((time, event) => {
          bookingsEventsData[bookingDay] ??= {};
          bookingsEventsData[bookingDay]![time] = event;
        });
        this.transactionSetAsMap({
          transaction,
          path: `${path}/${multiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
          docId: dateToMonthStr(multiBooking.bookingDate),
          data: bookingsEventsData,
        });

        this.transactionUpdateAsMap({
          transaction,
          path: `${path}/${worker.id}/${dataCollection}`,
          docId: recurrenceEventsDoc,
          fieldName: `${dateToDateStr(
            recurrenceFatherDate
          )}.${recurrenceTimeId}.RE.EDA.${dateToDateStr(
            multiBooking.bookingDate
          )}`,
          value: "",
        });

        eventTimesData["eventsTimes"] = {};
        Object.entries(multiBooking.timesAsJson).forEach(([time, timeJson]) => {
          eventTimesData["eventsTimes"]![
            dateToDateStr(multiBooking.bookingDate)
          ] ??= {};
          eventTimesData["eventsTimes"]![
            dateToDateStr(multiBooking.bookingDate)
          ]![time] = timeJson;
        });

        this.transactionSetAsMap({
          transaction,
          path: `${path}/${worker.id}/${dataCollection}`,
          docId: multiEventsTimesDoc,
          data: eventTimesData,
        });

        // put the boooking object in the worker collection
        this.transactionSetAsMap({
          transaction: transaction,
          path: `${path}/${multiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: dateToDateStr(multiBooking.bookingDate),
          data: { [multiBooking.bookingId]: multiBooking.toJson() },
        });

        const bookingsTimesData: Record<string, any> = {};
        //prepare the new booking times data
        Object.entries(multiBooking.times).forEach(
          ([time, multiBookingTimeObj]) => {
            bookingsTimesData[`bookingsTimes.${bookingDate}.${time}`] =
              multiBookingTimeObj.minutes;
          }
        );

        //put in the booking times doc
        this.transactionUpdateMultipleFieldsAsMap({
          transaction: transaction,
          path: `${path}/${multiBooking.workerId}/${dataCollection}`,
          docId: dataDoc,
          data: bookingsTimesData,
        });
      } else {
        this.transactionSetAsMap({
          transaction: transaction,
          path: `${path}/${worker.id}/${dataCollection}`,
          docId: multiEventsTimesDoc,
          data: eventTimesData,
        });
        //update the worker bookings collection
        this.transactionUpdateAsMap({
          transaction: transaction,
          path: `${path}/${multiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
          docId: dateToDateStr(multiBooking.bookingDate),
          fieldName: `${multiBooking.bookingId}.users.${multiBookingUser.userBookingId}`,
          value: multiBookingUser.toJson(),
        });
      }

      //update the user bookings collection
      this.updateUserAsRegularBooking({
        transaction: transaction,
        isSetMerge: true,
        booking: regularBookingToUser,
        command: NumericCommands.increment,
        data: {
          [regularBookingToUser.bookingId]: regularBookingToUser.toJson(),
        },
      });

      return true;
    };

    return await this.runTransaction(transacionCommands);
  }

  async createNewMultiBookingFromRecurrence({
    recurrenceMultiBooking,
    newMultiBooking,
    workerAction,
  }: {
    recurrenceMultiBooking: MultiBooking;
    newMultiBooking: MultiBooking;
    workerAction: boolean;
  }): Promise<boolean> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const bookingDay = dateToDayStr(newMultiBooking.bookingDate);
    const bookingMonth = dateToMonthStr(newMultiBooking.bookingDate);
    const bookingDate = dateToDateStr(newMultiBooking.bookingDate);

    const eventsTimesData: Record<string, any> = {};
    const bookingsTimesData: Record<string, any> = {};

    // Prepare the new booking times data
    eventsTimesData["eventsTimes"] = {};
    for (const [time, multiBookingTime] of Object.entries(
      newMultiBooking.times
    )) {
      eventsTimesData["eventsTimes"][bookingDate] ??= {};
      eventsTimesData["eventsTimes"][bookingDate][time] =
        multiBookingTime.toJson();
      bookingsTimesData[`bookingsTimes.${bookingDate}.${time}`] =
        multiBookingTime.minutes;
    }

    // Put the new booking as exception date
    const recurrenceData: Record<string, any> = {};
    for (const [timeId, event] of Object.entries(
      recurrenceMultiBooking.bookingsEventsAsEvents
    )) {
      const dateString = dateToDateStr(recurrenceMultiBooking.bookingDate);
      recurrenceData[`${dateString}.${timeId}.RE.EDA.${bookingDate}`] = "";
    }

    // Add the new booking to the events
    const bookingsEventsData: Record<string, any> = {};
    for (const [time, event] of Object.entries(
      newMultiBooking.bookingsEventsAsJson
    )) {
      bookingsEventsData[bookingDay] ??= {};
      bookingsEventsData[bookingDay][time] = event;
    }

    const transacionCommands = async (transaction: Transaction) => {
      const updateBooking = await this.getUpdatedMultiBookingDate({
        transaction: transaction,

        multiBookingToUpdate: recurrenceMultiBooking,
        dateForRecurrenceChild: newMultiBooking.bookingDate,
        workerAction: workerAction,
      });
      if (!updateBooking) return false;
      recurrenceMultiBooking.bookingDate = updateBooking.bookingDate;

      // Put the booking object in the worker collection
      this.transactionSetAsMap({
        transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: dateToDateStr(newMultiBooking.bookingDate),
        data: { [newMultiBooking.bookingId]: newMultiBooking.toJson() },
      });

      // Add the new booking date as an exception date in the recurrence object of the father booking
      this.transactionUpdateAsMap({
        transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: dateToDateStr(recurrenceMultiBooking.bookingDate),
        fieldName: `${recurrenceMultiBooking.bookingId}.RE.EDA.${bookingDate}`,
        value: "",
      });

      // Put in the multi events time doc
      this.transactionSetAsMap({
        transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}`,
        docId: multiEventsTimesDoc,
        data: eventsTimesData,
      });

      // Put in the booking times doc
      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}`,
        docId: dataDoc,
        data: bookingsTimesData,
      });

      // Put the booking event in the doc and create one if it doesn't exist
      this.transactionSetAsMap({
        transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: bookingMonth,
        data: bookingsEventsData,
      });

      // Put the new booking as exception date
      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: `${path}/${newMultiBooking.workerId}/${dataCollection}`,
        docId: recurrenceEventsDoc,
        data: recurrenceData,
      });

      return true;
    };

    return await this.runTransaction(transacionCommands);
  }

  async updateMultiBookingNeedCancel(booking: Booking): Promise<boolean> {
    const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const signingDay = dateToDayStr(booking.bookingDate);
    const signingMonth = dateToMonthStr(booking.bookingDate);
    const signingDate = dateToDateStr(booking.bookingDate);
    const signingTime = dateToTimeStr(booking.bookingDate);

    const transacionCommands = async (
      transaction: Transaction
    ): Promise<any> => {
      const multiBooking = booking.toMultiBooking;
      const updateBooking = await this.getUpdatedMultiBookingDate({
        transaction,
        multiBookingToUpdate: multiBooking,
        multiBookingUser:
          Object.entries(multiBooking.users).length > 0
            ? multiBooking.users[Object.keys(multiBooking.users)[0]]
            : undefined,
        workerAction: false,
      });

      if (!updateBooking) {
        return false;
      } else {
        multiBooking.bookingDate = updateBooking.bookingDate;
        booking.isUserExist = updateBooking.isUserExist;
      }

      // Add the user object from the worker collection
      this.transactionUpdateAsMap({
        transaction,
        path: `${path}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: signingDate,
        fieldName: `${signingTime}.users.${booking.bookingId}.needCancel`,
        value: true,
      });

      // Decrement the counter in the events doc
      this.transactionUpdateAsMap({
        transaction,
        path: `${path}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: signingMonth,
        fieldName: `${signingDay}.${signingTime}.WDC`,
        command: NumericCommands.increment,
      });

      this.updateUserAsRegularBooking({
        transaction: transaction,
        booking: booking,
        data: { [`${booking.bookingId}.needCancel`]: true },
      });

      return true;
    };

    return await this.runTransaction(transacionCommands).then(async (value) => {
      if (value) {
        // Increment the eventsCounters
        await this.realTimeEventsCounterHandler({
          workerId: booking.workerId,
          businessId: booking.buisnessId,
          increment: true,
          types: new Map([[EventFilterType.needCancel, 1]]),
        });
      }
      return value;
    });
  }

  async updateUserBooking({
    multiBookingUser,
    data,
    command,
    bookingDate,
    transaction,
  }: {
    multiBookingUser: MultiBookingUser;
    data: Record<string, any>;
    command?: NumericCommands;
    bookingDate: Date;
    transaction?: Transaction;
  }): Promise<boolean> {
    if (multiBookingUser.userDeleted) {
      return false;
    }
    let path = "";
    const docId = dateToMonthStr(bookingDate);
    const previewData: Record<string, any> = {};
    if (command !== undefined) {
      previewData[`bookingsPreviews.${docId}.bookingCount`] = command;
    }
    previewData[`bookingsPreviews.${docId}.lastUpdateTime`] = dateIsoStr(
      new Date()
    );
    if (multiBookingUser.isUserExist) {
      path =
        DbPathesHelper.GI().userBookingsPathByMultiBookingUser(
          multiBookingUser
        );
    } else {
      // Delete from the phone collection
      path =
        DbPathesHelper.GI().userPhoneBookingsPathByMultiBookingUser(
          multiBookingUser
        );
    }
    if (transaction !== undefined) {
      this.transactionUpdateMultipleFieldsAsMap({
        transaction: transaction,
        path: path,
        docId: docId,
        data: data,
      });
      if (multiBookingUser.isUserExist) {
        this.transactionUpdateMultipleFieldsAsMap({
          transaction,
          path: `${usersCollection}/${multiBookingUser.customerId}/${dataCollection}`,
          docId: dataDoc,
          data: previewData,
        });
      }
      return true;
    }
    if (multiBookingUser.isUserExist) {
      await this.updateMultipleFieldsInsideDocAsMapRepo({
        path: `${usersCollection}/${multiBookingUser.customerId}/${dataCollection}`,
        docId: dataDoc,
        data: previewData,
      });
    }

    return this.updateMultipleFieldsInsideDocAsMapRepo({
      path: path,
      docId: docId,
      data: data,
    });
  }

  async updateUserAsRegularBooking({
    booking,
    data,
    command,
    isSetMerge = false,
    transaction,
  }: {
    booking: Booking;
    data: Record<string, any>;
    command?: NumericCommands;
    isSetMerge?: boolean;
    transaction?: Transaction;
  }): Promise<boolean> {
    if (booking.userDeleted) {
      return false;
    }
    let path = "";
    const docId = dateToMonthStr(booking.bookingDate);
    const previewData: Record<string, any> = {};

    if (command != null) {
      previewData[`bookingsPreviews.${docId}.bookingCount`] = command;
    }
    previewData[`bookingsPreviews.${docId}.lastUpdateTime`] = dateIsoStr(
      new Date()
    );

    if (booking.isUserExist) {
      path = `${usersCollection}/${booking.customerId}/${dataCollection}/${dataDoc}/${bookingsCollection}`;
    } else {
      // Delete from the phone collection
      path = `${phonesCollection}/${booking.customerHashPhone}/${booking.customerPhoneAsCollection}/${phoneDataCollections}/${bookingsCollection}`;
    }
    if (transaction !== undefined) {
      if (isSetMerge) {
        this.transactionSetAsMap({
          transaction,
          path,
          docId,
          data,
        });
      } else {
        this.transactionUpdateMultipleFieldsAsMap({
          transaction,
          path,
          docId,
          data,
        });
      }
      if (booking.isUserExist) {
        this.transactionUpdateMultipleFieldsAsMap({
          transaction,
          path: `${usersCollection}/${booking.customerId}/${dataCollection}`,
          docId: dataDoc,
          data: previewData,
        });
      }

      return true;
    }

    if (booking.isUserExist) {
      await this.updateMultipleFieldsInsideDocAsMapRepo({
        path: `${usersCollection}/${booking.customerId}/${dataCollection}`,
        docId: dataDoc,
        data: previewData,
      });
    }

    return isSetMerge
      ? await this.setAsMapWithMergeRepo({ path, docId, valueAsJson: data })
      : await this.updateMultipleFieldsInsideDocAsMapRepo({
          path,
          docId,
          data,
        });
  }
}
