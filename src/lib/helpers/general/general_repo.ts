// Import necessary dependencies

import FirestoreDataBase from "$lib/services/external_services/firestore";
import { type DocumentData, type DocumentSnapshot } from "firebase/firestore";

export default class GeneralRepo
  extends FirestoreDataBase
  implements GeneralApi
{
  private static instance: GeneralRepo;

  public static GI(): GeneralRepo {
    if (!GeneralRepo.instance) {
      GeneralRepo.instance = new GeneralRepo();
    }

    return GeneralRepo.instance;
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

  // Implement other methods similarly...

  //   async realTimeEventsCounterHnadler({
  //     businessId,
  //     workerId,
  //     types,
  //     increment,
  //   }: {
  //     businessId: string;
  //     workerId: string;
  //     types: Map<EventFilterType, number>;
  //     increment: boolean;
  //   }): Promise<boolean> {
  //     if (types.size === 0) {
  //       return true;
  //     }

  //     const counterPath = DbPathesHelper.GI().getWorkerCountersPath(
  //       businessId,
  //       workerId
  //     );
  //     const data: Record<string, number> = {};

  //     for (const [type, value] of types.entries()) {
  //       if (eventFilterTypeToStr[type] !== null && value !== 0) {
  //         data[eventFilterTypeToStr[type]!] = (increment ? 1 : -1) * value;
  //       }
  //     }

  //     if (Object.keys(data).length === 0) {
  //       return true;
  //     }

  //     return await incrementMultipleNumberChild({
  //       childPath: counterPath,
  //       data: data,
  //     });
  //   }

  // async updateWorkerRecurrenceFields({
  //   transaction,
  //   batch,
  //   worker,
  //   recurrenceEvent,
  // }: {
  //   transaction?: Transaction;
  //   batch?: WriteBatch;
  //   worker: WorkerModel;
  //   recurrenceEvent?: RecurrenceEvent | null;
  // }): Promise<void> {
  //   if (!recurrenceEvent) {
  //     return;
  //   }

  //   const workerData: Record<string, any> = {};

  //   if (!worker.hasRecurrenceEvents) {
  //     workerData['hasRecurrenceEvents'] = true;
  //   }

  //   if (!worker.isCustomersNeedRecurrence && recurrenceEvent.isRelevant) {
  //     workerData['isCustomersNeedRecurrence'] = true;
  //   }

  //   if (Object.keys(workerData).length > 0) {
  //     if (transaction) {
  //       transactionUpdateMultipleFieldsAsMap({
  //         transaction: transaction,
  //         path: `$buisnessCollection/${GeneralData.getInstance().currentBusinesssId}/$workersCollection`,
  //         docId: worker.id,
  //         data: workerData,
  //       });
  //     } else if (batch) {
  //       updateMultipleFieldsInsideDocAsMap({
  //         batch: batch,
  //         path: `$buisnessCollection/${GeneralData.getInstance().currentBusinesssId}/$workersCollection`,
  //         docId: worker.id,
  //         data: workerData,
  //       });
  //     } else {
  //       await updateMultipleFieldsInsideDocAsMapRepo({
  //         path: `$buisnessCollection/${GeneralData.getInstance().currentBusinesssId}/$workersCollection`,
  //         docId: worker.id,
  //         data: workerData,
  //       });
  //     }
  //   }
  // }
}
