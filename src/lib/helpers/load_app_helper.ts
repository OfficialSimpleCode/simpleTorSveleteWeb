import UserInitializer from "$lib/initializers/user_initializer";

import { isNetworkConnected } from "$lib/utils/general_utils";
import AppErrorsHelper from "./app_errors";
// import LinksHelper from "./links_helper";
import { logger } from "$lib/consts/application_general";
import { ErrorsController } from "$lib/controllers/errors_controller";
import { Errors } from "$lib/services/errors/messages";
import { ShowToast } from "$lib/stores/ToastManager";
import { isConnectedStore } from "$lib/stores/User";
import { translate } from "$lib/utils/translate";
import { get } from "svelte/store";
import { VerificationHelper } from "./verification/verification_helper";

export class LoadAppHelper {
  private static _singleton: LoadAppHelper = new LoadAppHelper();
  private constructor() {}
  public static GI(): LoadAppHelper {
    return LoadAppHelper._singleton;
  }

  async loadApp(): Promise<void> {
    //check if the internet is connect for insurance
    isNetworkConnected().then((value) => {
      if (!value) {
        AppErrorsHelper.GI().error = Errors.poorInternetConnection;
        ErrorsController.displayError();
      }
    });

    //try to load the user
    try {
      await this.loadUserData();
    } catch (e) {
      logger.error(`Error while loadUserData ${e}`);
      AppErrorsHelper.GI().error = Errors.loadUserError;
      ErrorsController.displayError();
      return;
    }
  }

  private async loadUserData() {
    if (!VerificationHelper.GI().canUseAuthVars) {
      //set up a time out for him to notify the user that the auth obj take time to load
      setTimeout(() => {
        if (get(isConnectedStore) == null) {
          ShowToast({
            text: translate("itsTakeTooMuchTime"),
            status: "warning",
          });
        }
      }, 4000);

      //wait for the firebase to initial
      await VerificationHelper.GI()
        .canUseUser()
        .then(async () => {
          console.log("start use the auth obj");
          await this.setUpUser();
        });
    } else {
      await this.setUpUser();
    }
  }

  private async setUpUser(): Promise<void> {
    //if the user is not connected no need isConnectedStore set to false
    if (!UserInitializer.GI().isConnected) {
      console.log("rrrrrrrrrrrrr");
      isConnectedStore.set(false);
      return;
    }
    //if the user loged set up his user object and update the isConnectedStore in the UserInitializer.GI().setupUser
    const resp = await UserInitializer.GI().setupUser({
      newUserId: UserInitializer.GI().userId,
    });

    if (!resp) {
      logger.error("setupUser return false");
      AppErrorsHelper.GI().error = Errors.loadUserError;
      ErrorsController.displayError();
    }
  }
}
