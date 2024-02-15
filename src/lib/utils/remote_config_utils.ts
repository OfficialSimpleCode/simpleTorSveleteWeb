import { Developer } from "$lib/models/developers/developer";
import FirebseRometeConfig from "$lib/services/external_services/firebase_remote_config";

export function parseDevelopers(): Record<string, Developer> {
  const developers: Record<string, Developer> = {};
  const map = FirebseRometeConfig.GI().getDevelopers();
  Object.entries<Record<string, any>>(map).forEach(([developerId, data]) => {
    developers[developerId] = Developer.fromJson(data, developerId);
  });
  return developers;
}
