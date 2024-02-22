<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  export let icon: string;
  export let bg: string;
  export let titleTransKey: string;
  export let subTitleTransKey: string;
</script>

<!-- "background-image: linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%); border-color: rgb(93, 79, 240);" -->

<!-- feature container -->
<div
  class="{containerRadius} bg-base-200 p-8 text-center shadow hover:scale-110 transform transition-transform duration-300"
>
  <!-- feature icon and the color around it -->
  <div
    class="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border {bg}"
  >
    <GeneralIcon {icon} size={34} />
  </div>

  <!-- title -->
  <h3 class="mt-3 sm:text-xl text-lg">{titleTransKey}</h3>

  <!-- sub title -->
  <p class="my-4 opacity-70">
    {subTitleTransKey}
  </p>
</div>
