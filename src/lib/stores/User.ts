import UserModel from "$lib/models/user/user_model";
import { writable } from "svelte/store";

export let userStore = writable<UserModel>(new UserModel({}));
export let isConnectedStore = writable<boolean>(false);
