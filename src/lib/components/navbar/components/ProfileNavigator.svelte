<script lang="ts">
  import { base } from "$app/paths";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import { isConnectedStore } from "$lib/stores/User";
</script>

<!-- prevent from the tool tip overiden by other elements -->
<div class="z-50">
  {#if $isConnectedStore == null}
    <div class="animate-pulse">
      <CustomCircleIcon
        icon="iconamoon:profile-fill"
        active={false}
        bgColor="bg-base-200"
      />
    </div>
  {:else}
    <CustomCircleIcon
      icon={$isConnectedStore === true
        ? "iconamoon:profile-fill"
        : "ic:baseline-login"}
      href={$isConnectedStore ? `${base}/profile` : `${base}/login`}
      bgColor="bg-base-200"
    />
    {#if $isConnectedStore}
      <!-- <Tooltip
        ><section class="bg-base-300 {containerRadius}">
          <div
            class="flex flex-row gap-2 py-3 px-5 items-center justify-center"
          >
            <div class="flex flex-col items-end">
              <h4 class="text-sm text-base-content">{$userStore.name}</h4>
              <p
                class="text-xs opacity-70 text-base-content text-ellipsis truncate"
              >
                {formatedPhone($userStore.phoneNumber)}
              </p>
            </div>
            <div class="pb-3">
              <Avatar
                extraSmall={true}
                ring={false}
                img={imageByGender($userStore.gender)}
              />
            </div>
          </div>
        </section></Tooltip
      > -->
    {/if}
  {/if}
</div>
