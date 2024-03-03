<script lang="ts">
  import { base } from "$app/paths";
  import Avatar from "$lib/components/Avatar.svelte";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { imageByGender } from "$lib/utils/images_utils";
  import { formatedPhone } from "$lib/utils/string_utils";
  import { Tooltip } from "flowbite-svelte";
</script>

{#if $isConnectedStore == null}
  <CustomCircleIcon
    icon="iconamoon:profile-fill"
    active={false}
    bgColor="bg-base-200"
  />
{:else}
  <CustomCircleIcon
    icon={$isConnectedStore ? "iconamoon:profile-fill" : "ic:baseline-login"}
    href={$isConnectedStore ? `${base}/profile` : `${base}/login`}
    bgColor="bg-base-200"
  />
  {#if $isConnectedStore}
    <Tooltip
      ><section class="bg-base-300 {containerRadius} ">
        <div class="flex flex-row gap-2 py-3 px-5 items-center justify-center">
          <div class="flex flex-col items-end">
            <h3 class="text-sm text-base-content">{$userStore.name}</h3>
            <p class="text-xs opacity-70 text-base-content">
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
    >
  {/if}
{/if}
