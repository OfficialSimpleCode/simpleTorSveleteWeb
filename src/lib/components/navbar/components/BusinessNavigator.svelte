<script lang="ts">
  import { base } from "$app/paths";
  import Avatar from "$lib/components/Avatar.svelte";
  import { businessTypeToStr } from "$lib/consts/business_types";
  import { containerRadius } from "$lib/consts/sizes";
  import { businessStore } from "$lib/stores/Business";
  import { translate } from "$lib/utils/translate";

  import { Tooltip } from "flowbite-svelte";
</script>

{#if $businessStore != null}
  <div class="avatar flex justify-center">
    <div class="rounded-full h-[30px] sm:h-[36px] w-[30px] sm:w-[36px]">
      <a href="{base}/business/{$businessStore.url}">
        <img src={$businessStore.design.shopIconUrl} alt="profile" />
      </a>
    </div>
  </div>

  <Tooltip
    ><section class="bg-base-300 {containerRadius} ">
      <div class="flex flex-row gap-2 py-3 px-5 items-center justify-center">
        <div class="flex flex-col items-end">
          <h3 class="text-sm">{$businessStore.shopName}</h3>
          <p class="text-xs opacity-70">
            {translate(businessTypeToStr[$businessStore.businesseType])}
          </p>
        </div>

        <Avatar
          extraSmall={true}
          ring={false}
          img={$businessStore.design.shopIconUrl}
        />
      </div>
    </section></Tooltip
  >
{/if}
