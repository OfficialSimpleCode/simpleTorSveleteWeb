import {
  buisnessCollection,
  clientsByPhoneDoc,
  customersDataDoc,
  dataCollection,
  dataDoc,
  phonesCollection,
  usersCollection,
  workersCollection,
} from "$lib/consts/db";
import type CustomerData from "$lib/models/general/customer_data";
import type WorkerModel from "$lib/models/worker/worker_model";
import { phoneToDocId } from "$lib/utils/user";
import type { Transaction } from "firebase/firestore";
import GeneralRepo from "../general/general_repo";
import type { WorkerApi } from "./worker_api";

export default class WorkerRepo extends GeneralRepo implements WorkerApi {
  constructor() {
    super();
  }

  async addCustomers({
    customers,
    businessId,
    worker,
  }: {
    customers: CustomerData[];
    businessId: string;
    worker: WorkerModel;
  }): Promise<boolean> {
    const futures: Promise<boolean>[] = [];

    const path = `${buisnessCollection}/${businessId}/${workersCollection}`;
    //split the customers to parts of 200 max to avoid any crash
    //of the transaction

    for (
      let transactionIndex = 0;
      transactionIndex < Math.ceil(customers.length / 200);
      transactionIndex++
    ) {
      const transacionCommands = async (transaction: Transaction) => {
        const customersJson: { [key: string]: any } = {};
        const transactionFutures: Promise<void>[] = [];
        for (
          let customerIndex = 0;
          customerIndex <
          Math.min(200, customers.length - transactionIndex * 200);
          customerIndex++
        ) {
          transactionFutures.push(
            (async () => {
              const customer =
                customers[transactionIndex * 200 + customerIndex];

              //check if the user exist
              if (
                customer.addedManually &&
                customer.customerUuid === customer.phoneNumber
              ) {
                const userDoc = await this.transactionGet(
                  transaction,
                  phonesCollection,
                  phoneToDocId(customer.phoneNumber)
                );
                if (userDoc.exists()) {
                  customer.customerUuid = userDoc.data()!.userId;
                  customer.name = userDoc.data()!.name;
                  customer.addedManually = false;
                  customer.isVerifiedPhone = true;
                }
              }

              if (customer.customerUuid !== customer.phoneNumber) {
                this.transactionSetAsMap({
                  transaction,
                  path: `${usersCollection}/${customer.customerUuid}/${dataCollection}`,
                  docId: dataDoc,
                  data: {
                    clientAt: {
                      [businessId]: { [worker.id]: "" },
                    },
                  },
                });
              } else {
                this.transactionSetAsMap({
                  transaction,
                  path: `${phonesCollection}/${phoneToDocId(
                    customer.phoneNumber
                  )}/${customer.phoneNumber.replaceAll("-", "")}`,
                  docId: clientsByPhoneDoc,
                  data: {
                    clientAt: {
                      [businessId]: { [worker.id]: "" },
                    },
                  },
                });
              }

              customersJson[customer.customerUuid] = customer.toJson();
            })()
          );
        }

        await Promise.all(transactionFutures);

        if (Object.keys(customersJson).length > 0) {
          this.transactionSetAsMap({
            transaction,
            path: `${path}/${worker.id}/${dataCollection}`,
            docId: customersDataDoc,
            data: { data: customersJson },
          });
        }

        return true;
      };
      futures.push(this.runTransaction(transacionCommands));
    }

    const resp = await Promise.all(futures);
    return !resp.includes(false);
  }
}
