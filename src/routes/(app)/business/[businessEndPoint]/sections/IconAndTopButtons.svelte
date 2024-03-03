<script lang="ts">
  import { pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import Avatar from "$lib/components/Avatar.svelte";
  import NavigationDialog from "$lib/components/dialogs/NavigationDialog.svelte";
  import {
    activeBusiness,
    businessStore,
    businessSubStore,
  } from "$lib/stores/Business";
  import { _, translate } from "$lib/utils/translate";

  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { isAppleUser } from "$lib/consts/platform";
  import { subsLevels } from "$lib/consts/purchases";
  import { containerRadius } from "$lib/consts/sizes";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { isConnectedStore } from "$lib/stores/User";
  import { onMount } from "svelte";
  import ShareDialog from "../components/ShareDialog.svelte";

  export let shrinkedDisplay: boolean = false;
  export let onImages: boolean;

  let shareDialog: HTMLDialogElement;
  let navigationDialog: HTMLDialogElement;
  let iconStr: string = "mdi:ios-share";
  let smallView: boolean = true;

  onMount(() => {
    smallView = window.innerWidth < 768;
    const handleResize = () => {
      smallView = window.innerWidth < 768;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // open choose navigation option dialog
  function openNavigationDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => navigationDialog.showModal(), 100);
  }

  // open the bsuiness share screen
  function openShareDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => shareDialog.showModal(), 100);
  }

  function onMakeBooking() {
    if ($isConnectedStore === false && $businessStore != null) {
      VerificationHelper.GI().needToMakeBookingAfterLogin = true;
    }
  }

  // After the ui is loaded
  onMount(() => {
    iconStr = isAppleUser() ? "mdi:ios-share" : "mdi:share-variant";
  });
</script>

<!-- the page dialogs -->

<ShareDialog
  bind:dialog={shareDialog}
  name={$businessStore?.shopName ?? ""}
  address={$businessStore?.adress ?? ""}
/>

<NavigationDialog bind:dialog={navigationDialog} />

<section
  id="profile-row"
  class="flex {shrinkedDisplay
    ? 'flex-col justify-center items-center '
    : 'justify-between items-start md:hidden'} mx-8 gap-x-3 sm:mx-16 relative md:top-0 top-[-73px] text-center"
>
  <!-- icon business name and address -->
  <div class="flex flex-col justify-center items-center">
    <div class="relative">
      <Avatar img={$businessStore?.design.shopIconUrl ?? ""} />
      <div
        class="absolute bottom-0 left-0 {$businessSubStore == null ||
        subsLevels[$businessSubStore] < 5
          ? 'hidden'
          : ''}"
      >
        <GeneralIcon
          icon="material-symbols:verified"
          style="color: #42A5F5"
          size={25}
        />
      </div>
    </div>
    {#if (smallView && !onImages) || (!smallView && onImages)}
      <h1 class="md:text-4xl xs:text-3xl text-2xl pt-2 max-w-64">
        {$businessStore?.shopName ?? ""}
      </h1>
    {:else}
      <h2 class="md:text-4xl xs:text-3xl text-2xl pt-2 max-w-64">
        {$businessStore?.shopName ?? ""}
      </h2>
    {/if}
    <button
      class="flex items-center gap-1 link opacity-70 link-hover"
      on:click={openNavigationDialog}
    >
      <div
        class="flex flex-row {$businessStore?.adress !== ''
          ? 'block'
          : 'hidden'} items-center"
      >
        <p class="text-xs xs:text-sm">
          {$businessStore?.adress ?? ""}
        </p>
        <GeneralIcon icon="mdi:map-marker-outline" size={16} />
      </div>
    </button>
  </div>

  <!-- Order now and Share buttons or not available indicator -->

  <div class="flex h-24 items-center">
    {#if $activeBusiness === true}
      <!-- Order now and Share buttons -->
      <div class="flex xs:gap-5 gap-3 items-center">
        <a
          on:click={onMakeBooking}
          class="btn btn-primary xs:px-10 px-6 md:px-20"
          href={$isConnectedStore
            ? `${base}/business/${$businessStore?.url ?? ""}/order`
            : `${base}/login`}
        >
          {translate("setBooking", $_)}
        </a>
        <button class="btn btn-primary" on:click={openShareDialog}>
          <!-- <Icon src={isAppleUser() ? Trash : Share} size="26px" /> -->
          <GeneralIcon icon={iconStr} />
        </button>
      </div>
    {:else if $activeBusiness === false}
      <!-- Not abailable indicator -->
      <div
        class="bg-base-300 xs:px-10 px-5 py-3 {containerRadius} text-xl border-primary border flex items-center"
      >
        {translate("businessExpired", $_)}
      </div>
    {:else}
      <div
        class="bg-base-300 xs:px-16 px-10 py-3 {containerRadius}  border-primary border flex items-center"
      >
        <div class="loading loading-spinner w-7 h-7" />
      </div>
    {/if}
  </div>
</section>
