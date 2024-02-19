<script lang="ts">
  import DialogTitel from "$lib/components/custom_components/DialogTitel.svelte";
  import { Gender } from "$lib/consts/gender";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { isManager } from "$lib/utils/general_utils";
  import { imageByGender } from "$lib/utils/images_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";
  export let dialog: HTMLDialogElement;
  export let worker: WorkerModel;
</script>

<dialog
  bind:this={dialog}
  on:close={() => history.back()}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box bg-base-200 items-center">
    <!-- title and top buttons -->
    <DialogTitel {dialog} />

    <!-- text, animation, and download button -->
    <div class="flex flex-col gap-3 items-center">
      <div class="avatar">
        <div class="w-20 sm:w-28 rounded-full">
          <img
            src={worker.profileImg || imageByGender(worker.gender)}
            alt="worker"
          />
        </div>
      </div>
      <h3 class="text-sm text-center mx-6">
        {worker.name}
      </h3>
      <h3>
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
      </h3>
    </div>
  </div>
  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
