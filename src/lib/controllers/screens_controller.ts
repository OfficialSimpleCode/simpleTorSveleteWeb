import { writable } from "svelte/store";

export let downloadAppBanner = writable<boolean>(false);
