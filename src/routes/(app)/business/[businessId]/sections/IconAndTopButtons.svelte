<script lang="ts">
  import { goto, pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Avatar from "$lib/components/Avatar.svelte";
  import NavigationDialog from "$lib/components/dialogs/NavigationDialog.svelte";
  import { businessStore } from "$lib/stores/Business";
  import { isConnectedStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";

  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import { isAppleUser } from "$lib/consts/platform";
  import { containerRadius } from "$lib/consts/sizes";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import BusinessInitializer from "$lib/initializers/business_initializer";
  import { onMount } from "svelte";
  import ShareDialog from "../components/ShareDialog.svelte";

  let shareDialog: HTMLDialogElement;
  let navigationDialog: HTMLDialogElement;

  let iconStr: string = "mdi:ios-share";

  // open choose navigation option dialog
  function openNavigationDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => navigationDialog.showModal(), 100);
  }

  // open order booking sheet
  function orderNow() {
    if (!$isConnectedStore) {
      VerificationHelper.GI().setupLoggin();
      goto(`${base}/login`);
      return;
    }
    goto(
      `${base}/business/${
        $businessStore != null ? $businessStore.urlEndPoint : ""
      }/order`
    );
  }

  // open the bsuiness share screen
  function openShareDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => shareDialog.showModal(), 100);
  }

  // After the ui is loaded
  onMount(() => {
    iconStr = isAppleUser() ? "mdi:ios-share" : "mdi:share-variant";
  });
</script>

<!-- the page dialogs -->
{#if $page.state.showModal}
  <ShareDialog
    bind:dialog={shareDialog}
    name={$businessStore.shopName}
    address={$businessStore.adress}
  />

  <NavigationDialog bind:dialog={navigationDialog} />
{/if}

<section
  id="profile-row"
  class="flex justify-between items-start gap-3 mx-4 sm:mx-16 relative xs:top-[-3rem] top-[-73px] text-center"
>
  <!-- icon business name and address -->
  <div class="flex flex-col justify-center items-center">
    <Avatar img={$businessStore.design.shopIconUrl} />
    <h1 class="text-4xl pt-2">{$businessStore.shopName}</h1>
    <button
      class="flex items-center gap-1 link opacity-50"
      on:click={openNavigationDialog}
    >
      <div class="flex flex-row {$businessStore.adress ? 'block' : 'hidden'}">
        <h1 class="text-sm">
          {$businessStore.adress}
        </h1>
        <GeneralIcon icon="mdi:map-marker-outline" size={16}></GeneralIcon>
      </div>
    </button>
  </div>

  <!-- Order now and Share buttons or not available indicator -->
  <div class="flex h-24 items-center">
    {#if BusinessInitializer.GI().isBusinessActive()}
      <!-- Order now and Share buttons -->
      <div class="flex gap-5 items-center">
        <button class="btn btn-primary" on:click={orderNow}>
          {translate("setBooking", $_)}
        </button>
        <button class="btn btn-primary" on:click={openShareDialog}>
          <!-- <Icon src={isAppleUser() ? Trash : Share} size="26px" /> -->
          <GeneralIcon icon={iconStr}></GeneralIcon>
        </button>
      </div>
    {:else}
      <!-- Not abailable indicator -->
      <div
        class="bg-base-300 xs:px-10 px-5 py-2 {containerRadius} text-xl border-primary border"
      >
        {translate("businessExpired", $_)}
      </div>
    {/if}
  </div>
</section>
