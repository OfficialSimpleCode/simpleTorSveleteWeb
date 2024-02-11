<script lang="ts">
  import { ShowToast } from "$lib/stores/ToastManager";
  import { length } from "$lib/utils/core_utils";
  import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Icon,
    XCircle,
  } from "svelte-hero-icons";

  export let dialog: HTMLDialogElement;
  export let workersStories: Record<string, string>;
  export let storyHearts: Map<string, number>;
  export let storyId: string;

  function isLast(storyId: string): boolean {
    return (
      Array.from(Object.keys(workersStories)).indexOf(storyId) ==
      length(workersStories) - 1
    );
  }

  function isFirst(storyId: string): boolean {
    return Array.from(Object.keys(workersStories)).indexOf(storyId) == 0;
  }

  function getNext(storyId: string): string {
    let index = Array.from(Object.keys(workersStories)).indexOf(storyId);
    let nextIndex = (index += 1);
    let res = Array.from(Object.keys(workersStories))[nextIndex];
    return res;
  }

  function getBefore(storyId: string): string {
    let index = Array.from(Object.keys(workersStories)).indexOf(storyId);
    let nextIndex = (index -= 1);
    return Array.from(Object.keys(workersStories))[nextIndex];
  }

  function giveHeart() {
    ShowToast({ text: "Heart Added", status: "success" });
  }
</script>

<dialog
  bind:this={dialog}
  class="modal modal-bottom sm:modal-middle"
  on:close={() => history.back()}
>
  <div class="modal-box bg-base-200 p-0 h-[700px] sm:w-[520px] overflow-hidden">
    <button
      class="btn btn-neutral sm:hidden text-white absolute right-4 top-4"
      on:click={() => dialog.close()}
    >
      <Icon src={XCircle} size="30px" />
    </button>
    <img
      class="object-cover h-full w-full rounded-xl"
      src={workersStories[storyId]}
      alt="showcase"
    />
    {#if !isFirst(storyId)}
      <button
        id="left"
        class="absolute top-[50%] left-3 text-white"
        on:click={() => (storyId = getBefore(storyId))}
      >
        <div class="h-4"></div>
        <Icon src={ChevronLeft} size="36px" />
        <div class="h-4"></div>
      </button>
    {/if}
    {#if !isLast(storyId)}
      <button
        id="right"
        class="absolute top-[50%] right-3 text-white"
        on:click={() => (storyId = getNext(storyId))}
      >
        <div class="h-4"></div>
        <Icon src={ChevronRight} size="36px" />
        <div class="h-4"></div>
      </button>
    {/if}
    <button
      class="absolute bottom-4 right-4 h-8 w-16 rounded-3xl bg-base-200 flex justify-center items-center"
      on:click={giveHeart}
    >
      {storyHearts.get(storyId) || 0}
      <Icon src={Heart} size="26px" />
    </button>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
