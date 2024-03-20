import { writable } from "svelte/store";

export interface Toast {
  text: string;
  status: "success" | "fail" | "info" | "warning";
}

export let currentToast = writable<Toast | null>(null);

export function ShowToast(toast: Toast) {
  currentToast.set(toast);
  setTimeout(() => {
    currentToast.set(null);
  }, 20000);
}
