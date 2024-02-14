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
</script>

<button
  class="bg-primary rounded-xl w-full max-w-[90%] sm:min-w-[500px] md:w-[40%] h-20 sm:h-32 flex items-center px-6 gap-5 box-border py-2"
  class:opacity-50={$bookingMakerStore.workerId !== worker.id}
  class:border={$bookingMakerStore.workerId === worker.id}
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
  <div>
    <!-- name  -->
    <h1 class="text-2xl sm:text-4xl text-start">
      {worker.name}
    </h1>

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
        class="opacity-90 text-start xs:text-lg text-sm overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {worker.about}
      </p>
    {/if}
  </div>
</button>
