import { LoadAppHelper } from "$lib/helpers/load_app_helper";

export const load = async ({ params }) => {
  await LoadAppHelper.GI().loadApp();
};
