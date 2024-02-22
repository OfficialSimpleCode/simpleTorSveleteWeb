import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import type { Update } from "$lib/models/business/update_model";

export function popUpUpdate(): Update | undefined {
  let updateToPop: Update | undefined;
  Object.entries(BusinessInitializer.GI().business.design.updates).forEach(
    ([index, update]) => {
      if (update.popOnEnter) {
        updateToPop = update;
      }
    }
  );

  if (
    UserInitializer.GI().isConnected &&
    updateToPop &&
    !(
      UserInitializer.GI().user.seenUpdates[
        BusinessInitializer.GI().business.businessId
      ] ?? new Set()
    ).has(updateToPop.id)
  ) {
    return updateToPop;
  }
  return undefined;
}
