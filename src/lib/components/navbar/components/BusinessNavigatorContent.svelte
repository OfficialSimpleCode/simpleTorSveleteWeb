<script>
  import { themeStore } from "$lib/controllers/theme_controller";
  import { businessStore } from "$lib/stores/Business";
  import { getDefaultLogo } from "$lib/utils/images_utils";
  import { _, translate } from "$lib/utils/translate";
</script>

<p class="text-xs sm:text-sm truncate text-ellipsis hidden xxs:block">
  {$businessStore?.shopName}
</p>
<div class="avatar flex justify-center">
  <div class="rounded-full h-[25px] w-[25px]">
    <img
      src={$businessStore?.design.shopIconUrl
        ? $businessStore?.design.shopIconUrl
        : getDefaultLogo($themeStore?.background)}
      alt={translate("theProfileOfTemplate", $_).replace(
        "NAME",
        $businessStore?.shopName ?? ""
      )}
    />
  </div>
</div>
