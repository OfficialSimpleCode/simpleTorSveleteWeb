import { GeneralData } from "$lib/helpers/general_data";

export function isManager(id: string): boolean {
  return id.length < 20
    ? GeneralData.currentBusinesssId.startsWith(id.substring(1))
    : GeneralData.currentBusinesssId.startsWith(id);
}
