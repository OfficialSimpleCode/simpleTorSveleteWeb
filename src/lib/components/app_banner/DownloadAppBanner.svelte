<script>
  import {
    ScreenController,
    downloadAppBanner,
  } from "$lib/controllers/screens_controller";
  import { fly } from "svelte/transition";
  import CloseButton from "./components/CloseButton.svelte";
  import DownloadButtons from "./components/DownloadButtons.svelte";
  import QrConatiner from "./components/QrConatiner.svelte";
  import Text from "./components/Text.svelte";
</script>

{#if $downloadAppBanner === true && ScreenController.pressExistBanner != true}
  <div
    class="fixed w-full sm:w-auto sm:left-4 bottom-6 z-40 flex items-center justify-center"
    in:fly={{ y: 100, duration: 400 }}
    out:fly={{ y: 100, duration: 400 }}
  >
    <div class="relative w-full mx-4">
      <div
        class="flex flex-row bg-opacity-80 backdrop-blur-lg bg-base-300 rounded-[1.9rem] py-4 px-2 sm:px-8 gap-7 border-[2px] border-base-200"
      >
        <div class="flex flex-row justify-center w-full gap-5">
          <div class="flex flex-col w-full gap-4 sm:gap-6">
            <!-- text -->
            <Text />
            <!-- buttons-->
            <DownloadButtons />
          </div>

          <QrConatiner />
        </div>
        <CloseButton />
      </div>
    </div>
  </div>
{/if}
