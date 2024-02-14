<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import GeneralIcon from "../GeneralIcon.svelte";

  export let icon: string;
  export let translateKey: string | undefined = undefined;
  export let handleClick: () => void = () => {};
  export let size: number = 26;
  export let bgColor: string = "bg-base-300";

  export let circlePadding: string = "p-2";
  export let loading: boolean = false;
  export let active: boolean = true;
  export let iconColor: string = "";
</script>

<button on:click={handleClick} class={!active ? "opacity opacity-70" : ""}>
  <div
    class="flex flex-col justify-center gap-1 items-center rounded-full {bgColor} {circlePadding}"
  >
    {#if !loading}
      <GeneralIcon {icon} {size} color={iconColor} />
    {:else}
      <div class="loading loading-spinner"></div>
    {/if}
  </div>

  {#if translateKey}
    <div>
      {translate(translateKey, $_)}
    </div>
  {/if}
</button>
