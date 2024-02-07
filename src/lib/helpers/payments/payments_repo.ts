import {
  buisnessCollection,
  dataCollection,
  dataDoc,
  onlinePaymentsCollection,
  paymentsCollection,
  usersCollection,
} from "$lib/consts/db";
import type TransactionModel from "$lib/models/payment_hyp/transaction";
import { dateToMonthStr } from "$lib/utils/times_utils";
import GeneralRepo from "../general/general_repo";
import type { PaymentApi } from "./payments_api";

export default class PaymentsRepo extends GeneralRepo implements PaymentApi {
  async savePaymentInDb({
    transaction,
    workerId,
    businessId,
  }: {
    transaction: TransactionModel;
    workerId: string | null;
    businessId: string;
  }): Promise<boolean> {
    if (!workerId && !transaction.userId) {
      return true;
    }

    const batch = this.getBatch;

    if (workerId) {
      this.setAsMap({
        batch,
        path: `${buisnessCollection}/${businessId}/${paymentsCollection}/${workerId}/${onlinePaymentsCollection}`,
        docId: dateToMonthStr(transaction.createdAt),
        data: { [transaction.id]: transaction },
      });
    }

    if (transaction.userId) {
      this.setAsMap({
        batch,
        path: `${usersCollection}/${transaction.userId}/${dataCollection}/${dataDoc}/${paymentsCollection}`,
        docId: dateToMonthStr(transaction.createdAt),
        data: { [transaction.id]: transaction },
      });
    }

    return await this.commmitBatch(batch);
  }

  async updatePaymentInDb({
    transaction,
    workerId,
    businessId,
  }: {
    transaction: TransactionModel;
    workerId: string;
    businessId: string;
  }): Promise<boolean> {
    const futures: Promise<boolean>[] = [];

    futures.push(
      this.updateFieldInsideDocAsMapRepo({
        path: `${buisnessCollection}/${businessId}/${paymentsCollection}/${workerId}/${onlinePaymentsCollection}`,
        docId: dateToMonthStr(transaction.createdAt),
        fieldName: transaction.id,
        value: transaction,
      })
    );

    if (transaction.userId) {
      futures.push(
        this.updateFieldInsideDocAsMapRepo({
          path: `${usersCollection}/${transaction.userId}/${dataCollection}/${dataDoc}/${paymentsCollection}`,
          docId: dateToMonthStr(transaction.createdAt),
          fieldName: transaction.id,
          value: transaction,
        })
      );
    }

    const responses = await Promise.all(futures);
    return !responses.includes(false);
  }
}
