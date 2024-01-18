// Import necessary dependencies

import type { NumericCommands } from "$lib/consts/db";
import FirestoreDataBase from "$lib/services/external_services/firestore";
import {
  type DocumentData,
  type DocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";

export default class GeneralRepo
  extends FirestoreDataBase
  implements GeneralApi
{
  constructor() {
    super();
  }
  async getDocRepo({
    path,
    docId,
    insideEnviroments = true,
  }: {
    path: string;
    docId: string;
    insideEnviroments?: boolean;
  }): Promise<DocumentSnapshot<DocumentData, DocumentData> | undefined> {
    return await super.getDocSRV({
      path: path,
      docId: docId,
      insideEnviroments: insideEnviroments,
    });
  }

  async createDocRepo({
    path,
    docId,
    valueAsJson,
    insideEnviroments = true,
    mergeIfExist = false,
  }: {
    path: string;
    docId: string;
    valueAsJson: any;
    insideEnviroments?: boolean;
    mergeIfExist?: boolean;
  }): Promise<boolean> {
    const batch = this.getBatch;
    super.createDoc({
      batch,
      path,
      docId,
      valueAsJson,
      insideEnviroments: insideEnviroments,
      mergeIfExist: mergeIfExist,
    });
    return await this.commmitBatch(batch);
  }

  // async updateFieldInsideDocAsArrayRepo({
  //   path,
  //   docId,
  //   fieldName,
  //   value,
  //   command,
  // }: {
  //   path: string;
  //   docId: string;
  //   fieldName: string;
  //   value: any;
  //   command: ArrayCommands;
  // }): Promise<boolean> {
  //   const batch = getBatch;
  //   super.updateFieldInsideDocAsArray({
  //     batch,
  //     path,
  //     docId,
  //     fieldName,
  //     value,
  //     command,
  //   });
  //   return await commmitBatch({ batch });
  // }

  // async updateMultipleFieldsInsideDocAsArrayRepo({
  //   path,
  //   docId,
  //   data,
  // }: {
  //   path: string;
  //   docId: string;
  //   data: Map<string, any>;
  // }): Promise<boolean> {
  //   const batch = getBatch();
  //   super.updateMultipleFieldsInsideDocAsArray({
  //     batch,
  //     path,
  //     docId,
  //     data,
  //   });
  //   return await commmitBatch( batch );
  // }

  async updateFieldInsideDocAsMapRepo({
    path,
    docId,
    fieldName,
    value,
    insideEnviroments = true,
    command = null,
  }: {
    path: string;
    docId: string;
    fieldName: string;
    value: any;
    insideEnviroments?: boolean;
    command?: NumericCommands | null;
  }): Promise<boolean> {
    const batch = this.getBatch;
    this.updateFieldInsideDocAsMap({
      batch: batch,
      path: path,
      docId: docId,
      fieldName: fieldName,
      value: value,
      command: command,
      insideEnviroments: insideEnviroments,
    });
    return await this.commmitBatch(batch);
  }

  async updateMultipleFieldsInsideDocAsMapRepo({
    path,
    docId,
    data,
    insideEnviroments = true,
  }: {
    path: string;
    docId: string;
    data: Map<string, any>;
    insideEnviroments?: boolean;
  }): Promise<boolean> {
    const batch = this.getBatch;
    super.updateMultipleFieldsInsideDocAsMap({
      batch: batch,
      path: path,
      docId: docId,
      data: data,
      insideEnviroments: insideEnviroments,
    });
    return await this.commmitBatch(batch);
  }

  async deleteDocRepo({
    path,
    docId,
  }: {
    path: string;
    docId: string;
  }): Promise<boolean> {
    const batch = this.getBatch;
    super.deleteDoc({ batch, path, docId });
    return await this.commmitBatch(batch);
  }

  async setDocRepo({
    path,
    docId,
    valueAsJson,
    insideEnviroments = true,
  }: {
    path: string;
    docId: string;
    valueAsJson: any;
    insideEnviroments?: boolean;
  }): Promise<boolean> {
    const batch = this.getBatch;
    super.setDoc({
      batch: batch,
      path: path,
      docId: docId,
      valueToSet: valueAsJson,
      insideEnviroments: insideEnviroments,
    });
    return await this.commmitBatch(batch);
  }

  async setAsMapWithMergeRepo({
    path,
    docId,
    valueAsJson,
    insideEnviroments = true,
  }: {
    path: string;
    docId: string;
    valueAsJson: any;
    insideEnviroments?: boolean;
  }): Promise<boolean> {
    const batch = this.getBatch;
    super.setAsMap({
      batch: batch,
      path: path,
      docId: docId,
      data: valueAsJson,
      insideEnviroments: insideEnviroments,
    });
    return await this.commmitBatch(batch);
  }

  docListenerRepo({
    path,
    docId,
    onChanged,
  }: {
    path: string;
    docId: string;
    onChanged: (snapshot: DocumentSnapshot<DocumentData, DocumentData>) => void;
  }): Unsubscribe {
    return super.docListener({
      path,
      docId,
      onChanged: onChanged,
    });
  }

  // async getWorkerFromTransactionRepo({
  //   transaction,
  //   getEventDoc,
  //   workerId,
  //   dateToBook,
  //   includeVacations,
  //   businessModel,
  //   needMultiDoc = false,
  // }: {
  //   transaction: Transaction;
  //   getEventDoc: boolean;
  //   workerId: string;
  //   dateToBook: Date;
  //   includeVacations: boolean;
  //   businessModel?: BusinessModel | null;
  //   needMultiDoc?: boolean;
  // }): Promise<WorkerModel> {
  //   const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
  //   const firestoreDataBaseWorker = WorkerModel.fromWorkerDocJson(
  //     (
  //       await super.transactionGet({
  //         transaction,
  //         path,
  //         docId: workerId,
  //       })
  //     ).data()
  //   );
  //   if (getEventDoc) {
  //     await super
  //       .transactionGet({
  //         transaction,
  //         path: `${path}/${firestoreDataBaseWorker.id}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
  //         docId: dateToMonthStr(dateToBook),
  //       })
  //       .then((json) => {
  //         if (json.exists) {
  //           firestoreDataBaseWorker.events.setEvents(
  //             json.data(),
  //             firestoreDataBaseWorker,
  //             dateToMonthStr(dateToBook),
  //             { putVacations: includeVacations }
  //           );
  //         }
  //       });
  //   } else {
  //     await super
  //       .transactionGet({
  //         transaction,
  //         path: `${path}/${workerId}/${dataCollection}`,
  //         docId: dataDoc,
  //       })
  //       .then((json) => {
  //         if (json.exists) {
  //           firestoreDataBaseWorker.workerPublicData.setWorkerPublicData(
  //             json.data(),
  //             { includeVacation: includeVacations }
  //           );
  //         }
  //       });
  //   }
  //   if (
  //     firestoreDataBaseWorker.hasRecurrenceEvents &&
  //     firestoreDataBaseWorker.isCustomersNeedRecurrence
  //   ) {
  //     await super
  //       .transactionGet({
  //         transaction,
  //         path: `${path}/${workerId}/${dataCollection}`,
  //         docId: recurrenceEventsDoc,
  //       })
  //       .then((json) => {
  //         if (json.exists && json.data() != null) {
  //           firestoreDataBaseWorker.recurrence.setRecurrenceEvents(
  //             json.data(),
  //             workerId,
  //             businessModel ?? BusinessModel.empty()
  //           );
  //         }
  //       });
  //   }
  //   if (needMultiDoc) {
  //     await super
  //       .transactionGet({
  //         transaction,
  //         path: `${path}/${workerId}/${dataCollection}`,
  //         docId: multiEventsTimesDoc,
  //       })
  //       .then((json) => {
  //         if (json.exists) {
  //           firestoreDataBaseWorker.multiEventsTimes.setData(json.data());
  //         }
  //       });
  //   }
  //   return firestoreDataBaseWorker;
  // }

  // toFormatedCustomerData({
  //   customerData,
  //   amountOfBookingsCommand,
  //   useUserFirstBookingsDate = false,
  //   saveExtraData = false,
  // }: {
  //   customerData: CustomerData;
  //   amountOfBookingsCommand: any;
  //   useUserFirstBookingsDate?: boolean;
  //   saveExtraData?: boolean;
  // }): Map<string, any> {
  //   const customerDataJson = customerData.toJson();
  //   customerDataJson["amoutOfBookings"] = amountOfBookingsCommand;
  //   const formatedCustomrsData: Map<string, any> = {};
  //   formatedCustomrsData[`data.${customerData.customerUuid}.amoutOfBookings`] =
  //     customerDataJson["amoutOfBookings"];
  //   if (customerDataJson["lastBookingsDate"] != null) {
  //     formatedCustomrsData[
  //       `data.${customerData.customerUuid}.lastBookingsDate`
  //     ] = customerDataJson["lastBookingsDate"];
  //   }
  //   if (useUserFirstBookingsDate) {
  //     if (customerDataJson["userFirstBookingsDate"] != null) {
  //       formatedCustomrsData[
  //         `data.${customerData.customerUuid}.userFirstBookingsDate`
  //       ] = customerDataJson["userFirstBookingsDate"];
  //     }
  //   } else {
  //     if (customerDataJson["firstBookingsDate"] != null) {
  //       formatedCustomrsData[
  //         `data.${customerData.customerUuid}.firstBookingsDate`
  //       ] = customerDataJson["firstBookingsDate"];
  //     }
  //   }
  //   if (saveExtraData) {
  //     if (customerDataJson["gender"] != null) {
  //       formatedCustomrsData[`data.${customerData.customerUuid}.gender`] =
  //         customerDataJson["gender"];
  //     }
  //     if (customerDataJson["name"] != null) {
  //       formatedCustomrsData[`data.${customerData.customerUuid}.name`] =
  //         customerDataJson["name"];
  //     }
  //     if (customerDataJson["workerNaming"] != null) {
  //       formatedCustomrsData[`data.${customerData.customerUuid}.name`] =
  //         customerDataJson["workerNaming"];
  //     }
  //     if (customerDataJson["email"] != null) {
  //       formatedCustomrsData[`data.${customerData.customerUuid}.email`] =
  //         customerDataJson["email"];
  //     }
  //     if (customerDataJson["id"] != null) {
  //       formatedCustomrsData[`data.${customerData.customerUuid}.id`] =
  //         customerDataJson["id"];
  //     }
  //   }
  //   return formatedCustomrsData;
  // }

  // async realTimeEventsCounterHnadler({
  //   businessId,
  //   workerId,
  //   types,
  //   increment,
  // }: {
  //   businessId: string;
  //   workerId: string;
  //   types: Map<EventFilterType, number>;
  //   increment: boolean;
  // }): Promise<boolean> {
  //   if (types.size === 0) {
  //     return true;
  //   }
  //   const counterPath = DbPathesHelper().getWorkerCountersPath(
  //     businessId,
  //     workerId
  //   );
  //   const data: Map<string, number> = {};
  //   types.forEach((value, type) => {
  //     if (eventFilterTypeToStr[type] != null && value !== 0) {
  //       data[eventFilterTypeToStr[type]!] = (increment ? 1 : -1) * value;
  //     }
  //   });
  //   if (data.size === 0) {
  //     return true;
  //   }
  //   return await incrementMultipleNumberChild({ childPath: counterPath, data });
  // }

  // async updateWorkerRecurrenceFields({
  //   transaction,
  //   batch,
  //   worker,
  //   recurrenceEvent,
  // }: {
  //   transaction?: Transaction | null;
  //   batch?: WriteBatch | null;
  //   worker: WorkerModel;
  //   recurrenceEvent?: RecurrenceEvent | null;
  // }): Promise<void> {
  //   if (recurrenceEvent == null) {
  //     return;
  //   }
  //   const workerData: Map<string, any> = {};
  //   if (!worker.hasRecurrenceEvents) {
  //     workerData["hasRecurrenceEvents"] = true;
  //   }
  //   if (!worker.isCustomersNeedRecurrence && recurrenceEvent.isRelevant) {
  //     workerData["isCustomersNeedRecurrence"] = true;
  //   }
  //   if (Object.keys(workerData).length > 0) {
  //     if (transaction != null) {
  //       transactionUpdateMultipleFieldsAsMap({
  //         transaction,
  //         path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`,
  //         docId: worker.id,
  //         data: workerData,
  //       });
  //     } else if (batch != null) {
  //       updateMultipleFieldsInsideDocAsMap({
  //         batch,
  //         path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`,
  //         docId: worker.id,
  //         data: workerData,
  //       });
  //     } else {
  //       await updateMultipleFieldsInsideDocAsMapRepo({
  //         path: `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`,
  //         docId: worker.id,
  //         data: workerData,
  //       });
  //     }
  //   }
  // }
}
