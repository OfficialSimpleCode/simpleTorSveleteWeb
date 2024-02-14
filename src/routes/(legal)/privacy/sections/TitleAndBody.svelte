<script lang="ts">
  export let title: string;
  export let content: string = "";
</script>

<div class="py-1">
  <h2 class="text-xl">{title}</h2>

  {#if content}
    <p class="py-1 opacity-70">{content}</p>
  {:else}
    <div class="py-1 opacity-70">
      <slot />
    </div>
  {/if}
</div>
