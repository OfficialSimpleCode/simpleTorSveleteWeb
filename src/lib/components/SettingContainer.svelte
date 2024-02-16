<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  export let explainText: string | undefined = undefined;
</script>

<div class="flex flex-col gap-1 w-full items-center">
  <section class="w-[90%] {containerRadius} bg-base-200">
    <slot name="children" />
  </section>
  {#if explainText != null}
    <h3 class="opacity-70 w-[90%] px-3 text-xs">
      {explainText}
    </h3>
  {/if}
</div>
