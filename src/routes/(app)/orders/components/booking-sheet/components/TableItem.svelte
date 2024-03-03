<script lang="ts">
  import { _, translate } from "$lib/utils/translate";

  export let fieldTranslateKey: string;
  export let value: string;
</script>

<div class="h-[1px] w-full bg-base-200 opacity-90"></div>
<div class="flex flex-row justify-between">
  <h2>{translate(fieldTranslateKey, $_)}</h2>
  <h2 dir="ltr">{value}</h2>
</div>
