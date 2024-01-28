<script lang="ts">
  import { translate, _ } from "$lib/utils/translate";
  import GeneralIcon from "../GeneralIcon.svelte";

  export let icon: string;
  export let translateKey: string;
  export let hadleClick: () => void = () => {};
  export let size: number = 26;
  export let bgColor: string = "bg-base-300";
  export let circlePadding: string = "p-2";
</script>

<button on:click={hadleClick}>
  <div
    class="flex flex-col justify-center gap-1 items-center rounded-full {bgColor} {circlePadding}"
  >
    <GeneralIcon {icon} {size}></GeneralIcon>
  </div>
  <div>
    {translate(translateKey, $_)}
  </div>
</button>
