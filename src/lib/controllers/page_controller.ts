import { goto } from "$app/navigation";
import { base } from "$app/paths";
import { businessStore } from "$lib/stores/Business";
import { get } from "svelte/store";

export async function openOrdersPage() {
  if (get(businessStore) != null) {
    await goto(`${base}/business/${get(businessStore)?.url ?? ""}/orders`);
  } else {
    await goto(`${base}/orders`);
  }
}
