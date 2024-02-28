<script lang="ts">
  import { phoneAnimation } from "$lib/consts/resources";
  import { translate } from "$lib/utils/translate";
  import DialogTitel from "../custom_components/DialogTitel.svelte";
  import DownloadAppButton from "../custom_components/DownloadAppButton.svelte";
  import LottieAnimation from "../custom_components/LottieAnimation.svelte";
  import DialogStrucher from "./DialogStrucher.svelte";
  export let explainTranslateKey: string | undefined = undefined;
  export let dialog: HTMLDialogElement;
</script>

<DialogStrucher bind:dialog>
  <div class="modal-box bg-base-200 items-center">
    <!-- title and top buttons -->
    <DialogTitel titleTransKey="downloadTheApp" {dialog} />

    <!-- text, animation, and download button -->
    <div class="flex flex-col gap-3 items-center h-full">
      <h3 class="text-sm text-center mx-6">
        {translate(explainTranslateKey ?? "downloadTheAppExplain")}
      </h3>
      <LottieAnimation animationFile={phoneAnimation} loop={true} size="xl3" />
      <DownloadAppButton />
    </div>
  </div>
</DialogStrucher>
