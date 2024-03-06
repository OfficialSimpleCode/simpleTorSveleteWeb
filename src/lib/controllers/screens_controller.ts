import { writable } from "svelte/store";

export let downloadAppBanner = writable<boolean>(false);

export let pressExistBanner: boolean = false;

export class ScreenController {
  static pressExistBanner: boolean = false;

  static popDownloadAppBanner() {
    setTimeout(() => downloadAppBanner.set(true), 700);
    setTimeout(() => downloadAppBanner.set(false), 30000);
  }
}
