import BusinessInitializer from "$lib/initializers/business_initializer";
import type CustomerData from "$lib/models/general/customer_data";
import type WorkerModel from "$lib/models/worker/worker_model";
import WorkerRepo from "./worker_repo";

export default class WorkerHelper {
  private static _singleton: WorkerHelper = new WorkerHelper();

  private constructor() {}

  public static GI(): WorkerHelper {
    return WorkerHelper._singleton;
  }

  public workerRepo: WorkerRepo = new WorkerRepo();

  //add the `customers` to  the `workers` customerData file
  async addCustomers({
    customers,
    businessId,
    worker,
  }: {
    customers: Record<string, CustomerData>;
    businessId: string;
    worker: WorkerModel;
  }): Promise<boolean> {
    const maxWorker = BusinessInitializer.GI().maxClientPerWorker;
    if (maxWorker != null && maxWorker <= worker.currentClientCount) {
      return true;
    }
    const finalCustomers: CustomerData[] = Object.values(customers);

    if (finalCustomers.length === 0) {
      return true;
    }

    return await this.workerRepo.addCustomers({
      customers: finalCustomers,
      businessId,
      worker,
    });
  }
}
