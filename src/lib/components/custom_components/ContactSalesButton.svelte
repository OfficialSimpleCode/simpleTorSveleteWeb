<script lang="ts">
  import { base } from "$app/paths";
  import { _, translate } from "$lib/utils/translate";

  export let textTransKey: string = "contactSales";
  export let target: string = "";
</script>

<!-- download simple tor app -->
<a
  {target}
  href={`${base}/contact-us?subject=${translate("textChip2", $_)}`}
  class="btn lg:btn-md btn-primary flex items-center justify-center"
>
  {translate(textTransKey, $_)}
</a>
