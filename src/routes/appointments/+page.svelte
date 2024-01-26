<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { userStore } from "$lib/stores/User";
  import { _ } from "svelte-i18n";
  import TableRow from "./components/TableRow.svelte";
  import OrderCard from "./components/order-card/OrderCard.svelte";
  let ordersByDate = Object.entries($userStore.bookings.futureBookings);
</script>

<main>
  <Navbar />
  <div class="md:pt-20 pt-2 flex flex-col gap-8 items-center">
    <h1 class="text-3xl mx-10">{$_("myBookings")}</h1>
    <div class="overflow-x-auto w-full hidden md:block min-h-[400px] mx-10">
      <table class="table">
        <thead>
          <tr>
            <th>{$_("business")}</th>
            <th>{$_("worker")}</th>
            <th>{$_("treatments")}</th>
            <th>{$_("dateAndTime")}</th>
            <th>{$_("confirmed")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each ordersByDate as [date, bookingMap]}
            {#each Object.entries(bookingMap) as [id, booking]}
              <TableRow {booking} />
            {/each}
          {/each}
        </tbody>
      </table>
    </div>
    <div
      class="flex flex-col md:hidden max-w-[95%] sm:max-w-[80%] w-full gap-3"
    >
      {#each ordersByDate as [date, bookingMap]}
        {#each Object.entries(bookingMap) as [id, booking]}
          <OrderCard {booking} />
        {/each}
      {/each}
    </div>
    <div class="pb-4 w-[90%]">
      <button
        class="btn btn-outline sm:hidden w-full"
        on:click={() => history.back()}
        >{$_("back")}
      </button>
    </div>
  </div>
</main>
