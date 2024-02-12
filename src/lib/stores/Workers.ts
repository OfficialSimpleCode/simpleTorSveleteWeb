import WorkerModel from "$lib/models/worker/worker_model";
import { writable } from "svelte/store";

export let workersStore = writable<Record<string, WorkerModel>>({});
