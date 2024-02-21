<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let selected: number;
  export let currentIndex: number;
  export let icon: string;
  export let bg: string;
  export let titleTransKey: string;
  export let subTitleTransKey: string;

  const dispatch = createEventDispatcher();

  function changeSelection() {
    dispatch("changeSelection", { value: currentIndex });
  }
</script>

<a
  on:click={changeSelection}
  on:mouseover={changeSelection}
  on:focus={changeSelection}
  href="#images"
  class="flex bg-base-200 border rounded-[30px] px-4 sm:py-5 py-4 text-start {selected ===
  currentIndex
    ? 'border-primary'
    : ''}"
>
  <!-- <div
    class="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border {bg}"
  >
    <GeneralIcon {icon} />
  </div> -->

  <!-- item text -->
  <div class="ml-4">
    <!-- item title -->
    <h4 class="sm:text-2xl text-lg">{titleTransKey}</h4>

    <!-- item sub title -->
    <p class="text-sm opacity-70">
      {subTitleTransKey}
    </p>
  </div>
</a>
