<script lang="ts">
  import { base } from "$app/paths";
  import Avatar from "$lib/components/Avatar.svelte";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { imageByGender } from "$lib/utils/images_utils";
  import { formatedPhone } from "$lib/utils/string_utils";
  import { Tooltip } from "flowbite-svelte";

  let loading: boolean = false;
  function onClick() {
    if (true) {
      return;
    }
    setTimeout(() => (loading = true), 50);
  }

  function onLoad() {
    loading = false;
  }
</script>

{#if $isConnectedStore == null}
  <CustomCircleIcon
    icon="iconamoon:profile-fill"
    active={false}
    bgColor="bg-base-200"
  />
{:else}
  <CustomCircleIcon
    icon={loading
      ? ""
      : $isConnectedStore
        ? "iconamoon:profile-fill"
        : "ic:baseline-login"}
    href={loading
      ? undefined
      : $isConnectedStore
        ? `${base}/profile`
        : `${base}/login`}
    {loading}
    on:click={onClick}
    on:load={onLoad}
    bgColor="bg-base-200"
  />
  {#if $isConnectedStore}
    <Tooltip
      ><section class="bg-base-300 {containerRadius} z-50">
        <div class="flex flex-row gap-2 py-3 px-5 items-center justify-center">
          <div class="flex flex-col items-end">
            <h4 class="text-sm text-base-content">{$userStore.name}</h4>
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
