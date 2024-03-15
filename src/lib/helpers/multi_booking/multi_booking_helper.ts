import { BookingStatuses } from "$lib/consts/booking";
import BookingController from "$lib/controllers/booking_controller";
import MyBookingsUIController from "$lib/controllers/my_bookings_controller";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import type Booking from "$lib/models/booking/booking_model";
import type CustomerData from "$lib/models/general/customer_data";
import type MultiBooking from "$lib/models/multi_booking/multi_booking";
import type MultiBookingUser from "$lib/models/multi_booking/multi_booking_user";
import MultiBookingUsersPerCustomer from "$lib/models/multi_booking/multi_booking_users_per_customer";
import type PaymentRequestPreview from "$lib/models/payment_hyp/payment_request/payment_request_preview";

import type PaymentRequestUser from "$lib/models/payment_hyp/payment_request/payment_request_user";
import TicketInfo from "$lib/models/payment_hyp/payment_request/ticket_info";
import type WorkerModel from "$lib/models/worker/worker_model";
import { needToHoldOn } from "$lib/utils/booking_utils";
import { dateToDateStr, setToMidNight } from "$lib/utils/times_utils";
import { getManagerIdFromBusinessId } from "$lib/utils/worker";
import DbPathesHelper from "../db_paths_helper";
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

    workerAction,
    fromPayment,
    multiBookingsPerCustomer,
    clientNote = "",
  }: {
    recurrenceMultiBooking: MultiBooking;
    dateForNewBooking: Date;
    worker: WorkerModel;

    workerAction: boolean;
    fromPayment: boolean;
    multiBookingsPerCustomer: Record<string, MultiBookingUsersPerCustomer>;
    clientNote?: string;
  }): Promise<MultiBooking | undefined> {
    const newMultiBooking =
      recurrenceMultiBooking.copyRecurrenceMultiBooking(dateForNewBooking);
    const newUsersBookingIds = new Set<string>();

    Object.entries(multiBookingsPerCustomer).forEach(([__, customer]) => {
      const customerToIterate: MultiBookingUsersPerCustomer =
        MultiBookingUsersPerCustomer.fromMultiBookingUsersPerCustomer(customer);
      if (customer.multiBookingUsers.isNotEmpty) {
        Object.values(customerToIterate.multiBookingUsers)[0].canRemind = true;
      }
      Object.entries(customerToIterate.multiBookingUsers).forEach(
        ([_, userMultiBookingObj]) => {
          userMultiBookingObj.copyDataToOrder({
            workerAction: workerAction,

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
    return undefined;
  }

  async signUsers({
    multiBooking,
    worker,
    workerAction,
    payemntRequestId,
    multiBookingsPerCustomer,
    fromPayment = false,
    clientNote = "",
  }: {
    multiBooking: MultiBooking;
    worker: WorkerModel;
    workerAction: boolean;
    payemntRequestId: string | undefined;
    multiBookingsPerCustomer: Record<string, MultiBookingUsersPerCustomer>;
    fromPayment?: boolean;
    clientNote?: string;
  }): Promise<MultiBooking | undefined> {
    console.log("signUsers", multiBooking.treatment);
    let newOnHoldUsers = 0;
    let invoiceCoverCounter = 0;
    const newUsersObj: Record<string, MultiBookingUser> = {};
    const customersToSave: Record<string, CustomerData> = {};

    Object.entries(multiBookingsPerCustomer).forEach(([_, customer]) => {
      const customerToIterate: MultiBookingUsersPerCustomer =
        MultiBookingUsersPerCustomer.fromMultiBookingUsersPerCustomer(customer);
      customerToIterate.updateNeedToRemind({
        multiBooking: multiBooking,
        user: UserInitializer.GI().user,
      });

      Object.entries(customerToIterate.multiBookingUsers).forEach(
        ([_, userMultiBookingObj]) => {
          userMultiBookingObj.copyDataToOrder({
            workerAction: workerAction,
            worker: worker,
            business: BusinessInitializer.GI().business,
            user: UserInitializer.GI().user,

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

            if (customersToSave[regularBooking.customerId] != null) {
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

      //add the payment request on the multi booking to the user
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
    return undefined;
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
            worker: worker,
            workerAction: false,
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

  async removeMultiBookingLocally({
    multiBooking,
    worker,
  }: {
    multiBooking: MultiBooking;
    worker: WorkerModel;
  }): Promise<void> {
    if (multiBooking.bookingDate < setToMidNight(new Date())) {
      UserInitializer.GI().addLocalDocToDelete({
        userId: worker.id,
        path: DbPathesHelper.GI().workerLocalBookingsPath(
          multiBooking.workerId,
          multiBooking.buisnessId
        ),
        docId: dateToDateStr(multiBooking.bookingDate),
      });
    }

    //update also in the manager - manager can access worjer bookings
    //so need to iupdate it on the manager too
    const managerId = getManagerIdFromBusinessId(multiBooking.buisnessId);
    //no need to update the manager it is the worker we update before
    if (
      UserInitializer.GI().user.id != managerId &&
      managerId != multiBooking.workerId
    ) {
      if (multiBooking.bookingDate < setToMidNight(new Date())) {
        UserInitializer.GI().addLocalDocToDelete({
          userId: managerId,
          path: DbPathesHelper.GI().workerLocalBookingsPath(
            multiBooking.workerId,
            multiBooking.buisnessId
          ), //get worker path
          docId: dateToDateStr(multiBooking.bookingDate),
        });
      }
    }
  }

  async saveMultiBookingLocaly({
    multiBooking,

    recurrenceMultiBooking,
  }: {
    multiBooking: MultiBooking;
    recurrenceMultiBooking?: MultiBooking;
  }): Promise<void> {
    // PAST multi booking

    // Update in the worker
    await this.addMultiBookingToUserLocalData({
      multiBooking,
      userToUpdate: multiBooking.workerId,
      recurrenceMultiBooking,
    });

    // Update also in the manager - manager can access worker bookings
    // So need to update it on the manager too
    const managerId = getManagerIdFromBusinessId(multiBooking.buisnessId);
    // No need to update the manager, it is the worker we update before
    if (managerId !== multiBooking.workerId) {
      await this.addMultiBookingToUserLocalData({
        multiBooking,
        userToUpdate: managerId,
        recurrenceMultiBooking,
      });
    }
  }

  async addMultiBookingToUserLocalData({
    multiBooking,
    userToUpdate,
    recurrenceMultiBooking,
  }: {
    multiBooking: MultiBooking;
    userToUpdate: string;
    recurrenceMultiBooking?: MultiBooking;
  }): Promise<void> {
    // Add the days to delete the bookings data to the user
    // The data that is currently in the user phone is not updated
    // Need to update it when the user enters the app
    if (multiBooking.bookingDate < setToMidNight(new Date())) {
      UserInitializer.GI().addLocalDocToDelete({
        userId: userToUpdate,
        path: DbPathesHelper.GI().workerLocalBookingsPath(
          multiBooking.workerId,
          multiBooking.buisnessId
        ), // Get the worker booking path
        docId: dateToDateStr(multiBooking.bookingDate),
      });
    }
    if (
      recurrenceMultiBooking &&
      recurrenceMultiBooking.bookingDate < setToMidNight(new Date())
    ) {
      recurrenceMultiBooking.recurrenceEvent?.exceptionDates.add(
        dateToDateStr(multiBooking.bookingDate)
      );
      UserInitializer.GI().addLocalDocToDelete({
        userId: userToUpdate,
        path: DbPathesHelper.GI().workerLocalBookingsPath(
          multiBooking.workerId,
          recurrenceMultiBooking.buisnessId
        ), // Get the worker booking path
        docId: dateToDateStr(recurrenceMultiBooking.bookingDate),
      });
    }
  }
}
