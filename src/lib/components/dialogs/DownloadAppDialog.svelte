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
  <div class="modal-box bg-base-200 pb-10 items-center">
    <div class="flex justify-between items-center mb-[1rem]">
      <h3 class="font-bold text-md text-center">
        {translate("downloadTheApp")}
      </h3>
      <button class="btn btn-ghost" on:click={() => dialog.close()}>
        <Icon src={XCircle} size="24px" />
      </button>
    </div>

    <h3 class="text-sm">{translate("downloadTheAppExplain")}</h3>
    <LottieAnimation animationFile={sendMessageAnimation} />
    <DownloadAppButton />
  </div>
</dialog>
