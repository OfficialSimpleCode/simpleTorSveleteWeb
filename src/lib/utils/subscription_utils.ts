import { SubType } from "$lib/consts/purchases";
import RemoteConfigHelper from "$lib/helpers/remote_config_helper";

export function subTypeFromProductId(
  productId: string,
  businessId: string
): SubType {
  const ownerId = businessId.split("--")[0];

  if (productId.includes("basic")) {
    return SubType.basic;
  }
  if (productId.includes("landing")) {
    return SubType.landingPage;
  } else if (productId.includes("advanced")) {
    return SubType.advanced;
  } else if (productId.includes("golden")) {
    return SubType.golden;
  }

  if (RemoteConfigHelper.GI().developers != null) {
    if (RemoteConfigHelper.GI().developers!.hasOwnProperty(ownerId)) {
      productId =
        RemoteConfigHelper.GI().developers![ownerId].businessProductId;
    }
  }

  return SubType.trial;
}
