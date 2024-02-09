import {
  NumericCommands,
  buisnessCollection,
  dataCollection,
  dataDoc,
  paymentRequestColletion,
  paymentsRequestsPreviewsCollection,
  phoneDataCollections,
  phonesCollection,
  usersCollection,
} from "$lib/consts/db";
import PaymentRequest from "$lib/models/payment_hyp/payment_request/payment_request";

import type PaymentRequestPreview from "$lib/models/payment_hyp/payment_request/payment_request_preview";
import type PaymentRequestUser from "$lib/models/payment_hyp/payment_request/payment_request_user";
import { dateToMonthStr } from "$lib/utils/times_utils";
import type { Transaction } from "firebase/firestore";
import GeneralRepo from "../general/general_repo";
import type { PaymentRequestApi } from "./payment_request_api";

export default class PaymentsRequestRepo
  extends GeneralRepo
  implements PaymentRequestApi
{
  async signNewUsersToPaymentRequest(
    paymentRequest: PaymentRequest,
    preview: PaymentRequestPreview,
    users: Record<string, PaymentRequestUser>
  ): Promise<boolean> {
    const transacionCommands = async (transaction: Transaction) => {
      // Set the preview doc
      this.transactionUpdateMultipleFieldsAsMap({
        transaction,
        path: paymentsRequestsPreviewsCollection,
        docId: paymentRequest.id,
        data: preview.toJson(),
      });

      Object.entries(users).forEach(([userId, user]) => {
        const ticketsJson: Record<string, any> = {};
        for (const [bookingId, ticket] of Object.entries(user.tickets)) {
          ticketsJson[`${paymentRequest.id}.tickets.${bookingId}`] =
            ticket.toJson();
        }
        // Save on the user doc
        const userPath = user.isExist
          ? `${usersCollection}/${userId}/${dataCollection}/${dataDoc}/${paymentRequestColletion}`
          : `${phonesCollection}/${user.customerHashPhone}/${user.customerPhoneAsCollection}/${phoneDataCollections}/${paymentRequestColletion}`;
        if (user.isNew || !user.isExist) {
          this.transactionSetAsMap({
            transaction,
            path: userPath,
            docId: dateToMonthStr(paymentRequest.createdAt),
            data: { [paymentRequest.id]: paymentRequest.toJson() },
          });
        } else if (ticketsJson.isNotEmpty) {
          this.transactionUpdateMultipleFieldsAsMap({
            transaction,
            path: userPath,
            docId: dateToMonthStr(paymentRequest.createdAt),
            data: ticketsJson,
          });
        }
      });
      return true;
    };

    return await this.runTransaction(transacionCommands);
  }

  async updateUserDeclineOnRequest(
    paymentRequest: PaymentRequest,
    paymentUser: PaymentRequestUser,
    decline: boolean
  ): Promise<boolean> {
    const batch = this.getBatch;

    // Set the preview doc
    this.updateFieldInsideDocAsMap({
      batch,
      path: paymentsRequestsPreviewsCollection,
      docId: paymentRequest.id,
      fieldName: `users.${paymentUser.userId}`,
      value: paymentUser.toJson(),
    });

    this.updateFieldInsideDocAsMap({
      batch,
      path: `${usersCollection}/${paymentUser.userId}/${dataCollection}/${dataDoc}/${paymentRequestColletion}`,
      docId: dateToMonthStr(paymentRequest.createdAt),
      fieldName: paymentRequest.id,
      value: paymentRequest.toJson(),
    });

    return await this.commmitBatch(batch);
  }

  async finishPayOnRequest(
    paymentRequest: PaymentRequest,
    preview: PaymentRequestPreview,
    user: PaymentRequestUser
  ): Promise<boolean> {
    const batch = this.getBatch;

    // Update on the worker collection
    this.updateFieldInsideDocAsMap({
      batch,
      path: `${buisnessCollection}/${paymentRequest.businessInfo.businessId}/${paymentRequestColletion}/${paymentRequest.workerInfo.workerId}/${paymentRequestColletion}`,
      docId: paymentRequest.docId,
      fieldName: `${paymentRequest.id}.payers`,
      command: NumericCommands.increment,
    });

    // Update the preview doc
    this.updateFieldInsideDocAsMap({
      batch,
      path: paymentsRequestsPreviewsCollection,
      docId: paymentRequest.id,
      fieldName: `users.${user.userId}`,
      value: user.toJson(),
    });

    return await this.commmitBatch(batch).then((value) => {
      if (value) {
        const userPaymentRequest = { ...paymentRequest.toJson() };
        delete userPaymentRequest["payers"];
        if (preview.users[user.userId] != null) {
          this.updateFieldInsideDocAsMapRepo({
            path: `${usersCollection}/${user.userId}/${dataCollection}/${dataDoc}/${paymentRequestColletion}`,
            docId: dateToMonthStr(paymentRequest.createdAt),
            fieldName: paymentRequest.id,
            value: userPaymentRequest,
          });
        } else {
          this.setAsMapWithMergeRepo({
            path: `${usersCollection}/${user.userId}/${dataCollection}/${dataDoc}/${paymentRequestColletion}`,
            docId: dateToMonthStr(paymentRequest.createdAt),
            valueAsJson: { [paymentRequest.id]: userPaymentRequest },
          });
        }
      }
      return value;
    });
  }
}
