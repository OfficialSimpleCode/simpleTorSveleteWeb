import { writable } from "svelte/store";
import BusinessModel from "$lib/models/business/business_model";

export let business = writable<BusinessModel>();
