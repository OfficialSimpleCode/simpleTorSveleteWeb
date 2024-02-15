import { LoadingStatuses } from "$lib/consts/loading_statuses";
import type { Developer } from "$lib/models/developers/developer";
import FirebseRometeConfig from "$lib/services/external_services/firebase_remote_config";
import { appStateStore } from "$lib/stores/AppState";
import { parseDevelopers } from "$lib/utils/remote_config_utils";

export default class RemoteConfigHelper {
  static _singleton: RemoteConfigHelper = new RemoteConfigHelper();

  constructor() {}

  static GI(): RemoteConfigHelper {
    return this._singleton;
  }

  developers: Record<string, Developer> | undefined = undefined;
  appInMaintenance: boolean = false;

  /// can load only in the browser side need the window
  ///obj - that mean after onMount
  async init() {
    await FirebseRometeConfig.GI().initService();
    this.developers = parseDevelopers();
    if (FirebseRometeConfig.GI().isAppInMaintenance()) {
      appStateStore.set(LoadingStatuses.maintenanceMode);
    }
  }
}
