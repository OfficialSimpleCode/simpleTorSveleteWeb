<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import GeneralIcon from "../GeneralIcon.svelte";

  export let icon: string;
  export let translateKey: string;
  export let hadleClick: () => void = () => {};
  export let size: number = 26;
  export let bgColor: string = "bg-base-300";
  export let circlePadding: string = "p-2";
  export let loading: boolean = false;
  export let active: boolean = true;
</script>

<button on:click={hadleClick} class={!active ? "opacity opacity-70" : ""}>
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
