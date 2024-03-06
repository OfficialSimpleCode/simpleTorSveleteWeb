<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  import GeneralIcon from "./GeneralIcon.svelte";

  export let text: string;

  export let onSurface: boolean = false;
</script>

<section>
  <div
    class="flex flex-row gap-2 px-3 py-3 items-center {containerRadius} {onSurface
      ? 'bg-base-300'
      : 'bg-base-200'}"
  >
    <GeneralIcon icon="icon-park-outline:attention" size={22} />
    <h3 class="text-center text-xs opacity-70">{text}</h3>
  </div>
</section>
