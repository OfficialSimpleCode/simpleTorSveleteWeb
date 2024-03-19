import { writable } from "svelte/store";

export let contactUsSubjectStore = writable<string>("");

export class HomePageController {
  static messageContactUsCounter: number = 0;
}
