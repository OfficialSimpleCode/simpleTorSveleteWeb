<script lang="ts">
  import { _ } from "svelte-i18n";
  import CustomArrow from "./CustomArrow.svelte";
  import GeneralIcon from "./GeneralIcon.svelte";

  export let onTap: () => void;

  export let icon: string;
  export let loading: boolean = false;
  export let name: string;
</script>

<button
  class="btn btn-ghost join-item flex justify-between items-center w-full"
  on:click={onTap}
>
  <div class="flex items-center gap-2">
    <GeneralIcon {icon} />
    {$_(name)}
  </div>
  <div class="flex items-center text-gray-500">
    <slot name="trailing" />
    {#if loading}
      <div class="loading loading-spinner" />
    {:else}
      <CustomArrow />
    {/if}
  </div>
</button>
