<script lang="ts">
  import { bookingMakerButton } from "$lib/consts/css_classes";
  import { Gender } from "$lib/consts/gender";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { isManager, pushDialog } from "$lib/utils/general_utils";
  import { imageByGender } from "$lib/utils/images_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";
  import WorkerAboutDialog from "./WorkerAboutDialog.svelte";

  export let worker: WorkerModel;
  let aboutDialog: HTMLDialogElement;

  // on tap save the worker and load the workers' treatment
  function onTapWorker() {
    BookingController.setWorkerId(worker.id);
  }
  $: isPicked = $bookingMakerStore.workerId === worker.id;
</script>

<WorkerAboutDialog bind:dialog={aboutDialog} {worker} />

<button
  on:click={onTapWorker}
  class="{bookingMakerButton} w-full px-2 py-10 flex flex-col {isPicked
    ? 'border-solid border-2 border-base-content brightness-95'
    : ''}"
>
  <div class="flex flex-row items-center justify-start gap-1 w-full">
    <!-- worke's avatar image -->
    <div class="avatar">
      <div class="w-16 rounded-full">
        <img
          src={worker.profileImg || imageByGender(worker.gender)}
          alt={translate("theProfileOfTemplate", $_).replace(
            "NAME",
            worker.name
          )}
        />
      </div>
    </div>

    <!-- worker details -->
    <div class="flex flex-col w-[80%]">
      <!-- name  -->
      <h1
        class="text-lg sm:text-xl text-start overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {worker.name}
      </h1>

      <div class="flex flex-row justify-between items-center gap-1 w-full">
        <!-- worker abour or default -->

        <p class="opacity-90 text-start xs:text-md text-sm truncate">
          {worker.about != ""
            ? worker.about
            : translate(
                isManager(worker.id)
                  ? worker.gender == Gender.female
                    ? "ManagerInfoDefaultTextFemale"
                    : "ManagerInfoDefaultText"
                  : worker.gender == Gender.female
                    ? "WorkerInfoDefaultTextFemale"
                    : "WorkerInfoDefaultText",
                $_,
                false
              ).replaceAll("DATE", dateToDateStr(worker.createdAt))}
        </p>

        <button
          on:click|stopPropagation={() => {
            pushDialog(aboutDialog);
          }}
        >
          <p class="xs:text-md text-sm hover:opacity-70 px-1 py-1 z-100">
            {translate("MoreText", $_)}
          </p>
        </button>
      </div>
    </div>
  </div>
</button>
