<script lang="ts">
  import { base } from "$app/paths";
  import { businessStore } from "$lib/stores/Business";
  import BusinessNavigatorContent from "./BusinessNavigatorContent.svelte";

  $: ngClass = `flex items-center justify-center rounded-full hover:bg-primary hover:text-primary-content bg-base-200 block shrink-0 transition-all duration-200`;
</script>

{#if $businessStore != null}
  <a href={`${base}/business/${$businessStore.url}`} class="">
    <div
      class="{ngClass} flex flex-row h-[34px] sm:h-[40px] px-2 gap-1 max-w-[100px] xs:max-w-[150px] sm:max-w-[190px]"
    >
      <BusinessNavigatorContent />
    </div>
  </a>
{/if}
