import { logger } from "$lib/consts/application_general";
import {
  ArrayCommands,
  dataCollection,
  dataDoc,
  recurrenceBookingsDoc,
  usersCollection,
} from "$lib/consts/db";
import AppErrorsHelper from "$lib/helpers/app_errors";
import DbPathesHelper from "$lib/helpers/db_paths_helper";
import { GeneralData } from "$lib/helpers/general_data";
import NotificationsHelper from "$lib/helpers/notifications/notifications/notification_helper";
import UserRepo from "$lib/helpers/user/user_repo";
import { VerificationRepo } from "$lib/helpers/verification/verification_repo";
import BusinessInfo from "$lib/models/business/business_info";
import type { Update } from "$lib/models/business/update_model";
import LocalDocReference from "$lib/models/general/local_doc_reference";
import UserModel from "$lib/models/user/user_model";
import { isConnectedStore, userStore } from "$lib/stores/User";
import { checkForReminders, sortMyBookings } from "$lib/utils/booking_utils";
import { delay } from "$lib/utils/general_utils";
import type { DocumentData, DocumentSnapshot } from "firebase/firestore";
import BusinessInitializer from "./business_initializer";

export default class UserInitializer {
  private static instance: UserInitializer;

  private constructor() {}

  public static GI(): UserInitializer {
    if (!UserInitializer.instance) {
      UserInitializer.instance = new UserInitializer();
    }

    return UserInitializer.instance;
  }

  public user: UserModel = new UserModel({});

  verificationRepo: VerificationRepo = new VerificationRepo();

  userRepo: UserRepo = new UserRepo();

  userDoc: DocumentSnapshot<DocumentData, DocumentData> | undefined;

  isUserFirstEntrance: boolean = true;

  get getPermission(): number {
    return 0;
  }

  get isConnected(): boolean {
    return this.verificationRepo.isLoggedIn;
  }

  get userId(): string {
    try {
      return this.verificationRepo.userId;
    } catch (e) {
      return "";
    }
  }

  async setupUser({
    newUserId = "",
    logoutIfDosentExist = false,
  }: {
    newUserId: string;
    logoutIfDosentExist?: boolean;
  }): Promise<boolean> {
    try {
      logger.info(`The user id is -> ${newUserId}`);
      if (newUserId.length < 5) {
        await this.verificationRepo.logout();
        return true; // to not display an error
      }

      /*If user came from logging his doc already in the userDoc 
      and there is no need to read again from the db*/
      if (this.userDoc == null) {
        this.userDoc = await this.userRepo.getDocSRV({
          path: usersCollection,
          docId: newUserId,
        });
      }

      if (
        !logoutIfDosentExist &&
        (this.userDoc == null || !this.userDoc.exists())
      ) {
        isConnectedStore.set(false);
        this.userDoc = undefined;
        return true; // new user log-in and not registered yet -> leave him logged-in
      }

      this.user = UserModel.fromUserDocJson(this.userDoc?.data()!);

      /*No need to take the user public data the startListening 
        func will take it*/
      this.startPublicDataListening();
      userStore.set(this.user);
      isConnectedStore.set(true);

      //actions that need to do if the user enter to business
      this.actionsOnBusiness();

      return true;
    } catch (e) {
      /*initialize the user Doc*/
      this.userDoc = undefined;
      if (e instanceof Error) {
        logger.error(`Error while setting up the user --> ${e}`);
        AppErrorsHelper.GI().addError({ details: e.toString() });
      }
      isConnectedStore.set(false);

      return false;
    }
  }

  async actionsOnBusiness() {
    const businessId = BusinessInitializer.GI().business.businessId;
    if (businessId === "") {
      return;
    }

    // notify to the manager on new customer
    let managerId: string = businessId.split("--")[0];
    if (managerId.length < 16) {
      managerId = `+${managerId}`;
    }

    //send to the manager that the user enter first time
    //the loading of the workers is not waited so need to check every 100 ms if the
    //manager worker obj is loaded
    let index: number = 0;
    let sendMessage: boolean = false;
    while (index < 5 && !sendMessage) {
      index++;
      if (BusinessInitializer.GI().workers[managerId] != null) {
        sendMessage = true;

        NotificationsHelper.GI()
          .notifyFirstTimeEnterBusiness(
            BusinessInitializer.GI().workers[managerId]!,
            this.user,
            BusinessInitializer.GI().business
          )
          .then((_) => {
            //add it after notify the manager bacause in the func above we
            //check if it is the first enterance of the user
            // add to the last visited buisnesses

            if (this.user.lastVisitedBuisnesses.includes(businessId)) {
              // show the last business first - no need to await
              this.replaceVisitedBusiness(businessId, businessId);
            } else {
              this.addVisitedBusiness(businessId);
            }
          });
      } else {
        await delay(100);
      }
    }

    //delete seen updates from the user if the updates are deleted
    this.deleteSeenUpdateIfNeeded(
      businessId,
      BusinessInitializer.GI().business.design.updates
    );

    //update the business info of the business if needed
    this._updateBuisnessInfoIfneeded(businessId);
  }

  async replaceVisitedBusiness(
    oldBusinessId: string,
    newBusinessId: string
  ): Promise<void> {
    console.log("replaceVisitedBusiness");
    if (
      this.user.lastVisitedBuisnesses.includes(newBusinessId) &&
      this.user.lastVisitedBuisnesses[
        this.user.lastVisitedBuisnesses.length - 1
      ] === newBusinessId
    ) {
      logger.info("There is no need to access the database");
      return;
    }
    //remove the old business from the last visited list
    this.user.lastVisitedBuisnesses = this.user.lastVisitedBuisnesses.filter(
      (businessId) => businessId != oldBusinessId
    );
    this.user.lastVisitedBuisnesses.push(newBusinessId);
    console.log(
      "replaceVisitedBusiness lastVisitedBuisnesses-> ",
      this.user.lastVisitedBuisnesses
    );
    await this.userRepo.updateFieldInsideDocAsMapRepo({
      path: usersCollection,
      docId: this.user.id,
      fieldName: "lastVisitedBuisnesses",
      value: this.user.lastVisitedBuisnesses,
    });
  }

  async addVisitedBusiness(businessId: string): Promise<void> {
    console.log("addVisitedBusiness");
    if (this.user.lastVisitedBuisnessesRemoved.includes(businessId)) {
      //remove from lastVisitedBuisnessesRemoved
      this.user.lastVisitedBuisnessesRemoved =
        this.user.lastVisitedBuisnessesRemoved.filter(
          (businessIdTemp) => businessId !== businessIdTemp
        );
      //add to the lastVisitedBuisnesses
      this.user.lastVisitedBuisnesses.push(businessId);

      console.log(
        "1addVisitedBusiness lastVisitedBuisnesses-> ",
        this.user.lastVisitedBuisnesses
      );

      await this.userRepo.updateMultipleFieldsInsideDocAsMapRepo({
        path: usersCollection,
        docId: this.user.id,
        data: {
          ["lastVisitedBuisnesses"]: this.user.lastVisitedBuisnesses,
          ["lastVisitedBuisnessesRemoved"]:
            this.user.lastVisitedBuisnessesRemoved,
        },
      });
    } else {
      this.user.lastVisitedBuisnesses.push(businessId);
      console.log(
        "2addVisitedBusiness lastVisitedBuisnesses-> ",
        this.user.lastVisitedBuisnesses
      );

      await this.userRepo.updateFieldInsideDocAsMapRepo({
        path: usersCollection,
        docId: this.user.id,
        fieldName: "lastVisitedBuisnesses",
        value: this.user.lastVisitedBuisnesses,
      });
    }
  }

  async _updateBuisnessInfoIfneeded(businessId: string): Promise<void> {
    const businessInfo = BusinessInitializer.GI().business.toBusinessInfo;

    if (
      !(
        this.user.businessesInfo.get(businessInfo.businessId) ??
        BusinessInfo.empty()
      ).isTheSame(businessInfo)
    ) {
      // No need to update
      return;
    }

    this.updateBusinessInfo(businessId, businessInfo);
  }

  async updateBusinessInfo(
    businessId: string,
    info: BusinessInfo | undefined
  ): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }

    if (info == null && !this.user.businessesInfo.has(businessId)) {
      logger.debug("Business info already deleted");
      return true;
    }

    if (info != null && this.user.businessesInfo.has(businessId)) {
      const existingInfo = this.user.businessesInfo.get(businessId);
      if (existingInfo && info.isTheSame(existingInfo)) {
        return true;
      }
    }

    const value = await this.userRepo.updateFieldInsideDocAsMapRepo({
      path: usersCollection,
      docId: this.userId,
      fieldName: `businessesInfo.${businessId}`,
      value: info == null ? undefined : info.toJson(),
    });

    if (value) {
      if (info == null) {
        this.user.businessesInfo.delete(businessId);
      } else {
        this.user.businessesInfo.set(businessId, info);
      }
    }

    return value;
  }

  async deleteSeenUpdateIfNeeded(
    businessId: string,
    businessUpdates: Record<string, Update>
  ): Promise<boolean> {
    if (this.isConnected) {
      return true;
    }

    const seenUpdates = this.user.seenUpdates[businessId] || {};
    const existUpdatesId = new Set<string>();

    Object.entries(businessUpdates).forEach(([_, update]) => {
      existUpdatesId.add(update.id);
    });

    const similar = new Set(
      Object.keys(seenUpdates).filter((key) => existUpdatesId.has(key))
    );

    if (similar.size === seenUpdates.size) {
      return true;
    }

    return await this.userRepo.updateFieldInsideDocAsMapRepo({
      path: usersCollection,
      docId: this.user.id,
      fieldName: `seenUpdates.${businessId}`,
      value: similar.size === 0 ? null : Array.from(similar),
    });
  }

  async startPublicDataListening() {
    /*create listening for the user public data */
    if (!this.isConnected) return;

    this.user.userPublicDataListener = this.userRepo.docListener({
      path: `${usersCollection}/${this.user.id}/${dataCollection}`,
      docId: dataDoc,
      onChanged: async (dataJson) => {
        try {
          if (dataJson.exists()) {
            this.user.setUserPublicData(dataJson.data()!);

            await this.loadBookingsDocs(
              this.user.userPublicData.bookingsDocsToLoad
            );

            this.user.bookingsToShow = sortMyBookings(this.user);

            logger.info("Getting new user data from database");
            this.user.userPublicData.reminders = {};

            if (GeneralData.currentBusinesssId !== "") {
              this.user.userPublicData.reminders = await checkForReminders();
            }

            console.log("dfdddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            console.log("rrrrrrrrrrrrrr", this.user.bookingsToShow);
            userStore.set(this.user);
          }
        } catch (error) {
          console.error(`Error in startPublicDataListening: ${error}`);
        }
      },
    });
  }

  cancelPublicDataListening(user: UserModel) {
    /* Cancel current user listening */
    try {
      if (user.userPublicDataListener != null) {
        user.userPublicDataListener!();
        user.userPublicDataListener = undefined;
      }

      console.log("User Listening canceled");
    } catch (e) {
      console.log("Error while pausing the user listener -->", e);
    }
  }

  async loadBookingsDocs(docs: Set<string>) {
    const futures: Promise<void>[] = [];

    docs.forEach((docId) => {
      futures.push(this.loadBookingDoc(docId));
    });

    await Promise.all(futures);
  }

  async loadBookingDoc(docId: string): Promise<void> {
    try {
      const bookingsDoc = await this.userRepo.getDocSRV({
        path: DbPathesHelper.GI().userBookingsPathByUser(this.user.id),
        docId: docId,
      });
      if (docId === recurrenceBookingsDoc) {
        this.user.bookings.setRecurrence(bookingsDoc?.data() || {});
      } else {
        this.user.bookings.setMonth(bookingsDoc?.data() || {}, docId);
      }
    } catch (error) {
      logger.error(`Error loading booking doc ${docId}: ${error}`);
    }
  }
  async getAllBookingsDocs(): Promise<void> {
    const docsToLoad: Set<string> = new Set();
    const userPublicData = this.user.userPublicData;

    Object.entries(userPublicData.bookingsPreviews).forEach(
      ([docId, preview]) => {
        if (preview.bookingCount === 0) {
          return;
        }

        const bookings = this.user.bookings;
        if (
          bookings.futureBookings.hasOwnProperty(docId) ||
          bookings.passedBookings.hasOwnProperty(docId)
        ) {
          return;
        }

        if (docId === recurrenceBookingsDoc && bookings.recurrence !== null) {
          return;
        }

        docsToLoad.add(docId);
      }
    );

    await this.loadBookingsDocs(docsToLoad);
  }

  async addLocalDocToDelete({
    userId,
    docId,
    path,
  }: {
    userId: string;
    docId: string;
    path: string;
  }): Promise<boolean> {
    const updateResult = await this.userRepo.updateFieldInsideDocAsArrayRepo({
      path: `${usersCollection}/${userId}/${dataCollection}`,
      docId: dataDoc,
      fieldName: "localDocsToDelete",
      value: new LocalDocReference(docId, path).toJson(),
      command: ArrayCommands.add,
    });
    return updateResult;
  }
}
