import { ErrorsTypeLog, logger } from "$lib/consts/application_general";
import { LoadingStatuses } from "$lib/consts/loading_statuses";
import UserInitializer from "$lib/initializers/user_initializer";

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

    GeneralData.hasPaddingFromTop = GeneralData.paddingFromTop > 0;
    this.updateStatus(LoadingStatuses.success);
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

    return null;
  }

  private loadUserData() {
    if (!VerificationHelper.GI().canUseAuthVars) {
      //wait for the firebase to initial
      VerificationHelper.GI()
        .canUseUser()
        .then(() => {
          this.loadUser();
        });
    } else {
      this.loadUser();
    }
  }

  private async loadUser(): Promise<void> {
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

  async preLoadingFutures(): Promise<any[]> {
    while (true) {
      if (this.preLoading.length !== 0) {
        return this.preLoading;
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  async cachedBusinessIdFuture(): Promise<string> {
    while (true) {
      if (this.cachedBusinessId !== null) {
        return this.cachedBusinessId;
      }
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  }

  public initReloadApp(): void {
    this.status = LoadingStatuses.loading;
    this.preLoading = [];
    this.cachedBusinessId = null;
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
