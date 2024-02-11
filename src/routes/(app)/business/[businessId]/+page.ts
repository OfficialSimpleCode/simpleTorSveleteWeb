import LinksHelper from "$lib/helpers/links_helper";
import { LoadAppHelper } from "$lib/helpers/load_app_helper";

export const load = async ({ params }) => {
  LinksHelper.GI().linkedBuisnessId =
    params.businessId || "972-525656377--50ab63a0-a192-11ed-950c-3ba22fe40036";
  if (LinksHelper.GI().linkedBuisnessId === "") {
    return;
  }

  await LoadAppHelper.GI().loadApp();
};
