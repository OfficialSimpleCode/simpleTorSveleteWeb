<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { userStore } from "$lib/stores/User";
  import { translate } from "$lib/utils/translate";
  import BookingList from "./pages/BookingList.svelte";
  import BookingsTable from "./pages/BookingsTable.svelte";
  import EmptyBookingPage from "./pages/EmptyBookingPage.svelte";

  let ordersByDate = Object.entries($userStore.bookings.futureBookings);
  const emptyBookins = false;
</script>

<main class=" h-full">
  <Navbar />
  <div class="md:pt-20 pt-2 flex flex-col gap-8 items-center h-full">
    <!-- title -->
    <h1 class="text-3xl mx-10">{translate("myBookings")}</h1>

    {#if !emptyBookins}
      <!-- table object in widge screens -->
      <div class="overflow-x-auto w-full hidden md:block min-h-[400px] mx-10">
        <BookingsTable {ordersByDate}></BookingsTable>
      </div>

      <!-- list of booking in small screens -->
      <div
        class="flex flex-col md:hidden max-w-[95%] sm:max-w-[80%] w-full gap-3"
      >
        <BookingList {ordersByDate}></BookingList>
      </div>
    {:else}
      <EmptyBookingPage></EmptyBookingPage>
    {/if}
    <!-- back button -->
    <div class="pb-4 w-[90%]">
      <button
        class="btn btn-outline sm:hidden w-full"
        on:click={() => history.back()}
        >{translate("back")}
      </button>
    </div>
  </div>
</main>
