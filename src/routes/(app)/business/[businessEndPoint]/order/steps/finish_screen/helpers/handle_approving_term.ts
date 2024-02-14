import { pushState } from "$app/navigation";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";

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
    pushState("", {
      showModal: true,
    });
    setTimeout(() => termDialog.showModal(), 200);
    return false;
  }
  return true;
}
