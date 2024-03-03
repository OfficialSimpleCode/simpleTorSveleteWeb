<script lang="ts">
  import { themeStore } from "$lib/controllers/theme_controller";
  import { getDefaultLogo } from "$lib/utils/images_utils";
  import { _, translate } from "$lib/utils/translate";

  export let subTitle: string = "";
</script>

<div class="flex flex-col text-center gap-[2px]">
  <div class="flex flex-row gap-3 items-center">
    <img
      src={getDefaultLogo($themeStore?.background)}
      alt={translate("simpleTorLogo", $_)}
      class="w-[60px] h-[60px]"
    />
    <h2 class="text-5xl text-center">Simple Tor</h2>
  </div>
  {#if subTitle != ""}
    <h2 class="text-me text-center opacity-70">{subTitle}</h2>
  {/if}
</div>
