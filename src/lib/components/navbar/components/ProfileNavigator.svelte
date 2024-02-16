<script lang="ts">
  import { isConnectedStore } from "$lib/stores/User";

  import { base } from "$app/paths";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
</script>

{#if $isConnectedStore == null}
  <CustomCircleIcon icon="" loading={true} size={22} />
{:else}
  <CustomCircleIcon
    icon={$isConnectedStore ? "iconamoon:profile-fill" : "ic:baseline-login"}
    size={22}
    href={$isConnectedStore ? `${base}/profile` : `${base}/login`}
  />
{/if}
