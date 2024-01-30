<script lang="ts">
  import type WorkerModel from "$lib/models/worker/worker_model";

  import { WorkersPermissionsKeys } from "$lib/consts/manager";

  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { _ } from "$lib/utils/translate";
  import WorkerItem from "./components/WorkerItem.svelte";

  const workers: WorkerModel[] = [];

  // add the workers of the business
  Object.entries($workersStore).forEach(([workerId, worker]) => {
    if (
      $businessStore.workersPermissions.map[workerId]?.get(
        WorkersPermissionsKeys.bookingsPermission
      ) ??
      true
    ) {
      workers.push(worker);
    }
  });

  // sort the worker by joining to the business
  workers.sort((a, b) => {
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
</script>

<section id="employee-step" class="w-full flex flex-col items-center gap-10">
  <!-- title -->
  <h1 class="text-2xl">{$_("pickWorker")}</h1>

  <!-- list of workers -->
  <ul class="h-full flex flex-wrap items-center justify-center gap-7 md:mx-3">
    {#each workers as worker}
      <WorkerItem {worker}></WorkerItem>
    {/each}
  </ul>
</section>
