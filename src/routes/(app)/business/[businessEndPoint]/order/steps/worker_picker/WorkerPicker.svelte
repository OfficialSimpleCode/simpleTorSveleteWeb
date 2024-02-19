<script lang="ts">
  import type WorkerModel from "$lib/models/worker/worker_model";

  import { WorkersPermissionsKeys } from "$lib/consts/manager";

  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { _ } from "$lib/utils/translate";
  import WorkerItem from "./components/WorkerItem.svelte";

  let workersList: WorkerModel[] = [];

  workersStore.subscribe((workers) => {
    workersList = [];
    // add the workers of the business
    Object.entries(workers).forEach(([workerId, worker]) => {
      if (
        $businessStore.workersPermissions.map[workerId]?.get(
          WorkersPermissionsKeys.bookingsPermission
        ) ??
        true
      ) {
        workersList.push(worker);
      }
    });

    // sort the worker by joining to the business
    workersList.sort((a, b) => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  });
</script>

<section
  id="employee-step"
  class="flex flex-col items-center gap-5 w-[95%] xs:w-[84%] sm:w-[85%]"
>
  <!-- title -->
  <h1 class="text-2xl">{$_("pickWorker")}</h1>

  <!-- list of workers -->
  <ul class="flex flex-col items-center w-full gap-4">
    {#each workersList as worker}
      <WorkerItem {worker} />
    {/each}
  </ul>
</section>
