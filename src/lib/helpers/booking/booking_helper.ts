import { logger } from "$lib/consts/application_general";
import { BookingStatuses } from "$lib/consts/booking";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import type Booking from "$lib/models/booking/booking_model";
import type WorkerModel from "$lib/models/worker/worker_model";
import { Errors } from "$lib/services/errors/messages";
import { needToHoldOn } from "$lib/utils/booking_utils";
import AppErrorsHelper from "../app_errors";
import { BookingRepo } from "./booking_repo";

export default class BookingHelper {
  private static _singleton: BookingHelper = new BookingHelper();
  private constructor() {}
  public static getInstance(): BookingHelper {
    return BookingHelper._singleton;
  }
  private bookingRepo: BookingRepo = new BookingRepo();
  async addBooking(
    booking: Booking,
    worker: WorkerModel,
    {
      clientNote = "",
      noteText = "",
      needPayInAdvance = false,
      filledBooking = false,
    }: {
      clientNote?: string;
      noteText?: string;
      needPayInAdvance?: boolean;
      ignoreLocalWorker?: boolean;
      filledBooking?: boolean;
    }
  ): Promise<any> {
    if (!UserInitializer.GI().isConnected) {
      AppErrorsHelper.GI().error = Errors.notLogedIn;
      return false;
    }
    if (booking.treatments.size === 0) {
      AppErrorsHelper.GI().error = Errors.noTreatment;
      return false;
    }

    if (!filledBooking) {
      await booking.copyDataToOrder({
        worker: worker,
        user: UserInitializer.GI().user,
        needToHoldOn: needToHoldOn(booking.bookingDate, worker),
        business: BusinessInitializer.GI().business,
        clientNoteText: clientNote,
        noteText: noteText,
      });
    }
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
        if (needPayInAdvance) {
          return value;
        }
        // if (value instanceof Booking) {
        //   this._addBookingLocally({
        //     booking,
        //     worker,
        //     workerAction,
        //     newCustomerData,
        //     needPayInAdvance,
        //   });
        //   NotificationHandler.getInstance().afterAddBooking({
        //     booking,
        //     worker,
        //     workerAction,
        //   });
        // }
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

    const currentWorker = BusinessInitializer.GI().workers[booking.workerId]!;
    const isPassed =
      booking.bookingDate.getTime() + booking.totalMinutes * 60 * 1000 <
      Date.now();
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

    const resp = await this.bookingRepo.deleteBooking({
      booking,
      deleteAllBooking,
      cancelDate,
      customerData: newCustomerData,
      deleteFromWorker: !isPassed,
      deleteFromUser: true,
    });

    if (resp) {
      // resp.forEach((deletedBooking) => {
      //   // Delete the booking locally
      //   _deleteBookingLocally({
      //     booking: deletedBooking,
      //     worker,
      //     fromUpdate: false,
      //     removeFromDeviceCalendar: !workerAction,
      //     newCustomerData,
      //     workerAction,
      //     deleteAllBooking,
      //     cancelDate,
      //   });

      //   // Handle notification for the deleted booking
      //   NotificationHandler.afterDeleteBooking({
      //     booking: deletedBooking,
      //     worker,
      //     workerAction,
      //   });
      // });

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
    isChangeDuration = false,
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
          //   NotificationHandler.afterUpdateBooking({
          //     newBooking,
          //     oldBooking,
          //     newWorker,
          //     keepRecurrence,
          //     oldWorker,
          //     workerAction,
          //     isOldBoookingPassed,
          //     oldBookingDateForReccurence,
          //   });
        }

        return value;
      });

    return value;
  }
}
