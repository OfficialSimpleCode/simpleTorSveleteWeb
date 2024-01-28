<script lang="ts">
  import { translate } from "$lib/utils/translate";
  import { Icon, type IconSource } from "svelte-hero-icons";

  export let icon: IconSource;
  export let translateKey: string;
  export let hadleClick: () => void = () => {};
  export let size: string = "26px";
  export let bgColor: string = "bg-base-300";
</script>

<button on:click={hadleClick}>
  <div
    class="flex flex-col justify-center gap-1 items-center rounded-full {bgColor} p-2"
  >
    <Icon src={icon} {size} />
  </div>
  <div>
    {translate(translateKey)}
  </div>
</button>
