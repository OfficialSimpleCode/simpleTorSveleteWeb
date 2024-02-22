<script lang="ts">
  import { base } from "$app/paths";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  $: ngClass = `flex items-center justify-center rounded-full hover:bg-primary hover:text-primary-content bg-base-300 block shrink-0 transition-all duration-200`;
</script>

{#if $isConnectedStore == null}
  <CustomCircleIcon icon="" loading={true} />
{:else}
  <a href={$isConnectedStore ? `${base}/profile` : `${base}/login`}>
    <div
      class="{ngClass} flex flex-row h-[34px] sm:h-[40px] px-2 gap-1 max-w-[80px] xs:max-w-[110px] items-center justify-center"
    >
      <h3 class="text-xs truncate text-ellipsis">
        {$userStore.name.split(" ")[0]}
      </h3>

      <div class="rounded-full h-[25px] sm:h-[30px] w-[25px] sm:w-[30px]">
        <GeneralIcon
          size={26}
          icon={$isConnectedStore
            ? "iconamoon:profile-fill"
            : "ic:baseline-login"}
        />
      </div>
    </div>
  </a>
{/if}
