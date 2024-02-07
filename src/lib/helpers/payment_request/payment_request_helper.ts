import {
  buisnessCollection,
  dataCollection,
  dataDoc,
  paymentRequestColletion,
  paymentsRequestsPreviewsCollection,
  usersCollection,
  workersCollection,
} from "$lib/consts/db";
import UserInitializer from "$lib/initializers/user_initializer";
import Booking from "$lib/models/booking/booking_model";
import type BookingReference from "$lib/models/payment_hyp/booking_reference";
import type Invoice from "$lib/models/payment_hyp/invoice/invoice";
import PaymentRequest from "$lib/models/payment_hyp/payment_request/payment_request";
import PaymentRequestPreview from "$lib/models/payment_hyp/payment_request/payment_request_preview";
import PaymentRequestUser from "$lib/models/payment_hyp/payment_request/payment_request_user";
import type TransactionModel from "$lib/models/payment_hyp/transaction";
import type UserModel from "$lib/models/user/user_model";
import WorkerModel from "$lib/models/worker/worker_model";
import { dateToMonthStr } from "$lib/utils/times_utils";
import BookingHelper from "../booking/booking_helper";
import DbPathesHelper from "../db_paths_helper";
import NotificationHandler from "../notifications/notification_handler";
import NotificationsHelper from "../notifications/notifications/notification_helper";
import PaymentsRequestRepo from "./payment_request_repo";

export default class PaymentRequestHelper {
  private static _singleton: PaymentRequestHelper = new PaymentRequestHelper();

  private constructor() {}

  public static GI(): PaymentRequestHelper {
    return PaymentRequestHelper._singleton;
  }

  paymentRequestRepo: PaymentsRequestRepo = new PaymentsRequestRepo();

  async signNewUsersToPaymentRequest({
    paymentRequest,
    users,
    paymentRequestPreview,
    worker,
    user,
  }: {
    paymentRequest: PaymentRequest;
    users: Record<string, PaymentRequestUser>;
    paymentRequestPreview: PaymentRequestPreview;
    worker?: WorkerModel | undefined;
    user?: UserModel | undefined;
  }): Promise<boolean> {
    //prepare the preview
    Object.entries(users).forEach(([userId, user]) => {
      if (paymentRequestPreview.users[userId] == null) {
        //detemind if new to know if add the whole payment request
        // json to the user
        const newUser = PaymentRequestUser.fromPaymentRequestUser(user);
        newUser.isNew = true;
        paymentRequestPreview.users[userId] = newUser;
      } else {
        paymentRequestPreview.users[userId]!.count += 1;
      }
    });
    const value = await this.paymentRequestRepo.signNewUsersToPaymentRequest(
      paymentRequest,
      paymentRequestPreview,
      users
    );
    if (value) {
      //add the new tickets of the users to the current user to save
      //the payment request locally
      if (user != null && users[user.id] != null) {
        Object.entries(users[user.id]!.tickets).forEach(
          ([transactionId, date]) => {
            paymentRequest.tickets[transactionId] = date;
          }
        );
      }
      this.savePaymentRequestLocally({
        paymentRequest: paymentRequest,
        userIdsToUpdate: new Set(Object.keys(users)),
      });
      if (worker != null) {
        NotificationHandler.GI().afterSavePaymentRequest(
          paymentRequest,
          users,
          worker
        );
      }
    }
    return value;
  }

  async declineRequest({
    preview,
    paymentRequest,
    bookingId,
  }: {
    preview: PaymentRequestPreview;
    paymentRequest?: PaymentRequest | undefined;
    bookingId?: string | null;
  }): Promise<boolean> {
    if (paymentRequest == null) {
      //get the full payment request from the user
      paymentRequest = await this.getPaymentRequestByPreview(
        preview,
        UserInitializer.GI().user
      );
    }
    if (paymentRequest == null) {
      return false;
    }
    ///take the user
    const paymentUser =
      preview.users[UserInitializer.GI().user.id] ??
      UserInitializer.GI().user.toPaymentRequestUser;
    if (bookingId != null && paymentRequest.tickets[bookingId] != null) {
      paymentRequest.tickets[bookingId]!.isDeclined = true;
    } else {
      paymentRequest.userDecline = true;
    }
    paymentUser.userDecline += 1;
    const value = await this.paymentRequestRepo.updateUserDeclineOnRequest(
      paymentRequest,
      paymentUser,
      true
    );
    if (value) {
      this.savePaymentRequestLocally({ paymentRequest });
      // get the worker fcm to send him a notification about
      // user pay the request
      const workerObj = await this.paymentRequestRepo
        .getDocRepo({
          path: `${buisnessCollection}/${paymentRequest.businessInfo.businessId}/${workersCollection}`,
          docId: paymentRequest.workerInfo.workerId,
        })
        .then((json) => {
          if (json.exists() && json.data() != null) {
            return WorkerModel.fromWorkerDocJson(json.data()!);
          }
          return null;
        });
      if (workerObj != null) {
        NotificationsHelper.GI().notifyWorkerUserDeclineTheRequest({
          paymentRequest,
          worker: workerObj,
          userName: UserInitializer.GI().user.name,
        });
      }
    }
    return value;
  }

  async finishPayOnRequest({
    paymentRequest,
    preview,
    transaction,
    bookingId,
    invoice,
  }: {
    paymentRequest: PaymentRequest;
    preview: PaymentRequestPreview;
    transaction: TransactionModel;
    bookingId?: string | undefined;
    invoice?: Invoice | undefined;
  }): Promise<boolean> {
    const user =
      preview.users[UserInitializer.GI().user.id] ??
      UserInitializer.GI().user.toPaymentRequestUser;
    //set the booking id to paid if exist
    if (bookingId != null && paymentRequest.tickets[bookingId] != null) {
      paymentRequest.tickets[bookingId]!.payments[transaction.id] =
        transaction.createdAt;
    } else {
      paymentRequest.userPayments[transaction.id] = transaction.createdAt;
    }
    //set the new transaction on the user payment request
    user.payments[transaction.id] = transaction.createdAt;
    const value = await this.paymentRequestRepo.finishPayOnRequest(
      paymentRequest,
      preview,
      user
    );
    if (value) {
      //put the new transa ction and invoices on the booking
      //that belong (if exist) to that payment request
      await this.handleTransactionChangesOnBooking({
        preview,
        paymentRequest,
        bookingId,
        invoice,
        transaction,
      });
      paymentRequest.payers++;
      this.savePaymentRequestLocally({ paymentRequest: paymentRequest });
      // get the worker fcm to send him a notification about
      // user pay the request
      const workerObj = await this.paymentRequestRepo
        .getDocRepo({
          path: `${buisnessCollection}/${paymentRequest.businessInfo.businessId}/${workersCollection}`,
          docId: paymentRequest.workerInfo.workerId,
        })
        .then((json) => {
          if (json.exists() && json.data() != null) {
            return WorkerModel.fromWorkerDocJson(json.data()!);
          }
          return null;
        });
      if (workerObj != null) {
        NotificationsHelper.GI().notifyWorkerThatUserFinishPayOnRequest({
          paymentRequest: paymentRequest,
          worker: workerObj,
          userId: UserInitializer.GI().user.id,
          customerName: UserInitializer.GI().user.name,
        });
      }
    }
    return value;
  }

  async handleTransactionChangesOnBooking({
    preview,
    paymentRequest,
    bookingId,
    invoice,
    transaction,
  }: {
    preview: PaymentRequestPreview;
    paymentRequest: PaymentRequest;
    bookingId?: string | undefined;
    invoice?: Invoice | undefined;
    transaction: TransactionModel;
  }): Promise<void> {
    if (preview.bookingReference == null) {
      return;
    }
    const previewDoc = await this.paymentRequestRepo.getDocRepo({
      path: paymentsRequestsPreviewsCollection,
      docId: preview.id,
    });
    if (!previewDoc.exists() || previewDoc.data() == null) {
      return;
    }
    const upToDatePreview = PaymentRequestPreview.fromJson(
      previewDoc.data()!,
      preview.id
    );
    const upToDateBookingRef = upToDatePreview.bookingReference;
    if (upToDateBookingRef == null) {
      return;
    }

    let booking: Booking | undefined = undefined;
    if (upToDateBookingRef.isMultiBooking) {
      booking = await this._getMultiBookingRefByReference(
        upToDateBookingRef,
        paymentRequest.businessInfo.businessId,
        bookingId
      );
    } else {
      booking = await this._getBookingByReference(upToDateBookingRef);
    }
    if (booking != null) {
      BookingHelper.GI().updateBookingTransaction({
        booking: booking,
        invoice: invoice,
        newBookingForReurrence: undefined,
        bookingInvoice: invoice?.bookingInvoiceData,
        bookingTransaction: transaction.bookingTransaction,
      });
    }
  }

  async _getBookingByReference(
    reference: BookingReference
  ): Promise<Booking | undefined> {
    const bookingsDoc = await this.paymentRequestRepo.getDocRepo({
      path: DbPathesHelper.GI().userBookingsPathByUser(
        UserInitializer.GI().user.id
      ),
      docId: dateToMonthStr(reference.date),
    });
    if (
      bookingsDoc.exists() &&
      bookingsDoc.data() != null &&
      reference.id != null &&
      bookingsDoc.data()![reference.id] != null
    ) {
      const bookingJson = bookingsDoc.data()![reference.id];
      return Booking.fromJson(bookingJson, reference.id);
    }
    return undefined;
  }

  async _getMultiBookingRefByReference(
    reference: BookingReference,
    businessId: string,
    neededBookingId?: string | undefined
  ): Promise<Booking | undefined> {
    const bookingsDoc = await this.paymentRequestRepo.getDocRepo({
      path: DbPathesHelper.GI().userBookingsPathByUser(
        UserInitializer.GI().user.id
      ),
      docId: dateToMonthStr(reference.date),
    });
    if (bookingsDoc.exists() && bookingsDoc.data() != null) {
      let foundBooking: Booking | undefined = undefined;
      for (const [bookingId, bookingJson] of Object.entries(
        bookingsDoc.data()
      )) {
        const booking = Booking.fromJson(bookingJson, bookingId);
        //on the multi booking reference there is no id the id is the time
        //str of the multi booking
        if (
          booking.isMultiRef &&
          booking.bookingDate === reference.date &&
          booking.cancelDate == null &&
          booking.workerId === reference.workerId &&
          booking.buisnessId === businessId
        ) {
          //incase there is booking id to compare to
          if (
            neededBookingId == null ||
            booking.bookingId === neededBookingId
          ) {
            foundBooking = booking;
          }
        }
      }
      return foundBooking;
    }
    return undefined;
  }

  async getPaymentRequestByPreview(
    preview: PaymentRequestPreview,
    user: UserModel
  ): Promise<PaymentRequest | undefined> {
    let paymentsRequests: Record<string, PaymentRequest> | undefined;

    if (this.isCurrentDoc(preview.createdAt)) {
      paymentsRequests = user.currentMonthPaymentRequest;
    }

    if (paymentsRequests != null) {
      const paymentRequest = paymentsRequests[preview.id];
      if (paymentRequest != null) {
        return paymentRequest;
      }
    }

    if (preview.users[user.id] != null) {
      paymentsRequests = await this._loadUserPaymentRequestFromDb({
        monthStr: preview.docId,
        userId: user.id,
      });
    } else {
      paymentsRequests = await this._loadWorkerPaymentRequestFromDb({
        monthStr: preview.docId,
        workerId: preview.workerId,
        businessId: preview.businessId,
      });
    }
    if (paymentsRequests == null) {
      return undefined;
    }
    return paymentsRequests![preview.id];
  }

  savePaymentRequestLocally({
    paymentRequest,

    userIdsToUpdate = new Set<string>(),
  }: {
    paymentRequest: PaymentRequest;

    userIdsToUpdate?: Set<string>;
  }): void {
    // Add documents to delete the local data for the user
    // The data currently in the user's local storage is not updated
    // Need to update it when the user enters the app
    if (!this.isCurrentDoc(paymentRequest.createdAt)) {
      // Add to the user local data
      UserInitializer.GI().addLocalDocToDelete({
        userId: paymentRequest.workerInfo.workerId,
        path: DbPathesHelper.GI().workerLocalPaymentsRequestPath(
          paymentRequest.workerInfo.workerId,
          paymentRequest.businessInfo.businessId
        ),
        docId: dateToMonthStr(paymentRequest.createdAt),
      });
    }

    if (
      userIdsToUpdate.size > 0 &&
      !this.isCurrentDoc(paymentRequest.createdAt)
    ) {
      userIdsToUpdate.forEach((userId: string) => {
        // Update the user to delete the local data doc because there is new
        // update to the doc and need to get the doc from the firebase again
        UserInitializer.GI().addLocalDocToDelete({
          userId,
          path: DbPathesHelper.GI().userLocalPaymentsRequestPath(userId),
          docId: dateToMonthStr(paymentRequest.createdAt),
        });
      });
    }

    //only update the worker
    if (!this.isCurrentDoc(paymentRequest.createdAt)) {
      // Update the worker to delete the local data doc because there is new
      // update to the doc and need to get the doc from the firebase again
      UserInitializer.GI().addLocalDocToDelete({
        userId: paymentRequest.workerInfo.workerId,
        path: DbPathesHelper.GI().workerLocalPaymentsRequestPathByRequest(
          paymentRequest
        ),
        docId: dateToMonthStr(paymentRequest.createdAt),
      });
    }
  }
  async _loadUserPaymentRequestFromDb({
    monthStr,
    userId,
  }: {
    monthStr: string;
    userId: string;
  }) {
    // Getting the month from db
    const resp = await this.paymentRequestRepo.getDocRepo({
      path: `${usersCollection}/${userId}/${dataCollection}/${dataDoc}/${paymentRequestColletion}`,
      docId: monthStr,
    });

    // If month doesn't exist or no data, return empty map
    if (!resp.exists || !resp.data()) {
      return {};
    }

    const paymentsRequests: Record<string, PaymentRequest> = {};
    // Parse the payment requests and return Map(id: PaymentRequest)
    Object.entries(resp.data()!).forEach(([PRId, PRJson]) => {
      const paymentRequestObj = PaymentRequest.fromJson(PRJson, PRId);
      paymentsRequests[PRId] = paymentRequestObj;
    });
    return paymentsRequests;
  }

  async _loadWorkerPaymentRequestFromDb({
    monthStr,
    workerId,
    businessId,
  }: {
    monthStr: string;
    workerId: string;
    businessId: string;
  }) {
    // Getting the month from db
    const resp = await this.paymentRequestRepo.getDocRepo({
      path: `${buisnessCollection}/${businessId}/${paymentRequestColletion}/${workerId}/${paymentRequestColletion}`,
      docId: monthStr,
    });

    // If month doesn't exist or no data, return empty map
    if (!resp.exists || !resp.data()) {
      return {};
    }

    const paymentsRequests: Record<string, PaymentRequest> = {};
    // Parse the payment requests and return Map(id: PaymentRequest)
    Object.entries(resp.data()!).forEach(([PRId, PRJson]) => {
      const paymentRequestObj = PaymentRequest.fromJson(PRJson, PRId);
      paymentsRequests[PRId] = paymentRequestObj;
    });
    return paymentsRequests;
  }

  async getPaymentRequestPreviewById(
    paymentPreviewId: string
  ): Promise<PaymentRequestPreview | undefined> {
    const json = await this.paymentRequestRepo.getDocRepo({
      path: paymentsRequestsPreviewsCollection,
      docId: paymentPreviewId,
    });

    if (json.exists() && json.data() != null) {
      return PaymentRequestPreview.fromJson(json.data()!, paymentPreviewId);
    }

    return undefined;
  }

  isCurrentDoc(date: Date): boolean {
    return (
      date.getMonth() == new Date().getMonth() &&
      date.getFullYear() == new Date().getFullYear()
    );
  }
}
