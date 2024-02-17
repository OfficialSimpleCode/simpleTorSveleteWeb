<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import GeneralIcon from "./GeneralIcon.svelte";

  export let icon: string;
  export let translateKey: string | undefined = undefined;

  export let handleClick: () => void = () => {};
  export let size: number = 26;
  export let bgColor: string = "bg-base-300";
  export let href: string | undefined = undefined;

  export let circlePadding: number = 18;
  export let loading: boolean = false;
  export let active: boolean = true;
  // const heightText = ``;
  // const widthText = `w-[${size + circlePadding}px]`;
  // console.log(icon, heightText, widthText);
  const cssClass = `flex items-center justify-center rounded-full  hover:bg-primary ${bgColor} h-[38px] w-[38px] block shrink-0`;
</script>

<div class="flex flex-col items-center">
  {#if href}
    <a
      {href}
      class=" h-{size + circlePadding} w-{size + circlePadding}{!active
        ? 'opacity opacity-70'
        : ''}"
    >
      <div class={cssClass}>
        {#if !loading}
          <div class="">
            <GeneralIcon {icon} {size} />
          </div>
        {:else}
          <div class="loading loading-spinner"></div>
        {/if}
      </div>
    </a>
  {:else}
    <button on:click={handleClick} class={!active ? "opacity opacity-70" : ""}>
      <div class={cssClass}>
        {#if !loading}
          <GeneralIcon {icon} {size} />
        {:else}
          <div class="loading loading-spinner"></div>
        {/if}
      </div>
    </button>{/if}

  {#if translateKey}
    <div>
      <h3 class="text-sm pt-1">{translate(translateKey, $_)}</h3>
    </div>
  {/if}
</div>
