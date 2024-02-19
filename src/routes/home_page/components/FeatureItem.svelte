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
    <GeneralIcon {icon} />
    <!-- <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-color-swatch"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"
      ></path>
      <path
        d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"
      ></path>
      <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
      <line x1="17" y1="17" x2="17" y2="17.01"></line>
    </svg> -->
  </div>

  <!-- title -->
  <h3 class="mt-6">{titleTransKey}</h3>

  <!-- sub title -->
  <p class="my-4 mb-0 font-normal leading-relaxed tracking-wide opacity-70">
    {subTitleTransKey}
  </p>
</div>
