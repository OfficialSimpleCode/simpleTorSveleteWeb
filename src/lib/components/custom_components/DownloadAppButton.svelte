<script>
  import { businessStore } from "$lib/stores/Business";
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import { translate } from "$lib/utils/translate";
</script>

<!-- download simple tor app -->
<a
  target="_blank"
  href={getDownloadingAppLink($businessStore?.dynamicLink ?? "")}
  class="btn lg:btn-md btn-primary flex items-center justify-center"
>
  {translate("downloadSimpleTor")}
</a>
