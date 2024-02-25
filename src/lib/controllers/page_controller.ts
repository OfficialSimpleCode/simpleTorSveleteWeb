import { goto } from "$app/navigation";
import { base } from "$app/paths";
import { businessStore } from "$lib/stores/Business";
import { get } from "svelte/store";

export function openOrdersPage() {
  if (get(businessStore) != null) {
    goto(`${base}/business/${get(businessStore)?.url ?? ""}/orders`);
  } else {
    goto(`${base}/orders`);
  }
}
