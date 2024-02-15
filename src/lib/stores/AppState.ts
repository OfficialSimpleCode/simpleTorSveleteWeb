import type { LoadingStatuses } from "$lib/consts/loading_statuses";
import { writable } from "svelte/store";

export let appStateStore = writable<LoadingStatuses>();
