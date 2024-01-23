import { SubType } from "$lib/consts/purchases";
import { GeneralData } from "$lib/helpers/general_data";

export function subTypeFromProductId(
  productId: string,
  businessId: string
): SubType {
  const ownerId = businessId.split("--")[0];

  if (GeneralData.developers.hasOwnProperty(ownerId)) {
    productId = GeneralData.developers[ownerId].businessProductId;
  }

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

  return SubType.trial;
}
