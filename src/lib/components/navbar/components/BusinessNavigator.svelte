<script lang="ts">
  import { base } from "$app/paths";
  import { themeStore } from "$lib/controllers/theme_controller";
  import { businessStore } from "$lib/stores/Business";
  import { getDefaultLogo } from "$lib/utils/images_utils";
  import { _, translate } from "$lib/utils/translate";

  $: ngClass = `flex items-center justify-center rounded-full hover:bg-primary hover:text-primary-content bg-base-200 block shrink-0 transition-all duration-200`;
  let loading: boolean = false;
  function onClick() {}

  function onLoad() {
    loading = false;
  }
</script>

{#if $businessStore != null}
  <a
    on:click={onClick}
    on:load={onLoad}
    href={`${base}/business/${$businessStore.url}`}
  >
    <div
      class="{ngClass} flex flex-row h-[34px] sm:h-[40px] px-2 gap-1 max-w-[100px] xs:max-w-[150px] sm:max-w-[190px]"
    >
      <p class="text-xs truncate text-ellipsis hidden xxs:block">
        {$businessStore.shopName}
      </p>
      <div class="avatar flex justify-center">
        <div
          class="rounded-full h-[25px] sm:h-[30px] w-[25px] sm:w-[30px] {loading
            ? 'opacity-70'
            : ''}"
        >
          <img
            src={$businessStore?.design.shopIconUrl
              ? $businessStore?.design.shopIconUrl
              : getDefaultLogo($themeStore?.background)}
            alt={translate("theProfileOfTemplate", $_).replace(
              "NAME",
              $businessStore.shopName
            )}
          />
        </div>
        {#if loading}
          <div
            class="absolute loading loading-spinner h-[22px] sm:h-[27px] w-[22px] sm:w-[27px] px-[3px] opacity-60"
          />
        {/if}
      </div>
    </div>
  </a>
{/if}
