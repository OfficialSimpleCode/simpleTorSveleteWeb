<script lang="ts">
  import { base } from "$app/paths";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { SubType } from "$lib/consts/purchases";
  import { maxButtonSize } from "$lib/consts/sizes";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import {
    activeBusiness,
    businessStore,
    businessSubStore,
  } from "$lib/stores/Business";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import BookingList from "./pages/BookingList.svelte";
  import BookingsTable from "./pages/BookingsTable.svelte";
  import EmptyBookingPage from "./pages/EmptyBookingPage.svelte";
  let loadingBookingButton: boolean = false;

  $: showMakeBookingButton =
    $businessStore != null &&
    $isConnectedStore != null &&
    $isConnectedStore === true &&
    $businessSubStore != null &&
    $businessSubStore !== SubType.landingPage &&
    !$businessStore.isLandingPageMode &&
    $activeBusiness !== false;

  function onMakeBooking() {
    if (loadingBookingButton || $isConnectedStore == null) {
      return;
    }
    setTimeout(() => (loadingBookingButton = true), 50);
    if ($isConnectedStore === false && $businessStore != null) {
      VerificationHelper.GI().needToMakeBookingAfterLogin = true;
    }
  }

  function onLogin() {
    setTimeout(() => (loadingBookingButton = true), 50);
  }

  function onFinishLoad() {
    loadingBookingButton = false;
  }

  $: loading = $isConnectedStore !== false && $userStore.bookingsToShow == null;
  $: showEmpty =
    $isConnectedStore == false ||
    ($isConnectedStore != null &&
      $userStore.bookingsToShow != null &&
      $userStore.bookingsToShow.length === 0);
</script>

<main class=" h-full">
  <div class="md:pt-10 pt-2 flex flex-col gap-8 items-center h-full">
    <!-- title -->

    {#if showEmpty}
      <EmptyBookingPage />
    {:else}
      <!-- table object in widge screens -->
      <div class="w-full hidden md:block min-h-[400px] mx-10">
        <BookingsTable forceOpenBookingSheet={true} shimmerEffect={loading} />
      </div>

      <!-- list of booking in small screens -->
      <div
        class="flex flex-col md:hidden max-w-[95%] sm:max-w-[80%] w-full gap-3 pt-10"
      >
        <BookingList forceOpenBookingSheet={true} shimmerEffect={loading} />
      </div>
    {/if}

    <div class="flex flex-col gap-2 w-full items-center">
      {#if showMakeBookingButton}
        <div class="pb-4 w-[90%] flex flex-row items-center justify-center">
          <a
            class="btn w-full btn-primary max-w-[450px]"
            on:click={onMakeBooking}
            on:load={onFinishLoad}
            href={loadingBookingButton
              ? undefined
              : $isConnectedStore === true
                ? `${base}/business/${$businessStore?.url ?? ""}/order`
                : `${base}/login`}
          >
            {#if $activeBusiness === true && !loadingBookingButton}
              <div class="flex flex-row gap-1 items-center">
                <GeneralIcon icon="material-symbols:add-circle" size={22} />
                {translate("newBooking", $_)}
              </div>
            {:else}
              <div class="loading loading-spinner bg-primary-content" />
            {/if}
          </a>
        </div>
      {:else if $isConnectedStore === false}
        <div class="pb-4 w-[90%] flex flex-row items-center justify-center">
          <a
            class="btn w-full btn-primary {maxButtonSize}"
            on:click={onLogin}
            on:load={onFinishLoad}
            href={loadingBookingButton ? undefined : `${base}/login`}
            >{#if loadingBookingButton}
              <div class="loading loading-spinner bg-primary-content" />
            {:else}
              <div class="flex flex-row gap-1 items-center">
                <GeneralIcon icon="ic:baseline-login" size={22} />
                {translate("loginToSeeBookings", $_)}
              </div>
            {/if}
          </a>
        </div>
      {/if}
      <!-- back button -->
      <div class="pb-4 w-[90%] max-w-[450px]">
        <button
          class="btn btn-outline sm:hidden w-full"
          on:click={() => history.back()}
          >{translate("back", $_)}
        </button>
      </div>
    </div>
  </div>
</main>
