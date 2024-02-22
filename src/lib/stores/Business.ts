import type { SubType } from "$lib/consts/purchases";
import BusinessModel from "$lib/models/business/business_model";
import { writable } from "svelte/store";

export let businessStore = writable<BusinessModel | undefined>(undefined);
export let activeBusiness = writable<boolean | undefined>(undefined);
export let businessSubStore = writable<SubType | undefined>(undefined);
