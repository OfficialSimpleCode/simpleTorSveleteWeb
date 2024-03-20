<script lang="ts">
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";

  export let textTransKey: string = "downloadSimpleTor";
  let downloadLink = "";
  // After the ui is loaded
  onMount(() => {
    downloadLink = getDownloadingAppLink();
  });
</script>

<!-- download simple tor app -->
<a
  target="_blank"
  href={downloadLink}
  class="btn lg:btn-md btn-primary flex items-center justify-center"
>
  {translate(textTransKey, $_)}
</a>
