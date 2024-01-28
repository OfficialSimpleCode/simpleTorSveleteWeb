<script lang="ts">
  import { translate } from "$lib/utils/translate";

  export let fieldTranslateKey: string;
  export let value: string;
</script>

<div class="h-[1px] w-full bg-base-200 opacity-90"></div>
<div class="flex flex-row justify-between">
  <h1>{translate(fieldTranslateKey)}</h1>
  <h1 dir="ltr">{value}</h1>
</div>
