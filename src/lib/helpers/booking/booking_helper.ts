import { logger } from "$lib/consts/application_general";
import {
  BookingReminderType,
  BookingStatuses,
  NotificationType,
  notificationTypeToStr,
} from "$lib/consts/booking";
import { NumericCommands } from "$lib/consts/db";
import { EventFilterType } from "$lib/consts/worker_schedule";
import { ErrorsController } from "$lib/controllers/errors_controller";
import MyBookingsUIController from "$lib/controllers/my_bookings_controller";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import type BookingInvoiceData from "$lib/models/booking/booking_invoice_data";
import Booking from "$lib/models/booking/booking_model";
import type BookingTransactionModel from "$lib/models/booking/booking_transaction";
import type Invoice from "$lib/models/payment_hyp/invoice/invoice";
import type WorkerModel from "$lib/models/worker/worker_model";
import { Errors } from "$lib/services/errors/messages";
import { needToHoldOn } from "$lib/utils/booking_utils";
import { isEmpty } from "$lib/utils/core_utils";
import { setToMidNight } from "$lib/utils/dates_utils";
import { dateToDateStr } from "$lib/utils/times_utils";
import { getManagerIdFromBusinessId } from "$lib/utils/worker";

import AppErrorsHelper from "../app_errors";
import DbPathesHelper from "../db_paths_helper";
import { GeneralData } from "../general_data";
import NotificationHandler from "../notifications/notification_handler";
import NotificationsHelper from "../notifications/notifications/notification_helper";
import { BookingRepo } from "./booking_repo";

export default class BookingHelper {
  private static _singleton: BookingHelper = new BookingHelper();
  private constructor() {}
  public static GI(): BookingHelper {
    return BookingHelper._singleton;
  }
  private bookingRepo: BookingRepo = new BookingRepo();
  async addBooking({
    booking,
    worker,
    clientNote = "",

    needPayInAdvance = false,
    filledBooking = false,
  }: {
    booking: Booking;
    worker: WorkerModel;
    clientNote?: string;

    needPayInAdvance?: boolean;
    ignoreLocalWorker?: boolean;
    filledBooking?: boolean;
  }): Promise<Booking | undefined> {
    if (!UserInitializer.GI().isConnected) {
      AppErrorsHelper.GI().error = Errors.notLogedIn;
      return undefined;
    }

    if (isEmpty(booking.treatments)) {
      AppErrorsHelper.GI().error = Errors.noTreatment;
      return undefined;
    }

    if (!filledBooking) {
      await booking.copyDataToOrder({
        worker: worker,
        user: UserInitializer.GI().user,
        needToHoldOn: needToHoldOn(booking.bookingDate, worker),
        business: BusinessInitializer.GI().business,
        clientNoteText: clientNote,
      });
    }

    const newCustomerData = UserInitializer.GI().user.customerDataFromBooking({
      booking: booking,
    });
    if (!needPayInAdvance) {
      MyBookingsUIController.markedBookings = new Set([booking.bookingId]);
    }
    await BusinessInitializer.GI().cancelAllWorkersRegularListenings();
    return await this.bookingRepo
      .addBooking({
        booking: booking,
        needPayInAdvance: needPayInAdvance,
        worker: worker,
        afterPayment: false,
        customerData: newCustomerData,
      })
      .then(async (value) => {
        console.log(value);
        if (needPayInAdvance) {
          return value;
        }
        if (value instanceof Booking) {
          this._addBookingLocally({
            booking,
            worker,
            needPayInAdvance,
          });
          NotificationHandler.GI().afterAddBooking({
            booking,
            worker,
          });
        }
        return value;
      });
  }

  async deleteBookingOnlyFromUserDoc({
    booking,
  }: {
    booking: Booking;
    deleteFromPassed?: boolean;
  }): Promise<boolean> {
    return await this.bookingRepo
      .deleteBookingOnlyFromUser({ booking })
      .then(async (value) => {
        if (value) {
          NotificationHandler.GI().afterDeleteBooking({
            booking,
            notifyWorker: false,
          });
          this._deleteBookingLocally({
            booking,
            fromUpdate: false,
            worker: undefined,
            workerAction: false,
          });
        }
        return value;
      });
  }

  async deleteBooking({
    booking,
    worker,
  }: {
    booking: Booking;
    worker: WorkerModel;
  }): Promise<Booking[] | undefined> {
    if (!UserInitializer.GI().isConnected) {
      AppErrorsHelper.GI().error = Errors.notLogedIn;
      return undefined;
    }

    const cancelDate = new Date();

    const deleteAllBooking = booking.status === BookingStatuses.waiting;

    const newCustomerData = UserInitializer.GI().user.customerDataFromBooking({
      booking: booking,
      needDelete: true,
    });

    if (
      MyBookingsUIController.markedBookings &&
      MyBookingsUIController.markedBookings.size > 0
    ) {
      MyBookingsUIController.markedBookings.clear();
    }

    const resp = await this.bookingRepo.deleteBooking({
      booking,
      deleteAllBooking,
      cancelDate,
      customerData: newCustomerData,
      deleteFromWorker: !booking.isPassed,
      deleteFromUser: true,
    });

    if (resp) {
      resp.forEach((deletedBooking) => {
        // // Delete the booking locally
        this._deleteBookingLocally({
          booking: deletedBooking,
          worker,
          fromUpdate: false,
          workerAction: false,
        });
        // Handle notification for the deleted booking
        NotificationHandler.GI().afterDeleteBooking({
          booking: deletedBooking,
          worker,
        });
      });

      return resp;
    } else {
      ErrorsController.displayError();
    }

    return undefined;
  }

  async updateBooking({
    newBooking,
    oldBooking,
    newWorker,
    oldWorker,
    forceUpdate = false,
    oldBookingDateForReccurence,
    noteText,
    newClientNote = "",
    keepRecurrence = false,
    workerAction = false,
  }: {
    newBooking: Booking;
    oldBooking: Booking;
    newWorker: WorkerModel;
    oldWorker: WorkerModel;
    forceUpdate?: boolean;
    isChangeDuration?: boolean;
    oldBookingDateForReccurence?: Date;
    noteText?: string;
    newClientNote?: string;

    keepRecurrence?: boolean;
    workerAction?: boolean;
  }): Promise<boolean> {
    if (
      !forceUpdate &&
      newBooking.isTheSameAs({
        booking: oldBooking,
        note: workerAction ? noteText : oldBooking.note,
        customerId: oldBooking.customerId,
      })
    ) {
      logger.debug(
        "Don't need to access the database, no changes in the booking"
      );
      return true;
    }

    newBooking.updateBookingByBooking({
      oldBooking: oldBooking,
      worker: newWorker,
      user: UserInitializer.GI().user,
      needToHoldOn: needToHoldOn(newBooking.bookingDate, newWorker),
      business: BusinessInitializer.GI().business,
      newClientNote: newClientNote,
      keepRecurrence: keepRecurrence,
    });

    const sameDestination =
      oldBooking.customerId === newBooking.customerId &&
      newBooking.workerId === oldBooking.workerId;
    const initDate = sameDestination ? newBooking.bookingDate : undefined;

    const isOldBoookingPassed =
      oldBooking.bookingDate.getTime() + oldBooking.totalMinutes * 60 * 1000 <
      Date.now();

    const excludeDate = sameDestination ? oldBooking.bookingDate : undefined;

    const oldBookingCustomerData =
      UserInitializer.GI().user.customerDataFromBooking({
        booking: oldBooking,
        needDelete: true,
        initDate: initDate,
      });

    const newBookingCustomerData =
      UserInitializer.GI().user.customerDataFromBooking({
        booking: newBooking,
        exclude: excludeDate,
      });

    if (!workerAction) {
      MyBookingsUIController.markedBookings = new Set([newBooking.bookingId]);
    }

    const value = await this.bookingRepo
      .updateBooking({
        oldBooking: oldBooking,
        newBooking: newBooking,
        oldBookingCustomerData: oldBookingCustomerData,
        newBookingCustomerData: newBookingCustomerData,
        oldBookingDateForReccurence: oldBookingDateForReccurence,
      })
      .then(async (value) => {
        if (value) {
          const oldBookingForCustomerData = Booking.fromBooking(oldBooking);
          oldBookingForCustomerData.recurrenceEvent = undefined;
          this._deleteBookingLocally({
            booking: oldBookingForCustomerData,
            fromUpdate: true,
            worker: oldWorker,
            workerAction,
          });
          this._addBookingLocally({
            booking: newBooking,
            worker: newWorker,
            needPayInAdvance: false,
          });
          NotificationHandler.GI().afterUpdateBooking({
            newBooking,
            oldBooking,
            newWorker,
            keepRecurrence,
            oldWorker,
            workerAction,
            isOldBoookingPassed,
            oldBookingDateForReccurence,
          });
        }
        return value;
      });

    return value;
  }

  async confirmBookingArrival({
    booking,
    bookingDateForReccurence,
    worker,
  }: {
    booking: Booking;
    bookingDateForReccurence?: Date;
    worker: WorkerModel;
  }): Promise<boolean> {
    if (booking.confirmedArrival) {
      return true;
    }

    const hasConfirmArrivalReminder =
      booking.remindersTypes.get(BookingReminderType.confirmArrival) != null;
    const minutesBeforeAlert =
      booking.remindersTypes.get(BookingReminderType.confirmArrival) || 0;

    // In case the booking is recurrence and needs to create a new one with the need to cancel value
    let newBooking: Booking | undefined;
    if (booking.recurrenceEvent && bookingDateForReccurence) {
      newBooking = booking.createRegularBookingFromRecurrence(
        bookingDateForReccurence
      );
      newBooking.confirmedArrival = true;
      // No need to remind on confirm arrival
      newBooking.remindersTypes.delete(BookingReminderType.confirmArrival);
    } else {
      booking.remindersTypes.delete(BookingReminderType.confirmArrival);
    }

    const resp =
      newBooking !== undefined
        ? await this.bookingRepo.makeNewBookingFromReccurence({
            reccurenceBooking: booking,
            newBooking: newBooking,
            workerAction: false,
          })
        : await this.bookingRepo.updateFieldsInBooking({
            booking: booking,
            data: {
              ["confirmedArrival"]: true,
              ["remindersTypes.confirmArrival"]: null,
            },
            changeInEvents: true,
            eventFieldName: booking.isMultiRef ? "CAA" : "CA",
            eventValue: booking.isMultiRef ? NumericCommands.increment : true,
          });

    if (resp) {
      NotificationHandler.GI().afterConfirmBookingArrival({
        booking: newBooking || booking,
        worker: worker,
        minutesBeforeAlert: minutesBeforeAlert,
        hasConfirmArrivalReminder: hasConfirmArrivalReminder,
      });
    }
    return resp;
  }

  async updateBookingTransaction({
    booking,
    bookingTransaction,
    bookingInvoice,
    invoice,
    newBookingForReurrence,
  }: {
    booking: Booking;
    bookingTransaction: BookingTransactionModel;
    bookingInvoice: BookingInvoiceData | undefined;
    invoice: Invoice | undefined;
    newBookingForReurrence: Booking | undefined;
    oldBookingDateForReccurence?: Date;
  }) {
    if (newBookingForReurrence) {
      // Add the transaction to the new booking for saving it
      newBookingForReurrence.transactions.set(
        bookingTransaction.id,
        bookingTransaction
      );

      // Save the invoice in the new booking
      if (bookingInvoice != null) {
        newBookingForReurrence.invoices.set(
          bookingInvoice.invoiceId,
          bookingInvoice
        );
      }
    } else {
      // Add the transaction to the original booking for saving it
      booking.transactions.set(bookingTransaction.id, bookingTransaction);

      // Save the invoice in the original booking
      if (bookingInvoice != null) {
        booking.invoices.set(bookingInvoice.invoiceId, bookingInvoice);
      }
    }

    // Call the appropriate repository method based on whether it's a new booking for recurrence or not
    const resp = newBookingForReurrence
      ? await this.bookingRepo.makeNewBookingFromReccurence({
          reccurenceBooking: booking,
          newBooking: newBookingForReurrence,
          workerAction: false,
        })
      : await this.bookingRepo.saveBookingTransaction({
          booking,
          bookingTransaction,
          bookingInvoice,
        });

    if (resp) {
      // Delete the worker local booking if it's in the past
      const today = new Date();
      if (booking.bookingDate < setToMidNight(today)) {
        UserInitializer.GI().addLocalDocToDelete({
          userId: booking.workerId,
          path: DbPathesHelper.GI().workerLocalBookingsPath(
            booking.workerId,
            booking.buisnessId
          ),
          docId: dateToDateStr(booking.bookingDate),
        });
      }

      // Delete the worker local booking for recurrence if it's in the past
      if (
        newBookingForReurrence &&
        newBookingForReurrence.bookingDate < setToMidNight(today)
      ) {
        UserInitializer.GI().addLocalDocToDelete({
          userId: booking.workerId,
          path: DbPathesHelper.GI().workerLocalBookingsPath(
            newBookingForReurrence.workerId,
            newBookingForReurrence.buisnessId
          ),
          docId: dateToDateStr(newBookingForReurrence.bookingDate),
        });
      }

      // Notify user and worker about the created invoice
      if (bookingInvoice && invoice) {
        NotificationsHelper.GI().notifyUserWorkerCreateInvoice({
          userFcms: booking.userFcms,
          workerName: booking.workerName,
          amount: bookingInvoice.amount,
          currency: booking.currency,
          invoice,
        });
      }
    }
    return resp;
  }

  async updateNeedCancel({
    booking,
    needCancel,
    worker,
    bookingDateForReccurence,
  }: {
    booking: Booking;
    needCancel: boolean;
    worker: WorkerModel;
    bookingDateForReccurence?: Date;
  }) {
    let newBooking;

    if (booking.recurrenceEvent && bookingDateForReccurence) {
      newBooking = booking.createRegularBookingFromRecurrence(
        bookingDateForReccurence
      );
      newBooking.needCancel = needCancel;
    } else {
      booking.needCancel = needCancel;
    }

    const resp = newBooking
      ? await this.bookingRepo.makeNewBookingFromReccurence({
          reccurenceBooking: booking,
          newBooking,
          workerAction: false,
        })
      : await this.bookingRepo.updateFieldsInBooking({
          changeInEvents: true,

          eventValue: booking.isMultiRef
            ? needCancel
              ? NumericCommands.increment
              : NumericCommands.decrement
            : needCancel,
          counterType: EventFilterType.needCancel,
          eventFieldName: booking.isMultiRef ? "WDC" : "wD",
          booking,
          incrementCounters: needCancel,
          data: {
            needCancel: needCancel,
          },
        });

    if (resp) {
      if (!booking.isMultiRef) {
        // Save the new recurrence booking with the new exception dates
        this.saveBookingLocaly({
          booking: newBooking || booking,

          recurrenceBooking: newBooking ? booking : undefined,
        });
      }

      if (needCancel) {
        if (booking.isMultiRef) {
          NotificationsHelper.GI().notifyWorkerThatUserWantToCancelMultiBookingSigning(
            { userBooking: booking, worker }
          );
        } else {
          NotificationsHelper.GI().notifyWorkerAboutUserWantToDelete(
            booking,
            worker
          );
        }
      } else {
        if (booking.isMultiRef) {
          NotificationsHelper.GI().notifyWorkerThatUseRestoredHisMultiBookingSigning(
            {
              userBooking: booking,
              worker,
            }
          );
        } else {
          NotificationsHelper.GI().notifyWorkerAboutUserRestoreBooking(
            booking,
            worker
          );
        }
      }
    }

    return resp;
  }

  async addExceptionDateToRecurreceBooking({
    recurrenceBooking,
    date,
    worker,
    workerAction,
  }: {
    recurrenceBooking: Booking;
    date: Date;
    worker: WorkerModel | undefined;
    workerAction: boolean;
  }): Promise<boolean> {
    if (!recurrenceBooking.recurrenceEvent) {
      return false;
    }
    recurrenceBooking.recurrenceEvent.exceptionDates.add(dateToDateStr(date));

    //create newbooking that will be saved in the worker
    //collection as canceled booking
    const canceledBooking =
      recurrenceBooking.createRegularBookingFromRecurrence(date);

    canceledBooking.cancelDate = new Date();

    // Simulate getting customer data
    const customerData = workerAction
      ? undefined
      : UserInitializer.GI().user.customerDataFromBooking({
          booking: recurrenceBooking,
          needDelete: true,
        });

    // Simulate adding exception date to recurrence booking in repository
    const value = await this.bookingRepo.addExceptionDateToRecurrenceBooking({
      recurrenceBooking,
      canceledBooking,
      exceptionDate: date,
      customerData,
      workerAction,
    });

    if (
      worker &&
      recurrenceBooking.recurrenceNotificationsLastDate &&
      date <= recurrenceBooking.recurrenceNotificationsLastDate
    ) {
      // Make a booking for the notification deletion
      const bookingTemp = Booking.fromBooking(recurrenceBooking);
      bookingTemp.recurrenceEvent = undefined;
      bookingTemp.recurrenceRef = recurrenceBooking.bookingId;
      bookingTemp.bookingDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        recurrenceBooking.bookingDate.getHours(),
        recurrenceBooking.bookingDate.getMinutes()
      );

      NotificationHandler.GI().afterDeleteBooking({
        booking: bookingTemp,
        worker,
      });
    }

    return value === true;
  }

  _addBookingLocally({
    booking,

    needPayInAdvance = false,
  }: {
    booking: Booking;
    worker: WorkerModel;

    needPayInAdvance?: boolean;
  }): void {
    // avoid cases where the client needs to pay in advance
    if (needPayInAdvance) {
      return;
    }

    // the worker orders from his schedule or from the regular order
    if (booking.buisnessId === GeneralData.currentBusinesssId) {
      this.saveBookingLocaly({ booking });
    }
  }

  /**
   * NOTICE: this function is used by the delete and update functions, be careful.
   */
  _deleteBookingLocally({
    booking,
    fromUpdate,
    worker,

    workerAction,
  }: {
    booking: Booking;
    fromUpdate: boolean;
    worker: WorkerModel | undefined;
    workerAction: boolean;
  }) {
    if (worker != null) {
      if (!fromUpdate && workerAction && booking.recurrenceEvent != null) {
        const hasEvents = worker.recurrence.recurrenceEventsList.length > 0;

        if (!hasEvents) {
          // that means the booking we delete is the last recurrence event
          // cancel the listener and initialize all vars
          if (worker.recurrence.listener != null) {
            worker.recurrence.recurrenceEvents = {};
            worker.hasRecurrenceEvents = false;
            worker.recurrence.listener!();
            worker.recurrence.listener = undefined;
          }
        }
      }

      // delete the booking from the local db
      if (
        booking.buisnessId === GeneralData.currentBusinesssId &&
        booking.bookingDate < setToMidNight(new Date())
      ) {
        // delete the booking from local
        this.removeBookingLocally({ booking, worker });
      }
    }

    if (UserInitializer.GI().user.id === booking.customerId) {
      UserInitializer.GI().user.bookings.deleteBooking(booking);
    }
  }

  async saveBookingLocaly({
    booking,

    recurrenceBooking,
  }: {
    booking: Booking;

    recurrenceBooking?: Booking;
  }): Promise<void> {
    // PAST booking
    // update in the worker
    this.addBookingToUserLocalData({
      booking: booking,
      userToUpdate: booking.workerId,
      recurrenceBooking: recurrenceBooking,
    });

    // update also in the manager - manager can access worker bookings
    // so need to update it on the manager too
    const managerId = getManagerIdFromBusinessId(booking.buisnessId);
    // no need to update the manager if it is the same as the worker we updated before
    if (managerId !== booking.workerId) {
      this.addBookingToUserLocalData({
        booking: booking,
        userToUpdate: managerId,
        recurrenceBooking: recurrenceBooking,
      });
    }
  }

  async addBookingToUserLocalData({
    booking,
    userToUpdate,
    recurrenceBooking,
  }: {
    booking: Booking;
    userToUpdate: string;
    recurrenceBooking?: Booking;
  }): Promise<void> {
    // Add the days to delete the bookings data to the user
    // The data that is currently in the user's phone is not updated
    // Need to update it when the user enters the app

    // No need to save multi booking ref on the worker - multi bookings
    // On workers have different obj - can't save booking obj

    if (booking.isPassed) {
      UserInitializer.GI().addLocalDocToDelete({
        userId: userToUpdate,
        path: DbPathesHelper.GI().workerLocalBookingsPath(
          booking.workerId,
          booking.buisnessId
        ), // Get the worker path
        docId: dateToDateStr(booking.bookingDate),
      });
    }
    if (
      recurrenceBooking &&
      recurrenceBooking.recurrenceEvent &&
      recurrenceBooking.bookingDate < setToMidNight(new Date())
    ) {
      recurrenceBooking.recurrenceEvent.exceptionDates.add(
        dateToDateStr(booking.bookingDate)
      );

      UserInitializer.GI().addLocalDocToDelete({
        userId: userToUpdate,
        path: DbPathesHelper.GI().workerLocalBookingsPath(
          recurrenceBooking.workerId,
          recurrenceBooking.buisnessId
        ), // Get the worker path
        docId: dateToDateStr(recurrenceBooking.bookingDate),
      });
    }
  }

  async updateNotificationType(
    booking: Booking,
    notificationType: NotificationType
  ): Promise<boolean> {
    booking.notificationType = notificationType;
    const resp = await this.bookingRepo.updateFieldsInBooking({
      booking: booking,
      data: { notificationType: notificationTypeToStr[notificationType] },
    });
    if (resp) {
      await this.saveBookingLocaly({ booking: booking });
    }
    return resp;
  }

  removeBookingLocally({
    booking,
    worker,
  }: {
    booking: Booking;
    worker: WorkerModel;
  }) {
    // add the days to delete the bookings data to the worker
    // the data that is currently in the worker phone is not updated
    // need to update it when the worker enters the app
    if (booking.isPassed) {
      UserInitializer.GI().addLocalDocToDelete({
        userId: worker.id,
        path: DbPathesHelper.GI().workerLocalBookingsPath(
          booking.workerId,
          booking.buisnessId
        ),
        docId: dateToDateStr(booking.bookingDate),
      });
    }

    //update also in the manager - manager can access worjer bookings
    //so need to iupdate it on the manager too
    const managerId = getManagerIdFromBusinessId(booking.buisnessId);
    //no need to update the manager it is the worker we update before
    if (
      UserInitializer.GI().user.id != managerId &&
      managerId != booking.workerId
    ) {
      if (booking.isPassed) {
        UserInitializer.GI().addLocalDocToDelete({
          userId: managerId,
          path: DbPathesHelper.GI().workerLocalBookingsPath(
            booking.workerId,
            booking.buisnessId
          ), //get worker path
          docId: dateToDateStr(booking.bookingDate),
        });
      }
    }
  }
}
