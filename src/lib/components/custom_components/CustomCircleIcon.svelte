<script lang="ts">
  import { cssSizesClasses } from "$lib/consts/css_classes";
  import { _, translate } from "$lib/utils/translate";
  import GeneralIcon from "./GeneralIcon.svelte";

  export let icon: string;
  export let translateKey: string | undefined = undefined;

  export let handleClick: () => void = () => {};

  export let size: "xs" | "sm" | "md" | "lg" = "sm";
  export let bgColor: string = "bg-base-300";
  export let href: string | undefined = undefined;

  export let loading: boolean = false;
  export let active: boolean = true;
  export let marked: boolean = false;

  $: ngClass = `flex items-center justify-center rounded-full ${
    marked ? "bg-primary" : ""
  }  ${
    active ? "hover:bg-primary" : ""
  } ${bgColor}  block shrink-0 transition-all duration-200`;
</script>

<div class="flex flex-col items-center">
  {#if href}
    <a {href} class={!active ? "opacity opacity-70" : ""}>
      <div class="{ngClass} {cssSizesClasses[size].cssClass}">
        {#if !loading}
          <GeneralIcon {icon} size={cssSizesClasses[size].iconSize} />
        {:else}
          <div class="loading loading-spinner"></div>
        {/if}
      </div>
    </a>
  {:else}
    <button on:click={handleClick} class={!active ? "opacity opacity-70" : ""}>
      <div class="{ngClass} {cssSizesClasses[size].cssClass}">
        {#if !loading}
          <GeneralIcon {icon} size={cssSizesClasses[size].iconSize} />
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
