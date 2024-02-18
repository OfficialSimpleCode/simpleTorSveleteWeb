<script lang="ts">
  import { isConnectedStore } from "$lib/stores/User";

  import { base } from "$app/paths";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
</script>

{#if $isConnectedStore == null}
  <CustomCircleIcon icon="" loading={true} />
{:else}
  <CustomCircleIcon
    icon={$isConnectedStore ? "iconamoon:profile-fill" : "ic:baseline-login"}
    href={$isConnectedStore ? `${base}/profile` : `${base}/login`}
  />
{/if}
