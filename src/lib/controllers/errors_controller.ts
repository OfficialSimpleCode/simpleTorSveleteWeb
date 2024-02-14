import AppErrorsHelper from "$lib/helpers/app_errors";
import { errorMessageToStr } from "$lib/services/errors/messages";
import { ShowToast } from "$lib/stores/ToastManager";
import { translate } from "$lib/utils/translate";

export class ErrorsController {
  static displayError() {
    ShowToast({
      status: "fail",
      text: translate(errorMessageToStr[AppErrorsHelper.GI().error]),
    });
  }
}
