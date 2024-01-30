import { logger } from "$lib/consts/application_general";
import { BookingStatuses } from "$lib/consts/booking";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import Booking from "$lib/models/booking/booking_model";
import type WorkerModel from "$lib/models/worker/worker_model";
import { Errors } from "$lib/services/errors/messages";
import { needToHoldOn } from "$lib/utils/booking_utils";
import AppErrorsHelper from "../app_errors";
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
    console.log("22222222222222222");
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

    console.log("eeeeeeeeeeeeeeeeeeee");
    const newCustomerData = UserInitializer.GI().user.customerDataFromBooking({
      booking: booking,
    });
    // if (!needPayInAdvance) {
    //   MyBookingsUIController.getInstance().markedBookings = [booking.bookingId];
    // }
    // await BusinessInitializer.GI().cancelAllWorkersRegularListenings();
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
          //   workerAction,
          //   newCustomerData,
          //   needPayInAdvance,
          // });
          // NotificationHandler.GI().afterAddBooking({
          //   booking,
          //   worker,
          // });
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
        // NotificationHandler.GI().afterDeleteBooking({
        //   booking: deletedBooking,
        //   worker,
        // });
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
}
