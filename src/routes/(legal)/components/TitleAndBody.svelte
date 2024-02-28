<script lang="ts">
  import { _, translate } from "$lib/utils/translate";

  export let title: string;
  export let content: string[] = [];
  export let contentAsUl: boolean = false;
</script>

<div class="py-1">
  <h2 class="text-xl pt-2">{translate(title, $_)}</h2>

  {#if content.length > 0}
    {#if contentAsUl}
      <ul class="space-y-4">
        {#each content as ph}
          <li class="py-1 opacity-70">{translate(ph, $_)}</li>
        {/each}
      </ul>
    {:else}
      {#each content as ph}
        <p class="py-1 opacity-70">{translate(ph, $_)}</p>
      {/each}
    {/if}
  {:else}
    <div class="py-1 opacity-70">
      <slot />
    </div>
  {/if}
</div>
