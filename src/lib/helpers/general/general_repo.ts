import { ArrayCommands, type NumericCommands } from "$lib/consts/db";
import {
  eventFilterTypeToStr,
  type EventFilterType,
} from "$lib/consts/worker_schedule";
//import CustomerData from "$lib/models/general/customer_data";
// import WorkerModel from "$lib/models/worker/worker_model";
import FirestoreDataBase from "$lib/services/external_services/firestore";
import {
  type DocumentData,
  type DocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import DbPathesHelper from "../db_paths_helper";

export default class GeneralRepo extends FirestoreDataBase {
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
  }): Promise<DocumentSnapshot<DocumentData, DocumentData>> {
    // const obj = BusinessModel.empty();
    //const c = new CustomerData({});
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

  async updateFieldInsideDocAsArrayRepo({
    path,
    docId,
    fieldName,
    value,
    command,
  }: {
    path: string;
    docId: string;
    fieldName: string;
    value: any;
    command: ArrayCommands;
  }): Promise<boolean> {
    const batch = this.getBatch;
    super.updateFieldInsideDocAsArray({
      batch,
      path,
      docId,
      fieldName,
      value,
      command,
    });
    return await this.commmitBatch(batch);
  }

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
    data: Record<string, any>;
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
  //   workerId,
  //   businessModel,
  //   needMultiDoc = false,
  // }: {
  //   transaction: Transaction;
  //   workerId: string;
  //   businessModel?: BusinessModel;
  //   needMultiDoc?: boolean;
  // }): Promise<WorkerModel | undefined> {
  //   const path = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
  //   const workerDoc = await this.transactionGet(transaction, path, workerId);
  //   if (!workerDoc.exists()) {
  //     return undefined;
  //   }
  //   const firestoreDataBaseWorker = WorkerModel.fromWorkerDocJson(
  //     workerDoc!.data()
  //   );

  //   await super
  //     .transactionGet(
  //       transaction,
  //       `${path}/${workerId}/${dataCollection}`,
  //       dataDoc
  //     )
  //     .then((json) => {
  //       if (json.exists()) {
  //         firestoreDataBaseWorker.workerPublicData.setWorkerPublicData(
  //           json.data()
  //         );
  //       }
  //     });

  //   if (
  //     firestoreDataBaseWorker.hasRecurrenceEvents &&
  //     firestoreDataBaseWorker.isCustomersNeedRecurrence
  //   ) {
  //     await super
  //       .transactionGet(
  //         transaction,
  //         `${path}/${workerId}/${dataCollection}`,
  //         recurrenceEventsDoc
  //       )
  //       .then((json) => {
  //         if (json.exists() && json.data() != null) {
  //           // firestoreDataBaseWorker.recurrence.setRecurrenceEvents(
  //           //   json.data(),
  //           //   workerId,
  //           //   businessModel ?? BusinessModel.empty()
  //           // );
  //         }
  //       });
  //   }
  //   if (needMultiDoc) {
  //     await super
  //       .transactionGet(
  //         transaction,
  //         `${path}/${workerId}/${dataCollection}`,
  //         multiEventsTimesDoc
  //       )
  //       .then((json) => {
  //         if (json.exists()) {
  //           firestoreDataBaseWorker.multiEventsTimes.setData(json.data());
  //         }
  //       });
  //   }
  //   return firestoreDataBaseWorker;
  // }

  toFormatedCustomerData({
    //customerData,
    amountOfBookingsCommand,
    useUserFirstBookingsDate = false,
    saveExtraData = false,
  }: {
    //customerData: CustomerData;
    amountOfBookingsCommand: any;
    useUserFirstBookingsDate?: boolean;
    saveExtraData?: boolean;
  }): Record<string, any> {
    // const customerDataJson = customerData.toJson();
    // customerDataJson["amoutOfBookings"] = amountOfBookingsCommand;
    const formatedCustomrsData: Record<string, any> = {};
    // formatedCustomrsData[`data.${customerData.customerUuid}.amoutOfBookings`] =
    //   customerDataJson["amoutOfBookings"];
    // if (customerDataJson["lastBookingsDate"] != null) {
    //   formatedCustomrsData[
    //     `data.${customerData.customerUuid}.lastBookingsDate`
    //   ] = customerDataJson["lastBookingsDate"];
    // }
    // if (useUserFirstBookingsDate) {
    //   if (customerDataJson["userFirstBookingsDate"] != null) {
    //     formatedCustomrsData[
    //       `data.${customerData.customerUuid}.userFirstBookingsDate`
    //     ] = customerDataJson["userFirstBookingsDate"];
    //   }
    // } else {
    //   if (customerDataJson["firstBookingsDate"] != null) {
    //     formatedCustomrsData[
    //       `data.${customerData.customerUuid}.firstBookingsDate`
    //     ] = customerDataJson["firstBookingsDate"];
    //   }
    // }
    // if (saveExtraData) {
    //   if (customerDataJson["gender"] != null) {
    //     formatedCustomrsData[`data.${customerData.customerUuid}.gender`] =
    //       customerDataJson["gender"];
    //   }
    //   if (customerDataJson["name"] != null) {
    //     formatedCustomrsData[`data.${customerData.customerUuid}.name`] =
    //       customerDataJson["name"];
    //   }
    //   if (customerDataJson["workerNaming"] != null) {
    //     formatedCustomrsData[`data.${customerData.customerUuid}.name`] =
    //       customerDataJson["workerNaming"];
    //   }
    //   if (customerDataJson["email"] != null) {
    //     formatedCustomrsData[`data.${customerData.customerUuid}.email`] =
    //       customerDataJson["email"];
    //   }
    //   if (customerDataJson["id"] != null) {
    //     formatedCustomrsData[`data.${customerData.customerUuid}.id`] =
    //       customerDataJson["id"];
    //   }
    // }
    return formatedCustomrsData;
  }

  async realTimeEventsCounterHandler({
    businessId,
    workerId,
    types,
    increment,
  }: {
    businessId: string;
    workerId: string;
    types: Map<EventFilterType, number>;
    increment: boolean;
  }): Promise<boolean> {
    if (types.size === 0) {
      return true;
    }

    const counterPath = DbPathesHelper.GI().getWorkerCountersPath(
      businessId,
      workerId
    );
    const data: Record<string, number> = {};

    types.forEach((value, type) => {
      if (eventFilterTypeToStr[type] !== null && value !== 0) {
        data[eventFilterTypeToStr[type]!] = (increment ? 1 : -1) * value;
      }
    });

    if (Object.keys(data).length === 0) {
      return true;
    }

    return await this.incrementMultipleNumberChild({
      childPath: counterPath,
      data: data,
    });
  }
}
