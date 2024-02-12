import { ErrorsTypeLog, logger } from "$lib/consts/application_general";
import { LoadingStatuses } from "$lib/consts/loading_statuses";
import UserInitializer from "$lib/initializers/user_initializer";
import { Developer } from "$lib/models/developers/developer";

import { isNetworkConnected } from "$lib/utils/general_utils";
import { Timestamp } from "firebase/firestore";
import AppErrorsHelper from "./app_errors";
import DeveloperHelper from "./developer_helper";
import { GeneralData } from "./general_data";
// import LinksHelper from "./links_helper";
import { isConnectedStore } from "$lib/stores/User";
import ThemeHelper from "./theme_helper";
import { VerificationHelper } from "./verification/verification_helper";

export class LoadAppHelper {
  private static _singleton: LoadAppHelper = new LoadAppHelper();
  private constructor() {}
  public static GI(): LoadAppHelper {
    return LoadAppHelper._singleton;
  }

  public status: LoadingStatuses = LoadingStatuses.loading;
  public preLoading: any[] = [];
  public cachedBusinessId: string | null = null;
  public firstTime: boolean = true;
  public userLoaded = false;

  async loadApp(): Promise<void> {
    if (this.status !== LoadingStatuses.loading) {
      return;
    }

    if (ThemeHelper.GI().themeCauseMainBuilt) {
      this.status = LoadingStatuses.success;

      return;
    }
    isNetworkConnected().then((value) => {
      if (!value) {
        this.updateStatus(LoadingStatuses.noInternetConnection);
      }
    });
    try {
      this.loadUserData();
    } catch (e) {
      if (e instanceof Error) {
        AppErrorsHelper.GI().details = "4 -->" + e.toString();
      }

      this.updateStatus(LoadingStatuses.unknownError);
      return;
    }

    // try {
    //   console.log("3333333333ssssss");
    //   if (this.firstTime) {
    //     console.log("3333333333ssssss");
    //     //const resp = this.checkForErrors(await this.preLoadingFutures());
    //     console.log("3333333333ssssss");
    //     if (resp !== null) {
    //       resp();
    //       return;
    //     }
    //     console.log("3333333333ssssss");
    //   }
    // } catch (e) {
    //   logger.error(
    //     "Error while get the pre loading --> ${this.preLoading}\n $e"
    //   );
    // }

    GeneralData.developers = this.parseDevelopers();
    //parseAppLimit(FirebseRometeConfig.GI().getLimits());

    // if (GeneralData.currentBusinesssId !== "") {
    //   BusinessInitializer.GI().initialBusinessDataOnUser(
    //     GeneralData.currentBusinesssId
    //   );
    // }

    GeneralData.hasPaddingFromTop = GeneralData.paddingFromTop > 0;
    this.updateStatus(LoadingStatuses.success);
  }

  parseDevelopers(): Record<string, Developer> {
    const developers: Record<string, Developer> = {};
    // const map = FirebseRometeConfig.GI().getDevelopers();
    // Object.entries<Record<string, any>>(map).forEach(([developerId, data]) => {
    //   developers[developerId] = Developer.fromJson(data, developerId);
    // });
    return developers;
  }

  checkForErrors(resp: any[]): (() => void) | null {
    if (resp[1] === false) {
      return () => {
        this.updateStatus(LoadingStatuses.timeError);
        return;
      };
    }
    if (resp[0] === false) {
      return () => {
        this.updateStatus(LoadingStatuses.unknownError);
        return;
      };
    }

    // if (FirebseRometeConfig.GI().isAppInMaintenance()) {
    //   return () => {
    //     this.updateStatus(LoadingStatuses.maintenanceMode);
    //     return;
    //   };
    // }
    return null;
  }

  private loadUserData() {
    if (!VerificationHelper.GI().canUseAuthVars) {
      VerificationHelper.GI().startUserAuthListener(() => this.loadUser());
    } else {
      this.loadUser();
    }
  }

  private async loadUser(): Promise<void> {
    console.log(`user -> ${UserInitializer.GI().userId}`);
    if (!UserInitializer.GI().isConnected) {
      isConnectedStore.set(false);
      return;
    }
    const resp = await UserInitializer.GI().setupUser({
      newUserId: UserInitializer.GI().userId,
    });
    if (!resp) {
      this.updateStatus(LoadingStatuses.unknownError);
      this.userLoaded = false;
    }
    this.userLoaded = true;
  }

  updateStatus(status: LoadingStatuses): void {
    if (
      this.status === LoadingStatuses.noInternetConnection &&
      status !== LoadingStatuses.loading &&
      status !== LoadingStatuses.success
    ) {
      logger.info("Ignore status update (no internet is above) --> $status");
      return;
    }
    logger.info("Status is updated to --> $status");
    this.status = status;
  }

  async executeFuture(func: () => Promise<boolean>): Promise<boolean> {
    const resp = await func();
    if (!resp) this.updateStatus(LoadingStatuses.unknownError);
    return resp;
  }

  // async preLoadingFutures(): Promise<any[]> {
  //   // while (true) {
  //   //   if (this.preLoading.length !== 0) {
  //   //     return this.preLoading;
  //   //   }
  //   //   await new Promise((resolve) => setTimeout(resolve, 50));
  //   // }
  // }

  async cachedBusinessIdFuture(): Promise<string> {
    while (true) {
      if (this.cachedBusinessId !== null) {
        return this.cachedBusinessId;
      }
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  }

  private async preLoadingFuncs(): Promise<void> {
    try {
      // const futuresList = await Promise.all([
      //   FirebseRometeConfig.GI()
      //     .initService()
      //     .catch(async (error) => {
      //       await new Promise((resolve) => setTimeout(resolve, 1010));
      //       return await FirebseRometeConfig.GI()
      //         .initService()
      //         .catch((error) => {
      //           if (error instanceof Error) {
      //             this.reportIssue(new Error(), "RemoteContfig", {
      //               strIssue: `error:${error.toString()}\nstackTrace:${
      //                 error.stack
      //               }`,
      //             });
      //             AppErrorsHelper.GI().details = `config --> ${error.toString()}`;
      //           }
      //           return false;
      //         });
      //     }),
      // ]);
      // this.preLoading = futuresList;
    } catch (error) {
      logger.error("Error while load the pre loading functions --> $error");
    }
  }

  public initReloadApp(): void {
    this.status = LoadingStatuses.loading;
    this.preLoading = [];
    this.cachedBusinessId = null;
    this.preLoadingFuncs();
  }

  private async reportIssue(
    exception: Error,
    stage: string,

    options?: { strIssue?: string }
  ): Promise<void> {
    await DeveloperHelper.GI().logErrorToDb({
      userId: UserInitializer.GI().userId,
      errorType: ErrorsTypeLog.enter,
      exceptions: [exception],
      errorCode: stage,
      strIssue: options?.strIssue,
      extras: {
        StageOfCrush: stage,
        timeofCrush: Timestamp.now().toDate().toUTCString(),
      },
    });
  }
}
