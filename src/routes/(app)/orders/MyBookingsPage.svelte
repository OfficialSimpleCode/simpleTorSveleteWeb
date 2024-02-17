<script lang="ts">
  import { base } from "$app/paths";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { SubType } from "$lib/consts/purchases";
  import { maxButtonSize } from "$lib/consts/sizes";
  import { themeStore } from "$lib/controllers/theme_controller";
  import BusinessInitializer from "$lib/initializers/business_initializer";
  import { activeBusiness, businessStore } from "$lib/stores/Business";
  import { userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import BookingList from "./pages/BookingList.svelte";
  import BookingsTable from "./pages/BookingsTable.svelte";
  import EmptyBookingPage from "./pages/EmptyBookingPage.svelte";

  const showMakeBookingButton =
    $businessStore != null &&
    BusinessInitializer.GI().businessSubtype !== SubType.landingPage &&
    !$businessStore.isLandingPageMode &&
    $activeBusiness !== false;
</script>

<main class=" h-full">
  <div class="md:pt-20 pt-2 flex flex-col gap-8 items-center h-full">
    <!-- title -->

    {#if Object.values($userStore.bookingsToShow).length !== 0}
      <!-- table object in widge screens -->
      <div class="overflow-x-auto w-full hidden md:block min-h-[400px] mx-10">
        <BookingsTable
          bookings={$userStore.bookingsToShow}
          forceOpenBookingSheet={true}
        />
      </div>

      <!-- list of booking in small screens -->
      <div
        class="flex flex-col md:hidden max-w-[95%] sm:max-w-[80%] w-full gap-3"
      >
        <BookingList
          bookings={$userStore.bookingsToShow}
          forceOpenBookingSheet={true}
        />
      </div>
    {:else}
      <EmptyBookingPage />
    {/if}
    <div class="flex flex-col gap-2 w-full items-center">
      {#if showMakeBookingButton}
        <div class="pb-4 w-[90%] flex flex-row items-center justify-center">
          <a
            class="btn w-full btn-primary {maxButtonSize}"
            href={`${base}/business/${$businessStore.url}/order`}
          >
            {#if $activeBusiness === true}
              <div class="flex flex-row gap-1 items-center">
                <GeneralIcon icon="material-symbols:add-circle" size={22} />
                {translate("newBooking", $_)}
              </div>
            {:else}
              <div
                class="loading loading-spinner {$themeStore?.onPrimary ??
                  'bg-white'}"
              />
            {/if}
          </a>
        </div>
      {/if}
      <!-- back button -->
      <div class="pb-4 w-[90%]">
        <button
          class="btn btn-outline sm:hidden w-full {maxButtonSize}"
          on:click={() => history.back()}
          >{translate("back", $_)}
        </button>
      </div>
    </div>
  </div>
</main>
