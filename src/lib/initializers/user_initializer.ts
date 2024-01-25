import { logger } from "$lib/consts/application_general";
import { usersCollection } from "$lib/consts/db";
import AppErrorsHelper from "$lib/helpers/app_errors";
import GeneralRepo from "$lib/helpers/general/general_repo";
import { GeneralData } from "$lib/helpers/general_data";
//import UserRepo from "$lib/helpers/user/user_repo";

import VerificationRepo from "$lib/helpers/verification/verification_repo";
import UserModel from "$lib/models/user/user_model";
import { userStore } from "$lib/stores/User";
import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

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

  //userRepo: UserRepo = new UserRepo();

  userDoc: DocumentSnapshot<DocumentData, DocumentData> | undefined;

  get getPermission(): number {
    return 0;
  }

  isDeveloper(): boolean {
    if (!this.isConnected) return false;
    return GeneralData.developers.hasOwnProperty(this.user.id.replace("+", ""));
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
      console.log(
        "Eeeeeeeeee11111111111111111111111111111111111111111111111111111111111111111hhhhhhhhhhhheeeeeeeeeeeeeeeeeeee"
      );
      logger.info(`The user id is -> ${newUserId}`);
      if (newUserId.length < 5) {
        await this.verificationRepo.logout();
        return true; // to not display an error
      }
      console.log(
        "Eeeeeeeeee11111111111111111111111111111111111111111111111111111111111111111hhhhhhhhhhhheeeeeeeeeeeeeeeeeeee"
      );
      /*If user came from logging his doc already in the userDoc 
      and there is no need to read again from the db*/
      if (this.userDoc === undefined) {
        this.userDoc = await new GeneralRepo().getDocSRV({
          path: usersCollection,
          docId: newUserId,
        });
      }
      console.log(
        "Eeeeeeeeee11111111111111111111111111111111111111111111111111111111111111111hhhhhhhhhhhheeeeeeeeeeeeeeeeeeee"
      );

      console.log(
        !logoutIfDosentExist,
        this.userDoc === undefined,
        !this.userDoc.exists()
      );
      if (
        !logoutIfDosentExist &&
        (this.userDoc === undefined || !this.userDoc.exists())
      ) {
        this.userDoc = undefined;
        return true; // new user log-in and not registered yet -> leave him logged-in
      }

      this.user = UserModel.fromUserDocJson(this.userDoc?.data()!);
      console.log(
        "Eeeeeeeeee11111111111111111111111111111111111111111111111111111111111111111hhhhhhhhhhhheeeeeeeeeeeeeeeeeeee"
      );
      /*No need to take the user public data the startListening 
        func will take it*/
      this.startPublicDataListening();
      console.log(
        "Eeeeeeeeee11111111111111111111111111111111111111111111111111111111111111111hhhhhhhhhhhheeeeeeeeeeeeeeeeeeee"
      );
      console.log(this.user);
      userStore.set(this.user);

      return true;
    } catch (e) {
      /*initialize the user Doc*/
      this.userDoc = undefined;
      if (e instanceof Error) {
        logger.error(`Error while setting up the user --> ${e}`);
        AppErrorsHelper.GI().addError({ details: e.toString() });
      }

      return false;
    }
  }

  async startPublicDataListening() {
    /*create listening for the user public data */
    if (!this.isConnected) return;

    // this.user.userPublicDataListener = this.userRepo.docListener({
    //   path: `${usersCollection}/${this.user.id}/${dataCollection}`,
    //   docId: dataDoc,
    //   onChanged: async (dataJson) => {
    //     try {
    //       if (dataJson.exists()) {
    //         this.user.setUserPublicData(dataJson.data()!);
    //         console.log(
    //           `bookings to load ->  ${this.user.userPublicData.bookingsDocsToLoad}`
    //         );
    //         await this.loadBookingsDocs(
    //           this.user.userPublicData.bookingsDocsToLoad
    //         );

    //         // // update server to relevant fcm for notifications
    //         // _transaferInvoiceIfNeeded();
    //         // transaferBookingsIfNeeded(this.user);
    //         // _deleteDocsFromLocal();

    //         console.log("Getting new user data from database");
    //         this.user.userPublicData.reminders = {};

    //         if (GeneralData.currentBusinesssId !== "") {
    //           this.user.userPublicData.reminders = await checkForReminders();
    //         }

    //         console.log(this.user);

    //         // if (
    //         //   this.user.userPublicData.reminders != null &&
    //         //   this.user.userPublicData.reminders.isEmpty &&
    //         //   BusinessUIController().showReminderNavigator.value
    //         // ) {
    //         //   BusinessUIController().showReminderNavigator.value = false;
    //         //   BusinessUIController().showReminderNavigator.notifyListeners();
    //         // }

    //         // if (
    //         //   this.user.userPublicData.reminders != null &&
    //         //   this.user.userPublicData.reminders.isNotEmpty &&
    //         //   !BusinessUIController().showReminderNavigator.value
    //         // ) {
    //         //   BusinessUIController().showReminderNavigator.value = true;
    //         //   BusinessUIController().showReminderNavigator.notifyListeners();
    //         // }

    //         // UiManager.insertUpdate(Providers.user);

    //         // if (this.userListinerAllowUpdate) {
    //         //   UiManager.updateUi({ context: GeneralData.generalContext });
    //         // }
    //       }
    //     } catch (error) {
    //       console.error(`Error in startPublicDataListening: ${error}`);
    //     }
    //   },
    // });
  }

  async loadBookingsDocs(docs: Set<string>) {
    const futures: Promise<void>[] = [];

    docs.forEach((docId) => {
      futures.push(this.loadBookingDoc(docId));
    });

    await Promise.all(futures);
  }

  async loadBookingDoc(docId: string): Promise<void> {
    // try {
    //   const bookingsDoc = await this.userRepo.getDocSRV({
    //     path: DbPathesHelper.GI().userBookingsPathByUser(this.user.id),
    //     docId: docId,
    //   });
    //   if (docId === recurrenceBookingsDoc) {
    //     this.user.bookings.setRecurrence(bookingsDoc?.data() || {});
    //   } else {
    //     this.user.bookings.setMonth(bookingsDoc?.data() || {}, docId);
    //   }
    // } catch (error) {
    //   logger.error(`Error loading booking doc ${docId}: ${error}`);
    // }
  }
}
