<script lang="ts">
  import DialogTitel from "$lib/components/custom_components/DialogTitel.svelte";
  import DialogStrucher from "$lib/components/dialogs/DialogStrucher.svelte";
  import { Gender } from "$lib/consts/gender";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { isManager } from "$lib/utils/general_utils";
  import { imageByGender } from "$lib/utils/images_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";
  export let dialog: HTMLDialogElement;
  export let worker: WorkerModel;
</script>

<DialogStrucher bind:dialog onlyMiddle={true}>
  <div class="modal-box bg-base-200 items-center max-w-[300px]">
    <!-- title and top buttons -->
    <DialogTitel {dialog} />

    <!-- text, animation, and download button -->
    <div class="flex flex-col gap-4 items-center justify-center">
      <div class="flex flex-col gap-1">
        <div class="avatar">
          <div class="w-20 sm:w-28 rounded-full">
            <img
              src={worker.profileImg || imageByGender(worker.gender)}
              alt="worker"
            />
          </div>
        </div>
        <h3 class="text-lg text-center mx-6">
          {worker.name}
        </h3>
      </div>
      <div class=" w-[220px]">
        <h3 class="text-center text-xs sm:text-sm">
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
  </div>
</DialogStrucher>
