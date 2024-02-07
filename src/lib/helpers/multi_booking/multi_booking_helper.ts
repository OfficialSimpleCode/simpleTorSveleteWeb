import { BookingStatuses } from "$lib/consts/booking";
import BookingController from "$lib/controllers/booking_controller";
import MyBookingsUIController from "$lib/controllers/my_bookings_controller";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import type Booking from "$lib/models/booking/booking_model";
import type CustomerData from "$lib/models/general/customer_data";
import type MultiBooking from "$lib/models/multi_booking/multi_booking";
import type MultiBookingUser from "$lib/models/multi_booking/multi_booking_user";
import type MultiBookingUsersPerCustomer from "$lib/models/multi_booking/multi_booking_users_per_customer";
import type PaymentRequestPreview from "$lib/models/payment_hyp/payment_request/payment_request_preview";

import type PaymentRequestUser from "$lib/models/payment_hyp/payment_request/payment_request_user";
import TicketInfo from "$lib/models/payment_hyp/payment_request/ticket_info";
import type WorkerModel from "$lib/models/worker/worker_model";
import { needToHoldOn } from "$lib/utils/booking_utils";
import NotificationHandler from "../notifications/notification_handler";
import PaymentRequestHelper from "../payment_request/payment_request_helper";
import MultiBookingRepo from "./multi_booking_repo";

export default class MultiBookingHelper {
  private static _singleton: MultiBookingHelper = new MultiBookingHelper();

  private constructor() {}

  public static GI(): MultiBookingHelper {
    return MultiBookingHelper._singleton;
  }

  multiBookingRepo: MultiBookingRepo = new MultiBookingRepo();

  async signUsersToRecurence({
    recurrenceMultiBooking,
    dateForNewBooking,
    worker,
    addToCalendar,
    workerAction,
    fromPayment,
    multiBookingsPerCustomer,
    clientNote = "",
    noteText = "",
  }: {
    recurrenceMultiBooking: MultiBooking;
    dateForNewBooking: Date;
    worker: WorkerModel;
    addToCalendar: boolean;
    workerAction: boolean;
    fromPayment: boolean;
    multiBookingsPerCustomer: Record<string, MultiBookingUsersPerCustomer>;
    clientNote?: string;
    noteText?: string;
  }): Promise<MultiBooking | null> {
    const newMultiBooking =
      recurrenceMultiBooking.copyRecurrenceMultiBooking(dateForNewBooking);
    const newUsersBookingIds = new Set<string>();

    Object.entries(multiBookingsPerCustomer).forEach(([__, customer]) => {
      Object.entries(customer.multiBookingUsers).forEach(
        ([_, userMultiBookingObj]) => {
          userMultiBookingObj.copyDataToOrder({
            workerAction: workerAction,
            addToCalendar: false,
            worker: worker,
            business: BusinessInitializer.GI().business,
            user: UserInitializer.GI().user,
            bookingDate: newMultiBooking.bookingDate,
            needToHoldOn: needToHoldOn(newMultiBooking.bookingDate, worker),
            noteText: clientNote,
          });
          newUsersBookingIds.add(userMultiBookingObj.userBookingId);
          newMultiBooking.users[userMultiBookingObj.userBookingId] =
            userMultiBookingObj;
        }
      );
    });

    const customersToSave: Record<string, CustomerData> = {};
    Object.entries(newMultiBooking.bookingsForUsers).forEach(([_, booking]) => {
      const originalCustomer = multiBookingsPerCustomer[booking.customerPhone];
      const customer = UserInitializer.GI().user.customerDataFromBooking({
        booking,
      });

      if (customersToSave[booking.customerId] != undefined) {
        customer.amoutOfBookings =
          customersToSave[booking.customerId].amoutOfBookings;
      }
      customer.amoutOfBookings++;
      customersToSave[booking.customerId] = customer;
    });

    if (!workerAction) {
      MyBookingsUIController.markedBookings = new Set(
        Object.keys(newMultiBooking.users)
      );
    }

    const value = await this.multiBookingRepo.signUsersToRecurrenceMultiBooking(
      {
        recurrenceMultiBooking,
        newMultiBooking,
        worker,
        multiBookingsPerCustomer,
        fromPayment,
        customersToSave,
        workerAction,
      }
    );
    if (value) {
      this._addUsersLocally({
        multiBookingUsers: newMultiBooking.users,
      });

      NotificationHandler.GI().afterSignUsersToMultiBooking({
        multiBooking: newMultiBooking,
        addedUsersBookingsIds: newUsersBookingIds,
        worker,
        workerAction,
      });
      return newMultiBooking;
    }
    return null;
  }

  async signUsers({
    multiBooking,
    worker,
    workerAction,
    payemntRequestId,
    addToCalendar,
    multiBookingsPerCustomer,
    fromPayment = false,
    clientNote = "",
  }: {
    multiBooking: MultiBooking;
    worker: WorkerModel;
    workerAction: boolean;
    payemntRequestId: string | null;
    addToCalendar: boolean;
    multiBookingsPerCustomer: Record<string, MultiBookingUsersPerCustomer>;
    fromPayment?: boolean;
    clientNote?: string;
  }): Promise<MultiBooking | null> {
    let newOnHoldUsers = 0;
    let invoiceCoverCounter = 0;
    const newUsersObj: Record<string, MultiBookingUser> = {};
    const customersToSave: Record<string, CustomerData> = {};

    Object.entries(multiBookingsPerCustomer).forEach(([_, customer]) => {
      Object.entries(customer.multiBookingUsers).forEach(
        ([_, userMultiBookingObj]) => {
          userMultiBookingObj.copyDataToOrder({
            workerAction: workerAction,
            worker: worker,
            business: BusinessInitializer.GI().business,
            user: UserInitializer.GI().user,
            addToCalendar: addToCalendar,
            bookingDate: multiBooking.bookingDate,
            needToHoldOn: needToHoldOn(multiBooking.bookingDate, worker),
            noteText: clientNote,
          });
          if (userMultiBookingObj.status === BookingStatuses.waiting) {
            newOnHoldUsers++;
          }
          if (
            userMultiBookingObj.invoicePriceAmount >=
            multiBooking.treatment.price!.amount
          ) {
            invoiceCoverCounter++;
          }
          newUsersObj[userMultiBookingObj.userBookingId] = userMultiBookingObj;
          multiBooking.users[userMultiBookingObj.userBookingId] =
            userMultiBookingObj;

          const regularBooking = multiBooking.createRegularBooking(
            userMultiBookingObj.userBookingId
          );
          if (regularBooking != null) {
            const originalCustomer =
              multiBookingsPerCustomer[userMultiBookingObj.customerPhone];
            const customer = UserInitializer.GI().user.customerDataFromBooking({
              booking: regularBooking,
            });

            if (customersToSave[regularBooking.customerId] !== undefined) {
              customer.amoutOfBookings =
                customersToSave[regularBooking.customerId].amoutOfBookings;
            }
            customer.amoutOfBookings++;
            customersToSave[regularBooking.customerId] = customer;
          }
        }
      );
    });

    if (!workerAction) {
      MyBookingsUIController.markedBookings = new Set(
        Object.keys(multiBooking.users)
      );
    }

    let payemntRequestPreview: PaymentRequestPreview | undefined;
    if (payemntRequestId != null) {
      payemntRequestPreview =
        await PaymentRequestHelper.GI().getPaymentRequestPreviewById(
          payemntRequestId
        );
      multiBooking.paymentRequest =
        payemntRequestPreview?.toBookingPaymentRequestData;
    }

    const value = await this.multiBookingRepo.signUsersToMultiBooking({
      invoiceCoverCounter,
      multiBooking,
      customersToSave,
      multiBookingsPerCustomer,
      workerAction,
      newOnHoldUsers,
      fromPayment,
      newUsers: newUsersObj,
      worker,
    });
    if (value) {
      this._addUsersLocally({
        multiBookingUsers: newUsersObj,
      });

      NotificationHandler.GI().afterSignUsersToMultiBooking({
        multiBooking,
        addedUsersBookingsIds: new Set(Object.keys(newUsersObj)),
        worker,
        workerAction,
      });

      if (payemntRequestPreview != null) {
        const paymentUsers: { [customerId: string]: PaymentRequestUser } = {};
        for (const [userBookingId, user] of Object.entries(newUsersObj)) {
          if (paymentUsers[user.customerId] !== undefined) {
            paymentUsers[user.customerId].tickets[userBookingId] =
              TicketInfo.empty();
          } else {
            paymentUsers[user.customerId] = user.toPaymentRequestUser;
            paymentUsers[user.customerId].tickets = {
              [userBookingId]: TicketInfo.empty(),
            };
          }
        }
        await PaymentRequestHelper.GI().signNewUsersToPaymentRequest({
          paymentRequest: payemntRequestPreview.toPaymentRequest(
            worker.invoiceWorkerInfo,
            BusinessInitializer.GI().business.invoiceBusinessInfo
          ),
          paymentRequestPreview: payemntRequestPreview,
          users: paymentUsers,
        });
      } else {
        if (BookingController.pickedTimeObj != null) {
          BookingController.pickedTimeObj!.signedPaymentRequestId = undefined;
        }
      }

      return multiBooking;
    }
    return null;
  }

  async signOutUserUserAction({
    booking,
    worker,
  }: {
    booking: Booking;
    worker: WorkerModel;
  }): Promise<boolean> {
    const cancelDate = new Date();

    // Creating the customer object
    const newCustomerData: CustomerData =
      UserInitializer.GI().user.customerDataFromBooking({
        booking: booking,
        needDelete: true,
      });

    // Update the opened bookings in the UI
    MyBookingsUIController.markedBookings = new Set();

    return await this.multiBookingRepo
      .signOutUserFromMulti({
        worker,
        deleteFromUser: true,
        workerAction: false,
        userBooking: booking,
        customer: newCustomerData,
        cancelBooking: false,
        cancelDate,
      })
      .then(async (value) => {
        if (value) {
          const multiBooking = booking.toMultiBooking;
          this._removeUsersLocally({
            customersToRemove: {
              [newCustomerData.customerUuid]: newCustomerData,
            },
            worker,
            workerAction: false,
            multiBookingUsers: multiBooking.users,
            multiBooking,
            fromUpdate: false,
          });

          NotificationHandler.GI().afterSignOutFromMultiBooking({
            multiBooking: booking.toMultiBooking,
            removedUserBookingsIds: new Set([booking.bookingId]),
            worker,
            workerAction: false,
          });
        }

        return value;
      });
  }

  async updateNeedCancel({
    booking,
    worker,
  }: {
    booking: Booking;
    worker: WorkerModel;
  }): Promise<boolean> {
    return await this.multiBookingRepo
      .updateMultiBookingNeedCancel(booking)
      .then(async (value) => {
        if (value) {
          // No need to save locally, can't update need cancel on the past
          NotificationHandler.GI().afterNeedCancelToMultiBookingSigning({
            userBooking: booking,
            worker,
          });
        }
        return value;
      });
  }

  _addUsersLocally({
    multiBookingUsers,
  }: {
    multiBookingUsers: Record<string, MultiBookingUser>;
  }): void {
    // Update the marked bookings in the UI
    MyBookingsUIController.markedBookings = new Set(
      Object.keys(multiBookingUsers)
    );
  }

  _removeUsersLocally({}: {}): void {}
}
