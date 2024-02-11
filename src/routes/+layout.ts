import { LoadAppHelper } from "$lib/helpers/load_app_helper";

export const load = async () => {
  await LoadAppHelper.GI().loadApp();
};
