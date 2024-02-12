import {
  bookingsEventsCollection,
  bookingsObjectsCollection,
  buisnessCollection,
  customersDataDoc,
  dataCollection,
  dataDoc,
  hypSecretsDoc,
  invoicesCollection,
  multiEventsTimesDoc,
  onlinePaymentsCollection,
  paymentsCollection,
  publicCustomersDataDoc,
  recurrenceEventsDoc,
  secretsCollection,
  usersCollection,
  waitingListCollection,
  workersCollection,
} from "$lib/consts/db";
import Booking from "$lib/models/booking/booking_model";
import BusinessModel from "$lib/models/business/business_model";
import DeleteWorkerResp from "$lib/models/resps/delete_worker_resp";
import BreakModel from "$lib/models/schedule/break_model";
import type UserModel from "$lib/models/user/user_model";
import WorkerModel from "$lib/models/worker/worker_model";
import {
  dateStrToDate,
  dateToMonthStr,
  monthStrToDate,
  setToMidNight,
  setToStartOfMonth,
} from "$lib/utils/times_utils";
import { addMonths } from "date-fns";
import type { WriteBatch } from "firebase/firestore";
import DbPathesHelper from "../db_paths_helper";
import GeneralRepo from "../general/general_repo";
import { GeneralData } from "../general_data";
import type { ManagerApi } from "./manager_api";

export class ManagerRepo extends GeneralRepo implements ManagerApi {
  async deleteWorker({
    worker,
    workerId,
    createdAt,
    buisnessId,
    managerDeletion = true,
    batch,
    fromBusinessDeletion = false,
  }: {
    worker?: WorkerModel;
    workerId: string;
    createdAt?: Date;
    buisnessId: string;
    managerDeletion?: boolean;
    batch?: WriteBatch;
    fromBusinessDeletion?: boolean;
  }): Promise<DeleteWorkerResp | undefined> {
    if (!batch) {
      batch = this.getBatch; // Replace with your actual getBatch function
    }

    const deleteResp = new DeleteWorkerResp({});

    if (!worker) {
      const workerDoc = await this.getDocRepo({
        path: `${buisnessCollection}/${buisnessId}/${workersCollection}`,
        docId: workerId,
      });

      if (workerDoc.exists()) {
        worker = WorkerModel.fromWorkerDocJson(workerDoc.data()!);
      } else {
        return undefined;
      }
    }

    const workersPath = `${buisnessCollection}/${buisnessId}/${workersCollection}`;

    const bookingsObjectsDocs = await this.getAllDocsAndIdsInsideCollection({
      path: `${workersPath}/${worker.id}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
    });

    Object.entries(bookingsObjectsDocs).forEach(([docId, doc]) => {
      if (dateStrToDate(docId) >= setToMidNight(new Date())) {
        Object.entries(doc).forEach(([bookingId, bookingJson]) => {
          const booking = Booking.fromJson(bookingJson, bookingId);
          deleteResp.bookings[booking.bookingId] = booking;
        });
      }

      this.deleteDoc({
        batch: batch!,
        path: `${workersPath}/${workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`,
        docId: docId,
      });
    });

    if (fromBusinessDeletion && createdAt) {
      let month = createdAt;
      while (month <= new Date()) {
        const monthStr = dateToMonthStr(month);

        Array.from({ length: 2 }, (_, index) => {
          this.deleteDoc({
            batch: batch!,
            path: `${buisnessCollection}/${buisnessId}/${invoicesCollection}/${workerId}/${monthStr}`,
            docId: (index + 1).toString(),
          });
        });

        this.deleteDoc({
          batch: batch,
          path: `${buisnessCollection}/${buisnessId}/${paymentsCollection}/${workerId}/${onlinePaymentsCollection}`,
          docId: monthStr,
        });

        month = addMonths(month, 1);
      }
    }

    const bookingsEventsDocsIds = await this.getAllDocsAndIdsInsideCollection({
      path: `${workersPath}/${worker.id}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
    });

    Object.entries(bookingsEventsDocsIds).forEach(([docId, doc]) => {
      const month = monthStrToDate(docId);

      if (month >= setToStartOfMonth(new Date())) {
        worker!.events.setEvents(doc, worker!, docId, {});

        Object.entries(worker!.events.allEvents[docId] ?? {}).forEach(
          ([key, dayEvents]) => {
            Object.entries(dayEvents).forEach(([key, event]) => {
              if (event.isBreak) {
                const breakModel = BreakModel.fromEvent(event);
                breakModel.workerId = workerId;

                deleteResp.breaks.push(breakModel);
              }
            });
          }
        );
      }

      this.deleteDoc({
        batch: batch!,
        path: `${workersPath}/${workerId}/${dataCollection}/${dataDoc}/${bookingsEventsCollection}`,
        docId: docId,
      });
    });

    const waitingsListDocs = await this.getAllDocIdsInsideCollection({
      path: `${workersPath}/${worker.id}/${dataCollection}/${dataDoc}/${waitingListCollection}`,
    });

    waitingsListDocs.forEach((docId) => {
      this.deleteDoc({
        batch: batch!,
        path: `${workersPath}/${workerId}/${dataCollection}/${dataDoc}/${waitingListCollection}`,
        docId: docId,
      });
    });

    this.deleteDoc({
      batch: batch,
      path: `${workersPath}/${worker.id}/${dataCollection}`,
      docId: customersDataDoc,
    });

    this.deleteDoc({
      batch: batch,
      path: `${workersPath}/${worker.id}/${dataCollection}`,
      docId: publicCustomersDataDoc,
    });

    const recurrecneDoc = await this.getDocRepo({
      path: `${workersPath}/${worker.id}/${dataCollection}`,
      docId: recurrenceEventsDoc,
    });

    if (recurrecneDoc.exists()) {
      const business = new BusinessModel({});
      business.businessId = buisnessId;
      worker.recurrence.setRecurrenceEvents(
        recurrecneDoc.data()!,
        workerId,
        business
      );

      Object.entries(worker.recurrence.recurrenceEvents).forEach(
        ([_, events]) => {
          Object.entries(events).forEach(([key, event]) => {
            if (event.recurrenceEvent == null || !event.isBreak) {
              return;
            }

            const breakModel = BreakModel.fromEvent(event);
            breakModel.workerId = workerId;
            breakModel.recurrenceNotificationsLastDate =
              worker!.notifications.recurrenceNotificationsLastDate;

            deleteResp.breaks.push(breakModel);
          });
        }
      );

      this.deleteDoc({
        batch: batch,
        path: `${workersPath}/${worker.id}/${dataCollection}`,
        docId: recurrenceEventsDoc,
      });
    }

    this.deleteDoc({
      batch: batch,
      path: `${workersPath}/${worker.id}/${dataCollection}`,
      docId: dataDoc,
    });

    if (!fromBusinessDeletion && managerDeletion) {
      this.updateFieldInsideDocAsMap({
        batch: batch,
        path: buisnessCollection,
        docId: buisnessId,
        fieldName: `workersIds.${worker.id.replaceAll("+", "")}`,
      });
    }

    this.updateFieldInsideDocAsMapRepo({
      path: `${usersCollection}/${worker.id}/${dataCollection}`,
      docId: dataDoc,
      fieldName: `permission.${buisnessId}`,
    });

    this.deleteDocRepo({
      path: `${workersPath}/${worker.id}/${dataCollection}`,
      docId: multiEventsTimesDoc,
    });

    this.deleteDocRepo({
      path: `${workersPath}/${worker.id}/${dataCollection}`,
      docId: recurrenceEventsDoc,
    });

    this.deleteDoc({
      batch: batch,
      path: workersPath,
      docId: worker.id,
    });

    if (!fromBusinessDeletion) {
      await this.removeChild({
        childPath: `${buisnessCollection}/${buisnessId}/${workersCollection}/${worker.id}`,
      });
    }

    if (!fromBusinessDeletion) {
      await this.getDocRepo({
        path: workersPath,
        docId: worker.id,
      }).then(async (workerDocJson) => {
        if (workerDocJson.exists() && workerDocJson.data() != null) {
          const workerObj = WorkerModel.fromWorkerDocJson(
            workerDocJson.data()!
          );
          const imagesIds = new Set<string>();

          Object.values(workerObj.storyImages).forEach((fullPath) => {
            imagesIds.add(
              DbPathesHelper.GI().getImageStorageName(
                "story_images",
                fullPath
              ) + ".jpg"
            );
          });

          // await deleteSetFromPathFiles({
          //   imagesId: imagesIds,
          //   path: `${buisnessId}/images/stories`,
          // });
        }
      });

      return await this.commmitBatch(batch).then((value) => {
        if (value) {
          return deleteResp;
        }

        return undefined;
      });
    }

    return deleteResp;
  }

  async deleteBuissness({
    user,
    businessId,
    customWorkers,
    workerProductId,
    fromDeleteUser = false,
    productId,
  }: {
    user: UserModel;
    businessId: string;
    customWorkers: Record<string, WorkerModel> | undefined;
    workerProductId: string;
    fromDeleteUser: boolean;
    productId: string;
  }): Promise<DeleteWorkerResp | null> {
    const batch = this.getBatch; // Replace with the actual function to get a batch

    let workers: Record<string, WorkerModel> = {};
    const mainDeleteResp = new DeleteWorkerResp({});

    // Get all workers ids
    if (
      businessId === GeneralData.currentBusinesssId &&
      customWorkers != null
    ) {
      workers = customWorkers!;
    } else {
      try {
        const jsons = await this.getAllDocInsideCollectionRepo({
          path: `${buisnessCollection}/${businessId}/${workersCollection}`,
        });
        if (jsons !== null) {
          jsons.forEach((json: any) => {
            const workerObj = WorkerModel.fromWorkerDocJson(json);
            workers[workerObj.id] = workerObj;
          });
        }
      } catch (_) {}
    }

    const futures: Promise<DeleteWorkerResp | undefined>[] = [];
    Object.entries(workers).forEach(([workerId, worker]) => {
      if (worker == null) {
        return;
      }
      futures.push(
        this.deleteWorker({
          createdAt: worker.createdAt,
          buisnessId: businessId,
          workerId: workerId,
          worker: worker,
          fromBusinessDeletion: true,
          batch: batch,
        })
      );
    });

    const respWorkers = await Promise.all(futures);

    respWorkers.forEach((deleteResp) => {
      if (deleteResp != null) {
        mainDeleteResp.merge(deleteResp);
      }
    });

    // Delete settings file
    this.deleteDoc({
      batch: batch,
      path: buisnessCollection,
      docId: businessId,
    });

    //if we deleting the user no need to update his products
    if (!fromDeleteUser) {
      const userData: Record<string, any> = {};

      userData[`businessesInfo.${businessId}`] = null;

      if (productId !== "") {
        userData[`productsIds.${productId}.businessId`] = "";
      }
      if (workerProductId !== "") {
        userData[`productsIds.${workerProductId}.businessId`] = "";
      }

      // Remove from user productsIds
      this.updateMultipleFieldsInsideDocAsMap({
        batch: batch,
        path: usersCollection,
        docId: user.id,
        data: userData,
      });
    }

    // Delete the secrets file if it exists (outside from the batch)
    this.deleteDoc({
      batch: batch,
      path: `${buisnessCollection}/${businessId}/${secretsCollection}`,
      docId: hypSecretsDoc,
    });

    // Delete in firestore, storage, and realTime
    const value = true; //await deleteAllFiles(`${businessId}/images`);
    if (value) {
      const commmitBatchValue = await this.commmitBatch(batch);
      if (commmitBatchValue) {
        this.removeChild({ childPath: `${buisnessCollection}/${businessId}` });
        return mainDeleteResp;
      }
    }
    return null;
  }
}
