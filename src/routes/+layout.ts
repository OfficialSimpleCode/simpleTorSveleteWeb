import { LoadAppHelper } from "$lib/helpers/load_app_helper";

export const load = async () => {
  LoadAppHelper.GI().loadApp();
};
