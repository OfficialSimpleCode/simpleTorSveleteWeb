import {
  bookingsCollection,
  bookingsObjectsCollection,
  buisnessCollection,
  businessDataCollection,
  countersCollection,
  dataCollection,
  dataDoc,
  likesCollection,
  usersCollection,
  workersCollection,
} from "$lib/consts/db";
import type Booking from "$lib/models/booking/booking_model";
import { GeneralData } from "./general_data";

export default class DbPathesHelper {
  private static _singleton: DbPathesHelper = new DbPathesHelper();

  private constructor() {}

  public static GI(): DbPathesHelper {
    return DbPathesHelper._singleton;
  }

  getLisksChildPath(workerId: string): string {
    const pathToWorkers = `${buisnessCollection}/${GeneralData.currentBusinesssId}/${workersCollection}`;
    const pathToLiks = `${workerId}/${likesCollection}`;
    return `${pathToWorkers}/${pathToLiks}`;
  }

  getImageStorageName(imageType: string, imageUrl: string): string {
    const nameForPath = imageType.toUpperCase();
    const url_subs = imageUrl.split(nameForPath);
    return `${nameForPath}${url_subs[1].split(".jpg")[0]}`;
  }

  getLikesChildPath(
    workerId: string,
    businessId: string,
    imageId: string
  ): string {
    const pathToWorkers = `${buisnessCollection}/${businessId}/${workersCollection}`;
    const pathToLikes = `${workerId}/${likesCollection}`;
    return `${pathToWorkers}/${pathToLikes}/${imageId}`;
  }

  getBusinessDataPath(businessId: string): string {
    return `${buisnessCollection}/${businessId}/${businessDataCollection}`;
  }

  getWorkerCountersPath(businessId: string, workerId: string): string {
    return `${buisnessCollection}/${businessId}/${workersCollection}/${workerId}/${countersCollection}`;
  }

  getMessageCounterPath(businessId: string): string {
    return `${buisnessCollection}/${businessId}/${businessDataCollection}/messagesCounter`;
  }

  userBookingsPathByBooking(booking: Booking): string {
    return `${usersCollection}/${booking.customerId}/${dataCollection}/${dataDoc}/${bookingsCollection}`;
  }
  userBookingsPathByUser(userId: string): string {
    return `${usersCollection}/${userId}/${dataCollection}/${dataDoc}/${bookingsCollection}`;
  }

  // Worker-related methods...
  workerBookingsPath(booking: Booking): string {
    return `${buisnessCollection}/${booking.buisnessId}/${workersCollection}/${booking.workerId}/${dataCollection}/${dataDoc}/${bookingsObjectsCollection}`;
  }
}
