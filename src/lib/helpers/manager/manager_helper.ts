import { logger } from "$lib/consts/application_general";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import UserSubProductItem from "$lib/models/user/user_sub_product.item";
import type WorkerModel from "$lib/models/worker/worker_model";
import { workersStore } from "$lib/stores/Workers";
import { Timestamp } from "firebase/firestore";
import { GeneralData } from "../general_data";
import { ManagerRepo } from "./manager_repo";

export default class ManagerHelper {
  private static _singleton: ManagerHelper = new ManagerHelper();

  private constructor() {}

  public static GI(): ManagerHelper {
    return ManagerHelper._singleton;
  }

  managerRepo: ManagerRepo = new ManagerRepo();

  async deleteWorker({
    buisnessId,
    workerId,
    worker,
  }: {
    buisnessId: string;
    workerId: string;
    worker?: WorkerModel;
  }): Promise<boolean> {
    const isManager = buisnessId.includes(
      UserInitializer.GI().user.id.replaceAll("+", "")
    );

    const deleteResp = await this.managerRepo.deleteWorker({
      managerDeletion: isManager,
      workerId,
      buisnessId,
      worker,
    });

    if (deleteResp) {
    }

    //   // Delete all the schedule notification of the bookings
    //   await Promise.all([
    //     NotificationHandler.GI().cancelAllBookingsScheduleNoification(
    //       deleteResp.bookings
    //     ),
    //     NotificationHandler.GI().cancelAllBreaksScheduleNotifications(
    //       deleteResp.breaks
    //     ),
    //   ]);

    if (buisnessId == GeneralData.currentBusinesssId) {
      delete BusinessInitializer.GI().workers[workerId];
      workersStore.set(BusinessInitializer.GI().workers);
    }

    return deleteResp !== null;
  }

  async deleteBuisness(
    businessId: string,
    fromDeleteUser: boolean,
    productId: string,
    workerProductId: string
  ): Promise<boolean> {
    return await this.managerRepo
      .deleteBuissness({
        user: UserInitializer.GI().user,
        productId: productId,
        customWorkers:
          BusinessInitializer.GI().business.businessId === businessId
            ? BusinessInitializer.GI().workers
            : undefined,
        fromDeleteUser: fromDeleteUser,
        workerProductId: workerProductId,
        businessId: businessId,
      })
      .then(async (deleteResp) => {
        if (deleteResp !== null) {
          logger.debug(`Finish delete buisness --> ${businessId}`);
          UserInitializer.GI().user.businessesInfo.delete(businessId);
          if (productId !== "") {
            UserInitializer.GI().user.productsIds.set(
              productId,
              new UserSubProductItem(
                "",
                Timestamp.fromDate(new Date()),
                productId
              )
            );
          }
          if (workerProductId !== "") {
            UserInitializer.GI().user.productsIds.set(
              workerProductId,
              new UserSubProductItem(
                "",
                Timestamp.fromDate(new Date()),
                workerProductId
              )
            );
          }

          //TODO
          //   // Delete all the schedule notification of the bookings
          //   await Promise.all([
          //     NotificationHandler().cancelAllBookingsScheduleNoification(
          //       deleteResp.bookings
          //     ),
          //     NotificationHandler().cancelAllBreaksScheduleNotifications(
          //       deleteResp.breaks
          //     ),
          //   ]);

          UserInitializer.GI().user.userPublicData.permission.delete(
            businessId
          );
          const index =
            UserInitializer.GI().user.userPublicData.myBuisnessesIds.indexOf(
              businessId,
              0
            );
          if (index > -1) {
            UserInitializer.GI().user.userPublicData.myBuisnessesIds.splice(
              index,
              1
            );
          }

          if (businessId === BusinessInitializer.GI().business.businessId) {
            BusinessInitializer.GI().emptyBusinessData();
          }
        }
        return deleteResp !== null;
      });
  }
}
