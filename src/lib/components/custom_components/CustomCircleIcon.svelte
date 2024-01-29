<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import GeneralIcon from "../GeneralIcon.svelte";

  export let icon: string;
  export let translateKey: string;
  export let hadleClick: (loading: boolean) => void = () => {};
  export let size: number = 26;
  export let bgColor: string = "bg-base-300";
  export let circlePadding: string = "p-2";

  let loading: boolean = false;
</script>

<button on:click={() => hadleClick(loading)}>
  <div
    class="flex flex-col justify-center gap-1 items-center rounded-full {bgColor} {circlePadding}"
  >
    {#if !loading}
      <GeneralIcon {icon} {size} />
    {:else}
      <GeneralIcon icon="mdi:loading-outline" {size} />
    {/if}
  </div>
  <div>
    {translate(translateKey, $_)}
  </div>
</button>
