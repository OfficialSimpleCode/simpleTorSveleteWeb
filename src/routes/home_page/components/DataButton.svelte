<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
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
  class="flex border-2 {containerRadius} px-4 py-2 text-start {selected ===
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
    <h4 class="text-lg">{titleTransKey}</h4>

    <!-- item sub title -->
    <p class="text-sm opacity-70">
      {subTitleTransKey}
    </p>
  </div>
</a>
