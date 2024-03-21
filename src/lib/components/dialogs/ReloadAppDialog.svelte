<script lang="ts">
  import { reloadAnimation } from "$lib/consts/resources";
  import { _, translate } from "$lib/utils/translate";
  import DialogTitel from "../custom_components/DialogTitel.svelte";
  import LottieAnimation from "../custom_components/LottieAnimation.svelte";
  import DialogStrucher from "./DialogStrucher.svelte";
  export let dialog: HTMLDialogElement;
</script>

<DialogStrucher bind:dialog onlyMiddle={true}>
  <div class="modal-box bg-base-200 max-w-[400px]">
    <!-- title -->
    <DialogTitel titleTransKey={"reloadApp"} {dialog} />
    <div class="flex flex-col items-center w-full justify-center">
      <!-- animation if provided -->

      <LottieAnimation animationFile={reloadAnimation} loop={true} size="xl2" />

      <!-- content -->

      <p class="text-center text-md mx-3 pt-2">
        {translate("itsTakeTooMuchTime", $_)}
      </p>

      <slot name="extra" />

      <!-- button actions buttons -->

      <button
        class="btn btn-md btn-primary flex-[1] max-w-[270px] mt-4 min-w-[200px]"
        on:click={async () => {
          window.location = window.location;
        }}
      >
        {translate("refreh", $_)}
      </button>
    </div>
  </div>
</DialogStrucher>
