<script lang="ts">
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { isManager } from "$lib/utils/general_utils";
  import { imageByGender } from "$lib/utils/images_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";

  export let worker: WorkerModel;

  // on tap save the worker and load the workes' treatment
  function onTapWorker(worker: WorkerModel) {
    BookingController.setWorkerId(worker.id);
  }
  $: isPicked = $bookingMakerStore.workerId === worker.id;
</script>

<button
  class="btn bg-primary hover:opacity-85 hover:bg-primary rounded-xl w-full sm:min-w-[500px] md:w-[40%] h-20 sm:h-28 flex items-center px-2 gap-2 py-2 {isPicked
    ? 'outline outline-2'
    : ''}"
  on:click={() => onTapWorker(worker)}
>
  <!-- worke's avatar image -->
  <div class="avatar">
    <div class="w-14 sm:w-20 rounded-full">
      <img
        src={worker.profileImg || imageByGender(worker.gender)}
        alt="employee"
      />
    </div>
  </div>

  <!-- worker details -->
  <div class="w-[80%]">
    <!-- name  -->
    <h1
      class="text-2xl sm:text-4xl text-start overflow-hidden w-[95%] whitespace-nowrap text-ellipsis"
    >
      {worker.name}
    </h1>

    <div class="flex felx-row justify-between items-center gap-1">
      <!-- worker abour or default -->
      {#if worker.about === ""}
        <p
          class="opacity-90 text-start xs:text-lg text-sm overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {translate(isManager(worker.id) ? "manager" : "worker", $_)}
          {translate("since", $_)}: {dateToDateStr(worker.createdAt)}
        </p>
      {:else}
        <p
          class="opacity-90 text-start xs:text-lg text-sm overflow-hidden w-[80%] whitespace-nowrap text-ellipsis"
        >
          {worker.about}
        </p>
      {/if}
      <p class="mx-1 xs:text-lg text-sm">{translate("MoreText", $_)}</p>
    </div>
  </div>
</button>
