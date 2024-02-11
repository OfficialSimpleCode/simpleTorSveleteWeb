import LinksHelper from "$lib/helpers/links_helper";
import { LoadAppHelper } from "$lib/helpers/load_app_helper";

export const load = async ({ params }) => {
  const businessId = params.businessId;
  LinksHelper.GI().linkedBuisnessId = businessId;
  if (LinksHelper.GI().linkedBuisnessId === "") {
    return;
  }

  await LoadAppHelper.GI().loadApp();
};
