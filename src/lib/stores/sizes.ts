import { writable } from "svelte/store";

type ScreenSize = {
  width: number;
  height: number;
};
export let screenSizeStore = writable<ScreenSize>({
  width: 1000,
  height: 1000,
});
