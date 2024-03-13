<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";

  export let icon: string;
  export let title: string;
  export let subTitle: string;
  export let bg: string;
</script>

<div
  class="p-4 rounded-lg md:p-6 bg-base-200 hover:scale-105 transform transition-transform duration-300"
>
  <span class="inline-block p-3 rounded-lg {bg} text-white">
    <GeneralIcon {icon} />
  </span>

  <h3 class="mt-4">
    {title}
  </h3>
  <p class="mt-2 text-md opacity-70">
    {subTitle}
  </p>
</div>
