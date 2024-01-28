<script lang="ts">
  import type WorkerModel from "$lib/models/worker/worker_model";

  import { WorkersPermissionsKeys } from "$lib/consts/manager";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";

  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { imageByGender } from "$lib/utils/images_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { translate, _ } from "$lib/utils/translate";
  import { isManager } from "$lib/utils/worker";

  const workers: WorkerModel[] = [];

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
  workers.sort((a, b) => {
    return a.createdAt.getTime() - b.createdAt.getTime();
  });

  function onTapWorker(worker: WorkerModel) {
    BookingController.setWorkerId(worker.id);
  }
</script>

<section id="employee-step" class="w-full flex flex-col items-center gap-10">
  <h1 class="text-2xl">{$_("chooseWorkers")}</h1>
  <ul class="w-[%70] h-full flex flex-wrap items-center justify-center gap-7">
    {#each workers as worker}
      <button
        class="bg-base-200 rounded-xl w-full max-w-[90%] sm:min-w-[380px] sm:w-[40%] h-20 sm:h-32 flex items-center px-6 box-border gap-5 border"
        class:border-black={$bookingMakerStore.workerId === worker.id}
        on:click={() => onTapWorker(worker)}
      >
        <div class="avatar">
          <div class="w-14 sm:w-20 rounded-full">
            <img
              src={worker.profileImg || imageByGender(worker.gender)}
              alt="employee"
            />
          </div>
        </div>
        <div>
          <h1 class="text-2xl sm:text-4xl text-start">
            {worker.name}
          </h1>
          {#if worker.about === ""}
            <p class="text-gray-500">
              {translate(isManager(worker.id) ? "manager" : "worker", $_)}
              {translate("since", $_)}: {dateToDateStr(worker.createdAt)}
            </p>
          {:else}
            <p class="text-gray-500">
              {worker.about}
            </p>
          {/if}
        </div>
      </button>
    {/each}
  </ul>
</section>
