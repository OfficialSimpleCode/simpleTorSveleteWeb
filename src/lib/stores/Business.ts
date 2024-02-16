import BusinessModel from "$lib/models/business/business_model";
import { writable } from "svelte/store";

export let businessStore = writable<BusinessModel>();
export let activeBusiness = writable<boolean | undefined>(undefined);
