import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import { pushDialog } from "$lib/utils/general_utils";

export function handleApproveTerm(termDialog: HTMLDialogElement) {
  const dateToApprove =
    UserInitializer.GI().user.termsApprovals[
      BusinessInitializer.GI().business.businessId
    ];
  const confirmTerm =
    dateToApprove != null &&
    dateToApprove >
      BusinessInitializer.GI().business.design.lastTimeToUpdateTerm;

  if (
    !confirmTerm &&
    BusinessInitializer.GI().business.design.term != "" &&
    BusinessInitializer.GI().business.design.mustConfirmTerm
  ) {
    pushDialog(termDialog);
    return false;
  }
  return true;
}
