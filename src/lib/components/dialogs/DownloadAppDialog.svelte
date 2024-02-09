<script lang="ts">
  import { sendMessageAnimation } from "$lib/consts/resources";
  import { translate } from "$lib/utils/translate";
  import { Icon, XCircle } from "svelte-hero-icons";
  import LottieAnimation from "../LottieAnimation.svelte";
  import DownloadAppButton from "../custom_components/DownloadAppButton.svelte";

  export let dialog: HTMLDialogElement;
</script>

<dialog
  bind:this={dialog}
  on:close={() => history.back()}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box bg-base-200 items-center">
    <!-- title and top buttons -->
    <div class="flex justify-center items-center mb-[2rem] relative">
      <!-- title -->
      <h3 class="font-bold text-lg text-center">
        {translate("downloadTheApp")}
      </h3>

      <!-- close button -->
      <div class="absolute w-full">
        <button class="btn btn-ghost" on:click={() => dialog.close()}>
          <Icon src={XCircle} size="24px" />
        </button>
      </div>
    </div>

    <!-- text, animation, and download button -->
    <div class="flex flex-col gap-3 items-center h-full">
      <h3 class="text-sm text-center mx-6">
        {translate("downloadTheAppExplain")}
      </h3>
      <LottieAnimation animationFile={sendMessageAnimation} />
      <DownloadAppButton />
    </div>
  </div>
  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
