import { writable } from "svelte/store";

export let canUseOtpStore = writable<boolean | undefined>(undefined);
