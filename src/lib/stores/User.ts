import { writable } from "svelte/store";
import UserModel from "$lib/models/user/user_model";

export let user = writable<UserModel>();
