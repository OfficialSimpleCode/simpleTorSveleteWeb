<script>
  import { downloadAppBanner } from "$lib/controllers/screens_controller";
  import { businessStore } from "$lib/stores/Business";
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";

  let downloadLink = "";
  // After the ui is loaded
  onMount(() => {
    downloadLink = getDownloadingAppLink($businessStore?.dynamicLink ?? "");
  });
  function closeBanner() {
    downloadAppBanner.set(false);
  }
</script>

<div class="flex flex-row justify-center sm:justify-start sm:w-full gap-2">
  <a
    class="btn btn-primary btn-md rounded-[2rem] w-[70%]"
    href={downloadLink}
    target="_blank"
  >
    {translate("downloadSimpleTorApp", $_)}
  </a>

  <button
    class="btn btn-outline btn-md rounded-[2rem] hidden sm:flex"
    on:click={closeBanner}
  >
    {translate("noThanks", $_)}
  </button>
</div>
