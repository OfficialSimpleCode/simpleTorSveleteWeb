import { GeneralData } from "$lib/helpers/general_data";

export function isManager(id: string): boolean {
  return id.length < 20
    ? GeneralData.currentBusinesssId.startsWith(id.substring(1))
    : GeneralData.currentBusinesssId.startsWith(id);
}

export function getManagerIdFromBusinessId(businessId: string): string {
  const managerId = businessId.split("--")[0];
  if (managerId.length < 30) {
    return "+" + managerId;
  }
  return managerId;
}
