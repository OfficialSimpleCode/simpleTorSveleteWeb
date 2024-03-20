<script lang="ts">
  import { page } from "$app/stores";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";

  let downloadLink = "";
  // After the ui is loaded
  onMount(() => {
    downloadLink = getDownloadingAppLink();
  });

  $: onBusiness = $page.url.pathname.includes("business");
</script>

<!-- download simple tor app -->
{#if !onBusiness}
  <a
    target="_blank"
    href={downloadLink}
    class="bg-primary items-center text-sm justify-center flex rounded-xl py-2 text-primary-content px-2 hover:brightness-110 h-[32px] sm:h-[38px] gap-[3px]"
  >
    {translate("startNow", $_)}
    <GeneralIcon icon="material-symbols:download" />
  </a>
{/if}
