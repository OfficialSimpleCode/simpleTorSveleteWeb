<script lang="ts">
  import { themeStore } from "$lib/controllers/theme_controller";
  import { getDefaultLogo } from "$lib/utils/images_utils";

  export let subTitle: string = "";
</script>

<div class="flex flex-col text-center gap-[2px]">
  <div class="flex flex-row gap-3 items-center">
    <img
      src={getDefaultLogo($themeStore?.background)}
      alt="logo"
      class="w-[60px] h-[60px]"
    />
    <h1 class="text-5xl text-center">Simple Tor</h1>
  </div>
  {#if subTitle != ""}
    <h1 class="text-me text-center opacity-70">{subTitle}</h1>
  {/if}
</div>
