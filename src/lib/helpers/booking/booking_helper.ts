import { logger } from "$lib/consts/application_general";
import { BookingReminderType, BookingStatuses } from "$lib/consts/booking";
import { NumericCommands } from "$lib/consts/db";
import { EventFilterType } from "$lib/consts/worker_schedule";
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
import { setToMidNight } from "$lib/utils/dates_utils";
import { dateToDateStr } from "$lib/utils/times_utils";
import AppErrorsHelper from "../app_errors";
import DbPathesHelper from "../db_paths_helper";
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

    if (booking.treatments.size === 0) {
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
          // this._addBookingLocally({
          //   booking,
          //   worker,
          //   newCustomerData,
          //   needPayInAdvance,
          // });
          await NotificationHandler.GI().afterAddBooking({
            booking,
            worker,
          });
        }
        return value;
      });
  }

  async deleteBookingOnlyFromUserDoc({
    booking,
    deleteFromPassed,
  }: {
    booking: Booking;
    deleteFromPassed?: boolean;
  }): Promise<boolean> {
    // if (
    //   deleteFromPassed &&
    //   !(await this._commitBookingTransactionDueDeletion(booking, false))
    // ) {
    //   return false;
    // }

    return await this.bookingRepo
      .deleteBookingOnlyFromUser({ booking })
      .then(async (value) => {
        if (value) {
          // NotificationHandler().afterDeleteBooking({
          //   booking,
          //   workerAction: false,
          //   notifyWorker: false,
          // });
          // this._deleteBookingLocally({
          //   booking,
          //   fromUpdate: false,
          //   worker: null,
          //   deleteAllBooking: true,
          //   workerAction: false,
          //   removeFromDeviceCalendar: true,
          //   newCustomerData: null,
          // });
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
  }): Promise<Booking[] | null> {
    if (!UserInitializer.GI().isConnected) {
      AppErrorsHelper.GI().error = Errors.notLogedIn;
      return null;
    }

    const cancelDate = new Date();

    const deleteAllBooking = booking.status === BookingStatuses.waiting;

    const newCustomerData = UserInitializer.GI().user.customerDataFromBooking({
      booking: booking,
      needDelete: true,
    });

    //   if (

    //     MyBookingsUIController.markedBookings &&
    //     MyBookingsUIController.markedBookings.size > 0
    //   ) {
    //     MyBookingsUIController.markedBookings.clear();
    //   }
    console.log("booking.isPassed", booking.isPassed);
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
        // _deleteBookingLocally({
        //   booking: deletedBooking,
        //   worker,
        //   fromUpdate: false,
        //   removeFromDeviceCalendar: !workerAction,
        //   newCustomerData,
        //   workerAction,
        //   deleteAllBooking,
        //   cancelDate,
        // });
        // Handle notification for the deleted booking
        NotificationHandler.GI().afterDeleteBooking({
          booking: deletedBooking,
          worker,
        });
      });

      return resp;
    }

    return null;
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

    // if (!workerAction) {
    //   MyBookingsUIController.markedBookings = new Set([newBooking.bookingId]);
    // }

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
          console.log("value", value);
          //   if (bookingListener) {
          //     bookingListener.value = newBooking;
          //     bookingListener.notifyListeners();
          //   }
          //   const oldBookingForCustomerData = Booking.fromBooking(oldBooking);
          //   oldBookingForCustomerData.recurrenceEvent = null;
          //   _deleteBookingLocally({
          //     booking: oldBookingForCustomerData,
          //     fromUpdate: true,
          //     worker: oldWorker,
          //     removeFromDeviceCalendar: !newBooking.signOnDeviceCalendar,
          //     newCustomerData: oldBookingCustomerData,
          //     workerAction,
          //     deleteAllBooking: true,
          //   });
          //   _addBookingLocally({
          //     booking: newBooking,
          //     worker: newWorker,
          //     workerAction,
          //     newCustomerData: newBookingCustomerData,
          //     needPayInAdvance: false,
          //     fromUpdate: true,
          //   });
          // NotificationHandler.GI().afterUpdateBooking({
          //   newBooking,
          //   oldBooking,
          //   newWorker,
          //   keepRecurrence,
          //   oldWorker,
          //   workerAction,
          //   isOldBoookingPassed,
          //   oldBookingDateForReccurence,
          // });
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
          worker,
          recurrenceBooking: newBooking ? booking : undefined,
        });
      }

      if (needCancel) {
        NotificationsHelper.GI().notifyWorkerAboutUserWantToDelete(
          booking,
          worker
        );
      } else {
        NotificationsHelper.GI().notifyWorkerAboutUserRestoreBooking(
          booking,
          worker
        );
      }
    }

    return resp;
  }

  async saveBookingLocaly({
    booking,
    worker,
    recurrenceBooking,
  }: {
    booking: Booking;
    worker: WorkerModel;
    recurrenceBooking: Booking | undefined;
  }) {
    // Add the days to delete the bookings data to the worker
    // The data that is currently in the worker phone is not updated
    // Need to update it when the worker enters the app
    if (booking.bookingDate < setToMidNight(new Date())) {
      UserInitializer.GI().addLocalDocToDelete({
        userId: worker.id,
        path: DbPathesHelper.GI().workerLocalBookingsPath(
          booking.workerId,
          booking.buisnessId
        ),
        docId: dateToDateStr(booking.bookingDate),
      });
    }
    if (
      recurrenceBooking &&
      recurrenceBooking.recurrenceEvent &&
      recurrenceBooking.bookingDate < setToMidNight(new Date())
    ) {
      recurrenceBooking.recurrenceEvent.exceptionDates.add(
        setToMidNight(booking.bookingDate)
      );
      UserInitializer.GI().addLocalDocToDelete({
        userId: worker.id,
        path: DbPathesHelper.GI().workerLocalBookingsPath(
          recurrenceBooking.workerId,
          recurrenceBooking.buisnessId
        ),
        docId: dateToDateStr(recurrenceBooking.bookingDate),
      });
    }
  }
}
