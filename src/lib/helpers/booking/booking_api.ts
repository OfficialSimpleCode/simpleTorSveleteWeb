import type Booking from "$lib/models/booking/booking_model";
import type CustomerData from "$lib/models/general/customer_data";
import type WorkerModel from "$lib/models/worker/worker_model";
import type { Transaction } from "firebase/firestore";

export interface BookingApi {
  // Get transaction and search the booking on the database for the most updated data.
  // Return null if the booking is deleted or updated.
  getUpdatedBookingDate(params: {
    transaction: Transaction;
    bookingToUpdate: Booking;
    workerAction: boolean;
    dateForRecurrenceChild?: Date;
    checkForUpdate?: boolean;
  }): Promise<Booking | null>;

  // Check booking date validity.
  checkBookingDateValidity(params: {
    updatedBooking: Booking;
    dateForRecurrenceChild?: Date;
    checkForUpdate: boolean;
    bookingToUpdate: Booking;
  }): boolean;

  // Add booking.
  addBooking(params: {
    booking: Booking;
    worker: WorkerModel;
    clientAddedManually: boolean;
    needPayInAdvance: boolean;
    afterPayment: boolean;
    customerData: CustomerData;
    workerAction: boolean;
  }): Promise<any>;
}
