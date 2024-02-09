<script>
  import { businessStore } from "$lib/stores/Business";
  import { downloadSimpleTor } from "$lib/utils/links_utils";
  import { translate } from "$lib/utils/translate";
</script>

<!-- download simple tor app -->
<button
  on:click={() => downloadSimpleTor($businessStore.dynamicLink)}
  class="btn lg:btn-lg bg-primary btn-primary flex items-center justify-center"
>
  {translate("downloadSimpleTor")}
</button>
