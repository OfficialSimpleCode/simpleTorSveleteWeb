import { writable } from "svelte/store";

export let contactUsSubjectStore = writable<string>("");
export let markContactUsSubjectStore = writable<boolean>(false);
export class HomePageController {
  static messageContactUsCounter: number = 0;
}
