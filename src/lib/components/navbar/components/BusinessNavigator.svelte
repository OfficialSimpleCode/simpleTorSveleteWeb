<script lang="ts">
  import { base } from "$app/paths";
  import { businessStore } from "$lib/stores/Business";

  $: ngClass = `flex items-center justify-center rounded-full hover:bg-primary hover:text-primary-content bg-base-200 block shrink-0 transition-all duration-200`;
</script>

{#if $businessStore != null}
  <a href="{base}/business/{$businessStore.url}">
    <div
      class="{ngClass} flex flex-row h-[34px] sm:h-[40px] px-2 gap-1 max-w-[100px] xs:max-w-[150px] sm:max-w-[190px]"
    >
      <h3 class="text-xs truncate text-ellipsis hidden xxs:block">
        {$businessStore.shopName}
      </h3>
      <div class="avatar flex justify-center">
        <div class="rounded-full h-[25px] sm:h-[30px] w-[25px] sm:w-[30px]">
          <img src={$businessStore.design.shopIconUrl} alt="profile" />
        </div>
      </div>
    </div>
  </a>
{/if}
