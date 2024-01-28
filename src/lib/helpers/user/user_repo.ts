import {
  bookingsCollection,
  bookingsObjectsCollection,
  buisnessCollection,
  clientsByPhoneDoc,
  dataCollection,
  dataDoc,
  invoicesCollection,
  paymentRequestColletion,
  paymentsRequestsPreviewsCollection,
  phoneDataCollections,
  phonesCollection,
  usersCollection,
  workersCollection,
} from "$lib/consts/db";
import Booking from "$lib/models/booking/booking_model";
import Invoice from "$lib/models/payment_hyp/invoice/invoice";
import PaymentRequest from "$lib/models/payment_hyp/payment_request/payment_request";
import PaymentRequestPreview from "$lib/models/payment_hyp/payment_request/payment_request_preview";
import PhoneDataResult from "$lib/models/resps/phone_data_result";
import type UserModel from "$lib/models/user/user_model";
import { Errors } from "$lib/services/errors/messages";
import { dateToDateStr, dateToTimeStr } from "$lib/utils/times_utils";
import { phoneToDocId } from "$lib/utils/user";
import type { Transaction } from "firebase/firestore";
import AppErrorsHelper from "../app_errors";
import GeneralRepo from "../general/general_repo";
import type { UserApi } from "./user_api";

export default class UserRepo extends GeneralRepo implements UserApi {
  constructor() {
    super();
  }

  async updatePublicUserField({
    userId,
    businessesIds,
    fieldName,
    cangeUserDoc = true,
    value,
  }: {
    userId: string;
    businessesIds: string[];
    fieldName: string;
    cangeUserDoc?: boolean;
    value: any;
  }): Promise<boolean> {
    console.log(value);
    const batch = this.getBatch;

    if (cangeUserDoc) {
      this.updateFieldInsideDocAsMap({
        batch,
        path: usersCollection,
        docId: userId,
        fieldName,
        value,
      });
    }

    this.updateFieldInsideDocAsMap({
      batch,
      path: `${usersCollection}/${userId}/${dataCollection}`,
      docId: dataDoc,
      fieldName,
      value,
    });

    businessesIds.forEach((businessId) => {
      this.updateFieldInsideDocAsMap({
        batch,
        path: `${buisnessCollection}/${businessId}/${workersCollection}`,
        docId: userId,
        fieldName,
        value,
      });
    });

    return await this.commmitBatch(batch);
  }

  async updatePublicUserFields({
    userId,
    businessesIds,
    cangeUserDoc = true,
    dataForWorker,
    data,
  }: {
    userId: string;
    businessesIds: string[];
    cangeUserDoc?: boolean;
    dataForWorker?: Record<string, any>;
    data: Record<string, any>;
  }): Promise<boolean> {
    const batch = this.getBatch;

    if (cangeUserDoc) {
      this.updateMultipleFieldsInsideDocAsMap({
        batch,
        path: usersCollection,
        docId: userId,
        data,
      });
    }

    this.updateMultipleFieldsInsideDocAsMap({
      batch,
      path: `${usersCollection}/${userId}/${dataCollection}`,
      docId: dataDoc,
      data,
    });

    businessesIds.forEach((businessId) => {
      this.updateMultipleFieldsInsideDocAsMap({
        batch,
        path: `${buisnessCollection}/${businessId}/${workersCollection}`,
        docId: userId,
        data: dataForWorker || data,
      });
    });

    return await this.commmitBatch(batch);
  }

  async createUser({ user }: { user: UserModel }): Promise<boolean> {
    const batch = this.getBatch;

    this.createDoc({
      batch: batch,
      path: usersCollection,
      docId: user.id,
      valueAsJson: user.toUserDocJson(),
    });

    this.setAsMap({
      batch,
      path: `${usersCollection}/${user.id}/${dataCollection}`,
      docId: dataDoc,
      data: user.userPublicData.toJson(),
    });

    return await this.commmitBatch(batch);
  }

  async mergePhoneDataWithUser({
    phone,
    userId,
    name,
  }: {
    phone: string;
    userId: string;
    name: string;
  }): Promise<PhoneDataResult | undefined> {
    const phoneDataResult = new PhoneDataResult();
    const encryptedPhone = phoneToDocId(phone);
    const phoneAsCollection = phone.replaceAll("-", "");

    const transacionCommands = async (transaction: Transaction) => {
      const userDoc = await this.transactionGet(
        transaction,
        phonesCollection,
        encryptedPhone
      );
      if (userDoc.exists() && userDoc.data()["userId"] != userId) {
        AppErrorsHelper.GI().error = Errors.alreadyExistPhone;
        return false;
      }

      const clientsDoc = await this.transactionGet(
        transaction,
        `${phonesCollection}/${encryptedPhone}/${phoneAsCollection}`,
        clientsByPhoneDoc
      );
      if (clientsDoc.exists() && clientsDoc.data() != undefined) {
        Object.entries<Record<string, string>>(
          clientsDoc.data()["clientAt"]
        ).forEach(([businessId, workerIds]) => {
          if (Object.keys(workerIds).length === 0) {
            return;
          }
          phoneDataResult.clientAt[businessId] = new Set<string>();
          Object.entries<string>(workerIds).forEach(([workerId, _]) => {
            phoneDataResult.clientAt[businessId]!.add(workerId);
          });
        });
      }

      const bookings = await this.getAllDocsAndIdsInsideCollection({
        path: `${phonesCollection}/${encryptedPhone}/${phoneAsCollection}/${phoneDataCollections}/${bookingsCollection}`,
      });
      Object.entries(bookings).forEach(([docId, bookingsDoc]) => {
        phoneDataResult.bookings[docId] ??= {};
        Object.entries(bookingsDoc).forEach(([bookingId, bookingJson]) => {
          const booking = Booking.fromJson(bookingJson, bookingId);
          booking.customerId = userId;
          booking.isUserExist = true;
          phoneDataResult.bookings[docId]![bookingId] = booking;
        });
      });

      const invoices = await this.getAllDocsAndIdsInsideCollection({
        path: `${phonesCollection}/${encryptedPhone}/${phoneAsCollection}/${phoneDataCollections}/${invoicesCollection}`,
      });
      Object.entries(invoices).forEach(([monthStr, month]) => {
        phoneDataResult.invoices[monthStr] ??= {};
        Object.entries(month).forEach(([invoiceId, invoiceJson]) => {
          const invoice = Invoice.fromJson(invoiceJson, invoiceId);
          phoneDataResult.invoices[monthStr]![invoiceId] = invoice;
        });
      });

      const paymentRequets = await this.getAllDocsAndIdsInsideCollection({
        path: `${phonesCollection}/${encryptedPhone}/${phoneAsCollection}/${phoneDataCollections}/${paymentRequestColletion}`,
      });
      Object.entries(paymentRequets).forEach(([monthStr, month]) => {
        phoneDataResult.paymentsRequests[monthStr] ??= {};
        Object.entries(month).forEach(
          ([paymentRequestId, paymentRequestJson]) => {
            const paymentRequest = PaymentRequest.fromJson(
              paymentRequestJson,
              paymentRequestId
            );
            phoneDataResult.paymentsRequests[monthStr]![paymentRequestId] =
              paymentRequest;
          }
        );
      });

      if (
        phoneDataResult.clientAt.isNotEmpty ||
        phoneDataResult.bookingCount > 0
      ) {
        this.transactionSetAsMap({
          transaction: transaction,
          path: `${usersCollection}/${userId}/${dataCollection}`,
          docId: dataDoc,
          data: {
            clientAt: phoneDataResult.clientAtJson,
            bookingsPreviews: phoneDataResult.bookingsPreviewsJson,
          },
        });
      }

      this.transactionCreateDoc({
        transaction: transaction,
        path: phonesCollection,
        docId: phoneToDocId(phone),
        value: {
          userId: userId,
          name: name,
        },
      });

      Object.entries<Record<string, any>>(phoneDataResult.bookingsJson).forEach(
        ([docId, json]) => {
          this.transactionSetAsMap({
            transaction: transaction,
            path: `${usersCollection}/${userId}/${dataCollection}/${dataDoc}/${bookingsCollection}`,
            docId: docId,
            data: json,
          });
        }
      );

      Object.entries<Record<string, any>>(phoneDataResult.invoicesJson).forEach(
        ([monthStr, json]) => {
          this.transactionSetAsMap({
            transaction: transaction,
            path: `${usersCollection}/${userId}/${dataCollection}/${dataDoc}/${invoicesCollection}`,
            docId: monthStr,
            data: json,
          });
        }
      );

      Object.entries<Record<string, any>>(
        phoneDataResult.paymentRequestJson
      ).forEach(([monthStr, json]) => {
        this.transactionSetAsMap({
          transaction: transaction,
          path: `${usersCollection}/${userId}/${dataCollection}/${dataDoc}/${paymentRequestColletion}`,
          docId: monthStr,
          data: json,
        });
      });

      return true;
    };

    return await this.runTransaction(transacionCommands).then(async (value) => {
      if (value) {
        const futures: Promise<any>[] = [];

        if (phoneDataResult.clientAt.isNotEmpty) {
          futures.push(
            this.deleteDoc({
              batch: this.getBatch,
              path: `${phonesCollection}/${encryptedPhone}/${phoneAsCollection}`,
              docId: clientsByPhoneDoc,
            })
          );
        }

        Object.entries(phoneDataResult.invoices).forEach(([monthStr, _]) => {
          futures.push(
            this.deleteDoc({
              batch: this.getBatch,
              path: `${phonesCollection}/${encryptedPhone}/${phoneAsCollection}/${phoneDataCollections}/${invoicesCollection}`,
              docId: monthStr,
            })
          );
        });

        Object.entries(phoneDataResult.paymentsRequests).forEach(
          ([monthStr, _]) => {
            futures.push(
              this.deleteDoc({
                batch: this.getBatch,
                path: `${phonesCollection}/${encryptedPhone}/${phoneAsCollection}/${phoneDataCollections}/${paymentRequestColletion}`,
                docId: monthStr,
              })
            );
          }
        );
        Object.entries(phoneDataResult.bookings).forEach(([docId, _]) => {
          futures.push(
            this.deleteDoc({
              batch: this.getBatch,
              path: `${phonesCollection}/${encryptedPhone}/${phoneAsCollection}/${phoneDataCollections}/${bookingsCollection}`,
              docId: docId,
            })
          );
        });

        if (phoneDataResult.bookings.isNotEmpty) {
          Object.entries<Record<string, Booking>>(
            phoneDataResult.bookings
          ).forEach(([docId, bookingsDoc]) => {
            Object.entries<Booking>(bookingsDoc).forEach(
              ([bookingId, booking]) => {
                futures.push(
                  this.updateMultipleFieldsInsideDocAsMapRepo({
                    path: `${buisnessCollection}/${booking.buisnessId}/${workersCollection}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
                    docId: dateToDateStr(booking.bookingDate),
                    data: booking.isMultiRef
                      ? {
                          [`${dateToTimeStr(
                            booking.bookingDate
                          )}.users.${bookingId}.customerId`]: userId,
                          [`${dateToTimeStr(
                            booking.bookingDate
                          )}.users.${bookingId}.isUserExist`]: true,
                          [`${dateToTimeStr(
                            booking.bookingDate
                          )}.users.${bookingId}.isVerifiedPhone`]: true,
                        }
                      : {
                          [`${bookingId}.customerId`]: userId,
                          [`${bookingId}.isUserExist`]: true,
                          [`${bookingId}.isVerifiedPhone`]: true,
                        },
                  })
                );
              }
            );
          });
        }

        if (phoneDataResult.paymentsRequests.isNotEmpty) {
          Object.entries<Record<string, PaymentRequest>>(
            phoneDataResult.paymentsRequests
          ).forEach(([monthStr, paymentsRequestMonth]) => {
            Object.entries<PaymentRequest>(paymentsRequestMonth).forEach(
              ([paymentRequestId, paymentRequest]) => {
                futures.push(
                  new Promise(async () => {
                    const previewJson = await this.getDocSRV({
                      path: paymentsRequestsPreviewsCollection,
                      docId: paymentRequestId,
                    });

                    if (
                      previewJson.data() === undefined ||
                      !previewJson.exists()
                    ) {
                      return;
                    }

                    const preview = PaymentRequestPreview.fromJson(
                      previewJson.data(),
                      paymentRequestId
                    );
                    const paymentUser = preview.users[phone];

                    if (paymentUser == null) {
                      return;
                    }

                    paymentUser.isExist = true;
                    paymentUser.isVerifiedPhone = true;
                    paymentUser.userId = userId;

                    await this.updateMultipleFieldsInsideDocAsMapRepo({
                      path: paymentsRequestsPreviewsCollection,
                      docId: paymentRequestId,
                      data: {
                        [`users.${phone}`]: undefined,
                        [`users.${userId}`]: paymentUser.toJson(),
                      },
                    });
                  })
                );
              }
            );
          });
        }

        if (futures.length > 0) {
          await Promise.all(futures);
        }

        return phoneDataResult;
      }

      return undefined;
    });
  }
}
