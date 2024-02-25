<script>
  import { base } from "$app/paths";

  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import { businessStore } from "$lib/stores/Business";
  import { userStore } from "$lib/stores/User";
  import { get } from "svelte/store";
</script>

<div class="indicator">
  <CustomCircleIcon
    icon="lets-icons:order-fill"
    bgColor="bg-base-200"
    href={$businessStore != null
      ? `${base}/business/${get(businessStore)?.url}/orders`
      : `${base}/orders`}
  />
  {#if $userStore.bookingsToShow != null && Object.values($userStore.bookingsToShow).length > 0}
    <span
      class="bg-primary badge badge-sm indicator-item rounded-badge mr-2 text-primary-content"
    >
      {Object.values($userStore.bookingsToShow).length}</span
    >
  {/if}
</div>
