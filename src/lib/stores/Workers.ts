import { writable } from "svelte/store";
import WorkerModel from "$lib/models/worker/worker_model";

export let workers = writable<Record<string, WorkerModel>>();
