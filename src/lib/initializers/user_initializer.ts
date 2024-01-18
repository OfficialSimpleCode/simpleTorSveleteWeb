import { logger } from "$lib/consts/application_general";
import { usersCollection } from "$lib/consts/db";
import { GeneralData } from "$lib/helpers/general_data";
import UserRepo from "$lib/helpers/user/user_repo";
import VerificationRepo from "$lib/helpers/verification/verification_repo";
import UserModel from "$lib/models/user/user_model";
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

  userRepo: UserRepo = new UserRepo();

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
      logger.info(`The user id is -> ${newUserId}`);
      if (newUserId.length < 5) {
        await this.verificationRepo.logout();
        return true; // to not display an error
      }

      /*If user came from logging his doc already in the userDoc 
      and there is no need to read again from the db*/
      if (this.userDoc === undefined) {
        this.userDoc = await this.userRepo.getDocRepo({
          path: usersCollection,
          docId: newUserId,
        });
      }

      if (
        !logoutIfDosentExist &&
        (this.userDoc == undefined || !this.userDoc.exists())
      ) {
        this.userDoc = undefined;
        return true; // new user log-in and not registered yet -> leave him logged-in
      }

      this.user = UserModel.fromUserDocJson(this.userDoc?.data()!);

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
}
