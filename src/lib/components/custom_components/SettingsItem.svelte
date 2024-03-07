<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  import { _, translate } from "$lib/utils/translate";
  import CustomArrow from "./CustomArrow.svelte";
  import GeneralIcon from "./GeneralIcon.svelte";

  export let onTap: () => void;
  export let shimmerEffect: boolean = false;
  export let icon: string;
  export let loading: boolean = false;
  export let name: string;
  export let shimmerNameLength: string = "w-[70%]";
</script>

<button
  class="btn btn-ghost join-item flex flex-row justify-between items-center w-full {shimmerEffect
    ? 'animate-pulse'
    : ''}"
  on:click={onTap}
>
  <div class="flex flex-row w-full justify-between gap-3">
    <div class="flex items-center gap-2 w-full">
      {#if shimmerEffect}
        <div class="min-w-[30px] h-[30px] w-[30px] rounded-full bg-base-300" />
        <div
          class="h-[14px] {shimmerNameLength} {containerRadius} bg-base-300"
        />
      {:else}
        <GeneralIcon {icon} />
        {translate(name, $_)}
      {/if}
    </div>
    <div class="flex justify-end items-center opacity-70 w-full">
      <slot name="trailing" />

      {#if loading}
        <div class="loading loading-spinner" />
      {:else}
        <div class={shimmerEffect ? "opacity-10" : ""}>
          <CustomArrow />
        </div>
      {/if}
    </div>
  </div>
</button>
