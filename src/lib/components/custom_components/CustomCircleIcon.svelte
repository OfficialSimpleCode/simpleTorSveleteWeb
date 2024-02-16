<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import GeneralIcon from "../GeneralIcon.svelte";

  export let icon: string;
  export let translateKey: string | undefined = undefined;
  export let handleClick: () => void = () => {};
  export let size: number = 26;
  export let bgColor: string = "bg-base-300";
  export let href: string | undefined = undefined;

  export let circlePadding: string = "p-2";
  export let loading: boolean = false;
  export let active: boolean = true;
  export let iconColor: string = "";
</script>

{#if href}
  <a {href} class={!active ? "opacity opacity-70" : ""}>
    <div
      class="flex flex-col justify-center gap-1 items-center rounded-full hover:bg-primary {bgColor} {circlePadding}"
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
  </a>
{:else}
  <button on:click={handleClick} class={!active ? "opacity opacity-70" : ""}>
    <div
      class="flex flex-col justify-center gap-1 items-center rounded-full hover:bg-primary {bgColor} {circlePadding}"
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
  </button>{/if}
